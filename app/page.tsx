import type { Metadata } from "next";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Problem } from "@/components/sections/Problem";
import { Pivot } from "@/components/sections/Pivot";
import { Solution } from "@/components/sections/Solution";
import { ProductStory } from "@/components/story/ProductStory";
import { Benefits } from "@/components/sections/Benefits";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Proof } from "@/components/sections/Proof";
import { Plans } from "@/components/sections/Plans";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="conteudo">
        <Hero />
        <Ticker />
        <Problem />
        <Pivot />
        <Solution />
        <ProductStory />
        <Benefits />
        <Features />
        <HowItWorks />
        <Proof />
        <Plans />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
