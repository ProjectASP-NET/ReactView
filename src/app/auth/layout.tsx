import FadeIn from "@/components/UI/FadeIn";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <FadeIn>
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
    </FadeIn>
  );
}
