
"use client";

import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export default function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }
  }, []);

  const handleSendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        const recaptchaVerifier = window.recaptchaVerifier;
        if (recaptchaVerifier) {
            const fullPhoneNumber = `+91${phoneNumber}`;
            const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, recaptchaVerifier);
            window.confirmationResult = confirmationResult;
            setOtpSent(true);
            toast({ title: "Success", description: "OTP sent successfully" });
        }
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to send OTP. Please check the phone number and try again." });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirmationResult) {
        toast({ variant: "destructive", title: "Error", description: "Please verify your phone number first." });
        return;
    }
    try {
      const userCredential = await window.confirmationResult.confirm(otp);
      if (userCredential) {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          role: role,
          phoneNumber: user.phoneNumber
        });
        toast({ title: "Success", description: "Account created successfully" });
        router.push("/login");
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: "Invalid OTP or something went wrong." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account using your phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {!otpSent ? (
              <div>
                <Label htmlFor="phone">10-digit Phone Number</Label>
                <div className="flex gap-2">
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="xxxxxxxxxx"
                  required
                />
                <Button onClick={handleSendOtp}>Send OTP</Button>
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>
            )}
            
            <div id="recaptcha-container"></div>

            <div>
                <Label>Role</Label>
                 <RadioGroup defaultValue="customer" onValueChange={(value) => setRole(value as "customer" | "admin")} className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                    </div>
                </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={!otpSent}>
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
