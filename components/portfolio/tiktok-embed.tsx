export default function TikTokEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="flex justify-center w-full max-w-[325px] rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-1">
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@ridley.lab/video/${videoId}`}
        data-video-id={videoId}
        style={{ maxWidth: "605px", minWidth: "310px" }}
      >
        <section></section>
      </blockquote>
    </div>
  );
}
