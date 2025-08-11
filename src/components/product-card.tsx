"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { t, p } = useLanguage();

  const handleRequest = () => {
    toast({
      title: t('requestSubmittedToastTitle'),
      description: `Your request for ${p(product, 'name')} has been noted.`,
    });
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
        <p className="font-bold text-lg mt-2">${product.price}</p>
      </CardContent>
      <CardFooter>
         <Button className="w-full" onClick={handleRequest}>{t('request')}</Button>
      </CardFooter>
    </Card>
  );
}
