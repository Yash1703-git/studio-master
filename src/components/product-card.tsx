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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { t, p } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const handleBooking = () => {
    toast({
      title: t('bookingConfirmedToastTitle'),
      description: t('bookingConfirmedToastDescription', {
        quantity: quantity,
        productName: p(product, 'name'),
      }),
    });
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="relative h-48">
          <Image
            src={product.imageUrl}
            alt={p(product, 'name')}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={product.aiHint}
          />
        </div>
        <CardTitle className="pt-4">{p(product, 'name')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 h-20 overflow-hidden">{p(product, 'description')}</p>
        <p className="font-bold text-lg mt-2">₹{product.price}</p>
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
                <Label htmlFor="quantity" className="text-right">
                  {t('quantityLabel')}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
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
