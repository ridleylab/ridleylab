
import MentoringHero from "@/components/sections/offline-mentoring/hero";
import MentoringChallenges from "@/components/sections/offline-mentoring/challenges";
import MentoringHowWeWork from "@/components/sections/offline-mentoring/how-we-work";
import MentoringProgramFlow from "@/components/sections/offline-mentoring/program-flow";
import MentoringWhatYouGet from "@/components/sections/offline-mentoring/what-you-get";
import MentoringResults from "@/components/sections/offline-mentoring/results";
import MentoringDesignedFor from "@/components/sections/offline-mentoring/designed-for";
import MentoringCTA from "@/components/sections/offline-mentoring/cta";
import { getOrganizationSchema } from "@/lib/seo/schema/organization";
import { getWebSiteSchema } from "@/lib/seo/schema/website";
import { getOfflineMentoringServiceSchema, getOfflineMentoringFAQSchema, getOfflineMentoringWebPageSchema } from "@/lib/seo/schema/pages";

export default function Page() {
  const schemas = [
    getOrganizationSchema(),
    getOfflineMentoringServiceSchema(),
    getOfflineMentoringFAQSchema(),
    getOfflineMentoringWebPageSchema(),
    getWebSiteSchema()
  ];
  return (
    <>
      {schemas.map((schema, index) => (
        <script 
          key={index} 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} 
        />
      ))}
      <MentoringHero />
      <MentoringChallenges />
      <MentoringHowWeWork />
      <MentoringProgramFlow />
      <MentoringWhatYouGet />
      <MentoringResults />
      <MentoringDesignedFor />
      <MentoringCTA />

    </>
  );
}
