"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { t, p } = useLanguage();
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [customerName, setCustomerName] = useState("");
  const [open, setOpen] = useState(false);

  const handleBooking = () => {
    // In a real app, you would send this data to a server
    console.log({
      customerName,
      productId: product.id,
      productName: p(product, 'name'),
      quantity,
    });
    toast({
      title: t('bookingConfirmedToastTitle'),
      description: t('bookingConfirmedToastDescription', {
        quantity: quantity,
        productName: p(product, 'name'),
      }),
    });
    setOpen(false);
    setCustomerName("");
    setQuantity(1);
  };

  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl}
            alt={p(product, 'name')}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={product.aiHint}
          />
        </div>
        <div className="p-6 pb-0">
          <CardTitle>{p(product, 'name')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground h-20 overflow-hidden">{p(product, 'description')}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-lg">₹{product.price}</p>
          <Badge variant="outline">Stock: {product.stock}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">{t('book')}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('book')} {p(product, 'name')}</DialogTitle>
              <DialogDescription>
                {t('selectQuantityPrompt')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t('nameLabel')}
                </Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="col-span-3"
                  placeholder="Your name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  {t('quantityLabel')}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                  className="col-span-3"
                  min="1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleBooking}>{t('confirmBooking')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
