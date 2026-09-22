const menuData = {
  categories: [
    { id: "welcome", name: "أهلاً وسهلاً", emoji: "🍽️", type: "special" },
    { id: "appetizers", name: "المقبلات", emoji: "🥗", type: "menu" },
    { id: "grills", name: "المشاوي", emoji: "🍖", type: "menu" },
    { id: "main", name: "الوجبات الرئيسية", emoji: "🍛", type: "menu" },
    { id: "shawarma", name: "الشاورما", emoji: "🌯", type: "menu" },
    { id: "burgers", name: "البرغر", emoji: "🍔", type: "menu" },
    { id: "desserts", name: "الحلويات", emoji: "🍰", type: "menu" },
    { id: "drinks", name: "المشروبات", emoji: "☕", type: "menu" },
    { id: "special", name: "الأطباق الخاصة", emoji: "⭐", type: "special" },
    { id: "thankyou", name: "شكراً لزيارتكم", emoji: "❤️", type: "special" }
  ],
  items: [
    {
      name: "حمص بالطحينة",
      description: "حمص طازج مخفوق مع طحينة وزيت زيتون وليمون",
      price: "١٨ ر.س",
      image: "images/food/hummus.png",
      category: "appetizers",
      emoji: "🫘"
    },
    {
      name: "فتوش شامي",
      description: "سلطة شامية تقليدية مع خبز مقرمش وصلصة رمان",
      price: "١٥ ر.س",
      image: "images/food/fattoush.png",
      category: "appetizers",
      emoji: "🥗"
    },
    {
      name: "ورق عنب",
      description: "ورق عنب محشي بالأرز واللحم المفروم مع البهارات العربية",
      price: "٢٢ ر.س",
      image: "images/food/grape-leaves.png",
      category: "appetizers",
      emoji: "🍇"
    },
    {
      name: "كبسة لحم",
      description: "أرز بسمتي مع لحم غنم طري وبهارات خاصة مقدمة في جلدان",
      price: "٥٥ ر.س",
      image: "images/food/kabsa.png",
      category: "main",
      emoji: "🍛"
    },
    {
      name: "مندي دجاج",
      description: "أرز مندي بطعم الزعفران مع دجاج مشوي على الفحم",
      price: "٤٥ ر.س",
      image: "images/food/mandi.png",
      category: "main",
      emoji: "🍗"
    },
    {
      name: "مقلوبة",
      description: "طبق فلسطيني تقليدي مع الباطنجر والحمص والأرز",
      price: "٤٨ ر.س",
      image: "images/food/maklouba.png",
      category: "main",
      emoji: "🥘"
    },
    {
      name: "مشاوي مشكلة",
      description: "تشكيلة من اللحم والدجاج والكفتة مشوية على الفحم مع الخضار",
      price: "٨٥ ر.س",
      image: "images/food/mixed-grill.png",
      category: "grills",
      emoji: "🍖"
    },
    {
      name: "شيش طاووق",
      description: "صدور دجاج متبلة بالتوابل العربية مشوية على سيخ",
      price: "٣٨ ر.س",
      image: "images/food/shish-tawook.png",
      category: "grills",
      emoji: "🍢"
    },
    {
      name: "كباب لحم",
      description: "لحم بقري مفروم مع البقدونس والبصل مشوي على الفحم",
      price: "٤٢ ر.س",
      image: "images/food/kebab.png",
      category: "grills",
      emoji: "🥩"
    },
    {
      name: "شاورما لحم",
      description: "شاورما لحم بقري مع الثومية والخضار الطازجة في خبز عربي",
      price: "٢٥ ر.س",
      image: "images/food/shawarma.png",
      category: "shawarma",
      emoji: "🌯"
    },
    {
      name: "شاورما دجاج",
      description: "شاورما دجاج مع صلصة الثوم والخضار الطازجة",
      price: "٢٢ ر.س",
      image: "images/food/shawarma-chicken.png",
      category: "shawarma",
      emoji: "🌯"
    },
    {
      name: "ساندويش شاورما دبل جماني",
      description: "شاورما دجاج دبل مع صلصة جماني الخاصة والخضار الطازجة في خبز طازج",
      price: "مجاني",
      image: "images/food/shawarma.png",
      category: "shawarma",
      emoji: "🌯"
    },
    {
      name: "برغر لحم",
      description: "برغر لحم بقري طازج مع جبنة شيدر وخضار مقرمشة",
      price: "٣٠ ر.س",
      image: "images/food/burger.png",
      category: "burgers",
      emoji: "🍔"
    },
    {
      name: "برغر دجاج",
      description: "برغر صدور دجاج مقرمش مع صلصة خاصة وخضار طازجة",
      price: "٢٨ ر.س",
      image: "images/food/chicken-burger.png",
      category: "burgers",
      emoji: "🍔"
    },
    {
      name: "كنافة نابلسية",
      description: "كنافة بالجبنة مع قطر الزهر مقدمة ساخنة",
      price: "٢٥ ر.س",
      image: "images/food/kunafa.png",
      category: "desserts",
      emoji: "🍮"
    },
    {
      name: "بقلاوة",
      description: "تشكيلة من البقلاوة بالفستق والجوز والكاجو",
      price: "٣٠ ر.س",
      image: "images/food/baklava.png",
      category: "desserts",
      emoji: "🍯"
    },
    {
      name: "أم علي",
      description: "حلوى مصرية تقليدية بالحليب والمكسرات والزبيب",
      price: "٢٠ ر.س",
      image: "images/food/om-ali.png",
      category: "desserts",
      emoji: "🥣"
    },
    {
      name: "شاي أحمر",
      description: "شاي أحمر تركي مع نعناع وسكر",
      price: "٨ ر.س",
      image: "images/food/tea.png",
      category: "drinks",
      emoji: "☕"
    },
    {
      name: "قهوة عربية",
      description: "قهوة عربية أصيلة مع التمر",
      price: "١٢ ر.س",
      image: "images/food/arabic-coffee.png",
      category: "drinks",
      emoji: "🫖"
    }
  ]
};

const translations = {
  ar: {
    heroTitle: "مطعم خال",
    heroSubtitle: "",
    exploreMenu: "استكشف القائمة",
    orderNow: "اطلب الآن",
    contactUs: "تواصل معنا",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    nextPage: "التالي",
    prevPage: "السابق",
    callNow: "اتصل الآن",
    orderAndDelivery: "للطلب والتوصيل",
    workingHours: "ساعات العمل",
    openNow: "مفتوح الآن",
    closedNow: "مغلق الآن",
    ourStory: "قصتنا",
    gallery: "المعرض",
    contact: "تواصل معنا",
    visitWebsite: "زيارة موقعنا",
    copyrights: "جميع الحقوق محفوظة",
    welcome: "أهلاً وسهلاً بكم في مطعم خال",
    thankYou: "شكراً لزيارتكم",
    thankYouText: "نتطلع لزيارتكم مرة أخرى",
    tableOfContents: "فهرس القائمة",
    forOrderAndDelivery: "للطلب والتوصيل",
    address: "العنوان",
    poweredBy: "صُنع بـ ❤️"
  }
};
