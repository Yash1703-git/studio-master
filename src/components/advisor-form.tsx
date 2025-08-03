"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/data";
import {
  getProductMixtureRecommendation,
  ProductMixtureRecommendationOutput,
} from "@/ai/flows/product-mixture-recommendation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  animalType: z.string().min(1, "Please select an animal type."),
  animalAge: z.coerce.number().min(1, "Age must be at least 1 month.").max(240, "Age seems too high."),
  animalHealth: z.string().min(1, "Please select a health status."),
});

export function AdvisorForm() {
  const [recommendation, setRecommendation] =
    useState<ProductMixtureRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalType: "",
      animalAge: 12,
      animalHealth: "healthy",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    const availableProducts = products
      .map((p) => `${p.name}: ${p.description}`)
      .join("\n");

    try {
      const result = await getProductMixtureRecommendation({
        ...values,
        availableProducts,
      });
      setRecommendation(result);
    } catch (e) {
      setError("An error occurred while getting the recommendation. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="animalType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animal Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cow">Cow</SelectItem>
                        <SelectItem value="goat">Goat</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="buffalo">Buffalo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animalAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animal Age (in months)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animalHealth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animal Health</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select health status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="sick">Sick / Recovering</SelectItem>
                        <SelectItem value="pregnant">Pregnant</SelectItem>
                        <SelectItem value="lactating">Lactating</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendation...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Recommendation
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {error && (
        <div className="mt-6 text-center text-destructive">{error}</div>
      )}
      {recommendation && (
        <Card className="mt-6 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Recommended Products</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendation.recommendedProducts}</p>
            </div>
            <div>
              <h3 className="font-semibold">Reasoning</h3>
              <p className="text-muted-foreground">{recommendation.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
