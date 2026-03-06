"use client";

import { useEffect, useState, useRef } from "react";
import type { TestimonialVideo, LanguageOption } from "@/lib/types";

const FLAG_IMG: Record<string, { src: string; alt: string }> = {
  en:   { src: "https://flagcdn.com/w40/us.png", alt: "USA flag" },
  ma:   { src: "https://flagcdn.com/w40/cn.png", alt: "China flag" },
  "日本": { src: "https://flagcdn.com/w40/jp.png", alt: "Japan flag" },
  ru:   { src: "https://flagcdn.com/w40/ru.png", alt: "Russia flag" },
  es:   { src: "https://flagcdn.com/w40/es.png", alt: "Spain flag" },
  fr:   { src: "https://flagcdn.com/w40/fr.png", alt: "France flag" },
};

export function VideoModal({
  video,
  onClose,
  initialLangCode,
}: {
  video: TestimonialVideo;
  onClose: () => void;
  initialLangCode?: string;
}) {
  const [activeLang, setActiveLang] = useState<LanguageOption | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (video.languages.length > 0) {
      const preferred = initialLangCode && video.languages.find((l) => l.code === initialLangCode);
      setActiveLang(preferred || video.languages[0]);
    } else {
      setActiveLang({ code: "en", label: "English", videoUrl: video.videoUrl });
    }
  }, [video, initialLangCode]);

  const rawUrl = activeLang?.videoUrl || video.videoUrl;
  const hasMultipleLanguages = video.languages.length > 1;

  function toEmbedUrl(url: string): string | null {
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    const longMatch = url.match(/youtube\.com\/watch\?.*v=([^&]+)/);
    if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
    return null;
  }

  const embedUrl = toEmbedUrl(rawUrl);
  const isYouTube = !!embedUrl;
  const videoUrl = rawUrl;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        onClose();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[var(--color-surface)] rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <div className="aspect-video bg-black relative">
          {isYouTube ? (
            <iframe
              key={embedUrl!}
              src={`${embedUrl!}?autoplay=1`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              key={videoUrl}
              src={videoUrl}
              title={video.title}
              className="w-full h-full"
              controls
              autoPlay
            />
          )}
          {hasMultipleLanguages && (
            <div
              ref={dropdownRef}
              className="absolute bottom-3 left-3 z-10"
            >
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 text-white text-sm hover:bg-black/85 transition-colors shadow-lg"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-label="Select language"
              >
                {FLAG_IMG[activeLang?.code || "en"] ? (
                  <img
                    src={FLAG_IMG[activeLang?.code || "en"].src}
                    alt={FLAG_IMG[activeLang?.code || "en"].alt}
                    width={24}
                    height={16}
                    className="rounded-sm object-cover shadow-sm flex-shrink-0"
                  />
                ) : (
                  <span className="text-lg">🌐</span>
                )}
                <span>{activeLang?.label || "English"}</span>
                <span className="text-xs opacity-80">▼</span>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute bottom-full left-0 mb-1 py-1 min-w-[140px] rounded-lg bg-black/90 shadow-xl border border-white/10"
                  role="listbox"
                >
                  {video.languages.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={activeLang?.code === lang.code}
                      onClick={() => {
                        setActiveLang(lang);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                        activeLang?.code === lang.code
                          ? "bg-[var(--color-primary)]/30 text-white font-medium"
                          : "text-white"
                      }`}
                    >
                      {FLAG_IMG[lang.code] ? (
                        <img
                          src={FLAG_IMG[lang.code].src}
                          alt={FLAG_IMG[lang.code].alt}
                          width={24}
                          height={16}
                          className="rounded-sm object-cover shadow-sm flex-shrink-0"
                        />
                      ) : (
                        <span className="text-lg">🌐</span>
                      )}
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-[var(--color-text)]">{video.title}</h3>
        </div>
      </div>
    </div>
  );
}
