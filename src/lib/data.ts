import type { Product, CustomerRequest, ProductTranslations } from "@/types";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";


export const getProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, 'products');
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  return productList;
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
        return null;
    }
}


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
