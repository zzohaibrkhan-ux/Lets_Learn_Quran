'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Updated with your specific URL
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyH-_GZMjarsUzYx7s-67b_6JBKqL9-8-qDFbm7z4PACOjNvQSlOJzJUS3d8ObWTNI2Vw/exec"

export function FeedbackDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // CHECK: Ensure URL is valid
    if (GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_SCRIPT_URL_HERE")) {
      alert("Please paste your real Google Script URL in code first!")
      return
    }

    if (!name || !feedback) return

    setLoading(true)
    
    try {
      // Prepare data using URLSearchParams
      const params = new URLSearchParams()
      params.append('name', name)
      params.append('feedback', feedback)

      // FIX: Removed explicit 'headers' and added 'redirect: 'follow'
      // This fixes the "Failed to fetch" error in local/production environments
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        // NOTE: Headers removed to avoid CORS conflicts with Google Apps Script
        body: params
      })

      // Assume success if no network error was thrown
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)
        setName("")
        setFeedback("")
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback", error)
      alert("Something went wrong. Please check your internet connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-900 dark:text-green-100">
            ہم سے رابطہ کریں
          </DialogTitle>
          <DialogDescription className="text-green-700 dark:text-green-300">
            ہمیں بتائیں کہ آپ کو ایپ کیسے لگی۔ آپ کی رائے ہمارے لیے اہم ہے۔
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4 pt-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-900 dark:text-green-100">نام (Name)</label>
                <Input
                  required
                  placeholder="آپ کا نام"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-green-200 focus:border-green-500 dark:border-green-800 dark:focus:border-green-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-900 dark:text-green-100">رائے (Feedback)</label>
                <Textarea
                  required
                  placeholder="یہاں اپنی رائے لکھیں..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="border-green-200 focus:border-green-500 dark:border-green-800 dark:focus:border-green-600"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      بھیجا جا رہا ہے...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      بھیجیں
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                شکریہ!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                آپ کی رائے موصول ہو گئی ہے۔
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}