import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  Languages,
  Lightbulb,
  TrendingUp,
  Package,
  DollarSign,
  Loader
} from 'lucide-react';
import { ChatMessage } from '../types';
import { translationService } from '../services/translationService';
import { voiceService } from '../services/voiceService';
import VoiceAssistant from './VoiceAssistant';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your AI assistant. I can help you with product optimization, inventory management, marketing insights, and much more. How can I assist you today?',
      type: 'ai',
      timestamp: new Date(),
      suggestions: [
        'Optimize my product descriptions',
        'Check inventory levels',
        'Marketing recommendations',
        'Sales analytics'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supportedLanguages = translationService.getSupportedLanguages();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message,
      type: 'user',
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Speak the response if voice mode is enabled
      if (isVoiceMode) {
        voiceService.speakWithSarvam(aiResponse.message, selectedLanguage);
      }
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    // Multilingual responses based on selected language
    const t = (key: string) => translationService.translate(key, selectedLanguage);

    if (lowerMessage.includes('description') || lowerMessage.includes('optimize') || lowerMessage.includes('उत्पाद') || lowerMessage.includes('পণ্য')) {
      response = selectedLanguage === 'hi' 
        ? 'मैं आपके उत्पाद विवरण को अनुकूलित करने में मदद कर सकता हूँ! यहाँ कुछ सुझाव हैं:\n\n• क्रिया शब्दों और लाभ-केंद्रित भाषा का उपयोग करें\n• SEO के लिए प्रासंगिक कीवर्ड शामिल करें\n• विवरण संक्षिप्त लेकिन जानकारीपूर्ण रखें\n• रूपांतरण बढ़ाने के लिए भावनात्मक ट्रिगर जोड़ें\n\nक्या आप चाहते हैं कि मैं किसी विशिष्ट उत्पाद विवरण की समीक्षा करूं?'
        : selectedLanguage === 'bn'
        ? 'আমি আপনার পণ্যের বিবরণ অপ্টিমাইজ করতে সাহায্য করতে পারি! এখানে কিছু পরামর্শ:\n\n• ক্রিয়া শব্দ এবং সুবিধা-কেন্দ্রিক ভাষা ব্যবহার করুন\n• SEO এর জন্য প্রাসঙ্গিক কীওয়ার্ড অন্তর্ভুক্ত করুন\n• বিবরণ সংক্ষিপ্ত কিন্তু তথ্যপূর্ণ রাখুন\n• রূপান্তর বৃদ্ধির জন্য আবেগময় ট্রিগার যোগ করুন\n\nআপনি কি চান যে আমি একটি নির্দিষ্ট পণ্যের বিবরণ পর্যালোচনা করি?'
        : 'I can help optimize your product descriptions! Here are some suggestions:\n\n• Use action words and benefits-focused language\n• Include relevant keywords for SEO\n• Keep descriptions concise but informative\n• Add emotional triggers to increase conversions\n\nWould you like me to review a specific product description?';
      
      suggestions = selectedLanguage === 'hi' 
        ? ['मेरे टॉप उत्पाद की समीक्षा करें', 'SEO अनुकूलन टिप्स', 'प्रतियोगी विश्लेषण']
        : selectedLanguage === 'bn'
        ? ['আমার শীর্ষ পণ্য পর্যালোচনা করুন', 'SEO অপ্টিমাইজেশন টিপস', 'প্রতিযোগী বিশ্লেষণ']
        : ['Review my top product', 'SEO optimization tips', 'Competitor analysis'];
    } 
    else if (lowerMessage.includes('inventory') || lowerMessage.includes('stock') || lowerMessage.includes('इन्वेंटरी') || lowerMessage.includes('ইনভেন্টরি')) {
      response = selectedLanguage === 'hi'
        ? 'आपके वर्तमान इन्वेंटरी डेटा के आधार पर:\n\n📦 3 उत्पादों का स्टॉक कम है\n⚠️ वायरलेस हेडफोन्स को रीस्टॉक करने की जरूरत है (केवल 15 बचे हैं)\n✅ स्मार्ट वॉच इन्वेंटरी स्वस्थ है\n\nमैं सुझाता हूँ:\n• तेज़ी से बिकने वाली वस्तुओं के लिए ऑटो-रीऑर्डर सेट करें\n• मौसमी उत्पादों के लिए इन्वेंटरी बढ़ाएं\n• बल्क खरीदारी छूट पर विचार करें'
        : selectedLanguage === 'bn'
        ? 'আপনার বর্তমান ইনভেন্টরি ডেটার ভিত্তিতে:\n\n📦 ৩টি পণ্যের স্টক কম\n⚠️ ওয়্যারলেস হেডফোনের পুনঃস্টক প্রয়োজন (মাত্র ১৫টি বাকি)\n✅ স্মার্ট ওয়াচ ইনভেন্টরি সুস্থ\n\nআমি সুপারিশ করি:\n• দ্রুত বিক্রি হওয়া আইটেমের জন্য অটো-রিঅর্ডার সেট করুন\n• মৌসুমী পণ্যের জন্য ইনভেন্টরি বৃদ্ধি করুন\n• বাল্ক ক্রয় ছাড় বিবেচনা করুন'
        : 'Based on your current inventory data:\n\n📦 3 products are running low on stock\n⚠️ Wireless Headphones need restocking (only 15 left)\n✅ Smart Watch inventory is healthy\n\nI recommend:\n• Set up auto-reorder for fast-moving items\n• Increase inventory for seasonal products\n• Consider bulk purchasing discounts';
      
      suggestions = selectedLanguage === 'hi'
        ? ['ऑटो-रीऑर्डर सेट करें', 'कम स्टॉक आइटम देखें', 'इन्वेंटरी पूर्वानुमान']
        : selectedLanguage === 'bn'
        ? ['অটো-রিঅর্ডার সেট করুন', 'কম স্টক আইটেম দেখুন', 'ইনভেন্টরি পূর্বাভাস']
        : ['Set up auto-reorder', 'View low stock items', 'Inventory forecasting'];
    }
    else if (lowerMessage.includes('marketing') || lowerMessage.includes('sales') || lowerMessage.includes('मार्केटिंग') || lowerMessage.includes('বিপণন')) {
      response = selectedLanguage === 'hi'
        ? 'आपके स्टोर के लिए व्यक्तिगत मार्केटिंग अंतर्दृष्टि:\n\n📈 आपकी रूपांतरण दर (3.2%) औसत से ऊपर है\n🎯 इलेक्ट्रॉनिक्स श्रेणी सबसे अच्छा प्रदर्शन कर रही है\n💰 औसत ऑर्डर मूल्य: ₹2,485\n\nसिफारिशें:\n• कपड़ों की श्रेणी के लिए लक्षित विज्ञापन चलाएं\n• इलेक्ट्रॉनिक्स के लिए बंडल ऑफर बनाएं\n• कार्ट छोड़ने वालों के लिए ईमेल रीटार्गेटिंग लागू करें'
        : selectedLanguage === 'bn'
        ? 'আপনার স্টোরের জন্য ব্যক্তিগত বিপণন অন্তর্দৃষ্টি:\n\n📈 আপনার রূপান্তর হার (৩.২%) গড়ের চেয়ে বেশি\n🎯 ইলেকট্রনিক্স বিভাগ সেরা পারফরম্যান্স করছে\n💰 গড় অর্ডার মূল্য: ₹২,৪৮৫\n\nসুপারিশ:\n• পোশাক বিভাগের জন্য লক্ষ্যবদ্ধ বিজ্ঞাপন চালান\n• ইলেকট্রনিক্সের জন্য বান্ডল অফার তৈরি করুন\n• কার্ট পরিত্যাগকারীদের জন্য ইমেইল রিটার্গেটিং প্রয়োগ করুন'
        : 'Here are personalized marketing insights for your store:\n\n📈 Your conversion rate (3.2%) is above average\n🎯 Electronics category performing best\n💰 Average order value: ₹2,485\n\nRecommendations:\n• Run targeted ads for clothing category\n• Create bundle offers for electronics\n• Implement email retargeting for cart abandoners';
      
      suggestions = selectedLanguage === 'hi'
        ? ['विज्ञापन अभियान बनाएं', 'ईमेल ऑटोमेशन सेट करें', 'बंडल सिफारिशें']
        : selectedLanguage === 'bn'
        ? ['বিজ্ঞাপন প্রচারাভিযান তৈরি করুন', 'ইমেইল অটোমেশন সেট করুন', 'বান্ডল সুপারিশ']
        : ['Create ad campaign', 'Set up email automation', 'Bundle recommendations'];
    }
    else {
      response = selectedLanguage === 'hi'
        ? 'मैं समझता हूँ कि आपको अपने व्यापार में मदद चाहिए। मैं इनमें सहायता कर सकता हूँ:\n\n• उत्पाद लिस्टिंग अनुकूलन\n• इन्वेंटरी प्रबंधन\n• मार्केटिंग रणनीतियाँ\n• बिक्री विश्लेषण\n• ऑर्डर पूर्ति\n• प्रतिस्पर्धी विश्लेषण\n\nआप किस विशिष्ट क्षेत्र पर ध्यान देना चाहते हैं?'
        : selectedLanguage === 'bn'
        ? 'আমি বুঝতে পারছি আপনার ব্যবসায় সাহায্য প্রয়োজন। আমি এগুলোতে সহায়তা করতে পারি:\n\n• পণ্য তালিকা অপ্টিমাইজেশন\n• ইনভেন্টরি ব্যবস্থাপনা\n• বিপণন কৌশল\n• বিক্রয় বিশ্লেষণ\n• অর্ডার পূরণ\n• প্রতিযোগী বিশ্লেষণ\n\nআপনি কোন নির্দিষ্ট এলাকায় ফোকাস করতে চান?'
        : 'I understand you need help with your business. I can assist with:\n\n• Product listing optimization\n• Inventory management\n• Marketing strategies\n• Sales analytics\n• Order fulfillment\n• Competitive analysis\n\nWhat specific area would you like to focus on?';
      
      suggestions = selectedLanguage === 'hi'
        ? ['उत्पाद अनुकूलन', 'मार्केटिंग सहायता', 'इन्वेंटरी जांच', 'बिक्री अंतर्दृष्टि']
        : selectedLanguage === 'bn'
        ? ['পণ্য অপ্টিমাইজেশন', 'বিপণন সহায়তা', 'ইনভেন্টরি চেক', 'বিক্রয় অন্তর্দৃষ্টি']
        : ['Product optimization', 'Marketing help', 'Inventory check', 'Sales insights'];
    }

    return {
      id: Date.now().toString(),
      message: response,
      type: 'ai',
      timestamp: new Date(),
      suggestions,
      language: selectedLanguage
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(transcript);
    // Auto-send voice messages
    setTimeout(() => {
      handleSendMessage(transcript);
    }, 500);
  };

  const quickActions = [
    {
      icon: Lightbulb,
      title: translationService.translate('products', selectedLanguage),
      description: 'Get AI suggestions for better product listings',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Insights',
      description: 'Personalized marketing recommendations',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      icon: Package,
      title: 'Inventory Check',
      description: 'Monitor stock levels and get reorder alerts',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: DollarSign,
      title: 'Sales Analytics',
      description: 'View detailed performance metrics',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {translationService.translate('chatbot', selectedLanguage)}
          </h1>
          <p className="text-gray-600 mt-1">Your intelligent business companion</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 ${
              isVoiceMode 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isVoiceMode ? <Volume2 className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span className="text-sm">Voice Mode</span>
          </button>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {supportedLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.native}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Voice Assistant Panel */}
      {isVoiceMode && (
        <div className="mb-6">
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onTranscript={handleVoiceTranscript}
            isActive={isVoiceMode}
          />
        </div>
      )}

      {/* Quick Actions */}
      {messages.length <= 1 && !isVoiceMode && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSendMessage(action.title)}
                  className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:border-solid hover:shadow-md ${action.color}`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <h4 className="font-semibold mb-1">{action.title}</h4>
                  <p className="text-xs opacity-75">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-50 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.message}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  {message.language && message.language !== 'en' && (
                    <p className="text-xs mt-1 opacity-60">
                      {supportedLanguages.find(l => l.code === message.language)?.native}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages[messages.length - 1]?.suggestions && messages[messages.length - 1]?.type === 'ai' && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8"></div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                  {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder={`Type your message... (${supportedLanguages.find(l => l.code === selectedLanguage)?.native})`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;