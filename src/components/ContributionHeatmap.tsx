import { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';

export default function ContributionHeatmap() {
  const [data, setData] = useState([]);
  const query = `
  query($user: String!, $from: DateTime!) {
    user(login: $user) {
      contributionsCollection(from: $from) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;


  useEffect(() => {
    (async () => {
      const body = {
        query:query,
        variables: {
          user: 'sanyxmm',
          from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
          to: new Date().toISOString(),
        },
      };
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GH_TOKEN}`,
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      // 🟢 massage JSON into [{ date, count }]
      const days =
        json.data.user.contributionsCollection.contributionCalendar.weeks
          .flatMap((w) => w.contributionDays)
          .map(({ date, contributionCount }) => ({
            date,
            count: contributionCount,
          }));
      setData(days);
    })();
  }, []);

  return (
    <ActivityCalendar
      data={data}
      blockSize={12}
      blockMargin={3}
      labels={{ totalCount: '{{count}} commits in {{year}}' }}
      colorScheme="green"     // GitHub’s default
      theme={{
        light: ['#ebf9eb', '#9AE6B4', '#48BB78', '#2F855A', '#22543D'], // tweak at will
      }}
    />
  );
}
