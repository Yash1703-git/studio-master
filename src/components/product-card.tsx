"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useLanguage } from "@/context/language-context";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { t, p } = useLanguage();

  const handleRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerName = formData.get('customerName');
    const quantity = formData.get('quantity');

    toast({
      title: t('requestSubmittedToastTitle'),
      description: t('requestSubmittedToastDescription', {
        customerName: customerName as string,
        quantity: quantity as string,
        productName: p(product, 'name')
      }),
    });
    setOpen(false);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Badge className="absolute top-3 right-3">{product.type}</Badge>
        <div className="aspect-video relative">
          <Image
            src={product.imageUrl}
            alt={p(product, 'name')}
            fill
            className="object-cover"
            data-ai-hint={product.aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-lexend mb-2">{p(product, 'name')}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{p(product, 'description')}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center mt-auto bg-secondary/30">
        <p className="text-xl font-bold font-lexend text-foreground">${product.price.toFixed(2)}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
             <Button>{t('request')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('request')} {p(product, 'name')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRequest}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerName" className="text-right">
                    {t('nameLabel')}
                  </Label>
                  <Input id="customerName" name="customerName" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    {t('quantityLabel')}
                  </Label>
                  <Input id="quantity" name="quantity" type="number" required defaultValue="1" min="1" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    {t('cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit">{t('submitRequest')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
