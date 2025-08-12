"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/context/language-context";
import type { Product, SpecialRequest } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, addSpecialRequest } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Send } from "lucide-react";
import { useNotifications } from "@/context/notification-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { t, p } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addCustomerNotification, addAdminNotification } = useNotifications();
  const [requestDetails, setRequestDetails] = useState({ name: "", details: "" });
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const previousProductIds = new Set(products.map(p => p.id));
      const productsData = await getProducts();
      
      if (previousProductIds.size > 0) {
        productsData.forEach(p => {
          if (!previousProductIds.has(p.id)) {
            addCustomerNotification();
          }
        });
      }

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  }, [products, addCustomerNotification]);
  
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch products when window gets focus to see updates from admin
  useEffect(() => {
    const handleFocus = () => {
      fetchProducts();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchProducts]);

  const handleSpecialRequest = async () => {
    if (!requestDetails.name || !requestDetails.details) {
      toast({ variant: "destructive", title: t('toastMissingFieldsTitle'), description: t('toastMissingFieldsDescription') });
      return;
    }
    const newRequest: SpecialRequest = {
      id: Date.now(),
      customerName: requestDetails.name,
      requestDetails: requestDetails.details,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    await addSpecialRequest(newRequest);
    addAdminNotification();
    toast({ title: t('toastRequestSentTitle'), description: t('toastRequestSentDescription') });
    setRequestDetails({ name: "", details: "" });
  };

  const filteredProducts = products.filter((product) =>
    p(product, 'name').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-8 text-center">{t('ourProducts')}</h1>
      
      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('searchProductsPlaceholder')}
          className="pl-8 border-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))
        ) : (
          <>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>

      <div className="mt-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t('needSomethingElseTitle')}</CardTitle>
            <CardDescription>{t('needSomethingElseDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerName">{t('yourNameLabel')}</Label>
              <Input id="customerName" placeholder={t('yourNamePlaceholder')} value={requestDetails.name} onChange={(e) => setRequestDetails({ ...requestDetails, name: e.target.value })}/>
            </div>
            <div>
              <Label htmlFor="requestDetails">{t('productRequestLabel')}</Label>
              <Textarea id="requestDetails" placeholder={t('productRequestPlaceholder')} value={requestDetails.details} onChange={(e) => setRequestDetails({ ...requestDetails, details: e.target.value })}/>
            </div>
            <Button onClick={handleSpecialRequest} className="w-full">
              <Send className="mr-2 h-4 w-4" /> {t('sendRequest')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
