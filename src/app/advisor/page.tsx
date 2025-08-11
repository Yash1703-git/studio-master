"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getProductMixtureRecommendation, ProductMixtureRecommendationInput, ProductMixtureRecommendationOutput } from "@/ai/flows/product-mixture-recommendation";
import { Loader2 } from "lucide-react";

const advisorFormSchema = z.object({
  animalType: z.string().min(1, "Animal type is required"),
  animalAge: z.coerce.number().min(1, "Animal age must be at least 1 month"),
  animalHealth: z.string().min(1, "Health status is required"),
  availableProducts: z.string().min(1, "Please list available products"),
});

type AdvisorFormValues = z.infer<typeof advisorFormSchema>;

export default function AdvisorPage() {
  const [recommendation, setRecommendation] = useState<ProductMixtureRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdvisorFormValues>({
    resolver: zodResolver(advisorFormSchema),
    defaultValues: {
      animalType: 'cow',
      animalAge: 12,
      animalHealth: 'healthy',
      availableProducts: 'Standard Milk Replacer, High-Energy Grain Mix, Vitamin & Mineral Supplement'
    }
  });

  const onSubmit = async (data: AdvisorFormValues) => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await getProductMixtureRecommendation(data);
      setRecommendation(result);
    } catch (e) {
      setError("Failed to get recommendation. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter font-lexend sm:text-5xl">AI Product Advisor</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Get expert recommendations for the perfect dairy product mixture for your animals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Animal Information</CardTitle>
            <CardDescription>
              Tell us about your animal to get a tailored recommendation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label>Animal Type</Label>
                <Controller
                  name="animalType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">Cow</SelectItem>
                        <SelectItem value="goat">Goat</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="buffalo">Buffalo</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.animalType && <p className="text-sm text-destructive">{errors.animalType.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="animalAge">Animal Age (months)</Label>
                <Controller
                  name="animalAge"
                  control={control}
                  render={({ field }) => <Input id="animalAge" type="number" {...field} />}
                />
                {errors.animalAge && <p className="text-sm text-destructive">{errors.animalAge.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Animal Health Status</Label>
                 <Controller
                  name="animalHealth"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a health status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="sick">Sick</SelectItem>
                        <SelectItem value="pregnant">Pregnant</SelectItem>
                        <SelectItem value="lactating">Lactating</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.animalHealth && <p className="text-sm text-destructive">{errors.animalHealth.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availableProducts">Available Products</Label>
                 <Controller
                  name="availableProducts"
                  control={control}
                  render={({ field }) => (
                    <Textarea 
                      id="availableProducts"
                      placeholder="List the products you have on hand, e.g., 'Calf Milk, Protein Supplement'"
                      rows={4}
                      {...field} />
                  )}
                />
                {errors.availableProducts && <p className="text-sm text-destructive">{errors.availableProducts.message}</p>}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Recommendation'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
              <CardDescription>
                Our AI will provide a product mix and reasoning here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {error && (
                 <div className="flex items-center justify-center h-full">
                    <p className="text-destructive">{error}</p>
                 </div>
              )}
              {recommendation && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Recommended Products</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{recommendation.recommendedProducts}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Reasoning</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{recommendation.reasoning}</p>
                  </div>
                </div>
              )}
               {!isLoading && !error && !recommendation && (
                <div className="flex items-center justify-center h-full text-center">
                    <p className="text-muted-foreground">Your recommendation will appear here.</p>
                 </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
