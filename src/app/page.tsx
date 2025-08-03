"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { FormEvent } from "react";

export default function Home() {
  const { toast } = useToast();

  const handleRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productName = formData.get('productName');
    toast({
      title: "Request Submitted",
      description: `Thank you for requesting ${productName}. We'll notify you when it's available.`,
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Freshness Delivered, Tailored for You
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the finest dairy products. Get smart, AI-powered recommendations for your farm's needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href="#products"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Browse Products
                </a>
              </div>
            </div>
            <img
              src="https://placehold.co/600x400.png"
              data-ai-hint="dairy farm"
              width="600"
              height="400"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section id="products" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-center">Our Products</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our range of high-quality dairy products, from fresh milk to artisanal cheeses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Can't Find What You're Looking For?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Let us know what product you need, and we'll do our best to source it for you.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
             <Card className="w-full">
              <CardHeader>
                <CardTitle>Request a Product</CardTitle>
              </CardHeader>
              <form onSubmit={handleRequestSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" name="productName" placeholder="e.g., 'Organic A2 Ghee'" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" name="description" placeholder="Any specific details?" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Request</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
