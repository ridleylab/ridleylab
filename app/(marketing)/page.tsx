import HomeHero from "@/components/sections/home/hero";
import HomeProblem from "@/components/sections/home/problem";
import HomeSolution from "@/components/sections/home/solution";
import HomeProof from "@/components/sections/home/proof";
import HomeOffer from "@/components/sections/home/offer";
import HomeCTA from "@/components/sections/home/cta";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getHomeSchemaGraph } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: siteConfig.titleDefault,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={getHomeSchemaGraph()} />
      <HomeHero />
      <HomeProblem />
      <HomeSolution />
      <HomeProof />
      <HomeOffer />
      <HomeCTA />
    </>
  );
}
