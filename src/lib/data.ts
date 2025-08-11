import type { Product, CustomerRequest, SpecialRequest } from "@/types";

export let products: Product[] = [
    {
      id: "1",
      name: "Organic Cow Milk",
      price: 3.5,
      description: "Fresh, pure organic cow milk from grass-fed cows. Rich in calcium and vitamins.",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "cow milk",
      type: "Milk",
      stock: 100,
      translations: {
        mr: {
          name: "सेंद्रिय गायीचे दूध",
          description: "गवत खाणाऱ्या गायींपासून मिळणारे ताजे, शुद्ध सेंद्रिय गायीचे दूध. कॅल्शियम आणि जीवनसत्त्वांनी समृद्ध."
        }
      }
    },
    {
      id: "2",
      name: "Artisanal Goat Cheese",
      price: 8.0,
      description: "Handcrafted goat cheese with a tangy flavor and creamy texture. Perfect for salads and cheese boards.",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "goat cheese",
      type: "Cheese",
      stock: 50,
      translations: {
        mr: {
          name: "कारागीर बकरी चीज",
          description: "आंबट चव आणि मलईदार पोत असलेले हाताने बनवलेले बकरी चीज. सॅलड आणि चीज बोर्डसाठी योग्य."
        }
      }
    },
    {
      id: "3",
      name: "Sheep's Milk Yogurt",
      price: 5.0,
      description: "Thick and creamy yogurt made from sheep's milk. A great source of protein and probiotics.",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "yogurt",
      type: "Yogurt",
      stock: 75,
      translations: {
        mr: {
          name: "मेंढीच्या दुधाचे दही",
          description: "मेंढीच्या दुधापासून बनवलेले घट्ट आणि मलईदार दही. प्रथिने आणि प्रोबायोटिक्सचा उत्तम स्रोत."
        }
      }
    },
    {
      id: "4",
      name: "Buffalo Milk Butter",
      price: 6.5,
      description: "Rich and flavorful butter made from fresh buffalo milk. Ideal for cooking and baking.",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "butter",
      type: "Butter",
      stock: 80,
      translations: {
        mr: {
          name: "म्हशीच्या दुधाचे लोणी",
          description: "ताज्या म्हशीच्या दुधापासून बनवलेले समृद्ध आणि चवदार लोणी. स्वयंपाक आणि बेकिंगसाठी आदर्श."
        }
      }
    }
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate async call
  return new Promise(resolve => setTimeout(() => resolve(products), 100));
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const product = products.find(p => p.id === id) || null;
    return new Promise(resolve => setTimeout(() => resolve(product), 100));
}

export const addProduct = async (product: Omit<Product, 'id' | 'translations'>): Promise<Product> => {
  const newProduct: Product = {
    ...product,
    id: (Math.random() + 1).toString(36).substring(7), // simple unique id
    translations: {}
  };
  products.push(newProduct);
  return new Promise(resolve => setTimeout(() => resolve(newProduct), 100));
}

export const updateProduct = async (product: Product): Promise<Product> => {
  products = products.map(p => p.id === product.id ? product : p);
  return new Promise(resolve => setTimeout(() => resolve(product), 100));
}

export const deleteProduct = async (productId: string): Promise<void> => {
  products = products.filter(p => p.id !== productId);
  return new Promise(resolve => setTimeout(() => resolve(), 100));
}


export let customerRequests: CustomerRequest[] = [
  {
    id: 101,
    customerName: "Alice's Farm",
    productName: "Organic Cow Milk",
    quantity: 50,
    status: "Fulfilled",
    date: "2024-07-28",
    deliveryType: "Home Delivery",
    address: "123 Green Valley, Farmville",
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
    deliveryType: "Store Pickup",
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
    deliveryType: "Store Pickup",
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
    deliveryType: "Home Delivery",
    address: "123 Green Valley, Farmville",
    translations: {
      mr: {
        productName: "म्हशीच्या दुधाचे लोणी"
      }
    }
  },
];

export const getCustomerRequests = async (): Promise<CustomerRequest[]> => {
    return new Promise(resolve => setTimeout(() => resolve(customerRequests), 100));
}

export const addCustomerRequest = async (request: Omit<CustomerRequest, 'id' | 'status' | 'date' | 'translations'>): Promise<CustomerRequest> => {
  const newRequest: CustomerRequest = {
    ...request,
    id: Date.now(),
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
    translations: {}
  };
  customerRequests.unshift(newRequest);
  return new Promise(resolve => setTimeout(() => resolve(newRequest), 100));
}

export let specialRequests: SpecialRequest[] = [
  {
    id: 201,
    customerName: "David's Dairy",
    requestDetails: "Camel Milk",
    status: "Pending",
    date: "2024-07-29"
  },
  {
    id: 202,
    customerName: "Eva's Creamery",
    requestDetails: "A2 Ghee (500g jars)",
    status: "Pending",
    date: "2024-07-28"
  },
  {
    id: 203,
    customerName: "Frank's Farm",
    requestDetails: "Bulk order of unsalted butter",
    status: "Pending",
    date: "2024-07-27"
  }
];

export const getSpecialRequests = async (): Promise<SpecialRequest[]> => {
  return new Promise(resolve => setTimeout(() => resolve(specialRequests), 100));
}

export const addSpecialRequest = async (request: SpecialRequest): Promise<SpecialRequest> => {
  specialRequests.push(request);
  return new Promise(resolve => setTimeout(() => resolve(request), 100));
}
