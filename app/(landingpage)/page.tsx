'use client';

import { FaqSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { ShineButton } from '@/components/ui/shine-button';
import { features } from '@/lib/constants/landing_page/featureLanding';
import { featureUnggulan } from '@/lib/constants/landing_page/fiturUnggulan';
import { socialAidTestimonials } from '@/lib/constants/landing_page/socialTestimonials';
import { stats } from '@/lib/constants/landing_page/stats';
import { techstack } from '@/lib/constants/landing_page/techStack';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightLine } from 'react-icons/ri';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-5">
        <section className="md:py-25 relative overflow-hidden py-20">
          <BackgroundGradient
            animate={true}
            className="opacity-20"
            containerClassName="absolute inset-0"
          />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8">
                <div className="space-y-4">
                  <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium">
                    🎯 Platform AI untuk Bantuan Sosial Tepat Sasaran
                  </Badge>

                  <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="block">BISA –</span>
                    <span className="block">
                      <AnimatedGradientText>Bantuan Inklusif</AnimatedGradientText>
                    </span>
                    <span className="block">& Sasaran Akurat</span>
                  </h1>

                  <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
                    Platform AI untuk distribusi bantuan sosial yang adil dan akurat. Membantu
                    instansi pemerintah menyalurkan bantuan tepat sasaran dengan teknologi terdepan.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/dashboard">
                    <ShineButton
                      size="lg"
                      className="h-14 transform border-0 bg-[#3E9EDB] px-10 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2E7BC6] hover:shadow-xl">
                      Login ke Dashboard
                      <RiArrowRightLine className="ml-2 h-5 w-5" />
                    </ShineButton>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative">
                <div className="relative mx-auto aspect-square w-full max-w-lg">
                  <div className="absolute -left-4 -top-4 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-20"></div>
                  <div className="absolute -bottom-4 -right-4 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-green-400 to-blue-500 opacity-20 delay-1000"></div>
                  <div className="absolute -left-8 top-1/2 h-12 w-12 animate-bounce rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20"></div>

                  <Image
                    src="/hero.png"
                    alt="BISA Platform Dashboard"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />

                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/10 via-transparent to-white/5"></div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 rounded-lg border border-gray-100 bg-white p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <span className="text-sm font-bold text-green-600">95%</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Akurasi AI</p>
                      <p className="text-xs text-gray-500">Targeting Tepat</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="absolute -right-3 -top-6 rounded-lg border border-gray-100 bg-white p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-bold text-blue-600">50+</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Instansi</p>
                      <p className="text-xs text-gray-500">Terpercaya</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="absolute left-10 top-20 h-64 w-64 animate-pulse rounded-full bg-blue-200 opacity-20 mix-blend-multiply blur-xl filter"></div>
            <div className="absolute right-10 top-40 h-64 w-64 animate-pulse rounded-full bg-purple-200 opacity-20 mix-blend-multiply blur-xl filter delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 h-64 w-64 animate-pulse rounded-full bg-green-200 opacity-20 mix-blend-multiply blur-xl filter delay-500"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <Badge className="mb-3" variant="outline">
                  FITUR UNGGULAN
                </Badge>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Fitur Unggulan</h2>
                <p className="text-lg text-gray-600">
                  Teknologi AI terdepan untuk distribusi bantuan sosial yang efektif dan transparan
                </p>
              </motion.div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description, color, stats }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}>
                  <Card className="group relative h-full overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <CardContent className="relative z-10 flex h-full flex-col p-8 text-center">
                      <div
                        className={`h-16 w-16 ${color} mx-auto mb-6 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-500 group-hover:rotate-3 group-hover:scale-110`}>
                        <Icon
                          className={`h-6 w-6 ${
                            color.includes('green') ? 'text-green-600' : 'text-blue-600'
                          }`}
                        />
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                        {title}
                      </h3>
                      <p className="mb-6 flex-grow text-base leading-relaxed text-gray-600">
                        {description}
                      </p>
                      <div className="mt-auto">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 px-4 py-2 text-sm text-blue-700 transition-colors duration-300 group-hover:bg-blue-100">
                          {stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featureUnggulan.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group">
                  <div className="flex transform items-start space-x-4 rounded-xl border border-gray-100 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-200 hover:bg-white hover:shadow-lg">
                    <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-2 font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="relative bg-white py-20">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 text-center">
              <Badge className="mb-3" variant="outline">
                CARA KERJA
              </Badge>
              <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Bagaimana BISA Bekerja?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Proses sederhana namun powerful yang menggunakan AI untuk mengidentifikasi dan
                menyalurkan bantuan tepat sasaran
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Data Collection & Analysis',
                  description:
                    'AI mengumpulkan dan menganalisis data demografis, ekonomi, dan sosial dari berbagai sumber untuk mendapatkan gambaran komprehensif masyarakat',
                  icon: '📊',
                  color: 'from-blue-500 to-blue-700',
                },
                {
                  step: '02',
                  title: 'Smart Targeting & Classification',
                  description:
                    'Algoritma machine learning mengklasifikasikan dan memprioritaskan calon penerima bantuan berdasarkan tingkat kebutuhan dan kriteria yang ditetapkan',
                  icon: '🎯',
                  color: 'from-purple-500 to-purple-700',
                },
                {
                  step: '03',
                  title: 'Distribution & Monitoring',
                  description:
                    'Sistem memantau proses distribusi secara real-time dan memberikan laporan transparan serta feedback untuk perbaikan berkelanjutan',
                  icon: '📱',
                  color: 'from-green-500 to-green-700',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative">
                  <div className="relative z-10 text-center">
                    <div
                      className={`mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-lg font-bold text-white shadow-lg`}>
                      {item.step}
                    </div>

                    <div className="mb-4 text-4xl">{item.icon}</div>

                    <h3 className="mb-4 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-20 text-center">
              <h3 className="mb-8 text-2xl font-bold text-gray-900">Teknologi yang Digunakan</h3>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {techstack.map((tech, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-20">
          <div className="absolute inset-0 skew-y-3 transform bg-primary/5"></div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 text-center">
              <Badge className="mb-3" variant="outline">
                TESTIMONIAL
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Dipercaya Berbagai Instansi Pemerintah
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Pengalaman nyata dari instansi pemerintah yang telah merasakan manfaat platform BISA
                dalam distribusi bantuan sosial
              </p>
            </motion.div>

            <div className="relative px-8 md:px-12">
              <InfiniteMovingCards items={socialAidTestimonials} direction="right" speed="slow" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center">
                  <div className="transform rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
                      {stat.icon}
                    </div>
                    <div
                      className={`bg-gradient-to-r text-4xl font-bold ${stat.color} mb-2 bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* FAQ Section */}
        <FaqSection />

        {/* Contact Section */}
        <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
          {/* Background decorations */}
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="absolute left-10 top-20 h-64 w-64 animate-pulse rounded-full bg-blue-200 opacity-20 mix-blend-multiply blur-xl filter"></div>
            <div className="absolute bottom-20 right-10 h-64 w-64 animate-pulse rounded-full bg-green-200 opacity-20 mix-blend-multiply blur-xl filter delay-1000"></div>
          </div>

          <div className="container relative z-10 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 text-center">
              <Badge className="mb-3" variant="outline">
                KONTAK KAMI
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Mari Berkolaborasi untuk Indonesia yang Lebih Baik
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Hubungi tim kami untuk konsultasi, demo platform, atau kerjasama implementasi BISA
                di instansi Anda
              </p>
            </motion.div>

            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8">
                <div>
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">Informasi Kontak</h3>
                  <div className="space-y-6">
                    {[
                      {
                        icon: '📧',
                        title: 'Email',
                        content: 'info@bisa.go.id',
                        subtitle: 'Tim akan merespons dalam 24 jam',
                      },
                      {
                        icon: '📞',
                        title: 'Telepon',
                        content: '+62 21 1234 5678',
                        subtitle: 'Senin - Jumat, 08:00 - 17:00 WIB',
                      },
                      {
                        icon: '📍',
                        title: 'Alamat',
                        content: 'Gedung Kementerian Sosial RI',
                        subtitle: 'Jl. Saharjo No.31, Jakarta Selatan 12950',
                      },
                      {
                        icon: '🤝',
                        title: 'Partnership',
                        content: 'partnership@bisa.go.id',
                        subtitle: 'Untuk kerjasama dan kemitraan strategis',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="group flex items-start space-x-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-colors duration-300 group-hover:bg-blue-200">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold text-gray-900">{item.title}</h4>
                          <p className="font-medium text-blue-600">{item.content}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                  <h4 className="mb-4 font-bold text-gray-900">Tim Dukungan 24/7</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">&lt; 2h</div>
                      <div className="text-sm text-gray-600">Waktu Respons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-gray-600">Kepuasan Klien</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}>
                <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">Kirim Pesan</h3>
                    <form className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Lengkap *
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama lengkap"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Jabatan
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Jabatan Anda"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email *
                          </label>
                          <input
                            type="email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="email@instansi.go.id"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nomor Telepon
                          </label>
                          <input
                            type="tel"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="+62 812 3456 7890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Instansi/Organisasi *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          placeholder="Nama instansi/organisasi"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Jenis Kebutuhan
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500">
                          <option value="">Pilih jenis kebutuhan</option>
                          <option value="demo">Request Demo Platform</option>
                          <option value="implementation">Implementasi BISA</option>
                          <option value="consultation">Konsultasi Teknis</option>
                          <option value="partnership">Kemitraan Strategis</option>
                          <option value="support">Dukungan Teknis</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Pesan *
                        </label>
                        <textarea
                          rows={5}
                          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          placeholder="Jelaskan kebutuhan Anda secara detail..."></textarea>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                          Saya setuju dengan{' '}
                          <Link href="#privacy" className="text-blue-600 hover:underline">
                            Kebijakan Privasi
                          </Link>{' '}
                          dan{' '}
                          <Link href="#terms" className="text-blue-600 hover:underline">
                            Syarat & Ketentuan
                          </Link>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full transform rounded-lg bg-[#3E9EDB] font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2E7BC6] hover:shadow-xl">
                        Kirim Pesan
                        <RiArrowRightLine className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center">
              <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h4 className="mb-4 text-xl font-bold text-gray-900">
                  🚀 Siap untuk Transformasi Digital?
                </h4>
                <p className="mb-6 text-gray-600">
                  Bergabunglah dengan 50+ instansi pemerintah yang telah mempercayai BISA untuk
                  distribusi bantuan sosial yang lebih efektif
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="outline" className="px-4 py-2">
                    Setup Cepat
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    Training Gratis
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    Support 24/7
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    ROI Terbukti
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 md:p-12 lg:p-16">
              <BackgroundGradient
                animate={false}
                className="opacity-30"
                containerClassName="absolute inset-0"
              />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Siap mengoptimalkan distribusi bantuan sosial Anda?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Bergabunglah dengan puluhan instansi pemerintah yang telah merasakan efektivitas
                  platform BISA dalam menyalurkan bantuan tepat sasaran.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/dashboard">
                    <ShineButton
                      size="lg"
                      className="h-14 transform border-0 bg-[#3E9EDB] px-10 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2E7BC6] hover:shadow-xl">
                      Mulai Sekarang
                      <RiArrowRightLine className="ml-2 h-5 w-5" />
                    </ShineButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
