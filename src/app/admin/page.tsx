"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/context/language-context";
import { getProducts, getCustomerRequests, addProduct, updateProduct, deleteProduct, getSpecialRequests } from "@/lib/data";
import type { Product, CustomerRequest, SpecialRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { PlusCircle, Edit, Trash2, Package } from "lucide-react";

export default function AdminPage() {
  const { t, p } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [specialRequests, setSpecialRequests] = useState<SpecialRequest[]>([]);

  // State for Add New Product
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "new product",
    type: "Milk",
    stock: 100,
  });

  // State for Update Product Price
  const [updatePriceData, setUpdatePriceData] = useState<{productId: string, newPrice: number | ''}>({
    productId: "",
    newPrice: 0,
  });
  
  // State for Delete Product
  const [deleteProductId, setDeleteProductId] = useState("");


  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const fetchProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  const fetchCustomerRequests = async () => {
    const requestsData = await getCustomerRequests();
    setRequests(requestsData);
  }
  
  const fetchSpecialRequests = async () => {
    const requestsData = await getSpecialRequests();
    setSpecialRequests(requestsData);
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomerRequests();
    fetchSpecialRequests();

    const intervalId = setInterval(() => {
      fetchCustomerRequests();
      fetchSpecialRequests();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  
  const handleAddNewProduct = async () => {
    if (!newProduct.name || !newProduct.description) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please fill out all fields." });
      return;
    }
    await addProduct(newProduct);
    toast({ title: "Product Added", description: `${newProduct.name} has been added.` });
    await fetchProducts();
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "new product",
      type: "Milk",
      stock: 100,
    });
  };

  const handleUpdatePrice = async () => {
    if (!updatePriceData.productId || (updatePriceData.newPrice !== '' && updatePriceData.newPrice <= 0)) {
      toast({ variant: "destructive", title: "Invalid Data", description: "Please select a product and enter a valid price." });
      return;
    }
    const productToUpdate = products.find(p => p.id === updatePriceData.productId);
    if (productToUpdate) {
      await updateProduct({ ...productToUpdate, price: Number(updatePriceData.newPrice) });
      toast({ title: "Price Updated", description: `${productToUpdate.name}'s price has been updated.` });
      await fetchProducts();
      setUpdatePriceData({ productId: "", newPrice: 0 });
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) {
       toast({ variant: "destructive", title: "No Product Selected", description: "Please select a product to delete." });
      return;
    }
    await deleteProduct(deleteProductId);
    toast({ title: "Product Deleted", description: "The product has been removed." });
    await fetchProducts();
    setDeleteProductId("");
  };
  
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage products, requests, and bookings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Add New Product Card */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="e.g., Premium Alfalfa Hay" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>
              </div>
              <div>
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea id="productDescription" placeholder="Describe the product and its benefits..." value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}/>
              </div>
               <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value === '' ? 0 : Number(e.target.value) })} />
              </div>
               <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" placeholder="https://placehold.co/600x400.png" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}/>
              </div>
              <Button onClick={handleAddNewProduct}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </CardContent>
          </Card>

          {/* Update Product Price Card */}
          <Card>
            <CardHeader>
              <CardTitle>Update Product Price</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product</Label>
                <Select value={updatePriceData.productId} onValueChange={(value) => setUpdatePriceData({ ...updatePriceData, productId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product to update" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>{p(product, 'name')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="newPrice">New Price</Label>
                <Input id="newPrice" type="number" value={updatePriceData.newPrice} onChange={(e) => setUpdatePriceData({ ...updatePriceData, newPrice: e.target.value === '' ? '' : Number(e.target.value) })} />
              </div>
              <Button onClick={handleUpdatePrice}>
                <Edit className="mr-2 h-4 w-4" /> Update Price
              </Button>
            </CardContent>
          </Card>
          
          {/* Delete Product Card */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Delete Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label>Product to Delete</Label>
                <Select value={deleteProductId} onValueChange={setDeleteProductId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product to delete" />
                  </SelectTrigger>
                  <SelectContent>
                     {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>{p(product, 'name')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Product
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody suppressHydrationWarning>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.customerName}</TableCell>
                      <TableCell>{p(request, 'productName')}</TableCell>
                      <TableCell>{request.deliveryType}</TableCell>
                      <TableCell className="text-right">{request.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Customer Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {specialRequests.length > 0 ? (
                    specialRequests.map(request => (
                        <div key={request.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background">
                            <Package className="h-6 w-6 text-muted-foreground" />
                            <div className="flex-grow">
                                <p className="font-medium">{request.requestDetails}</p>
                                <p className="text-sm text-muted-foreground">From: {request.customerName}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-4">No special requests yet.</p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
