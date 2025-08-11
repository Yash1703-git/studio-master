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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { getProducts, customerRequests } from "@/lib/data";
import type { Product, CustomerRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function AdminPage() {
  const { t, p } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [requests] = useState<CustomerRequest[]>(customerRequests);
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "new product",
    type: "Milk",
    stock: 100,
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setIsEditing(true);
      setCurrentProduct(product);
    } else {
      setIsEditing(false);
      setCurrentProduct({
        name: "",
        price: 0,
        description: "",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "new product",
        type: "Milk",
        stock: 100,
      });
    }
    setOpen(true);
  };

  const handleSaveProduct = () => {
    if (isEditing) {
      // Update logic
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct as Product : p));
      toast({ title: "Product Updated", description: `${currentProduct.name} has been updated.` });
    } else {
      // Add new logic
      const newProduct: Product = {
        ...currentProduct,
        id: (products.length + 1).toString(),
        translations: {}
      } as Product;
      setProducts([...products, newProduct]);
      toast({ title: "Product Added", description: `${newProduct.name} has been added.` });
    }
    setOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({ title: "Product Deleted", description: "The product has been removed." });
  };
  
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminDashboard')}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('addNewProduct')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Product' : t('addNewProduct')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">{t('nameLabel')}</Label>
                <Input id="name" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">{t('priceLabel')}</Label>
                <Input id="price" value={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })} className="col-span-3" type="number" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">{t('descriptionLabel')}</Label>
                <Textarea id="description" value={currentProduct.description} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                <Button variant="outline">{t('cancel')}</Button>
              </DialogClose>
              <Button type="submit" onClick={handleSaveProduct}>{isEditing ? 'Save Changes' : t('addProduct')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Management Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('products')}</CardTitle>
          <CardDescription>Manage your store's products.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{p(product, 'name')}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('customerBookings')}</CardTitle>
          <CardDescription>{t('customerBookingsSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('product')}</TableHead>
                <TableHead>{t('quantity')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.customerName}</TableCell>
                  <TableCell>{p(request, 'productName')}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Fulfilled' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'}>
                      {t(request.status.toLowerCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
