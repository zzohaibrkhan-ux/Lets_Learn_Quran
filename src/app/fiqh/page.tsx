'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  MapPin,
  Sparkles,
  Clock,
  Pause,
  X,
  Menu,
  ChevronRight,
  Home,
  ArrowRight,
  ScrollText,
  Info,
  Youtube,
  Scale
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'

// Import Fiqh content
import fiqhContent from '@/data/fiqh-content.json'

// Icon mapping
const iconMap: Record<string, any> = {
  BookOpen,
  MapPin,
  Sparkles,
  N: ({ className }: { className?: string }) => <div className={`flex items-center justify-center ${className}`}>ن</div>,
  M: ({ className }: { className?: string }) => <div className={`flex items-center justify-center ${className}`}>م</div>,
  Clock,
  Pause,
  A: ({ className }: { className?: string }) => <div className={`flex items-center justify-center ${className}`}>ء</div>,
  Scale,
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
}

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function TajweedApp() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useIsMobile()

  // Auto-close sidebar on mobile when a chapter is selected
  const sidebarShouldBeOpen = !isMobile || !selectedChapter
  const isSidebarOpen = sidebarOpen ? sidebarShouldBeOpen : false

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(chapterId)
    setSelectedSection(null)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId)
  }

  const handleBackToChapters = () => {
    setSelectedSection(null)
  }

  const selectedChapterData = fiqhContent.chapters.find(
    (ch) => ch.id === selectedChapter
  )

  const selectedSectionData = selectedChapterData?.sections.find(
    (sec) => sec.id === selectedSection
  )

  // Sort chapters by order
  const sortedChapters = [...fiqhContent.chapters].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-500 dark:to-emerald-600 flex items-center justify-center shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-900 dark:text-green-100">
                  {fiqhContent.meta.title}
                </h1>
                <p className="text-xs text-green-700 dark:text-green-300 hidden sm:block">
                  {fiqhContent.meta.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.youtube.com/@Lets_Learn_Quran_ZA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Youtube className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">YouTube</span>
              </Button>
            </a>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed lg:relative z-50 lg:z-auto w-80 lg:min-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 rounded-xl shadow-xl lg:shadow-lg border-2 lg:border border-green-200 dark:border-green-800 ${isMobile ? 'top-16 left-0 h-[calc(100vh-4rem)]' : ''}`}
              >
                <div className="p-4 flex flex-col h-full lg:min-h-full lg:max-h-full">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h2 className="text-lg font-bold text-green-900 dark:text-green-100">
                      فہرست
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(false)}
                      className="lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <ScrollArea className="flex-1 overflow-y-auto">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2 p-1 pb-4"
                    >
                      {sortedChapters.map((chapter) => {
                        const Icon = iconMap[chapter.icon]
                        return (
                          <motion.button
                            key={chapter.id}
                            variants={sidebarItemVariants}
                            onClick={() => handleChapterClick(chapter.id)}
                            className={`w-full text-right p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                              selectedChapter === chapter.id
                                ? 'bg-gradient-to-l from-green-600 to-emerald-700 text-white shadow-md'
                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-green-100 dark:hover:bg-green-900/30 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {Icon && (
                              <div className={`p-2 rounded-lg ${
                                selectedChapter === chapter.id
                                  ? 'bg-white/20'
                                  : 'bg-white dark:bg-slate-700'
                              }`}>
                                <Icon className="h-5 w-5" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-semibold text-sm md:text-base">
                                {chapter.title}
                              </div>
                              <div className="text-xs opacity-80">
                                {chapter.subtitle}
                              </div>
                            </div>
                            {selectedChapter === chapter.id && (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  </ScrollArea>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Display Area */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-[calc(100vh-8rem)]"
          >
            <AnimatePresence mode="wait">
              {!selectedChapter ? (
                // Home Page - All Chapters
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-500 dark:to-emerald-600 flex items-center justify-center shadow-xl"
                      >
                        <BookOpen className="h-10 w-10 text-white" />
                      </motion.div>
                      <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
                        {fiqhContent.meta.title}
                      </CardTitle>
                      <CardDescription className="text-base text-green-700 dark:text-green-300 max-w-2xl mx-auto">
                        {fiqhContent.meta.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                  >
                    {sortedChapters.map((chapter, index) => {
                      const Icon = iconMap[chapter.icon]
                      return (
                        <motion.div
                          key={chapter.id}
                          variants={itemVariants}
                          className="group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-full cursor-pointer"
                            onClick={() => handleChapterClick(chapter.id)}
                          >
                            <Card className="h-full border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur transition-all duration-300 hover:shadow-xl hover:border-green-400 dark:hover:border-green-600">
                              <CardHeader>
                                <div className="flex items-start gap-4">
                                  <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50"
                                  >
                                    {Icon && <Icon className="h-6 w-6 text-green-700 dark:text-green-300" />}
                                  </motion.div>
                                  <div className="flex-1">
                                    <CardTitle className="text-xl font-bold text-green-900 dark:text-green-100 mb-1">
                                      {chapter.title}
                                    </CardTitle>
                                    <CardDescription className="text-green-700 dark:text-green-300">
                                      {chapter.subtitle}
                                    </CardDescription>
                                  </div>
                                  <ArrowRight className="h-5 w-5 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300">
                                    {chapter.sections.length} موضوعات
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              ) : selectedChapterData && !selectedSection ? (
                // Chapter Detail - All Sections
                <motion.div
                  key={selectedChapter}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ rotate: -180 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.5 }}
                          className="p-4 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-500 dark:to-emerald-600"
                        >
                          <ScrollText className="h-8 w-8 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
                            {selectedChapterData.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-green-700 dark:text-green-300">
                            {selectedChapterData.subtitle}
                          </CardDescription>
                        </div>
                        <Link href="/">
                          <Button
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
                          >
                            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                            واپس
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                  </Card>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {selectedChapterData.sections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        variants={itemVariants}
                      >
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="cursor-pointer"
                          onClick={() => handleSectionClick(section.id)}
                        >
                          <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur transition-all duration-300 hover:shadow-xl hover:border-green-400 dark:hover:border-green-600">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-2xl font-bold text-green-900 dark:text-green-100 mb-1">
                                    {section.title}
                                  </CardTitle>
                                  <CardDescription className="text-green-700 dark:text-green-300">
                                    {section.subtitle}
                                  </CardDescription>
                                </div>
                                <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                              </div>
                            </CardHeader>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ) : selectedSectionData && selectedChapterData ? (
                // Section Detail - Full Content
                <motion.div
                  key={selectedSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2">
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
                      >
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                        ہوم
                      </Button>
                    </Link>
                    <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <Button
                      variant="outline"
                      onClick={handleBackToChapters}
                      className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
                    >
                      {selectedChapterData.title}
                    </Button>
                  </div>

                  <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
                    <CardHeader>
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className="mb-4">
                          <Info className="h-16 w-16 mx-auto text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
                          {selectedSectionData.title}
                        </CardTitle>
                        <CardDescription className="text-xl text-green-700 dark:text-green-300">
                          {selectedSectionData.subtitle}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <Separator className="bg-green-200 dark:bg-green-800" />
                    <CardContent className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                      >
                        {/* Main Content */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center gap-2">
                            <ScrollText className="h-5 w-5" />
                            تفصیل
                          </h3>
                          <div className="space-y-3">
                            {selectedSectionData.content.map((paragraph, index) => (
                              <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="text-lg text-right leading-relaxed text-slate-700 dark:text-slate-300 bg-gradient-to-l from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800"
                                dir="rtl"
                              >
                                {paragraph}
                              </motion.p>
                            ))}
                          </div>
                        </div>

                        {/* Notes Section */}
                        {selectedSectionData.notes && selectedSectionData.notes.length > 0 && (
                          <div className="space-y-3">
                            <h3 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center gap-2">
                              <Sparkles className="h-5 w-5" />
                              نوٹس
                            </h3>
                            <div className="space-y-2">
                              {selectedSectionData.notes.map((note, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 * index }}
                                  className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                                  dir="rtl"
                                >
                                  <Badge variant="secondary" className="bg-amber-200 text-amber-900 dark:bg-amber-900/50 dark:text-amber-300 shrink-0">
                                    {index + 1}
                                  </Badge>
                                  <p className="text-base text-amber-900 dark:text-amber-300">
                                    {note}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm text-green-700 dark:text-green-300">
            {fiqhContent.meta.subtitle} - Learning Quranic Recitation Rules
          </p>
        </div>
      </footer>
    </div>
  )
}
