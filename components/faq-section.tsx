'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { faqData } from '@/lib/constants/landing_page/faqData';

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="absolute right-10 top-20 h-64 w-64 animate-pulse rounded-full bg-blue-200 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute bottom-20 left-10 h-64 w-64 animate-pulse rounded-full bg-purple-200 opacity-20 mix-blend-multiply blur-xl filter delay-1000"></div>
      </div>

      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center">
          <Badge className="mb-3" variant="outline">
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Temukan jawaban untuk pertanyaan umum tentang platform BISA dan implementasinya
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group rounded-xl border bg-white/80 px-6 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <AccordionTrigger className="py-6 text-left transition-colors duration-300 hover:no-underline group-hover:text-blue-700">
                  <span className="pr-4 text-lg font-bold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
