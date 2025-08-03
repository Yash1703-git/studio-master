export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  aiHint: string;
}

export interface Booking {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export interface ProductRequest {
  id: number;
  productName: string;
  description: string;
  dateRequested: string;
  status: "Pending" | "Sourcing" | "Available" | "Rejected";
}
