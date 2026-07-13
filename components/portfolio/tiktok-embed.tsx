import Script from "next/script";

export default function TikTokEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="flex justify-center w-full max-w-[325px]">
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@ridley.lab/video/${videoId}`}
        data-video-id={videoId}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section></section>
      </blockquote>
    </div>
  );
}
