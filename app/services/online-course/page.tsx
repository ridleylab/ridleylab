
import CourseHero from "@/components/sections/online-course/hero";
import CourseProblem from "@/components/sections/online-course/problem";
import CourseSolution from "@/components/sections/online-course/solution";
import CourseWhatYouGet from "@/components/sections/online-course/what-you-get";
import CourseOffer from "@/components/sections/online-course/offer";
import CourseCTA from "@/components/sections/online-course/cta";
import { getOrganizationSchema } from "@/lib/seo/schema/organization";
import { getWebSiteSchema } from "@/lib/seo/schema/website";
import { getOnlineCourseServiceSchema, getOnlineCourseFAQSchema, getOnlineCourseWebPageSchema } from "@/lib/seo/schema/pages";

export default function Page() {
  const schemas = [
    getOrganizationSchema(),
    getOnlineCourseServiceSchema(),
    getOnlineCourseFAQSchema(),
    getOnlineCourseWebPageSchema(),
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
      <CourseHero />
      <CourseProblem />
      <CourseSolution />
      <CourseWhatYouGet />
      <CourseOffer />
      <CourseCTA />

    </>
  );
}

