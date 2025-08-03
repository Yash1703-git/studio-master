"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleOrder = () => {
    toast({
      title: "Order Placed!",
      description: `You've successfully ordered ${product.name}.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center mt-auto">
        <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
        <Button onClick={handleOrder}>Order Now</Button>
      </CardFooter>
    </Card>
  );
}
