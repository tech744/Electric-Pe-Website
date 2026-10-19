import { cn } from "@/lib/utils/cn";

/**
 * ElectricPe manufacturing / assembly facility walkthrough.
 *
 * Served from /public rather than an embed so there is no third-party
 * script on the page. `preload="none"` plus a poster means the ~19 MB file
 * is only fetched when someone actually presses play - the poster is 62 KB.
 *
 * The source is a 16:9 file with ~56px letterbox bars baked into every
 * frame. Sizing the player to the picture's real 1280x608 ratio and letting
 * `object-cover` overflow the rest crops those bars off for both the poster
 * and playback, instead of showing black strips in the layout.
 */
export const FACTORY_VIDEO = {
  src: "/video/electricpe-factory.mp4",
  poster: "/video/electricpe-factory-poster.webp",
} as const;

export function FactoryVideo({
  caption,
  className,
}: {
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black shadow-[var(--shadow-lg)]">
        <video
          controls
          preload="none"
          playsInline
          poster={FACTORY_VIDEO.poster}
          className="block w-full aspect-[1280/608] object-cover"
        >
          <source src={FACTORY_VIDEO.src} type="video/mp4" />
          <p className="p-4 text-sm text-white">
            Your browser can&apos;t play embedded video.{" "}
            <a href={FACTORY_VIDEO.src} className="underline">
              Download the factory walkthrough
            </a>
            .
          </p>
        </video>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
