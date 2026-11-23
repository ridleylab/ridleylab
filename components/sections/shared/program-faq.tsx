import type { ProgramFaq } from "@/config/programs";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface ProgramFaqSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  faqs: ProgramFaq[];
  variant?: "default" | "subtle";
}

/**
 * Visible, accessible FAQ accordion synced with FAQPage JSON-LD.
 */
export default function ProgramFaqSection({
  title = "Pertanyaan yang Sering Diajukan",
  subtitle = "Jawaban ringkas seputar materi, mekanisme sesi, dan implementasi program bersama RidleyLab.",
  badge = "FAQ",
  faqs,
  variant = "default",
}: ProgramFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <Section variant={variant} borderTop>
      <Container size="md">
        <div className="text-center mb-12">
          {badge && (
            <Badge variant="outline" className="mb-4">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
            {title}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <Accordion items={faqs} defaultOpenIndex={0} />
      </Container>
    </Section>
  );
}
