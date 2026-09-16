import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/DemoForm";
import { adsPage } from "@/content/ads";
import { site } from "@/content/site";
import type { LeadUtm } from "@/lib/leads";

export const metadata: Metadata = {
  title: adsPage.title,
  description: adsPage.description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: adsPage.path,
  },
  openGraph: {
    title: `${adsPage.title} | ${site.name}`,
    description: adsPage.description,
    url: adsPage.path,
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pickParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const text = raw?.trim().slice(0, 80);
  return text || undefined;
}

function pickUtm(searchParams: Record<string, string | string[] | undefined>): LeadUtm {
  return {
    utm_source: pickParam(searchParams.utm_source),
    utm_medium: pickParam(searchParams.utm_medium),
    utm_campaign: pickParam(searchParams.utm_campaign),
    utm_content: pickParam(searchParams.utm_content),
  };
}

export default async function AdsPage({ searchParams }: { searchParams: SearchParams }) {
  const utm = pickUtm(await searchParams);

  return (
    <main id="top" className="flex min-h-full flex-1 flex-col bg-navy-gradient text-white">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-4 py-10 sm:px-5">
        <p className="mb-8 text-center font-display text-[19px] font-extrabold text-white">
          {adsPage.brand}
        </p>
        <h1 className="sr-only">{adsPage.title}</h1>
        <DemoForm origem="ads-control" utm={utm} showIntro={false} />
      </div>
    </main>
  );
}
