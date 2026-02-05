'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  Book,
  Youtube
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Import topics data
import topicsData from '@/data/topics-list.json'

const iconMap: Record<string, any> = {
  BookOpen,
  Scale,
  Book,
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

export default function LandingPage() {
  // Sort topics by order
  const sortedTopics = [...topicsData.topics].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                  {topicsData.title}
                </h1>
                <p className="text-xs text-green-700 dark:text-green-300 hidden sm:block">
                  {topicsData.subtitle}
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
            <CardHeader className="pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-500 dark:to-emerald-600 flex items-center justify-center shadow-2xl"
              >
                <BookOpen className="h-12 w-12 text-white" />
              </motion.div>
              <CardTitle className="text-4xl font-bold text-green-900 dark:text-green-100 mb-4">
                {topicsData.title}
              </CardTitle>
              <CardDescription className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto">
                {topicsData.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {sortedTopics.map((topic) => {
            const Icon = iconMap[topic.icon]
            return (
              <motion.div
                key={topic.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={topic.route}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full"
                  >
                    <Card className="h-full border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur transition-all duration-300 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-600 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <motion.div
                            whileHover={{ rotate: 5 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50 shrink-0"
                          >
                            {Icon && <Icon className="h-8 w-8 text-green-700 dark:text-green-300" />}
                          </motion.div>
                          <div className="flex-1">
                            <CardTitle className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                              {topic.title}
                            </CardTitle>
                            <CardDescription className="text-base text-green-700 dark:text-green-300">
                              {topic.subtitle}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700 dark:text-green-300 mb-4">
                          {topic.description}
                        </p>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white">
                          شروع کریں
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-green-700 dark:text-green-300">
<<<<<<< HEAD
            {topicsData.subtitle} - Learn Islamic Information
=======
            {topicsData.subtitle} - Learn Islamic Sciences
>>>>>>> 43d9a39fdb475c5f4f1cbb9eba3ad5596351173c
          </p>
        </div>
      </footer>
    </div>
  )
}
