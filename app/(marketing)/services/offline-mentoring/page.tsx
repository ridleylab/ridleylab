import MentoringHero from "@/components/sections/offline-mentoring/hero";
import MentoringChallenges from "@/components/sections/offline-mentoring/challenges";
import MentoringHowWeWork from "@/components/sections/offline-mentoring/how-we-work";
import MentoringProgramFlow from "@/components/sections/offline-mentoring/program-flow";
import MentoringWhatYouGet from "@/components/sections/offline-mentoring/what-you-get";
import MentoringResults from "@/components/sections/offline-mentoring/results";
import MentoringDesignedFor from "@/components/sections/offline-mentoring/designed-for";
import MentoringCTA from "@/components/sections/offline-mentoring/cta";
import ProgramFaqSection from "@/components/sections/shared/program-faq";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProgramSchemaGraph } from "@/lib/seo/schema";
import { programs } from "@/config/programs";

const program = programs.offlineMentoring;

export const metadata = buildMetadata({
  title: "Offline Mentoring Pelatihan AI Social Media Marketing",
  description:
    "Workshop tatap muka 8x sesi di lokasi bisnis Anda bersama RidleyLab. Bangun sistem konten AI, SOP tim, dan training admin closing mulai Rp4.500.000/tim.",
  path: program.path,
  image: program.ogImage,
});

export default function Page() {
  return (
    <>
      <JsonLd data={getProgramSchemaGraph(program)} />
      <MentoringHero />
      <MentoringChallenges />
      <MentoringHowWeWork />
      <MentoringProgramFlow />
      <MentoringWhatYouGet />
      <MentoringResults />
      <MentoringDesignedFor />
      <ProgramFaqSection
        title="Pertanyaan Seputar Offline Mentoring"
        faqs={program.faqs}
        variant="subtle"
      />
      <MentoringCTA />
    </>
  );
}
