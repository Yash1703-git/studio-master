
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  aiHint: string;
  type: string;
  stock: number;
  translations: {
    [key: string]: {
      name: string;
      description: string;
    }
  }
}

export interface CustomerRequest {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  status: "Pending" | "Fulfilled" | "Cancelled";
  date: string;
  translations: {
    [key: string]: {
      productName: string;
    }
  }
}

export type ProductTranslations = {
  [key: string]: {
    [key: string]: string;
  }
}
