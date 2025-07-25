'use client';

import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mission } from '@/lib/constants/about/mission';
import { techUsed } from '@/lib/constants/about/techUsed';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-3">
        <section className="bg-background py-20">
          <div className="container max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6">
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium">
                  🎯 Tentang BISA
                </Badge>

                <h1 className="font-heading text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
                  Apa itu BISA?
                </h1>

                <div className="text-muted-foreground space-y-4">
                  <p className="text-lg leading-relaxed">
                    BISA (Bantuan Inklusif Serta Akurat) adalah platform revolusioner yang
                    menggunakan kecerdasan buatan untuk mengoptimalkan distribusi bantuan sosial di
                    Indonesia. Dikembangkan khusus untuk instansi pemerintah, BISA memastikan setiap
                    bantuan tepat sasaran dan dapat dipertanggungjawabkan.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Platform ini lahir dari kebutuhan mendesak untuk meningkatkan efektivitas
                    program bantuan sosial pemerintah. Dengan memanfaatkan teknologi AI terdepan,
                    BISA mampu menganalisis data demografis, ekonomi, dan sosial untuk
                    mengidentifikasi penerima bantuan yang paling membutuhkan.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Visi kami adalah menciptakan ekosistem bantuan sosial yang transparan, akurat,
                    dan inklusif, sehingga tidak ada warga yang terlewat dari program pemerintah
                    yang berhak mereka terima.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative">
                <div className="relative mx-auto aspect-square w-full max-w-lg">
                  <Image
                    src="/about-visual.png"
                    alt="About BISA Visual"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 text-center">
              <Badge className="mb-3" variant="outline">
                TEKNOLOGI
              </Badge>
              <h2 className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                Teknologi yang Digunakan
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {techUsed.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}>
                  <Card className="group bg-background h-full border-0 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                    <CardContent className="flex h-full flex-col p-8 text-center">
                      <div className="relative mx-auto mb-6 h-20 w-20">
                        <Image
                          src={tech.icon}
                          alt={tech.title}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-foreground mb-4 text-xl font-bold transition-colors duration-300 group-hover:text-[#3E9EDB]">
                        {tech.title}
                      </h3>
                      <p className="text-muted-foreground flex-grow text-base leading-relaxed">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 text-center">
              <Badge className="mb-3" variant="outline">
                DUKUNGAN
              </Badge>
              <h2 className="font-heading text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Didukung Oleh
              </h2>
              <p className="text-muted-foreground text-lg">
                BISA dikembangkan dengan dukungan penuh dari institusi terpercaya dan melalui
                kompetisi inovasi teknologi tingkat nasional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-12">
              <div className="group text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <Image
                    src="/bi-logo.png"
                    alt="Bank Indonesia"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-foreground text-lg font-semibold">Bank Indonesia</h3>
              </div>

              <div className="group text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <Image
                    src="/ojk-logo.png"
                    alt="Otoritas Jasa Keuangan"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-foreground text-lg font-semibold">Otoritas Jasa Keuangan</h3>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 text-center">
              <Badge className="mb-3" variant="outline">
                MISI
              </Badge>
              <h2 className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                Misi Kami
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6">
              {mission.map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group mx-auto flex max-w-3xl items-start space-x-4">
                  <div className="relative mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lime-600/80 transition-transform duration-300 group-hover:scale-110">
                    <Check size={16} className="text-white" />
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground text-lg leading-relaxed transition-colors duration-300">
                    {mission}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
