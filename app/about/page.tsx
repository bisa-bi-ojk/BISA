'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Footer } from '@/components/footer';
import { techUsed } from '@/lib/constants/about/techUsed';
import { mission } from '@/lib/constants/about/mission';

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

                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Apa itu BISA?
                </h1>

                <div className="space-y-4 text-muted-foreground">
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
                    src="/About Visual.png"
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
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
                  <Card className="group h-full border-0 bg-background shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                    <CardContent className="flex h-full flex-col p-8 text-center">
                      <div className="relative mx-auto mb-6 h-20 w-20">
                        <Image
                          src={tech.icon}
                          alt={tech.title}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#3E9EDB]">
                        {tech.title}
                      </h3>
                      <p className="flex-grow text-base leading-relaxed text-muted-foreground">
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
              <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Didukung Oleh
              </h2>
              <p className="text-lg text-muted-foreground">
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
                    src="/BI Logo Large.png"
                    alt="Bank Indonesia"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Bank Indonesia</h3>
              </div>

              <div className="group text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <Image
                    src="/OJK Logo Large.png"
                    alt="Otoritas Jasa Keuangan"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Otoritas Jasa Keuangan</h3>
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
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
                  className="group flex items-start space-x-4">
                  <div className="relative mt-1 h-8 w-8 flex-shrink-0">
                    <Image
                      src="/Check Icon.png"
                      alt="Check"
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
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
