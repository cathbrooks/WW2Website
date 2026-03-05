"use client";

import { useState } from "react";
import { testimonialVideos } from "@/lib/mockData";
import type { TestimonialVideo as TestimonialVideoType } from "@/lib/types";
import { VideoModal } from "@/components/VideoModal";

const FLAG_IMG: Record<string, { src: string; alt: string }> = {
  en:   { src: "https://flagcdn.com/w40/us.png", alt: "USA flag" },
  ma:   { src: "https://flagcdn.com/w40/cn.png", alt: "China flag" },
  "日本": { src: "https://flagcdn.com/w40/jp.png", alt: "Japan flag" },
  ru:   { src: "https://flagcdn.com/w40/ru.png", alt: "Russia flag" },
  es:   { src: "https://flagcdn.com/w40/es.png", alt: "Spain flag" },
  fr:   { src: "https://flagcdn.com/w40/fr.png", alt: "France flag" },
};

export function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<TestimonialVideoType | null>(null);
  const [initialLangCode, setInitialLangCode] = useState<string | undefined>();

  const openVideo = (video: TestimonialVideoType, langCode?: string) => {
    setSelectedVideo(video);
    setInitialLangCode(langCode);
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-[var(--color-bg-alt)]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8 flex items-baseline gap-3">
          <span className="text-sm font-mono font-normal text-[var(--color-text-muted)] opacity-50 select-none">04</span>
          Testimonials
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {testimonialVideos.slice(0, 4).map((video) => {
            const hasTranslations = video.languages.length >= 2;
            return (
              <div key={video.id} className="flex flex-col gap-1.5">
                {hasTranslations && (
                  <div className="flex gap-1 justify-center">
                    {video.languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => openVideo(video, lang.code)}
                        className="text-xl leading-none rounded transition-transform hover:scale-125 active:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1"
                        title={`Watch in ${lang.label}`}
                        aria-label={`Watch in ${lang.label}`}
                      >
                        {FLAG_IMG[lang.code] ? (
                          <img
                            src={FLAG_IMG[lang.code].src}
                            alt={FLAG_IMG[lang.code].alt}
                            width={24}
                            height={16}
                            className="rounded-sm object-cover shadow-sm"
                            style={{ display: "block" }}
                          />
                        ) : (
                          lang.code
                        )}
                      </button>
                    ))}
                  </div>
                )}
                <div
                  onClick={() => openVideo(video)}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-[var(--color-primary)]"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-2xl">
                      ▶
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-medium truncate">
                      {video.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => {
            setSelectedVideo(null);
            setInitialLangCode(undefined);
          }}
          initialLangCode={initialLangCode}
        />
      )}
    </section>
  );
}
