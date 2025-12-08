"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Handshake, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const sponsors = [
  {
    name: "Softee",
    country: "España",
    logo: "/logo_softee_padel_negro_1440x.webp",
    description: "Equipamiento deportivo profesional",
  },
  {
    name: "Wilson",
    country: "Italia",
    logo: "/wilson-logo-png_seeklogo-153024.png",
    description: "Palas y accesorios de padel",
  },
];

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sponsors" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Colaboraciones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Sponsors</span> & Marcas
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Orgulloso de trabajar con marcas líderes en el mundo del padel
          </p>
        </motion.div>

        {/* Sponsors grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center hover:border-gold/30 transition-all duration-300 group"
            >
              {/* Logo */}
              <div className="w-40 h-40 mx-auto mb-6 rounded-xl bg-white flex items-center justify-center group-hover:bg-gray-100 transition-colors overflow-hidden relative p-4">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <h3 className="text-xl font-bold mb-2">{sponsor.name}</h3>
              <p className="text-gold text-sm mb-2">{sponsor.country}</p>
              <p className="text-foreground/60 text-sm">{sponsor.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA for sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <Handshake className="w-8 h-8 text-gold" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Interesado en colaborar?
          </h3>
          <p className="text-foreground/60 max-w-xl mx-auto mb-8">
            Estoy abierto a nuevas colaboraciones y patrocinios. Si tu marca
            busca visibilidad en el circuito profesional de padel, hablemos.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gold text-black hover:bg-gold-light font-semibold px-8"
          >
            <a href="#contacto" className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contactar
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
