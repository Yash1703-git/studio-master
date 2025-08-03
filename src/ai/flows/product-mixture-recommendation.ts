'use server';
/**
 * @fileOverview Provides AI-powered product mixture recommendations based on animal type, age, and health.
 *
 * - `getProductMixtureRecommendation` - A function that returns product recommendations.
 * - `ProductMixtureRecommendationInput` - The input type for the `getProductMixtureRecommendation` function.
 * - `ProductMixtureRecommendationOutput` - The return type for the `getProductMixtureRecommendation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductMixtureRecommendationInputSchema = z.object({
  animalType: z.string().describe('The type of animal (e.g., cow, goat, sheep).'),
  animalAge: z.number().describe('The age of the animal in months.'),
  animalHealth: z.string().describe('The health status of the animal (e.g., healthy, sick, pregnant).'),
  availableProducts: z.string().describe('A list of available dairy products with their descriptions.'),
});
export type ProductMixtureRecommendationInput = z.infer<typeof ProductMixtureRecommendationInputSchema>;

const ProductMixtureRecommendationOutputSchema = z.object({
  recommendedProducts: z.string().describe('A list of recommended dairy products and their quantities for the animal.'),
  reasoning: z.string().describe('The reasoning behind the product recommendations.'),
});
export type ProductMixtureRecommendationOutput = z.infer<typeof ProductMixtureRecommendationOutputSchema>;

export async function getProductMixtureRecommendation(
  input: ProductMixtureRecommendationInput
): Promise<ProductMixtureRecommendationOutput> {
  return productMixtureRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productMixtureRecommendationPrompt',
  input: {
    schema: ProductMixtureRecommendationInputSchema,
  },
  output: {
    schema: ProductMixtureRecommendationOutputSchema,
  },
  prompt: `You are an AI assistant specialized in recommending optimal dairy product mixtures for animals based on their type, age, and health condition.

  Given the following information about the animal and available products, provide a detailed recommendation of products and their quantities, along with a clear explanation of your reasoning.

  Animal Type: {{{animalType}}}
  Animal Age: {{{animalAge}}} months
  Animal Health: {{{animalHealth}}}
  Available Products: {{{availableProducts}}}

  Format your response as follows:

  Recommended Products: [List of products and quantities]
  Reasoning: [Explanation of why these products are recommended based on the animal's needs]`,
});

const productMixtureRecommendationFlow = ai.defineFlow(
  {
    name: 'productMixtureRecommendationFlow',
    inputSchema: ProductMixtureRecommendationInputSchema,
    outputSchema: ProductMixtureRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
