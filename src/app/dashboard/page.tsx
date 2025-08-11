"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { customerRequests, getProducts } from "@/lib/data";
import type { Product, CustomerRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { t, p } = useLanguage();
  const { toast } = useToast();
  const [requests, setRequests] = useState<CustomerRequest[]>(customerRequests);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "new product",
    type: "Milk",
    stock: 100,
  });

  const handleAddProduct = async () => {
    // In a real app, you would have an API call here to add the product
    console.log("New Product Added:", newProduct);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to the store.`,
    });
    setOpen(false); // Close the dialog
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminDashboard')}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>{t('addNewProduct')}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('addNewProduct')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t('nameLabel')}
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  {t('priceLabel')}
                </Label>
                <Input
                  id="price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  {t('descriptionLabel')}
                </Label>
                <Input
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct}>{t('addProduct')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('customerBookings')}</CardTitle>
          <CardDescription>
            {t('customerBookingsSubtitle')}
          </CardDescription>
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
                    <Badge variant={request.status === 'Fulfilled' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'} >
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
