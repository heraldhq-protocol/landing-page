"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, Play, Pause } from "lucide-react";
import { ChevronRightIcon as ChevronRight } from "@/components/ui/chevron-right";
import { XIcon as X } from "@/components/ui/x";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface PitchCarouselProps {
  slides: Slide[];
  videoUrl?: string;
}

const DEFAULT_DURATION = 10000;
const MIN_DURATION = 4000;
const MAX_DURATION = 20000;
const CHARACTERS_PER_SECOND = 12;

function calculateSlideDuration(slide: Slide): number {
  const textLength = slide.title.length + slide.description.length;
  if (textLength === 0) return DEFAULT_DURATION;

  const calculated = (textLength / CHARACTERS_PER_SECOND) * 1000;
  return Math.min(Math.max(calculated, MIN_DURATION), MAX_DURATION);
}

export default function PitchCarousel({ slides, videoUrl }: PitchCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedAtRef = useRef(0);

  const currentSlide = slides[current];
  const currentDuration = calculateSlideDuration(currentSlide);
  const PROGRESS_STEP = 50;

  const isLastSlide = current === slides.length - 1;

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
  }, []);

  const startProgress = useCallback(
    (duration: number) => {
      setProgress(0);
      if (progressRef.current) clearInterval(progressRef.current);
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + (100 / (duration / PROGRESS_STEP));
        });
      }, PROGRESS_STEP);
    },
    [current]
  );

  const advanceSlide = useCallback(() => {
    if (isLastSlide || isTransitioning) return;
    setIsTransitioning(true);
    clearTimers();
    setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(false);
    }, 500);
  }, [isLastSlide, isTransitioning, clearTimers]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      const duration = calculateSlideDuration(slides[current]);
      const remainingMs = ((100 - pausedAtRef.current) / 100) * duration;
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + (100 / (duration / PROGRESS_STEP));
        });
      }, PROGRESS_STEP);
      timeoutRef.current = setTimeout(() => {
        advanceSlide();
      }, remainingMs);
      setIsPaused(false);
    } else {
      pausedAtRef.current = progress;
      clearTimers();
      setIsPaused(true);
    }
  }, [isPaused, current, progress, clearTimers, advanceSlide]);

  const scheduleAdvance = useCallback(
    (slideIndex: number) => {
      const slide = slides[slideIndex];
      const duration = calculateSlideDuration(slide);

      clearTimers();
      startProgress(duration);

      if (slideIndex < slides.length - 1) {
        timeoutRef.current = setTimeout(() => {
          advanceSlide();
        }, duration);
      }
    },
    [slides, clearTimers, startProgress, advanceSlide]
  );

  const goToSlide = (index: number) => {
    if (index === current || isTransitioning) return;
    setIsTransitioning(true);
    clearTimers();
    if (!isPaused) setIsPaused(false);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
      if (!isPaused) {
        scheduleAdvance(index);
      } else {
        setProgress(0);
      }
    }, 500);
  };

  const goNext = () => {
    if (!isLastSlide) goToSlide(current + 1);
  };

  const goPrev = () => {
    if (current > 0) goToSlide(current - 1);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const duration = calculateSlideDuration(slides[0]);

    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (duration / PROGRESS_STEP));
      });
    }, PROGRESS_STEP);

    if (0 < slides.length - 1) {
      timeoutRef.current = setTimeout(() => {
        advanceSlide();
      }, duration);
    }

    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (!isTransitioning && current > 0 && !isPaused) {
      const duration = calculateSlideDuration(slides[current]);

      clearTimers();

      const id = requestAnimationFrame(() => {
        setProgress(0);
        progressRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) return 100;
            return prev + (100 / (duration / PROGRESS_STEP));
          });
        }, PROGRESS_STEP);

        if (current < slides.length - 1) {
          timeoutRef.current = setTimeout(() => {
            advanceSlide();
          }, duration);
        }
      });

      return () => cancelAnimationFrame(id);
    }
  }, [current, isTransitioning, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showVideo || showOverview) return;
      if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setShowVideo(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, isTransitioning, showVideo, showOverview, togglePause]);

  const durationSec = Math.round(currentDuration / 1000);

  return (
    <div
      className="relative w-full h-[100dvh] bg-bg-base overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 top-24 sm:top-32 md:top-40 bottom-24 sm:bottom-28 md:bottom-32 transition-opacity duration-500 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
              {slide.image ? (
                <div className="w-full max-w-5xl">
                  <div className="relative w-full rounded-lg overflow-hidden flex-shrink-0" style={{ aspectRatio: "16 / 9" }}>
                    <Image
                      src={slide.image}
                      alt={slide.title || `Slide ${slide.id}`}
                      fill
                      priority
                      className="object-contain"
                      sizes="100vw"
                      quality={90}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-bg-surface/50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl border border-border-hi bg-bg-elevated/50 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-black text-text-muted/30">
                        {slide.id}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs font-mono text-text-muted uppercase tracking-widest">
                      Slide {slide.id}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-text-muted/50 mt-2">
                      Add image URL to slide data
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>


      <div className="absolute top-3 sm:top-4 md:top-6 left-0 right-0 z-20 px-3 sm:px-4 md:px-6 flex justify-between items-center">
        <button
          onClick={() => setShowOverview(true)}
          className="flex items-center gap-1.5 sm:gap-2 text-text-muted hover:text-text-primary transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-bg-elevated/50"
        >
          <X size={14} />
          <span className="hidden sm:inline">Overview</span>
        </button>

        {videoUrl && (
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-1.5 sm:gap-2 text-teal hover:text-teal/80 transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-bg-elevated/50 border border-teal/20 hover:border-teal/40"
          >
            <Play size={10} />
            <span className="hidden sm:inline">Watch Video</span>
          </button>
        )}
      </div>

      <div
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
          showControls && current > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={goPrev}
          className="p-2 sm:p-2.5 md:p-3 rounded-full bg-bg-base/80 border border-border-hi hover:bg-bg-elevated hover:border-teal/50 transition-all text-text-muted hover:text-teal backdrop-blur-sm"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <div
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
          showControls && !isLastSlide ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={goNext}
          className="p-2 sm:p-2.5 md:p-3 rounded-full bg-bg-base/80 border border-border-hi hover:bg-bg-elevated hover:border-teal/50 transition-all text-text-muted hover:text-teal backdrop-blur-sm"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide Title above controls bar */}
      {currentSlide?.title && (
        <div className="absolute left-0 right-0 z-30 px-3 sm:px-4 md:px-6 lg:px-8 text-center pointer-events-none"
             style={{ bottom: "clamp(64px, 12vh, 100px)" }}>
          <h2 className="text-sm sm:text-lg md:text-xl font-bold text-text-primary">
            {currentSlide.title}
          </h2>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-bg-base/90 backdrop-blur-sm border-t border-border/10">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 pb-4 sm:pb-6 lg:pb-8">
        <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-mono text-text-muted font-bold">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={togglePause}
                className="p-1.5 sm:p-2 rounded-full bg-bg-base/60 border border-border-lo/30 hover:bg-bg-elevated hover:border-teal/40 transition-all text-text-muted hover:text-teal backdrop-blur-sm"
                aria-label={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? (
                  <Play size={14} />
                ) : (
                  <Pause size={14} />
                )}
              </button>

              <div className="flex gap-0.5 sm:gap-1 overflow-x-auto max-w-[40%] sm:max-w-none px-2 sm:px-0 scrollbar-hide">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-0.5 sm:h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
                      index === current
                        ? "w-6 sm:w-8 bg-teal"
                        : index < current
                        ? "w-1.5 sm:w-2 bg-teal/40"
                        : "w-1.5 sm:w-2 bg-bg-border-hi"
                    }`}
                  />
                ))}
              </div>
            </div>

            {isLastSlide && (
              <span className="text-[8px] sm:text-[10px] font-bold text-teal uppercase tracking-widest hidden sm:block">
                End of deck
              </span>
            )}
          </div>

          <div className={`relative h-0.5 sm:h-1 bg-bg-border-hi/50 rounded-full overflow-hidden transition-opacity ${isPaused ? "opacity-50" : ""}`}>
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-none ${isPaused ? "bg-teal/70" : "bg-teal"}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-center">
            {isPaused ? (
              <span className="text-[9px] sm:text-[10px] font-bold text-teal/60 uppercase tracking-widest">
                Paused
              </span>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-mono text-text-muted/50">
                {durationSec}s
              </span>
            )}
          </div>
        </div>
        </div>
      </div>

      {showVideo && videoUrl && (
        <PitchVideoModal
          videoUrl={videoUrl}
          onClose={() => {
            setShowVideo(false);
            setShowOverview(true);
          }}
        />
      )}

      {showOverview && (
        <DeckOverview
          slides={slides}
          videoUrl={videoUrl}
          onClose={() => setShowOverview(false)}
          onReplay={() => {
            setShowOverview(false);
            setCurrent(0);
            setProgress(0);
            scheduleAdvance(0);
          }}
        />
      )}
    </div>
  );
}

function PitchVideoModal({
  videoUrl,
  onClose,
}: {
  videoUrl: string;
  onClose: () => void;
}) {
  const videoId = extractYouTubeId(videoUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-bg-surface rounded-xl sm:rounded-2xl overflow-hidden border border-border-hi shadow-2xl shadow-teal/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-bg-base/80 hover:bg-bg-elevated transition-colors text-text-muted hover:text-text-primary"
        >
          <X size={16} />
        </button>

        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs sm:text-sm text-text-muted">Invalid YouTube URL</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DeckOverview({
  slides,
  videoUrl,
  onClose,
  onReplay,
}: {
  slides: Slide[];
  videoUrl?: string;
  onClose: () => void;
  onReplay: () => void;
}) {
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-bg-base overflow-y-auto animate-fade-in"
    >
      <div className="min-h-screen">
        <div className="sticky top-4 z-10 flex justify-center px-4 w-full pointer-events-none">
          <div className="pointer-events-auto w-full max-w-4xl bg-bg-surface/80 backdrop-blur-xl border border-border shadow-2xl rounded-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7">
                <Image
                  width={28}
                  height={28}
                  src="https://ucshdejvxzanuxlxrano.supabase.co/storage/v1/object/public/herald-public-asset/herald-logo.svg"
                  alt="Herald Logo"
                  priority
                />
              </div>
              <span className="text-base font-bold tracking-tight text-text-primary">
                Herald
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onReplay}
                className="flex items-center gap-1.5 text-teal hover:text-teal/80 transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-bg-elevated/50 border border-teal/20 hover:border-teal/40"
              >
<Play size={10} />
                <span className="hidden sm:inline">Replay Pitch</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {videoUrl && videoId && (
          <section className="px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-6 sm:py-8 border-b border-border-lo/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">
                Watch the Full Pitch
              </h2>
              <div className="relative w-full aspect-video bg-bg-surface rounded-xl overflow-hidden border border-border-hi shadow-lg shadow-teal/5">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        <section className="px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-1">
                Slide Deck
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                {slides.length} slides
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="group rounded-xl overflow-hidden border border-border-lo/40 hover:border-teal/30 bg-bg-surface/50 hover:bg-bg-surface/80 transition-all duration-300 hover:shadow-lg hover:shadow-teal/5 hover:-translate-y-0.5 animate-slide-up"
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.title || `Slide ${slide.id}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        quality={80}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-text-muted/30 text-2xl font-black">
                          {slide.id}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-bg-base/80 backdrop-blur-sm border border-border-lo/30">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-text-muted">
                        {String(slide.id).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1.5 group-hover:text-teal transition-colors">
                      {slide.title || `Slide ${slide.id}`}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-text-muted leading-relaxed line-clamp-3">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 border-t border-border-lo/30">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
              Building the default communication system for Web3. Privacy-first notifications for every wallet, every chain.
            </p>
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal/10 border border-teal/20 hover:bg-teal/20 hover:border-teal/30 transition-all text-teal font-bold text-xs sm:text-sm uppercase tracking-widest"
            >
              <Play size={12} />
              Replay Full Pitch
            </button>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}
