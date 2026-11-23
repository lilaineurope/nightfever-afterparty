import { useEffect, useRef } from "react";
import { pauseEpisode } from "@/components/episode-player";

// The YouTube screen of the Jukebox (src/components/jukebox-machine.tsx) and the trailer Jukebox on Library item pages
// (src/components/library-item.tsx): youtube-nocookie, loaded only once a visitor presses play; it tells its jukebox when the
// video ends or can't play, and pauses the episode player (one thing plays at a time).
export function VideoScreen({ vid, title, onEnd, onFail, start }: { vid: string; title: string; onEnd: () => void; onFail: () => void; start?: number | undefined }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  const failRef = useRef(onFail);
  failRef.current = onFail;
  useEffect(() => {
    // Ask the YouTube player to report its state, so the jukebox can move on when the video ends.
    const hello = () => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    const t = setInterval(hello, 1000);
    let ended = false;
    const onMsg = (e: MessageEvent) => {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return;
      let d: { event?: string; info?: unknown } = {};
      try {
        d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (d.event === "initialDelivery" || d.event === "onReady") clearInterval(t);
      const state = d.event === "onStateChange" ? d.info : d.event === "infoDelivery" ? (d.info as { playerState?: number } | undefined)?.playerState : undefined;
      // The video can't play here (removed, or blocked in the visitor's country): skip it, like a jukebox with a stuck record.
      if (d.event === "onError" && !ended) {
        ended = true;
        failRef.current();
        return;
      }
      if (state === 0 && !ended) {
        ended = true;
        setTimeout(() => endRef.current(), 800);
      }
    };
    window.addEventListener("message", onMsg);
    // Only one thing plays at a time: the show (episode player) pauses the video, and the video pauses the show.
    pauseEpisode();
    const hush = () => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
    window.addEventListener("nf-episode-play", hush);
    return () => {
      clearInterval(t);
      window.removeEventListener("message", onMsg);
      window.removeEventListener("nf-episode-play", hush);
    };
  }, []);
  const id = vid;
  const origin = typeof window === "undefined" ? "" : `&origin=${encodeURIComponent(window.location.origin)}`;
  return (
    <iframe
      ref={frame}
      className="jbx-video"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&enablejsapi=1${start ? `&start=${start}` : ""}${origin}`}
      title={`${title} - video on YouTube`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
