'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  MapPin,
  User,
  Home,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'

// Import content
import salahuddinContent from '@/data/salahuddin-content.json'

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
}

export default function SalahuddinApp() {
  const isMobile = useIsMobile()

  // Navigation Logic
  const currentTopicId = 'salahuddin'
  const allTopics = [
    { id: 'tajweed', route: '/tajweed', title: 'تجوید القرآن' },
    { id: 'jannah', route: '/jannah', title: 'جنت کی سیر' },
    { id: 'salahuddin', route: '/salahuddin', title: 'سلطان صلاح الدین ایوبی' },
    { id: 'hadith', route: '/hadith', title: 'حدیث' }
  ]
  
  const currentTopicIndex = allTopics.findIndex((t) => t.id === currentTopicId)
  const nextTopic = allTopics[currentTopicIndex + 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-stone-100 dark:from-slate-950 dark:via-stone-900 dark:to-neutral-950 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-amber-200/50 dark:border-amber-800/30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 flex items-center justify-center shadow-md"
            >
              <User className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                {salahuddinContent.meta.title}
              </h1>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80 hidden sm:block">
                {salahuddinContent.meta.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/30"
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-64 md:h-80 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent z-10" />
        <Image
          src={salahuddinContent.heroImage}
          alt="Salahuddin Al-Ayyubi"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-8 text-center px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Badge className="mb-2 bg-amber-600 text-white px-3 py-1 text-xs">سلطنت ایوبیہ</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              {salahuddinContent.meta.title}
            </h2>
            <p className="text-amber-100 mt-2 text-sm md:text-base max-w-xl mx-auto drop-shadow">
              {salahuddinContent.meta.description}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Timeline Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Vertical Line - Logic Updated for Mobile */}
          <div className="absolute h-full w-1 bg-gradient-to-b from-amber-400 via-orange-300 to-transparent rounded-full -translate-x-1/2 left-5 md:left-1/2" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-0">
            {salahuddinContent.timeline.map((event, index) => (
              <motion.div
                key={event.id}
                id={event.id}
                variants={fadeInUp}
                className={`relative flex items-center w-full mb-8 md:mb-16`}
              >
                {/* Content Card - Logic Updated for Mobile */}
                <div className={`w-full ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 
                    ? 'md:mr-auto md:pr-8 md:text-right' 
                    : 'md:ml-auto md:pl-8 md:text-left' 
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card 
                      className="bg-white dark:bg-slate-800/70 border border-amber-100 dark:border-amber-800/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <CardHeader className="pb-2">
                        <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className="shrink-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 p-2 rounded-lg border border-amber-200 dark:border-amber-700">
                            <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                            <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-sm mt-1">
                              <span>{event.year}</span>
                              <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                              <span>{event.age}</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        {/* Summary */}
                        <div className={`flex items-start gap-2 text-slate-600 dark:text-slate-300 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <MapPin className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                          <p className="text-sm font-semibold">
                            {event.location}: {event.summary}
                          </p>
                        </div>

                        {/* Details Section - Always Visible */}
                        <div>
                          <Separator className="my-4 bg-amber-100 dark:bg-amber-800/50" />
                          
                          {/* Image Section (If exists) */}
                          {event.image && (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 border border-amber-100">
                              <Image 
                                src={event.image} 
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Detailed Text */}
                          <div className={`space-y-3 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`} dir="rtl">
                            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 mb-2">
                              <BookOpen className="h-4 w-4" />
                              <h4 className="font-bold">تفصیلات</h4>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                              {event.details}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline Dot - Logic Updated for Mobile */}
                <div className="absolute left-5 -translate-x-1/2 md:left-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Topic Navigation Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-8"
        >
          {nextTopic ? (
            <Link href={nextTopic.route}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-6 shadow-lg hover:shadow-xl transition-all">
                <ArrowRight className="h-5 w-5 mr-2" />
                اگلا موضوع: {nextTopic.title}
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-6 shadow-lg hover:shadow-xl transition-all">
                <Home className="h-5 w-5 mr-2" />
                مکمل ہوا: ہوم پر واپس جائیں
              </Button>
            </Link>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-100 dark:border-amber-900/30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-200 mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold">تاریخ کا سبق</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto" dir="rtl">
            سلطان صلاح الدین ایوبی نے صرف زمین نہیں جیتی، بلکہ لوگوں کے دل بھی جیتے۔ ان کی زندگی ہمیں استقامت، رحم اور انصاف کا سبق دیتی ہے۔
          </p>
        </div>
      </footer>
    </div>
  )
}