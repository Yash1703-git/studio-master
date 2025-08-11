"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast({
        title: t('toastLoginSuccessTitle'),
        description: t('toastLoginSuccessDescription'),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('toastLoginFailedTitle'),
        description: t('toastLoginFailedDescription'),
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('adminLoginTitle')}</CardTitle>
          <CardDescription>
            {t('adminLoginDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('emailLabel')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('passwordLabel')}</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <p className="text-xs text-muted-foreground">
              {t('passwordHint')}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            {t('signIn')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    