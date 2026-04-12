import { HomeLink } from "@/components/Buttons/HomeLink";
import FadeIn from "@/components/UI/FadeIn";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <FadeIn>
      <HomeLink className="absolute top-6 left-6 z-50" />
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
    </FadeIn>
  );
}
