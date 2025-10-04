import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { Layers } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      {/* Brand header */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Layers className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-slate-900">Bricks</span>
      </Link>

      {/* Auth card */}
      <Card className="w-full max-w-md p-6">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "signin" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <SignIn
              routing="hash"
              signUpUrl="#signup"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  card: "shadow-none border border-slate-200 bg-white",
                },
                layout: {
                  socialButtonsVariant: "iconButton",
                },
              }}
              redirectUrl="/dashboard"
            />
          </TabsContent>

          <TabsContent value="signup">
            <SignUp
              routing="hash"
              signInUrl="#signin"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  card: "shadow-none border border-slate-200 bg-white",
                },
              }}
              redirectUrl="/dashboard"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
