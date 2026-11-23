import { ChevronDown } from "lucide-react";
import type { ProgramFaq } from "@/config/programs";

interface ProgramFaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: ProgramFaq[];
}

/**
 * Visible, accessible FAQ section so FAQPage JSON-LD matches rendered UI content.
 */
export default function ProgramFaqSection({
  title = "Pertanyaan yang Sering Diajukan",
  subtitle = "Jawaban ringkas seputar materi, mekanisme sesi, dan implementasi program bersama RidleyLab.",
  faqs,
}: ProgramFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-black/5">
      <div className="ridley-container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
            {title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl bg-white overflow-hidden">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-black text-base">
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
