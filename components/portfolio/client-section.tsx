import { MapPin } from "lucide-react";
import TikTokEmbed from "./tiktok-embed";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ClientSectionProps {
  name: string;
  businessType: string;
  location: string;
  mentoringDetails: string;
  videoIds: string[];
}

export default function ClientSection({
  name,
  businessType,
  location,
  mentoringDetails,
  videoIds,
}: ClientSectionProps) {
  return (
    <Card variant="subtle" padding="lg">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="default">{businessType}</Badge>
          <Badge variant="outline">
            <MapPin size={11} />
            <span>{location}</span>
          </Badge>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
          {name}
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          {mentoringDetails}
        </p>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-6">
        {videoIds.map((id) => (
          <TikTokEmbed key={id} videoId={id} />
        ))}
      </div>
    </Card>
  );
}
