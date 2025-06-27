// Voice Service for Sarvam TTS and Whisper integration
export class VoiceService {
  private sarvamApiKey: string = 'your-sarvam-api-key';
  private isListening: boolean = false;
  private recognition: any = null;
  private synthesis: SpeechSynthesis;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  // Sarvam TTS Integration
  async speakWithSarvam(text: string, language: string = 'hi'): Promise<void> {
    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.sarvamApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language_code: language,
          speaker: 'meera', // Default Hindi speaker
          pitch: 0,
          pace: 1.0,
          loudness: 1.0,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          model: 'bulbul:v1'
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        await audio.play();
      } else {
        // Fallback to browser TTS
        this.speakWithBrowserTTS(text, language);
      }
    } catch (error) {
      console.error('Sarvam TTS error:', error);
      // Fallback to browser TTS
      this.speakWithBrowserTTS(text, language);
    }
  }

  // Browser TTS Fallback
  private speakWithBrowserTTS(text: string, language: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getLanguageCode(language);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    this.synthesis.speak(utterance);
  }

  // Speech Recognition with Whisper fallback
  async startListening(language: string = 'hi'): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.recognition.lang = this.getLanguageCode(language);
      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking(): void {
    this.synthesis.cancel();
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  private getLanguageCode(language: string): string {
    const languageCodes: { [key: string]: string } = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'mr': 'mr-IN',
      'ta': 'ta-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'pa': 'pa-IN',
      'or': 'or-IN'
    };
    return languageCodes[language] || 'en-IN';
  }

  // Whisper API Integration for better accuracy
  async transcribeWithWhisper(audioBlob: Blob): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'whisper-1');
      formData.append('language', 'hi'); // Can be dynamic

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      });

      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('Whisper transcription error:', error);
      throw error;
    }
  }
}

export const voiceService = new VoiceService();