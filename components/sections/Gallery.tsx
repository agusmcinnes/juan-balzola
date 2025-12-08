"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Real images from fotos-juanchi folder
const galleryImages = [
  { id: 1, src: "/fotos-juanchi/1-verical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 2, src: "/fotos-juanchi/2-horizontal.jpg", alt: "Juan Balzola en acción", orientation: "horizontal" },
  { id: 3, src: "/fotos-juanchi/3-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 4, src: "/fotos-juanchi/4-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 5, src: "/fotos-juanchi/5-horizontal.jpg", alt: "Juan Balzola en torneo", orientation: "horizontal" },
  { id: 6, src: "/fotos-juanchi/6-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 7, src: "/fotos-juanchi/7-horizontal.jpg", alt: "Juan Balzola jugando", orientation: "horizontal" },
  { id: 8, src: "/fotos-juanchi/8-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 9, src: "/fotos-juanchi/9-horizontal.jpg", alt: "Juan Balzola en competencia", orientation: "horizontal" },
  { id: 10, src: "/fotos-juanchi/10-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 11, src: "/fotos-juanchi/11-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 12, src: "/fotos-juanchi/12-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 13, src: "/fotos-juanchi/13-horizontal.jpg", alt: "Juan Balzola en acción", orientation: "horizontal" },
  { id: 14, src: "/fotos-juanchi/14-horizontal.jpg", alt: "Juan Balzola", orientation: "horizontal" },
  { id: 15, src: "/fotos-juanchi/15-horizontal.jpg", alt: "Juan Balzola jugando", orientation: "horizontal" },
  { id: 16, src: "/fotos-juanchi/16-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 17, src: "/fotos-juanchi/17-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 18, src: "/fotos-juanchi/18-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 20, src: "/fotos-juanchi/20-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 21, src: "/fotos-juanchi/21-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 22, src: "/fotos-juanchi/22-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 23, src: "/fotos-juanchi/23-horizontal.jpg", alt: "Juan Balzola en torneo", orientation: "horizontal" },
  { id: 24, src: "/fotos-juanchi/24-horizontal.jpg", alt: "Juan Balzola", orientation: "horizontal" },
  { id: 25, src: "/fotos-juanchi/25-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 26, src: "/fotos-juanchi/26-horizontal.jpg", alt: "Juan Balzola jugando", orientation: "horizontal" },
  { id: 27, src: "/fotos-juanchi/27-vertical.jpg", alt: "Juan Balzola", orientation: "vertical" },
  { id: 28, src: "/fotos-juanchi/28-horizontal.jpg", alt: "Juan Balzola en competencia", orientation: "horizontal" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Intersection observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % galleryImages.length);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;

      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handlePrevious, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const currentImage = currentIndex !== null ? galleryImages[currentIndex] : null;

  return (
    <section id="galeria" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Momentos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Galería</span> de Fotos
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Capturas de los mejores momentos dentro y fuera de la cancha
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 30}ms` }}
              onClick={() => openLightbox(index)}
            >
              <div
                className={`relative w-full ${
                  image.orientation === "vertical"
                    ? "aspect-[3/4]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">Ver</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {currentIndex !== null && currentImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-20 bg-black/50 rounded-full"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/70 text-sm z-20 bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {galleryImages.length}
            </div>

            {/* Navigation - Previous */}
            <button
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-20 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Navigation - Next */}
            <button
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-20 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image container */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative ${
                  currentImage.orientation === "vertical"
                    ? "h-[85vh] max-h-[85vh] w-auto max-w-[90vw]"
                    : "w-[90vw] max-w-4xl h-auto"
                }`}
                style={{
                  aspectRatio: currentImage.orientation === "vertical" ? "3/4" : "4/3"
                }}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Swipe hint for mobile */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs md:hidden">
              Desliza para navegar
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
