import { AdvisorForm } from '@/components/advisor-form';
import { Bot } from 'lucide-react';

export default function AdvisorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Bot className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          AI Product Advisor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get expert recommendations for the perfect dairy product mixture. Our AI considers your animal's type, age, and health to suggest the optimal blend from our available products.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        <AdvisorForm />
      </div>
    </div>
  );
}
