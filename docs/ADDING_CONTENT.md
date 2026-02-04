# How to Add New Content to Tajweed-ul-Quran Web App

## Overview

This web application uses a JSON-based data structure located at `data/tajweed-content.json`. This makes it extremely easy to add, modify, or organize content without touching the code.

## File Location

```
/home/z/my-project/data/tajweed-content.json
```

## Data Structure

The content is organized into three levels:

1. **Chapters** (فصل) - Main topics
2. **Sections** (حصہ) - Sub-topics within chapters
3. **Content** (مضمون) - The actual text content

## Structure Explanation

```json
{
  "meta": {
    "title": "تجوید القرآن",
    "subtitle": "Tajweed-ul-Quran - Rules of Quran Recitation",
    "description": "Description of the app"
  },
  "chapters": [
    {
      "id": "unique-id",
      "title": "چپٹر کا نام اردو میں",
      "subtitle": "Chapter Name in English",
      "icon": "BookOpen",
      "order": 1,
      "sections": [
        {
          "id": "unique-section-id",
          "title": "سیکشن کا نام اردو میں",
          "subtitle": "Section Name in English",
          "content": [
            "پہلا پیراگراف",
            "دوسرا پیراگراف"
          ],
          "notes": [
            "نوٹ 1",
            "نوٹ 2"
          ]
        }
      ]
    }
  ]
}
```

## How to Add a New Chapter

### Step 1: Create a unique ID
Choose a unique identifier for your chapter (e.g., `new-topic`).

### Step 2: Choose an icon
Available icons:
- `BookOpen` - For introduction or general topics
- `MapPin` - For location or position-based topics
- `Sparkles` - For special characteristics
- `Clock` - For time-related topics
- `Pause` - For stopping/pausing rules
- `N` - For Nun-related topics
- `M` - For Mim-related topics
- `A` - For Hamzah-related topics

### Step 3: Add the chapter entry
Add to the `chapters` array in `data/tajweed-content.json`:

```json
{
  "id": "new-chapter",
  "title": "نئے موضوع کا نام",
  "subtitle": "New Topic",
  "icon": "BookOpen",
  "order": 9,
  "sections": [
    {
      "id": "first-section",
      "title": "پہلا سیکشن",
      "subtitle": "First Section",
      "content": [
        "یہاں اپنا مواد لکھیں",
        "دوسرا پیراگراف"
      ],
      "notes": [
        "اہم نوٹ یہاں لکھیں"
      ]
    }
  ]
}
```

### Step 4: Update the order
Make sure to set the correct `order` number to place the chapter in the right position.

## How to Add Sections to an Existing Chapter

Find the chapter you want to add to and add a new section to its `sections` array:

```json
{
  "id": "existing-chapter",
  "title": "موجودہ چپٹر",
  "subtitle": "Existing Chapter",
  "icon": "BookOpen",
  "order": 1,
  "sections": [
    {
      "id": "existing-section",
      "title": "موجودہ سیکشن",
      "subtitle": "Existing Section",
      "content": ["موجودہ مواد"],
      "notes": []
    },
    {
      "id": "new-section",
      "title": "نیا سیکشن",
      "subtitle": "New Section",
      "content": [
        "نیا مواد یہاں لکھیں",
        "اضافی تفصیلات"
      ],
      "notes": [
        "اہم نوٹس"
      ]
    }
  ]
}
```

## Content Guidelines

### Content Array
The `content` array contains the main paragraphs of text. Each element is a separate paragraph that will be displayed with RTL (right-to-left) alignment.

Example:
```json
"content": [
  "تجوید لفظاً: تجوید یعنی بہتر بنانا یا خوش بنانا۔",
  "اصطلاحاً: تجوید یعنی قرآن کریم کے الفاظ کو صحیح مخارج و صفات سے ادا کرنا۔"
]
```

### Notes Array (Optional)
The `notes` array contains additional notes or important points that will be highlighted separately in amber-colored boxes.

Example:
```json
"notes": [
  "اظہار میں نون ساکنہ کو صاف پڑھا جاتا ہے",
  "ادغام میں نون ساکنہ میں دم زانی ہوتی ہے"
]
```

## Complete Example: Adding a New Chapter

Here's a complete example of adding a chapter about "Ghunnah" (غنہ):

```json
{
  "id": "ghunnah",
  "title": "غنہ",
  "subtitle": "Ghunnah",
  "icon": "Sparkles",
  "order": 9,
  "sections": [
    {
      "id": "what-is-ghunnah",
      "title": "غنہ کیا ہے؟",
      "subtitle": "What is Ghunnah?",
      "content": [
        "غنہ ایک آواز ہے جو ناک سے نکلتی ہے۔",
        "غنہ نون و میم کے ساتھ آتی ہے۔",
        "غنہ دو عدد (چھ ہمزہ) کی مدت تک ہوتی ہے۔"
      ],
      "notes": []
    },
    {
      "id": "ghunnah-rules",
      "title": "غنہ کے احکام",
      "subtitle": "Rules of Ghunnah",
      "content": [
        "غنہ ثقیلہ: ادغام بغیر غنہ کے",
        "غنہ خفیہہ: اخفاء حروف",
        "غنہ متوسطہ: اقلاب"
      ],
      "notes": [
        "غنہ ثقیلہ دو عدد سے زیادہ ہوتی ہے",
        "غنہ خفیہہ ایک عدد سے زیادہ ہوتی ہے",
        "غنہ متوسطہ دو عدد ہوتی ہے"
      ]
    }
  ]
}
```

## Tips for Organizing Content

1. **Use consistent IDs**: Make sure all IDs are unique and descriptive
2. **Logical ordering**: Use the `order` field to organize chapters in a logical sequence
3. **Clear titles**: Use clear, descriptive titles in both Urdu and English
4. **Proper subtitles**: Subtitles help users understand the content better
5. **Use notes**: Highlight important rules or exceptions in the `notes` array

## Formatting Tips

- **Urdu text**: All Urdu text will be displayed with RTL (right-to-left) alignment automatically
- **Paragraphs**: Separate each paragraph in the `content` array for better readability
- **Notes**: Use the `notes` array for important points that need special attention
- **Consistency**: Maintain consistent formatting throughout the JSON file

## Testing Your Changes

1. Save the changes to `data/tajweed-content.json`
2. Refresh the browser to see the changes
3. Navigate through the new content to ensure everything displays correctly

## Troubleshooting

### Content not showing?
- Check for JSON syntax errors
- Ensure all IDs are unique
- Verify the `order` number is correct

### Layout broken?
- Check for missing commas in the JSON
- Ensure all arrays are properly closed with `]`
- Verify all objects are properly closed with `}`

### Text not in RTL?
- The app automatically applies RTL to Urdu content
- Make sure you're using the correct structure with `content` and `notes` arrays

## Need More Help?

If you need help with:
- **Adding more icons**: Add new icon mappings in `src/app/page.tsx` in the `iconMap` object
- **Custom styling**: Modify the Tailwind classes in the component
- **New features**: Add new components in the `src/components` folder

The structure is designed to be easily extensible. You can add as many chapters and sections as you need!
