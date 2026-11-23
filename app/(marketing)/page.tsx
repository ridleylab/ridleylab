
import HomeHero from "@/components/sections/home/hero";
import HomeProblem from "@/components/sections/home/problem";
import HomeSolution from "@/components/sections/home/solution";
import HomeProof from "@/components/sections/home/proof";
import HomeOffer from "@/components/sections/home/offer";
import HomeCTA from "@/components/sections/home/cta";
import { getOrganizationSchema } from "@/lib/seo/schema/organization";
import { getWebSiteSchema } from "@/lib/seo/schema/website";
import { getHomeWebPageSchema } from "@/lib/seo/schema/pages";

export default function Page() {
  const schemas = [getOrganizationSchema(), getHomeWebPageSchema(), getWebSiteSchema()];
  return (
    <>
      {schemas.map((schema, index) => (
        <script 
          key={index} 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} 
        />
      ))}
      <HomeHero />
      <HomeProblem />
      <HomeSolution />
      <HomeProof />
      <HomeOffer />
      <HomeCTA />

    </>
  );
}

