# تجوید القرآن - Tajweed-ul-Quran Web App

A beautiful, interactive web application for learning Tajweed-ul-Quran (Rules of Quranic Recitation) in Urdu with smooth animations and modern UI/UX.

## Features

### 🎨 Beautiful UI/UX
- Modern, clean design with gradient backgrounds
- Responsive layout that works on all devices
- Smooth animations using Framer Motion
- Dark mode support
- RTL (Right-to-Left) support for Urdu text

### 📚 Organized Content
- Structured chapters and sections
- Easy navigation with sidebar
- Search-friendly structure
- Highlighted notes for important rules

### 🚀 Easy to Extend
- JSON-based content structure
- No coding required to add new content
- Clear documentation
- Extensible architecture

### 🎭 Animations
- Page transitions
- Hover effects
- Smooth scrolling
- Interactive elements

## Project Structure

```
/home/z/my-project/
├── data/
│   └── tajweed-content.json    # Main content file - ADD YOUR CONTENT HERE
├── docs/
│   ├── README.md                # This file
│   └── ADDING_CONTENT.md        # Guide for adding new content
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main page component
│   │   └── globals.css          # Global styles
│   └── components/
│       └── ui/                  # shadcn/ui components
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm or bun

### Installation

1. The project is already set up. Simply start the development server:

```bash
bun run dev
```

2. Open your browser and navigate to the application (using the Preview Panel)

### Adding Content

All content is managed through a single JSON file: `data/tajweed-content.json`

For detailed instructions on how to add new chapters, sections, and content, see [ADDING_CONTENT.md](./ADDING_CONTENT.md)

## Content Structure

The application is organized as follows:

- **Chapters** (فصل) - Main topics (e.g., Makharij, Sifat, Madd, etc.)
- **Sections** (حصہ) - Sub-topics within each chapter
- **Content** (مضمون) - The actual text content with notes

### Example Structure

```
Introduction (مقدمہ)
  ├── What is Tajweed? (تجوید کیا ہے؟)
  └── Importance (تجوید کی اہمیت)
Makharij (مخارج الحروف)
  ├── What are Makharij? (مخارج الحروف کیا ہیں؟)
  └── Main Makharij (اہم مخارج الحروف)
... and more
```

## Key Features Explained

### Sidebar Navigation
- Shows all chapters in an organized list
- Active chapter is highlighted
- Collapsible on mobile devices
- Smooth animations

### Chapter Cards
- Displayed on the home page
- Show chapter title and subtitle
- Count of sections
- Hover effects and animations

### Section Content
- RTL-aligned Urdu text
- Paragraph-based content
- Highlighted notes in amber boxes
- Clean, readable typography

### Animations
- Page transitions between views
- Staggered animations for lists
- Hover effects on interactive elements
- Smooth scrolling in sidebar

## Customization

### Colors
The app uses a green/emerald color scheme. To change colors, modify the Tailwind classes in `src/app/page.tsx`:
- Primary: `green-600`, `emerald-700`
- Secondary: `teal-50`, `green-50`
- Background: Various green gradients

### Icons
Icons are mapped in the `iconMap` object in `src/app/page.tsx`. To add new icons:
1. Import from `lucide-react`
2. Add to `iconMap` with a unique key
3. Reference the key in your JSON content

### Styling
The app uses Tailwind CSS with shadcn/ui components. Modify styles by:
- Editing Tailwind classes in components
- Customizing `src/app/globals.css`
- Using shadcn/ui components from `src/components/ui/`

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Hooks

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Performance

- Optimized for fast loading
- Efficient re-renders with React
- Smooth animations with hardware acceleration
- Lazy loading of content

## Future Enhancements

Here are some ideas for future improvements:

- [ ] Search functionality
- [ ] Audio examples for Tajweed rules
- [ ] Interactive diagrams
- [ ] Quiz/practice mode
- [ ] Progress tracking
- [ ] Bookmarking favorite sections
- [ ] Export to PDF
- [ ] Offline support (PWA)

## Contributing

To add new content:
1. Edit `data/tajweed-content.json`
2. Add your chapters, sections, and content
3. Test by refreshing the browser
4. No code changes required!

## Support

For issues or questions:
1. Check the documentation in `/docs/`
2. Review the JSON structure
3. Ensure proper formatting
4. Test in multiple browsers

## License

This project is created for educational purposes to help people learn Tajweed-ul-Quran.

## Credits

- Built with Next.js and shadcn/ui
- Content based on traditional Tajweed rules
- Icons by Lucide
- Animations by Framer Motion

---

Made with ❤️ for learning Quranic recitation rules
