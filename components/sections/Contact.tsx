"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Mail, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@juan_balzola",
    href: "https://instagram.com/juan_balzola",
    color: "hover:text-pink-500",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Juanbalzola00@gmail.com",
    href: "mailto:Juanbalzola00@gmail.com",
    color: "hover:text-gold",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Mar del Plata, Argentina",
    href: null,
    color: "",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Hablemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Contacto</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            ¿Tienes alguna propuesta o simplemente quieres saludar? Estoy
            disponible a través de estos canales
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Contact cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      info.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`glass rounded-xl p-6 text-center block group hover:border-gold/30 transition-all duration-300 ${info.color}`}
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <info.icon className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-foreground/50 text-sm mb-1">
                      {info.label}
                    </p>
                    <p className="font-medium flex items-center justify-center gap-1">
                      {info.value}
                      {info.href.startsWith("http") && (
                        <ExternalLink className="w-4 h-4 opacity-50" />
                      )}
                    </p>
                  </a>
                ) : (
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-foreground/50 text-sm mb-1">
                      {info.label}
                    </p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 md:p-10 text-center"
          >
            <Instagram className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sígueme en Instagram</h3>
            <p className="text-foreground/60 mb-6">
              Contenido exclusivo, entrenamientos y detrás de escenas de los
              torneos
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90 font-semibold px-8"
            >
              <a
                href="https://instagram.com/juan_balzola"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                @juan_balzola
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
