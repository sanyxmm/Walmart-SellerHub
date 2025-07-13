import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Bot,
  User,
  MicOff,
  Volume2,
  Lightbulb,
  TrendingUp,
  Package,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

/** ------------------------------------------------------------------
 * Chatbot component – plain JSX (no TypeScript)
 * ------------------------------------------------------------------ */
const Chatbot = () => {
  /* ----------------------- State ----------------------- */
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const supportedLanguages = [
    { code: 'en', native: 'English' },
    { code: 'es', native: 'Español' },
    { code: 'fr', native: 'Français' },
    { code: 'de', native: 'Deutsch' },
  ];

  const productData = [
    {
      category: "Electronics",
      product: "Wireless Headphones",
      keywords: "bluetooth, wireless, headphones, audio, music",
      title_optimization: "Premium Wireless Bluetooth Headphones - Crystal Clear Sound",
      description: "Experience premium sound quality with our wireless bluetooth headphones. Features noise cancellation, 30-hour battery life, and comfortable over-ear design.",
      ranking_tips: "Use keywords like 'wireless', 'bluetooth', 'premium sound' in title. Include brand name, key features, and benefits. Add high-quality images and get positive reviews.",
      price_strategy: "Competitive pricing between $49-$89. Monitor competitor prices weekly.",
      seo_score: "8.5/10"
    },
    {
      category: "Home & Garden",
      product: "LED String Lights",
      keywords: "led, string lights, outdoor, decoration, waterproof",
      title_optimization: "Waterproof LED String Lights 50ft - Outdoor Patio Decoration",
      description: "Transform your space with these waterproof LED string lights. Perfect for patios, gardens, and events. Energy-efficient with warm white glow.",
      ranking_tips: "Target seasonal keywords, use 'waterproof', 'LED', 'outdoor' in title. Post during peak seasons (spring/summer). Bundle with other outdoor items.",
      price_strategy: "Price between $15-$35. Offer bulk discounts for multiple units.",
      seo_score: "7.2/10"
    },
    {
      category: "Fashion",
      product: "Yoga Leggings",
      keywords: "yoga, leggings, activewear, fitness, women",
      title_optimization: "High-Waisted Yoga Leggings - Squat Proof Athletic Wear",
      description: "Premium yoga leggings with high waistband and squat-proof fabric. Perfect for yoga, running, and gym workouts. Available in multiple colors.",
      ranking_tips: "Use size-inclusive keywords, mention fabric quality, highlight unique features like 'squat-proof'. Target fitness-related search terms.",
      price_strategy: "Premium pricing $25-$45. Offer size bundles and color variety.",
      seo_score: "9.1/10"
    },
    {
      category: "Kitchen",
      product: "Silicone Baking Mats",
      keywords: "silicone, baking, mats, non-stick, reusable",
      title_optimization: "Reusable Silicone Baking Mats Set - Non-Stick Cookie Sheets",
      description: "Eco-friendly reusable silicone baking mats. Replace parchment paper with these non-stick, easy-to-clean mats. Set of 3 different sizes.",
      ranking_tips: "Target eco-conscious keywords, emphasize 'reusable', 'non-stick'. Cross-sell with baking accessories. Focus on kitchen organization searches.",
      price_strategy: "Bundle pricing $12-$25 for sets. Individual mats $8-$12.",
      seo_score: "8.0/10"
    },
    {
      category: "Beauty",
      product: "Vitamin C Serum",
      keywords: "vitamin c, serum, skincare, anti-aging, brightening",
      title_optimization: "Vitamin C Serum 20% - Anti-Aging Brightening Skincare",
      description: "Potent 20% Vitamin C serum for brighter, younger-looking skin. Reduces dark spots, fine lines, and boosts collagen production. Suitable for all skin types.",
      ranking_tips: "Include percentage in title, target anti-aging keywords, mention skin benefits. Use before/after images, focus on ingredient quality.",
      price_strategy: "Premium positioning $25-$55. Offer skincare bundles and subscription options.",
      seo_score: "8.8/10"
    },
    {
      category: "Sports",
      product: "Resistance Bands Set",
      keywords: "resistance bands, fitness, workout, home gym, strength training",
      title_optimization: "Resistance Bands Set - 5 Levels Home Gym Fitness Equipment",
      description: "Complete resistance bands set with 5 different resistance levels. Perfect for home workouts, strength training, and rehabilitation. Includes door anchor and handles.",
      ranking_tips: "Target home fitness keywords, emphasize 'complete set', 'multiple levels'. Focus on home gym and fitness equipment searches.",
      price_strategy: "Value pricing $15-$30. Bundle with workout guides and accessories.",
      seo_score: "7.8/10"
    },
    {
      category: "Tech Accessories",
      product: "Phone Car Mount",
      keywords: "phone mount, car mount, dashboard, magnetic, smartphone",
      title_optimization: "Magnetic Phone Car Mount - Dashboard & Windshield Compatible",
      description: "Universal magnetic phone car mount with 360-degree rotation. Compatible with all smartphone sizes. Strong magnetic grip with easy one-hand operation.",
      ranking_tips: "Use 'universal', 'magnetic', 'car mount' in title. Target driving and safety keywords. Emphasize compatibility with all phone sizes.",
      price_strategy: "Competitive pricing $10-$25. Offer multi-pack discounts.",
      seo_score: "8.3/10"
    },
    {
      category: "Pet Supplies",
      product: "Dog Training Pads",
      keywords: "dog training pads, puppy pads, house training, absorbent, leak-proof",
      title_optimization: "Super Absorbent Dog Training Pads - Leak-Proof Puppy Pads 100ct",
      description: "Ultra-absorbent dog training pads with 5-layer protection. Leak-proof design keeps floors clean during house training. Quick-dry surface with attractant scent.",
      ranking_tips: "Target pet training keywords, emphasize 'leak-proof', 'absorbent'. Focus on puppy and house training searches. Include count in title.",
      price_strategy: "Bulk pricing $20-$40 for large packs. Offer subscription discounts.",
      seo_score: "7.5/10"
    }
  ];

  /* ----------------------- Effects ----------------------- */
  useEffect(() => {
    setKnowledgeBase(productData);
    setMessages([{
      type: 'bot',
      content: "Hello! I'm your e-commerce assistant. I can help you optimize product listings, improve rankings, and boost sales.\nWhat would you like to know?"
    }]);
  }, []);

  // Simple text similarity function
  const calculateSimilarity = (text1, text2) => {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  };

  // RAG retrieval function
  const retrieveRelevantInfo = (query) => {
    const queryLower = query.toLowerCase();
    
    // Score each document based on relevance
    const scoredDocs = knowledgeBase.map(doc => {
      let score = 0;
      
      // Check for matches in different fields
      if (doc.product.toLowerCase().includes(queryLower)) score += 3;
      if (doc.category.toLowerCase().includes(queryLower)) score += 2;
      if (doc.keywords.toLowerCase().includes(queryLower)) score += 2;
      if (doc.title_optimization.toLowerCase().includes(queryLower)) score += 1;
      if (doc.description.toLowerCase().includes(queryLower)) score += 1;
      if (doc.ranking_tips.toLowerCase().includes(queryLower)) score += 2;
      
      // Calculate text similarity
      const titleSim = calculateSimilarity(query, doc.title_optimization);
      const descSim = calculateSimilarity(query, doc.description);
      const tipsSim = calculateSimilarity(query, doc.ranking_tips);
      
      score += (titleSim + descSim + tipsSim) * 2;
      
      return { ...doc, score };
    });
    
    // Return top 3 most relevant documents
    return scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter(doc => doc.score > 0);
  };

  // Generate response using retrieved context
  const generateResponse = async (query, context) => {
    const queryLower = query.toLowerCase();
    
    // GEMINI API INTEGRATION
    const API_KEY = 'AIzaSyBUSzxkEQy0D39Zlqn35c0OeKG6pDm_lOc';
    
    try {
      const contextText = context.map(doc => 
        `Product: ${doc.product}\nCategory: ${doc.category}\nKeywords: ${doc.keywords}\nOptimized Title: ${doc.title_optimization}\nDescription: ${doc.description}\nRanking Tips: ${doc.ranking_tips}\nPrice Strategy: ${doc.price_strategy}\nSEO Score: ${doc.seo_score}`
      ).join('\n\n---\n\n');
      
      const prompt = `You are an expert Walmart Polaris optimizer consultant helping sellers optimize their product listings and enhance retail Supply chain management. Based on the following context and user query, provide specific, actionable advice.

Context from knowledge base:
${contextText}

User Query: ${query}

 
 Please provide:
 1. anwer in 200 words without any explain just look at the product about which seller asked diretly give example improvement reagaring based on walmart polaris algorithm no explain needed 
 
 Keep your response helpful, practical, and focused on improving sales, rankings and improving supply chain management ans add pointers and emojis for easy naivgation and answer within the context of what seller has asked.
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
      
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback to local response if API fails
      return generateGeneralResponse(query, context);
    }
  };

  const generateGeneralResponse = (query, context) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('title') || queryLower.includes('optimize')) {
      return generateTitleOptimizationResponse(context);
    } else if (queryLower.includes('rank') || queryLower.includes('seo')) {
      return generateRankingResponse(context);
    } else if (queryLower.includes('price') || queryLower.includes('pricing')) {
      return generatePricingResponse(context);
    } else if (queryLower.includes('keyword')) {
      return generateKeywordResponse(context);
    } else {
      if (context.length === 0) {
        return "I can help you with:\n\n• Product title optimization\n• SEO and ranking strategies\n• Pricing recommendations\n• Keyword research\n• Listing optimization\n• Competition analysis\n\nPlease ask me something specific about your e-commerce needs!";
      }
      
      const info = context.map(doc => 
        `**${doc.category} - ${doc.product}:**\n${doc.description}\n\n*Ranking Tips:* ${doc.ranking_tips}`
      ).join('\n\n');
      
      return `Here's relevant information for your query:\n\n${info}`;
    }
  };

  const generateTitleOptimizationResponse = (context) => {
    if (context.length === 0) {
      return "Here are some general title optimization tips:\n\n• Include primary keywords in the first 60 characters\n• Mention key features and benefits\n• Add brand name if relevant\n• Use power words like 'Premium', 'Best', 'Professional'\n• Include size, color, or quantity if applicable\n• Keep it under 150 characters for most platforms";
    }
    
    const examples = context.map(doc => 
      `**${doc.category} - ${doc.product}:**\n${doc.title_optimization}`
    ).join('\n\n');
    
    return `Here are optimized title examples based on your query:\n\n${examples}\n\n**Key Tips:**\n• Use relevant keywords naturally\n• Highlight unique selling points\n• Keep titles concise but descriptive\n• Include important product specifications`;
  };

  const generateRankingResponse = (context) => {
    if (context.length === 0) {
      return "Here are proven ranking strategies:\n\n• Optimize product titles with relevant keywords\n• Get positive customer reviews\n• Use high-quality product images\n• Maintain competitive pricing\n• Keep inventory levels stable\n• Respond to customer questions quickly\n• Use relevant backend keywords\n• Optimize for mobile viewing";
    }
    
    const tips = context.map(doc => 
      `**${doc.product} (SEO Score: ${doc.seo_score}):**\n${doc.ranking_tips}`
    ).join('\n\n');
    
    return `Here are specific ranking strategies:\n\n${tips}\n\n**Additional Tips:**\n• Monitor competitor performance\n• Update listings regularly\n• Use A/B testing for titles and images\n• Focus on customer satisfaction metrics`;
  };

  const generatePricingResponse = (context) => {
    if (context.length === 0) {
      return "Pricing strategies for better sales:\n\n• Research competitor prices weekly\n• Use psychological pricing (e.g., $19.99 vs $20.00)\n• Offer bundle deals for higher AOV\n• Test different price points\n• Consider seasonal pricing adjustments\n• Use dynamic pricing for competitive categories\n• Offer volume discounts\n• Include free shipping in pricing when possible";
    }
    
    const strategies = context.map(doc => 
      `**${doc.product}:**\n${doc.price_strategy}`
    ).join('\n\n');
    
    return `Here are pricing recommendations:\n\n${strategies}\n\n**General Pricing Tips:**\n• Monitor market trends regularly\n• Consider your profit margins\n• Test price sensitivity\n• Use promotional pricing strategically`;
  };

  const generateKeywordResponse = (context) => {
    if (context.length === 0) {
      return "Keyword research tips:\n\n• Use platform-specific keyword tools\n• Analyze competitor keywords\n• Include long-tail keywords\n• Research seasonal trends\n• Use backend search terms effectively\n• Monitor keyword performance\n• Include relevant product attributes\n• Consider customer search intent";
    }
    
    const keywords = context.map(doc => 
      `**${doc.product}:**\nKeywords: ${doc.keywords}`
    ).join('\n\n');
    
    return `Here are relevant keywords for your products:\n\n${keywords}\n\n**Keyword Strategy:**\n• Mix high-volume and niche keywords\n• Use synonyms and variations\n• Include brand and model names\n• Target customer problems and solutions`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Retrieve relevant context
      const relevantContext = retrieveRelevantInfo(userMessage);
      
      // Generate response
      const response = await generateResponse(userMessage, relevantContext);
      
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I apologize, but I encountered an error. Please try rephrasing your question or ask about product optimization, ranking strategies, or pricing tips." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const quickActions = [
    {
      icon: Lightbulb,
      title: 'Products',
      description: 'Get AI suggestions for better product listings',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    },
    {
      icon: TrendingUp,
      title: 'Marketing Insights',
      description: 'Personalized marketing recommendations',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      icon: Package,
      title: 'Inventory Check',
      description: 'Monitor stock levels and get reorder alerts',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      icon: DollarSign,
      title: 'Sales Analytics',
      description: 'View detailed performance metrics',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ];

  /* ----------------------- Render ----------------------- */
  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            E-commerce Assistant
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
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.native}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && !isVoiceMode && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showQuickActions ? 'Hide' : 'Show'}
              {showQuickActions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${
            showQuickActions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(action.title)}
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
        </div>
      )}

      {/* Chat Window */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-0">
        
        {/* Chat Messages */}
        <div className="flex-1 bg-gray-50 rounded-t-lg p-4 overflow-y-auto min-h-0">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 border'
              }`}>
                
                <div className="whitespace-pre-wrap text-sm">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 bg-white border rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  Analyzing your question...
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed Bottom Input Area */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 rounded-b-lg">
          {/* Suggestions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Quick optimization questions:</h4>
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showSuggestions ? 'Hide' : 'Show'}
                {showSuggestions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${
              showSuggestions ? 'max-h-32 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'
            }`}>
              <div className="flex flex-wrap gap-2">
                {[
                  "Optimize my product title",
                  "Improve product description", 
                  "Help with keyword research",
                  "Check pricing strategy",
                  "Boost product ranking",
                  "SEO optimization tips",
                  "Analyze competition",
                  "Inventory management tips"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors duration-200 hover:border-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Input Area */}
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about product optimization, ranking strategies, or pricing..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;