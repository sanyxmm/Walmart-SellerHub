import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  Award, 
  TrendingUp, 
  Package, 
  DollarSign,
  Calendar,
  Gift,
  Crown,
  Zap,
  Medal
} from 'lucide-react';
import { mockAchievement, mockBadges } from '../data/mockData';

const Gamification: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  
  const streakMilestones = [
    { days: 7, reward: '₹500 credit', completed: true },
    { days: 15, reward: 'Premium features', completed: true },
    { days: 30, reward: '₹2000 credit', completed: false },
    { days: 50, reward: 'VIP status', completed: false },
    { days: 100, reward: '₹10000 credit', completed: false }
  ];

  const challenges = [
    {
      id: '1',
      title: 'Sales Sprint',
      description: 'Achieve ₹50,000 in sales this month',
      progress: 78,
      reward: '₹1000 bonus + Sales Champion badge',
      deadline: '5 days left',
      type: 'sales'
    },
    {
      id: '2',
      title: 'Product Master',
      description: 'List 20 new products this week',
      progress: 45,
      reward: 'Product Master badge + Premium analytics',
      deadline: '2 days left',
      type: 'products'
    },
    {
      id: '3',
      title: 'Customer Satisfaction',
      description: 'Maintain 4.5+ rating with 50+ reviews',
      progress: 92,
      reward: 'Customer Hero badge + Featured listing',
      deadline: 'Ongoing',
      type: 'reviews'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'You', score: 2840, change: '+12' },
    { rank: 2, name: 'Rajesh Kumar', score: 2756, change: '+8' },
    { rank: 3, name: 'Priya Sharma', score: 2698, change: '-2' },
    { rank: 4, name: 'Amit Patel', score: 2634, change: '+15' },
    { rank: 5, name: 'Sneha Singh', score: 2598, change: '+5' }
  ];

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'sales':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'products':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'reviews':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
        <p className="text-gray-600 mt-1">Track your progress and earn rewards</p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Level {mockAchievement.level} Seller</h2>
            <p className="text-blue-100 mb-4">Keep up the great work!</p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-2 mb-1">
                  <Trophy className="w-5 h-5" />
                  <span className="text-lg font-semibold">{mockAchievement.streak}</span>
                </div>
                <p className="text-sm text-blue-100">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-lg font-semibold">{mockAchievement.badges.filter(b => b.earned).length}</span>
                </div>
                <p className="text-sm text-blue-100">Badges Earned</p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-2 mb-1">
                  <Star className="w-5 h-5" />
                  <span className="text-lg font-semibold">{mockAchievement.xp}</span>
                </div>
                <p className="text-sm text-blue-100">XP Points</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
              <Crown className="w-12 h-12 text-yellow-300" />
            </div>
            <p className="text-sm text-blue-100">Next Level</p>
            <p className="font-semibold">{mockAchievement.nextLevelXp - mockAchievement.xp} XP to go</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Level Progress</span>
            <span>{Math.round((mockAchievement.xp / mockAchievement.nextLevelXp) * 100)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(mockAchievement.xp / mockAchievement.nextLevelXp) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Streak & Milestones */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Streak Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {streakMilestones.map((milestone, index) => (
            <div key={index} className={`text-center p-4 rounded-lg border-2 ${
              milestone.completed 
                ? 'border-green-200 bg-green-50' 
                : mockAchievement.streak >= milestone.days 
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                milestone.completed 
                  ? 'bg-green-500 text-white' 
                  : mockAchievement.streak >= milestone.days
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {milestone.completed ? (
                  <Trophy className="w-6 h-6" />
                ) : (
                  <span className="font-bold">{milestone.days}</span>
                )}
              </div>
              <p className="font-semibold text-gray-900">{milestone.days} Days</p>
              <p className="text-xs text-gray-600 mt-1">{milestone.reward}</p>
              {milestone.completed && (
                <p className="text-xs text-green-600 font-medium mt-1">Claimed!</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockBadges.map((badge) => (
            <div 
              key={badge.id} 
              className={`text-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                badge.earned 
                  ? 'border-blue-200 bg-blue-50 hover:shadow-md' 
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
              onClick={() => setSelectedBadge(badge)}
            >
              <div className={`text-4xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>
                {badge.icon}
              </div>
              <p className={`font-semibold text-sm ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                {badge.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
              {badge.earned && badge.earnedDate && (
                <p className="text-xs text-blue-600 mt-1">
                  {badge.earnedDate.toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Challenges</h3>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getChallengeIcon(challenge.type)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{challenge.progress}%</p>
                  <p className="text-xs text-gray-500">{challenge.deadline}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <Gift className="w-4 h-4 inline mr-1" />
                  {challenge.reward}
                </p>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Leaderboard</h3>
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${
              user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  user.rank === 1 ? 'bg-yellow-500 text-white' :
                  user.rank === 2 ? 'bg-gray-400 text-white' :
                  user.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {user.rank <= 3 ? (
                    user.rank === 1 ? <Crown className="w-4 h-4" /> :
                    user.rank === 2 ? <Medal className="w-4 h-4" /> :
                    <Award className="w-4 h-4" />
                  ) : (
                    user.rank
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${user.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">{user.score} XP</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                user.change.startsWith('+') ? 'text-green-600' : 
                user.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
              }`}>
                {user.change.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4" />
                ) : user.change.startsWith('-') ? (
                  <TrendingUp className="w-4 h-4 rotate-180" />
                ) : null}
                <span>{user.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gamification;