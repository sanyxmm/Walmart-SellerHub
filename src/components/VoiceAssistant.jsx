import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  MessageSquare,
  Loader,
} from 'lucide-react';
import { voiceService } from '../services/voiceService';
import { translationService } from '../services/translationService';

const VoiceAssistant = ({
  selectedLanguage,
  onLanguageChange,
  onTranscript,
  isActive = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const supportedLanguages = translationService.getSupportedLanguages();

  /* --- cleanup when unmounting --- */
  useEffect(() => {
    return () => {
      voiceService.stopListening();
      voiceService.stopSpeaking();
    };
  }, []);

  /* --- mic handlers --- */
  const startListening = async () => {
    try {
      setError(null);
      setIsListening(true);

      const result = await voiceService.startListening(selectedLanguage);
      setTranscript(result);
      onTranscript(result);

      // fake audio‑level animation
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setAudioLevel(0);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Voice recognition failed');
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
    setAudioLevel(0);
  };

  /* --- TTS handlers --- */
  const speakText = async (text) => {
    try {
      setIsSpeaking(true);
      await voiceService.speakWithSarvam(text, selectedLanguage);
    } catch {
      setError('Text‑to‑speech failed');
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  const getLanguageName = (code) => {
    const lang = supportedLanguages.find((l) => l.code === code);
    return lang ? lang.native : code;
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {/* ---- Header / language ---- */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Voice Assistant</h3>
        <div className="flex items-center space-x-2">
          <Languages className="w-4 h-4 text-gray-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.native}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---- Controls ---- */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isSpeaking}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          {isListening && (
            <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
          )}
        </button>

        <button
          onClick={
            isSpeaking
              ? stopSpeaking
              : () =>
                  speakText(
                    'नमस्ते! मैं आपका AI सहायक हूँ। मैं आपकी व्यापारिक जरूरतों में मदद कर सकता हूँ।'
                  )
          }
          disabled={isListening}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSpeaking
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          } ${isListening ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* ---- Visualizer ---- */}
      {isListening && (
        <div className="mb-4">
          <div className="flex items-center justify-center space-x-1 h-12">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-500 rounded-full transition-all duration-100"
                style={{
                  height: `${Math.max(
                    4,
                    (Math.sin(Date.now() * 0.01 + i) + 1) * 20 + audioLevel * 0.3
                  )}px`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ---- Status text ---- */}
      <div className="text-center mb-4">
        {isListening && (
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">
              {translationService.translate('listening', selectedLanguage)}...
            </span>
          </div>
        )}
        {isSpeaking && (
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-medium">Speaking...</span>
          </div>
        )}
        {!isListening && !isSpeaking && (
          <p className="text-sm text-gray-500">
            Tap microphone to speak in {getLanguageName(selectedLanguage)}
          </p>
        )}
      </div>

      {/* ---- Transcript ---- */}
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600 mb-1">You said:</p>
              <p className="text-sm text-gray-900 font-medium">{transcript}</p>
            </div>
          </div>
        </div>
      )}

      {/* ---- Error ---- */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* ---- Quick actions ---- */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() =>
            speakText(translationService.translate('welcome', selectedLanguage))
          }
          className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors duration-200"
        >
          Test Voice
        </button>
        <button
          onClick={() => setTranscript('')}
          className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors duration-200"
        >
          Clear
        </button>
      </div>

      {/* ---- Language tips ---- */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600 mb-1">
          Voice Commands in {getLanguageName(selectedLanguage)}:
        </p>
        <div className="text-xs text-blue-700 space-y-1">
          {selectedLanguage === 'hi' && (
            <>
              <p>• "उत्पाद दिखाओ" - Show products</p>
              <p>• "बिक्री रिपोर्ट" - Sales report</p>
              <p>• "इन्वेंटरी चेक करो" - Check inventory</p>
            </>
          )}
          {selectedLanguage === 'en' && (
            <>
              <p>• "Show products" - Display product list</p>
              <p>• "Sales report" - View analytics</p>
              <p>• "Check inventory" - Inventory status</p>
            </>
          )}
          {selectedLanguage === 'bn' && (
            <>
              <p>• "পণ্য দেখান" - Show products</p>
              <p>• "বিক্রয় রিপোর্ট" - Sales report</p>
              <p>• "ইনভেন্টরি চেক করুন" - Check inventory</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
