'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  Book,
  User,
  Youtube,
  MessageCircle,
  X,
  MessageSquare,
  Folder
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Import topics data
import topicsData from '@/data/topics-list.json'

// Define the type for Topic
type Topic = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  route: string;
  order: number;
  category: string;
}

const iconMap: Record<string, any> = {
  BookOpen,
  Scale,
  Book,
  User,
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

// Category order for display and slicers
const categoryOrder = ["Quran", "Islamic Knowledge", "Islamic History"]

export default function LandingPage() {
  // Search State
  const [searchQuery, setSearchQuery] = useState("")
  
  // Category Slicer State
  const [activeCategory, setActiveCategory] = useState("All")
  
  // Feedback Prompt State
  const [showPrompt, setShowPrompt] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Google Form URL
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeGhT8yGnlF2XqrwtQ8s-ogu-oAG4yF4YAn6t9QnJsaLsIN0Q/viewform"

  // Logic: Auto-hide prompt after 3 seconds (Like original code)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Function to open modal and hide prompt
  const handleOpenFeedback = () => {
    setShowPrompt(false)
    setIsModalOpen(true)
  }

  // Sort topics by order
  const sortedTopics = [...topicsData.topics].sort((a, b) => a.order - b.order) as Topic[]

  // Filter topics based on search query AND active category
  const filteredTopics = sortedTopics.filter((topic) => {
    const matchesSearch = 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = activeCategory === "All" || topic.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Group topics by category for display
  const groupedTopics = filteredTopics.reduce((acc, topic) => {
    const category = topic.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(topic)
    return acc
  }, {} as Record<string, Topic[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex flex-col relative">
      
      {/* 1. The Floating Action Button (Permanent) */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-full shadow-lg border border-white/20 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(34, 197, 94, 0.6)" }}
        whileTap={{ scale: 0.9 }}
        title="Give Feedback"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* 2. The Auto-Pop Prompt (Visible immediately, hides after 3s) */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] w-[90%] md:w-auto max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-green-500 shadow-2xl rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-green-50 dark:hover:bg-slate-800 transition-colors"
            onClick={handleOpenFeedback}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-green-700 dark:text-green-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-900 dark:text-green-100 leading-tight">
                Please share your feedback
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Help us improve this app
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation() 
                setShowPrompt(false)
              }}
              className="text-green-400 hover:text-green-600 dark:text-green-500 dark:hover:text-green-300"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. The Full Feedback Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div 
              className="relative bg-white dark:bg-slate-900 border-2 border-green-500 rounded-2xl shadow-2xl w-full max-w-2xl h-[70vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-green-200 dark:border-green-800 bg-green-50 dark:bg-slate-900/80 backdrop-blur-md z-10">
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 tracking-wide">We value your feedback</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 transition-colors rounded-full p-1 hover:bg-green-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Google Form Iframe */}
              <div className="flex-grow relative">
                <iframe 
                  src={GOOGLE_FORM_URL} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  Loading…
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenFeedback}
              className="text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Feedback</span>
            </Button>
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

        {/* Search Bar Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input
              type="text"
              placeholder="تلاش کریں... (Search topics)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-green-200 focus:border-green-500 focus:ring-green-500 dark:border-green-800 dark:focus:border-green-600 dark:focus:ring-green-600 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm transition-all"
            />
          </div>
        </motion.div>

        {/* Category Slicer Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {/* All Button */}
          <Button
            onClick={() => setActiveCategory("All")}
            variant={activeCategory === "All" ? "default" : "outline"}
            className={`
              ${activeCategory === "All" 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-transparent border-green-500 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50"}
              rounded-full px-6 transition-all duration-300
            `}
          >
            All
          </Button>

          {/* Category Buttons */}
          {categoryOrder.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`
                ${activeCategory === category 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-transparent border-green-500 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50"}
                rounded-full px-6 transition-all duration-300
              `}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Topics Grid Grouped by Category */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {categoryOrder.map((category) => {
            const topicsInCategory = groupedTopics[category]
            
            // If we are filtering by a specific category (not 'All'), skip rendering other empty groups
            if (activeCategory !== "All" && activeCategory !== category) return null
            
            // If there are no topics in this category, don't render the header
            if (!topicsInCategory || topicsInCategory.length === 0) return null

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Header (Folder Style) */}
                <div className="flex items-center gap-3 mb-6 pl-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <Folder className="h-6 w-6 text-green-700 dark:text-green-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {category}
                  </h2>
                  <div className="flex-1 h-0.5 bg-green-200 dark:bg-green-800 rounded-full" />
                </div>

                {/* Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {topicsInCategory.map((topic) => {
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
                                <p className="text-green-700 dark:text-green-300 mb-4 line-clamp-3">
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
              </motion.div>
            )
          })}

          {/* No Results Found */}
          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-green-700 dark:text-green-300 font-medium">
                کوئی موضوع نہیں ملا
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Please try a different search term or category
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-green-700 dark:text-green-300">
            {topicsData.subtitle} - Learn Islamic Information
          </p>
        </div>
      </footer>
    </div>
  )
}