'use client'

import { MessageCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Updated URL with &embedded=true for better fit
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeGhT8yGnlF2XqrwtQ8s-ogu-oAG4yF4YAn6t9QnJsaLsIN0Q/viewform?fbzx=-6678074357973761100&embedded=true"

export function FeedbackDialog() {
  return (
    <Dialog>
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
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden h-[600px]">
        <DialogHeader className="p-4 pb-2 bg-green-50 dark:bg-slate-800 shrink-0">
          <DialogTitle className="text-green-900 dark:text-green-100">
            ہم سے رابطہ کریں
          </DialogTitle>
        </DialogHeader>
        
        {/* Embed the Google Form here */}
        <div className="w-full h-full overflow-hidden">
          <iframe
            src={GOOGLE_FORM_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="bg-white"
          >
            Loading...
          </iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}