// Translation Service for multilingual support
class TranslationService {
  /* -------------------------------------------
     master dictionary
  ------------------------------------------- */
  translations = {
    en: {
      dashboard: 'Dashboard',
      products: 'Products',
      analytics: 'Analytics',
      orders: 'Orders',
      chatbot: 'AI Assistant',
      settings: 'Settings',
      welcome: "Welcome back! Here's your business overview.",
      totalRevenue: 'Total Revenue',
      totalOrders: 'Total Orders',
      activeProducts: 'Active Products',
      conversionRate: 'Conversion Rate',
      searchProducts: 'Search products or SKU...',
      addProduct: 'Add Product',
      viewDetails: 'View Details',
      speakToAssistant: 'Speak to Assistant',
      listening: 'Listening...',
      processing: 'Processing...',
      darkStores: 'Dark Stores',
      deliveryTime: 'Delivery Time',
      orderStatus: 'Order Status',
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      products: 'उत्पाद',
      analytics: 'विश्लेषण',
      orders: 'ऑर्डर',
      chatbot: 'AI सहायक',
      settings: 'सेटिंग्स',
      welcome: 'वापसी पर स्वागत है! यहाँ आपके व्यापार का अवलोकन है।',
      totalRevenue: 'कुल आय',
      totalOrders: 'कुल ऑर्डर',
      activeProducts: 'सक्रिय उत्पाद',
      conversionRate: 'रूपांतरण दर',
      searchProducts: 'उत्पाद या SKU खोजें...',
      addProduct: 'उत्पाद जोड़ें',
      viewDetails: 'विवरण देखें',
      speakToAssistant: 'सहायक से बात करें',
      listening: 'सुन रहा है...',
      processing: 'प्रसंस्करण...',
      darkStores: 'डार्क स्टोर',
      deliveryTime: 'डिलीवरी समय',
      orderStatus: 'ऑर्डर स्थिति',
    },
    bn: {
      dashboard: 'ড্যাশবোর্ড',
      products: 'পণ্য',
      analytics: 'বিশ্লেষণ',
      orders: 'অর্ডার',
      chatbot: 'AI সহায়ক',
      settings: 'সেটিংস',
      welcome: 'ফিরে আসার জন্য স্বাগতম! এখানে আপনার ব্যবসার সংক্ষিপ্ত বিবরণ।',
      totalRevenue: 'মোট আয়',
      totalOrders: 'মোট অর্ডার',
      activeProducts: 'সক্রিয় পণ্য',
      conversionRate: 'রূপান্তর হার',
      searchProducts: 'পণ্য বা SKU খুঁজুন...',
      addProduct: 'পণ্য যোগ করুন',
      viewDetails: 'বিস্তারিত দেখুন',
      speakToAssistant: 'সহায়কের সাথে কথা বলুন',
      listening: 'শুনছে...',
      processing: 'প্রক্রিয়াকরণ...',
      darkStores: 'ডার্ক স্টোর',
      deliveryTime: 'ডেলিভারি সময়',
      orderStatus: 'অর্ডার অবস্থা',
    },
    te: {
      dashboard: 'డాష్‌బోర్డ్',
      products: 'ఉత్పత్తులు',
      analytics: 'విశ్లేషణ',
      orders: 'ఆర్డర్లు',
      chatbot: 'AI సహాయకుడు',
      settings: 'సెట్టింగ్‌లు',
      welcome: 'తిరిగి రావడానికి స్వాగతం! ఇక్కడ మీ వ్యాపార అవలోకనం ఉంది.',
      totalRevenue: 'మొత్తం ఆదాయం',
      totalOrders: 'మొత్తం ఆర్డర్లు',
      activeProducts: 'క్రియాశీల ఉత్పత్తులు',
      conversionRate: 'మార్పిడి రేటు',
      searchProducts: 'ఉత్పత్తులు లేదా SKU వెతకండి...',
      addProduct: 'ఉత్పత్తిని జోడించండి',
      viewDetails: 'వివరాలు చూడండి',
      speakToAssistant: 'సహాయకుడితో మాట్లాడండి',
      listening: 'వింటోంది...',
      processing: 'ప్రాసెసింగ్...',
      darkStores: 'డార్క్ స్టోర్లు',
      deliveryTime: 'డెలివరీ సమయం',
      orderStatus: 'ఆర్డర్ స్థితి',
    },
    mr: {
      dashboard: 'डॅशबोर्ड',
      products: 'उत्पादने',
      analytics: 'विश्लेषण',
      orders: 'ऑर्डर',
      chatbot: 'AI सहाय्यक',
      settings: 'सेटिंग्ज',
      welcome: 'परत आल्याबद्दल स्वागत! येथे तुमच्या व्यवसायाचे विहंगावलोकन आहे.',
      totalRevenue: 'एकूण महसूल',
      totalOrders: 'एकूण ऑर्डर',
      activeProducts: 'सक्रिय उत्पादने',
      conversionRate: 'रूपांतरण दर',
      searchProducts: 'उत्पादने किंवा SKU शोधा...',
      addProduct: 'उत्पादन जोडा',
      viewDetails: 'तपशील पहा',
      speakToAssistant: 'सहाय्यकाशी बोला',
      listening: 'ऐकत आहे...',
      processing: 'प्रक्रिया करत आहे...',
      darkStores: 'डार्क स्टोअर्स',
      deliveryTime: 'डिलिव्हरी वेळ',
      orderStatus: 'ऑर्डर स्थिती',
    },
    ta: {
      dashboard: 'டாஷ்போர்டு',
      products: 'தயாரிப்புகள்',
      analytics: 'பகுப்பாய்வு',
      orders: 'ஆர்டர்கள்',
      chatbot: 'AI உதவியாளர்',
      settings: 'அமைப்புகள்',
      welcome: 'மீண்டும் வருக! இங்கே உங்கள் வணிக மேலோட்டம் உள்ளது.',
      totalRevenue: 'மொத்த வருமானம்',
      totalOrders: 'மொத்த ஆர்டர்கள்',
      activeProducts: 'செயலில் உள்ள தயாரிப்புகள்',
      conversionRate: 'மாற்று விகிதம்',
      searchProducts: 'தயாரிப்புகள் அல்லது SKU தேடுங்கள்...',
      addProduct: 'தயாரிப்பு சேர்க்கவும்',
      viewDetails: 'விவரங்களைப் பார்க்கவும்',
      speakToAssistant: 'உதவியாளருடன் பேசுங்கள்',
      listening: 'கேட்கிறது...',
      processing: 'செயலாக்கம்...',
      darkStores: 'டார்க் ஸ்டோர்கள்',
      deliveryTime: 'டெலிவரி நேரம்',
      orderStatus: 'ஆர்டர் நிலை',
    },
    gu: {
      dashboard: 'ડેશબોર્ડ',
      products: 'ઉત્પાદનો',
      analytics: 'વિશ્લેષણ',
      orders: 'ઓર્ડર',
      chatbot: 'AI સહાયક',
      settings: 'સેટિંગ્સ',
      welcome: 'પાછા આવવા બદલ સ્વાગત છે! અહીં તમારા વ્યવસાયની ઝાંખી છે.',
      totalRevenue: 'કુલ આવક',
      totalOrders: 'કુલ ઓર્ડર',
      activeProducts: 'સક્રિય ઉત્પાદનો',
      conversionRate: 'રૂપાંતરણ દર',
      searchProducts: 'ઉત્પાદનો અથવા SKU શોધો...',
      addProduct: 'ઉત્પાદન ઉમેરો',
      viewDetails: 'વિગતો જુઓ',
      speakToAssistant: 'સહાયક સાથે વાત કરો',
      listening: 'સાંભળી રહ્યું છે...',
      processing: 'પ્રક્રિયા કરી રહ્યું છે...',
      darkStores: 'ડાર્ક સ્ટોર્સ',
      deliveryTime: 'ડિલિવરી સમય',
      orderStatus: 'ઓર્ડર સ્થિતિ',
    },
    // add other languages (kn, ml, pa, or) below if needed ...
  };

  /* -------------------------------------------
     basic helpers
  ------------------------------------------- */
  translate(key, lang = 'en') {
    return (
      this.translations[lang]?.[key] ||
      this.translations.en[key] ||
      key
    );
  }

  getCurrentLanguageTranslations(lang = 'en') {
    return this.translations[lang] || this.translations.en;
  }

  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', native: 'English' },
      { code: 'hi', name: 'Hindi', native: 'हिंदी' },
      { code: 'bn', name: 'Bengali', native: 'বাংলা' },
      { code: 'te', name: 'Telugu', native: 'తెలుగు' },
      { code: 'mr', name: 'Marathi', native: 'मराठी' },
      { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
      { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
      { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
      { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
      { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
      { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    ];
  }
}

/* -------------------------------------------
   export singleton
------------------------------------------- */
export const translationService = new TranslationService();
export default TranslationService;
