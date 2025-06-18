"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-3">
        <section className="py-20 bg-background">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium">
                  🎯 Tentang BISA
                </Badge>
                
                <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                  Apa itu BISA?
                </h1>
                
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    BISA (Bantuan Inklusif Serta Akurat) adalah platform revolusioner yang menggunakan kecerdasan buatan untuk mengoptimalkan distribusi bantuan sosial di Indonesia. Dikembangkan khusus untuk instansi pemerintah, BISA memastikan setiap bantuan tepat sasaran dan dapat dipertanggungjawabkan.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    Platform ini lahir dari kebutuhan mendesak untuk meningkatkan efektivitas program bantuan sosial pemerintah. Dengan memanfaatkan teknologi AI terdepan, BISA mampu menganalisis data demografis, ekonomi, dan sosial untuk mengidentifikasi penerima bantuan yang paling membutuhkan.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    Visi kami adalah menciptakan ekosistem bantuan sosial yang transparan, akurat, dan inklusif, sehingga tidak ada warga yang terlewat dari program pemerintah yang berhak mereka terima.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square w-full max-w-lg mx-auto">
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

        <section className="py-20 bg-muted/50">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3" variant="outline">
                TEKNOLOGI
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Teknologi yang Digunakan
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: "/AI Icon Container.png",
                  title: "AI Prediksi",
                  description: "Algoritma machine learning yang menganalisis pola data historis untuk memprediksi kebutuhan bantuan di berbagai wilayah dengan akurasi tinggi."
                },
                {
                  icon: "/Satellite Icon Container.png",
                  title: "Citra Satelit",
                  description: "Teknologi pemrosesan citra satelit untuk memantau kondisi geografis dan demografis wilayah, membantu identifikasi area prioritas bantuan."
                },
                {
                  icon: "/PLN Icon Container.png",
                  title: "Analisis Tagihan Listrik",
                  description: "Integrasi dengan data PLN untuk menganalisis pola konsumsi listrik sebagai indikator tingkat ekonomi rumah tangga dan kebutuhan bantuan."
                },
                {
                  icon: "/Dashboard Icon Container.png",
                  title: "Dashboard Visual",
                  description: "Interface interaktif dengan visualisasi data real-time, memungkinkan pengambil keputusan memantau dan mengevaluasi efektivitas program bantuan."
                }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full group bg-background">
                    <CardContent className="p-8 text-center h-full flex flex-col">
                      <div className="w-20 h-20 mx-auto mb-6 relative">
                        <Image
                          src={tech.icon}
                          alt={tech.title}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[#3E9EDB] transition-colors duration-300">
                        {tech.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed flex-grow">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3" variant="outline">
                DUKUNGAN
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
                Didukung Oleh
              </h2>
              <p className="text-lg text-muted-foreground">
                BISA dikembangkan dengan dukungan penuh dari institusi terpercaya dan melalui kompetisi inovasi teknologi tingkat nasional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-12 flex-wrap"
            >
              <div className="text-center group">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/BI Logo Large.png"
                    alt="Bank Indonesia"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Bank Indonesia</h3>
              </div>
              
              <div className="text-center group">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/OJK Logo Large.png"
                    alt="Otoritas Jasa Keuangan"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Otoritas Jasa Keuangan</h3>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3" variant="outline">
                MISI
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Misi Kami
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                "Meningkatkan akurasi targeting penerima bantuan sosial hingga 95%",
                "Mengurangi waktu proses distribusi bantuan dari bulan menjadi hari",
                "Menciptakan transparansi penuh dalam setiap tahap distribusi bantuan",
                "Membangun ekosistem data terintegrasi untuk program bantuan sosial nasional"
              ].map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 relative mt-1">
                    <Image
                      src="/Check Icon.png"
                      alt="Check"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
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