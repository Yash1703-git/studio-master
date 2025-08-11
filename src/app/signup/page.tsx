"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          role: role,
        });
        toast({ title: "Success", description: "Account created successfully" });
        router.push("/login");
      }
    } catch (error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="grid gap-2">
             <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
             </div>
             <div className="grid gap-1">
                <Label>Role</Label>
                 <RadioGroup defaultValue="customer" onValueChange={(value) => setRole(value as "customer" | "admin")} className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                    </div>
                </RadioGroup>
            </div>
            <Button disabled={loading}>
                {loading && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                Sign Up
            </Button>
          </div>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
