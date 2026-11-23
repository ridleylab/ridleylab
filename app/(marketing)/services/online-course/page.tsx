import CourseHero from "@/components/sections/online-course/hero";
import CourseProblem from "@/components/sections/online-course/problem";
import CourseSolution from "@/components/sections/online-course/solution";
import CourseWhatYouGet from "@/components/sections/online-course/what-you-get";
import CourseOffer from "@/components/sections/online-course/offer";
import CourseCTA from "@/components/sections/online-course/cta";
import ProgramFaqSection from "@/components/sections/shared/program-faq";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProgramSchemaGraph } from "@/lib/seo/schema";
import { programs } from "@/config/programs";

const program = programs.onlineCourse;

export const metadata = buildMetadata({
  title: "Online Course Pelatihan AI Social Media Marketing",
  description:
    "Belajar mandiri 10+ modul AI Social Media Marketing untuk TikTok & Instagram bisnis jasa, lengkap dengan template prompt dan SOP tim hanya Rp199.000.",
  path: program.path,
  image: program.ogImage,
});

export default function Page() {
  return (
    <>
      <JsonLd data={getProgramSchemaGraph(program)} />
      <CourseHero />
      <CourseProblem />
      <CourseSolution />
      <CourseWhatYouGet />
      <CourseOffer />
      <ProgramFaqSection
        title="Pertanyaan Seputar Online Course"
        faqs={program.faqs}
      />
      <CourseCTA />
    </>
  );
}
