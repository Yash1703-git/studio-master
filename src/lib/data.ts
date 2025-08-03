import type { Product, Booking, ProductRequest } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Cow Milk",
    price: 3.99,
    description: "Fresh, pasteurized organic cow's milk, rich in calcium and vitamin D.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "milk cow",
  },
  {
    id: 2,
    name: "Artisanal Goat Cheese",
    price: 8.50,
    description: "Creamy and tangy goat cheese, handcrafted by local artisans.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "goat cheese",
  },
  {
    id: 3,
    name: "Sheep's Milk Yogurt",
    price: 5.25,
    description: "Thick and nutritious yogurt made from 100% sheep's milk.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "sheep yogurt",
  },
  {
    id: 4,
    name: "Buffalo Milk Butter",
    price: 6.00,
    description: "Rich and flavorful butter made from high-fat buffalo milk.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "buffalo butter",
  },
  {
    id: 5,
    name: "Probiotic Kefir",
    price: 4.75,
    description: "A fermented milk drink packed with beneficial probiotics for gut health.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "kefir drink",
  },
  {
    id: 6,
    name: "Aged Cheddar",
    price: 12.00,
    description: "A sharp and crumbly cheddar cheese, aged for over 12 months.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "cheddar cheese",
  },
  {
    id: 7,
    name: "Skim Milk",
    price: 3.50,
    description: "Low-fat skim milk for a lighter, healthier option.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "milk carton",
  },
  {
    id: 8,
    name: "Heavy Cream",
    price: 4.20,
    description: "High-fat cream perfect for whipping or adding richness to sauces.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "cream bottle",
  },
];

export const bookings: Booking[] = [
  {
    id: 101,
    customerName: "Alice's Farm",
    productName: "Organic Cow Milk",
    quantity: 50,
    totalPrice: 199.50,
    status: "Delivered",
  },
  {
    id: 102,
    customerName: "Bob's Barn",
    productName: "Artisanal Goat Cheese",
    quantity: 20,
    totalPrice: 170.00,
    status: "Processing",
  },
  {
    id: 103,
    customerName: "Charlie's Ranch",
    productName: "Sheep's Milk Yogurt",
    quantity: 30,
    totalPrice: 157.50,
    status: "Delivered",
  },
    {
    id: 104,
    customerName: "Alice's Farm",
    productName: "Buffalo Milk Butter",
    quantity: 15,
    totalPrice: 90.00,
    status: "Shipped",
  },
];

export const productRequests: ProductRequest[] = [
  {
    id: 1,
    productName: "Organic A2 Ghee",
    description: "Requested by multiple customers for its health benefits.",
    dateRequested: "2024-05-15",
    status: "Pending",
  },
  {
    id: 2,
    productName: "Lactose-Free Milk",
    description: "For customers with lactose intolerance.",
    dateRequested: "2024-05-20",
    status: "Sourcing",
  },
   {
    id: 3,
    productName: "Blue Cheese",
    description: "",
    dateRequested: "2024-05-28",
    status: "Pending",
  },
];
