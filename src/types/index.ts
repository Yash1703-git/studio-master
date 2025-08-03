export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  aiHint: string;
}

export interface CustomerRequest {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  status: "Pending" | "Fulfilled" | "Cancelled";
  date: string;
}
