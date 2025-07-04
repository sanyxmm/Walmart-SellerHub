// voiceService.js
// Voice Service for Sarvam TTS and Whisper integration
class VoiceService {
  // ── configurable keys ──
  sarvamApiKey = 'your-sarvam-api-key';

  // ── runtime state ──
  isListening = false;
  recognition = null;
  synthesis = window.speechSynthesis;

  constructor() {
    this.initializeSpeechRecognition();
  }

  /* ---------- speech‑recognition bootstrap ---------- */
  initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  /* ---------- Sarvam TTS ---------- */
  async speakWithSarvam(text, language = 'hi') {
    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.sarvamApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language_code: language,
          speaker: 'meera',
          pitch: 0,
          pace: 1.0,
          loudness: 1.0,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          model: 'bulbul:v1',
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        await audio.play();
      } else {
        // fallback
        this.speakWithBrowserTTS(text, language);
      }
    } catch (err) {
      console.error('Sarvam TTS error:', err);
      this.speakWithBrowserTTS(text, language);
    }
  }

  /* ---------- browser TTS fallback ---------- */
  speakWithBrowserTTS(text, language) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getLanguageCode(language);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    this.synthesis.speak(utterance);
  }

  /* ---------- speech‑to‑text ---------- */
  startListening(language = 'hi') {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.recognition.lang = this.getLanguageCode(language);
      this.isListening = true;

      this.recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (e) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${e.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking() {
    this.synthesis.cancel();
  }

  getIsListening() {
    return this.isListening;
  }

  /* ---------- helpers ---------- */
  getLanguageCode(language) {
    const codes = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      pa: 'pa-IN',
      or: 'or-IN',
    };
    return codes[language] || 'en-IN';
  }

  /* ---------- Whisper transcription ---------- */
  async transcribeWithWhisper(audioBlob) {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'whisper-1');
      formData.append('language', 'hi'); // make dynamic if needed

      const response = await fetch(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      return result.text;
    } catch (err) {
      console.error('Whisper transcription error:', err);
      throw err;
    }
  }
}

/* ---------- singleton export ---------- */
export const voiceService = new VoiceService();
export default VoiceService;
