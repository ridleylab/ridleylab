import TikTokEmbed from "./tiktok-embed";

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
    <div className="mb-10 pb-8 border-b border-gray-100 last:border-0">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-ridley-black mb-2">{name}</h2>
        <p className="text-lg text-ridley-blue font-semibold mb-2">
          {businessType} - {location}
        </p>
        <p className="text-gray-600 max-w-3xl">{mentoringDetails}</p>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-6">
        {videoIds.map((id) => (
          <TikTokEmbed key={id} videoId={id} />
        ))}
      </div>
    </div>
  );
}
