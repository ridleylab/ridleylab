import OnlineMentoringHero from "@/components/sections/online-mentoring/hero";
import OnlineMentoringWhy from "@/components/sections/online-mentoring/why-online";
import OnlineMentoringFlow from "@/components/sections/online-mentoring/program-flow";
import OnlineMentoringWhatYouGet from "@/components/sections/online-mentoring/what-you-get";
import OnlineMentoringResults from "@/components/sections/online-mentoring/results";
import OnlineMentoringCTA from "@/components/sections/online-mentoring/cta";
import ProgramFaqSection from "@/components/sections/shared/program-faq";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProgramSchemaGraph } from "@/lib/seo/schema";
import { programs } from "@/config/programs";

const program = programs.onlineMentoring;

export const metadata = buildMetadata({
  title: "Online Mentoring AI Social Media Marketing (Google Meet)",
  description:
    "Program pendampingan live 8x sesi via Google Meet bersama RidleyLab. Kurikulum custom, SOP konten AI, dan training admin closing Rp4.000.000/tim untuk seluruh Indonesia.",
  path: program.path,
  image: program.ogImage,
});

export default function OnlineMentoringPage() {
  return (
    <>
      <JsonLd data={getProgramSchemaGraph(program)} />
      <OnlineMentoringHero />
      <OnlineMentoringWhy />
      <OnlineMentoringFlow />
      <OnlineMentoringWhatYouGet />
      <OnlineMentoringResults />
      <ProgramFaqSection
        title="Pertanyaan Seputar Online Mentoring"
        faqs={program.faqs}
        variant="subtle"
      />
      <OnlineMentoringCTA />
    </>
  );
}
