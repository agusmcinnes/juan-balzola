"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex(
        (img) => img.id === selectedImage
      );
      const previousIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedImage(galleryImages[previousIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex(
        (img) => img.id === selectedImage
      );
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      setSelectedImage(galleryImages[nextIndex].id);
    }
  };

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage);

  return (
    <section id="galeria" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
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
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(image.id)}
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
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 text-white/70 hover:text-white p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              className="absolute right-4 text-white/70 hover:text-white p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image container */}
            <div
              className={`relative ${
                selectedImageData.orientation === "vertical"
                  ? "h-[80vh] w-auto aspect-[3/4]"
                  : "w-full max-w-4xl aspect-[4/3]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImageData.src}
                alt={selectedImageData.alt}
                fill
                className="object-contain rounded-xl"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
