"use client"

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Apa itu BISA dan bagaimana cara kerjanya?",
    answer: "BISA (Bantuan Inklusif & Sasaran Akurat) adalah platform AI yang membantu pemerintah mendistribusikan bantuan sosial dengan lebih tepat sasaran. Sistem kami menggunakan teknologi AI untuk menganalisis data demografi, ekonomi, dan sosial untuk menentukan penerima bantuan yang tepat."
  },
  {
    question: "Bagaimana BISA memastikan data privasi dan keamanan?",
    answer: "Kami menggunakan enkripsi tingkat enterprise dan mematuhi standar keamanan data pemerintah. Semua data diproses secara anonim dan hanya digunakan untuk analisis distribusi bantuan. Sistem kami telah tersertifikasi ISO 27001 dan mematuhi regulasi perlindungan data nasional."
  },
  {
    question: "Apakah BISA dapat diintegrasikan dengan sistem yang sudah ada?",
    answer: "Ya, BISA dirancang untuk dapat terintegrasi dengan berbagai sistem pemerintah yang sudah ada melalui API yang fleksibel. Tim teknis kami akan membantu proses integrasi untuk memastikan kompatibilitas dengan infrastruktur IT yang sudah berjalan."
  },
  {
    question: "Berapa lama implementasi BISA dapat diselesaikan?",
    answer: "Implementasi BISA biasanya membutuhkan waktu 2-4 minggu tergantung kompleksitas dan skala daerah. Ini termasuk setup sistem, migrasi data, pelatihan tim, dan pengujian sistem. Tim kami akan mendampingi seluruh proses implementasi."
  },
  {
    question: "Apakah tersedia pelatihan untuk pengguna sistem?",
    answer: "Ya, kami menyediakan pelatihan komprehensif untuk admin dan pengguna sistem. Termasuk training on-site, dokumentasi lengkap, video tutorial, dan support berkelanjutan. Tim support kami siap membantu 24/7."
  },
  {
    question: "Bagaimana sistem menangani update dan maintenance?",
    answer: "BISA menggunakan cloud infrastructure dengan update otomatis dan maintenance terjadwal. Semua update dilakukan tanpa downtime dengan backup otomatis. Tim kami juga menyediakan monitoring 24/7 untuk memastikan sistem berjalan optimal."
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-3" variant="outline">
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang platform BISA dan implementasinya
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm border rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 group-hover:text-blue-700 transition-colors duration-300">
                  <span className="font-bold text-foreground pr-4 text-lg">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>        </motion.div>
      </div>
    </section>
  );
}
