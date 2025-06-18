"use client";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShineButton } from "@/components/ui/shine-button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RiArrowRightLine,
  RiEyeLine,
  RiTeamLine,
  RiStarFill,
} from "react-icons/ri";
import { Target, Eye, BarChart3, Users } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";


const socialAidTestimonials = [
  {
    quote: "BISA membantu kami mengidentifikasi penerima bantuan yang tepat dengan akurasi 95%. Data yang komprehensif membuat distribusi bantuan jauh lebih efektif.",
    name: "Dr. Siti Nurhaliza",
    role: "Kepala Dinas Sosial, Jawa Barat"
  },
  {
    quote: "Platform ini mengubah cara kami mengelola program bantuan sosial. Transparansi dan akuntabilitas meningkat drastis sejak menggunakan BISA.",
    name: "Bambang Sutrisno",
    role: "Direktur Bantuan Sosial, Kemensos"
  },
  {
    quote: "Dengan BISA, kami dapat memonitor distribusi bantuan secara real-time dan memastikan tidak ada yang terlewat dari sasaran.",
    name: "Ir. Maya Sari",
    role: "Kepala BPBD, DKI Jakarta"
  },
  {
    quote: "Sistem AI yang canggih membantu kami mengoptimalkan alokasi anggaran bantuan sosial dengan data yang akurat dan terpercaya.",
    name: "Prof. Dr. Ahmad Fauzi",
    role: "Kepala Bappeda, Jawa Timur"
  }
];

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-5">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-25">
          <BackgroundGradient
            animate={true}
            className="opacity-20"
            containerClassName="absolute inset-0"
          />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Column 1 - Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
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
                  
                  <p className="text-lg text-muted-foreground md:text-xl max-w-lg">
                    Platform AI untuk distribusi bantuan sosial yang adil dan akurat. 
                    Membantu instansi pemerintah menyalurkan bantuan tepat sasaran 
                    dengan teknologi terdepan.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard">
                    <ShineButton 
                      size="lg" 
                      className="h-14 px-10 text-white bg-[#3E9EDB] hover:bg-[#2E7BC6] border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                    >
                      Login ke Dashboard
                      <RiArrowRightLine className="ml-2 h-5 w-5" />
                    </ShineButton>
                  </Link>
                </div>
              </motion.div>

              {/* Column 2 - Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square w-full max-w-lg mx-auto">
                  {/* Floating elements untuk visual appeal */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
                  
                  <Image
                    src="/hero.png"
                    alt="BISA Platform Dashboard"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                  
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5 rounded-lg"></div>
                </div>
                
                {/* Floating info cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">95%</span>
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
                  className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">50+</span>
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

        {/* Features Section - Enhanced */}
        <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-3" variant="outline">
                  FITUR UNGGULAN
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
                <p className="text-lg text-gray-600">
                  Teknologi AI terdepan untuk distribusi bantuan sosial yang efektif dan transparan
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Target className="w-6 h-6 text-green-600" />,
                  title: "Targeting Akurat",
                  description: "AI menganalisis data untuk memastikan bantuan tepat sasaran sesuai kriteria penerima.",
                  color: "bg-green-100",
                  stats: "95% Akurasi"
                },
                {
                  icon: <Eye className="w-6 h-6 text-blue-600" />,
                  title: "Pemantauan Real-time",
                  description: "Sistem tracking real-time untuk memantau distribusi bantuan dari awal hingga akhir dengan transparansi penuh.",
                  color: "bg-blue-100",
                  stats: "24/7 Monitoring"
                },
                {
                  icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
                  title: "Analisis Mendalam",
                  description: "Dashboard analitik komprehensif untuk evaluasi efektivitas program bantuan sosial dan prediksi kebutuhan.",
                  color: "bg-blue-100",
                  stats: "20+ Metrics"
                },
                {
                  icon: <Users className="w-6 h-6 text-green-600" />,
                  title: "Kolaborasi Multi-Instansi",
                  description: "Platform terintegrasi untuk koordinasi antar instansi dalam pengelolaan bantuan dengan workflow yang efisien.",
                  color: "bg-green-100",
                  stats: "Multi-Level Access"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full group bg-white/80 backdrop-blur-sm hover:bg-white relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <CardContent className="p-8 text-center h-full flex flex-col relative z-10">
                      <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed flex-grow mb-6">
                        {feature.description}
                      </p>
                      <div className="mt-auto">
                        <Badge variant="secondary" className="text-sm px-4 py-2 bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors duration-300">
                          {feature.stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Keamanan Data Terjamin",
                  description: "Enkripsi end-to-end dan compliance dengan standar keamanan pemerintah",
                  icon: "🔒"
                },
                {
                  title: "Integrasi Mudah",
                  description: "API yang fleksibel untuk integrasi dengan sistem yang sudah ada",
                  icon: "🔗"
                },
                {
                  title: "Laporan Otomatis",
                  description: "Generate laporan komprehensif secara otomatis untuk akuntabilitas",
                  icon: "📊"
                },
                {
                  title: "Support 24/7",
                  description: "Tim teknis siap membantu implementasi dan troubleshooting",
                  icon: "🛟"
                },
                {
                  title: "Machine Learning",
                  description: "Algoritma yang terus belajar untuk meningkatkan akurasi targeting",
                  icon: "🧠"
                },
                {
                  title: "Mobile Ready",
                  description: "Akses dari berbagai device untuk mobilitas petugas lapangan",
                  icon: "📱"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-start space-x-4 p-6 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-gray-200">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white relative">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3" variant="outline">
                CARA KERJA
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Bagaimana BISA Bekerja?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Proses sederhana namun powerful yang menggunakan AI untuk mengidentifikasi dan menyalurkan bantuan tepat sasaran
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Data Collection & Analysis",
                  description: "AI mengumpulkan dan menganalisis data demografis, ekonomi, dan sosial dari berbagai sumber untuk mendapatkan gambaran komprehensif masyarakat",
                  icon: "📊",
                  color: "from-blue-500 to-blue-700"
                },
                {
                  step: "02", 
                  title: "Smart Targeting & Classification",
                  description: "Algoritma machine learning mengklasifikasikan dan memprioritaskan calon penerima bantuan berdasarkan tingkat kebutuhan dan kriteria yang ditetapkan",
                  icon: "🎯",
                  color: "from-purple-500 to-purple-700"
                },
                {
                  step: "03",
                  title: "Distribution & Monitoring",
                  description: "Sistem memantau proses distribusi secara real-time dan memberikan laporan transparan serta feedback untuk perbaikan berkelanjutan",
                  icon: "📱",
                  color: "from-green-500 to-green-700"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  
                  <div className="relative z-10 text-center">
                    {/* Step Number */}
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="text-4xl mb-4">{item.icon}</div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Teknologi yang Digunakan</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {["Machine Learning", "Big Data Analytics", "Cloud Computing", "API Integration", "Real-time Monitoring", "Data Security"].map((tech, index) => (
                  <div key={index} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-primary/5 transform skew-y-3"></div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3" variant="outline">
                TESTIMONIAL
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Dipercaya Berbagai Instansi Pemerintah
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Pengalaman nyata dari instansi pemerintah yang telah merasakan manfaat platform BISA dalam distribusi bantuan sosial
              </p>
            </motion.div>

            <div className="relative px-8 md:px-12">
              <InfiniteMovingCards
                items={socialAidTestimonials}
                direction="right"
                speed="slow"
              />
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: "50+", label: "Instansi Pemerintah", icon: "🏛️", color: "from-blue-500 to-blue-700" },
                { number: "2.5M+", label: "Penerima Bantuan", icon: "👥", color: "from-green-500 to-green-700" },
                { number: "95%", label: "Tingkat Akurasi", icon: "🎯", color: "from-purple-500 to-purple-700" },
                { number: "30%", label: "Efisiensi Peningkatan", icon: "📈", color: "from-orange-500 to-orange-700" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
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
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          </div>
          
          <div className="container max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3" variant="outline">
                KONTAK KAMI
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Mari Berkolaborasi untuk Indonesia yang Lebih Baik
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Hubungi tim kami untuk konsultasi, demo platform, atau kerjasama implementasi BISA di instansi Anda
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
                  <div className="space-y-6">
                    {[
                      {
                        icon: "📧",
                        title: "Email",
                        content: "info@bisa.go.id",
                        subtitle: "Tim akan merespons dalam 24 jam"
                      },
                      {
                        icon: "📞",
                        title: "Telepon",
                        content: "+62 21 1234 5678",
                        subtitle: "Senin - Jumat, 08:00 - 17:00 WIB"
                      },
                      {
                        icon: "📍",
                        title: "Alamat",
                        content: "Gedung Kementerian Sosial RI",
                        subtitle: "Jl. Saharjo No.31, Jakarta Selatan 12950"
                      },
                      {
                        icon: "🤝",
                        title: "Partnership",
                        content: "partnership@bisa.go.id",
                        subtitle: "Untuk kerjasama dan kemitraan strategis"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-blue-600 font-medium">{item.content}</p>
                          <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <h4 className="font-bold text-gray-900 mb-4">Tim Dukungan 24/7</h4>
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

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama Lengkap *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Masukkan nama lengkap"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jabatan
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Jabatan Anda"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="email@instansi.go.id"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nomor Telepon
                          </label>
                          <input
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="+62 812 3456 7890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instansi/Organisasi *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Nama instansi/organisasi"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jenis Kebutuhan
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pesan *
                        </label>
                        <textarea
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                          placeholder="Jelaskan kebutuhan Anda secara detail..."
                        ></textarea>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                          Saya setuju dengan{" "}
                          <Link href="#privacy" className="text-blue-600 hover:underline">
                            Kebijakan Privasi
                          </Link>{" "}
                          dan{" "}
                          <Link href="#terms" className="text-blue-600 hover:underline">
                            Syarat & Ketentuan
                          </Link>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-[#3E9EDB] hover:bg-[#2E7BC6] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        Kirim Pesan
                        <RiArrowRightLine className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  🚀 Siap untuk Transformasi Digital?
                </h4>
                <p className="text-gray-600 mb-6">
                  Bergabunglah dengan 50+ instansi pemerintah yang telah mempercayai BISA untuk distribusi bantuan sosial yang lebih efektif
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

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-primary/5 p-8 md:p-12 lg:p-16 relative overflow-hidden"
            >
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
                  Bergabunglah dengan puluhan instansi pemerintah yang telah merasakan efektivitas platform BISA dalam menyalurkan bantuan tepat sasaran.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <ShineButton 
                      size="lg" 
                      className="h-14 px-10 text-white bg-[#3E9EDB] hover:bg-[#2E7BC6] border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
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