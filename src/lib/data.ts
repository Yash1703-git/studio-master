import type { Product, CustomerRequest, ProductTranslations } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Cow Milk",
    price: 3.99,
    description: "Fresh, pasteurized organic cow's milk, rich in calcium and vitamin D.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "milk cow",
    translations: {
      mr: {
        name: "सेंद्रिय गायीचे दूध",
        description: "ताजे, पाश्चराइज्ड सेंद्रिय गायीचे दूध, कॅल्शियम आणि व्हिटॅमिन डीने समृद्ध.",
      }
    }
  },
  {
    id: 2,
    name: "Artisanal Goat Cheese",
    price: 8.50,
    description: "Creamy and tangy goat cheese, handcrafted by local artisans.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "goat cheese",
    translations: {
      mr: {
        name: "कारागीर बकरी चीज",
        description: "स्थानिक कारागिरांनी हाताने बनवलेले मलईदार आणि तिखट बकरी चीज.",
      }
    }
  },
  {
    id: 3,
    name: "Sheep's Milk Yogurt",
    price: 5.25,
    description: "Thick and nutritious yogurt made from 100% sheep's milk.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "sheep yogurt",
    translations: {
      mr: {
        name: "मेंढीच्या दुधाचे दही",
        description: "१००% मेंढीच्या दुधापासून बनवलेले जाड आणि पौष्टिक दही.",
      }
    }
  },
  {
    id: 4,
    name: "Buffalo Milk Butter",
    price: 6.00,
    description: "Rich and flavorful butter made from high-fat buffalo milk.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "buffalo butter",
    translations: {
      mr: {
        name: "म्हशीच्या दुधाचे लोणी",
        description: "उच्च चरबीयुक्त म्हशीच्या दुधापासून बनवलेले समृद्ध आणि चवदार लोणी.",
      }
    }
  },
  {
    id: 5,
    name: "Probiotic Kefir",
    price: 4.75,
    description: "A fermented milk drink packed with beneficial probiotics for gut health.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "kefir drink",
    translations: {
      mr: {
        name: "प्रोबायोटिक केफिर",
        description: "आतड्यांच्या आरोग्यासाठी फायदेशीर प्रोबायोटिक्सने भरलेले एक आंबवलेले दुधाचे पेय.",
      }
    }
  },
  {
    id: 6,
    name: "Aged Cheddar",
    price: 12.00,
    description: "A sharp and crumbly cheddar cheese, aged for over 12 months.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "cheddar cheese",
    translations: {
      mr: {
        name: "जुने चेडर",
        description: "एक तीक्ष्ण आणि ठिसूळ चेडर चीज, १२ महिन्यांपेक्षा जास्त जुने.",
      }
    }
  },
  {
    id: 7,
    name: "Skim Milk",
    price: 3.50,
    description: "Low-fat skim milk for a lighter, healthier option.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "milk carton",
    translations: {
      mr: {
        name: "स्किम्ड दूध",
        description: "कमी चरबीयुक्त स्किम्ड दूध, हलका आणि आरोग्यदायी पर्याय.",
      }
    }
  },
  {
    id: 8,
    name: "Heavy Cream",
    price: 4.20,
    description: "High-fat cream perfect for whipping or adding richness to sauces.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "cream bottle",
    translations: {
      mr: {
        name: "हेवी क्रीम",
        description: "सॉसमध्ये व्हीपिंग करण्यासाठी किंवा समृद्धी वाढवण्यासाठी योग्य उच्च चरबीयुक्त क्रीम.",
      }
    }
  },
];

const customerRequestsTranslations: ProductTranslations = {
  "Organic Cow Milk": { mr: "सेंद्रिय गायीचे दूध" },
  "Artisanal Goat Cheese": { mr: "कारागीर बकरी चीज" },
  "Sheep's Milk Yogurt": { mr: "मेंढीच्या दुधाचे दही" },
  "Buffalo Milk Butter": { mr: "म्हशीच्या दुधाचे लोणी" },
};

export const customerRequests: CustomerRequest[] = [
  {
    id: 101,
    customerName: "Alice's Farm",
    productName: "Organic Cow Milk",
    quantity: 50,
    status: "Fulfilled",
    date: "2024-07-28",
    translations: {
      mr: {
        productName: "सेंद्रिय गायीचे दूध"
      }
    }
  },
  {
    id: 102,
    customerName: "Bob's Barn",
    productName: "Artisanal Goat Cheese",
    quantity: 20,
    status: "Pending",
    date: "2024-07-27",
     translations: {
      mr: {
        productName: "कारागीर बकरी चीज"
      }
    }
  },
  {
    id: 103,
    customerName: "Charlie's Ranch",
    productName: "Sheep's Milk Yogurt",
    quantity: 30,
    status: "Fulfilled",
    date: "2024-07-26",
    translations: {
      mr: {
        productName: "मेंढीच्या दुधाचे दही"
      }
    }
  },
    {
    id: 104,
    customerName: "Alice's Farm",
    productName: "Buffalo Milk Butter",
    quantity: 15,
    status: "Pending",
    date: "2024-07-25",
    translations: {
      mr: {
        productName: "म्हशीच्या दुधाचे लोणी"
      }
    }
  },
];
