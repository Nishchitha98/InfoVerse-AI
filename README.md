# 🤖InfoVerse-AI
# AI Information Generator with Translation & Audio

An interactive React-based web application that generates concise information about any topic, displays a relevant image, translates the content into multiple Indian languages, and provides text-to-speech functionality.

The application fetches information from Wikipedia, translates it using the MyMemory Translation API, and converts text into speech using the browser's built-in Speech Synthesis API.

---

## Website is live
infoverse-ai-one.vercel.app

---

## 📌 Features

- 🔍 Search any topic
- 📖 Fetch information from Wikipedia
- 🖼 Display a related image (when available)
- 🌐 Translate information into multiple Indian languages
- 🔊 Listen to information using Text-to-Speech
- ⏸ Pause, Resume and Stop audio playback
- 🎨 Modern futuristic UI with animated background
- 📱 Responsive design

---


## 🚀 Technologies Used

- React.js
- React Router DOM
- JavaScript (ES6)
- HTML5
- CSS3
- Wikipedia REST API
- Wikipedia Search API
- MyMemory Translation API
- Web Speech API (Speech Synthesis)

---

## 📁 Project Structure

```
Text-and-Audio-Generator/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── App.css
│   ├── Home.js
│   ├── Result.js
│   ├── index.js
│   └── index.css
│
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Nishchitha98/InfoVerse-AI.git
```

Move into the project folder

```bash
cd InfoVerse-AI
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

The application will run at

```
http://localhost:3000
```

---

## 🌍 APIs Used

### Wikipedia Search API

Used to find the most relevant article based on the user's search query.

Example:

```
https://en.wikipedia.org/w/api.php
```

---

### Wikipedia REST Summary API

Used to retrieve a clean summary and thumbnail image.

Example:

```
https://en.wikipedia.org/api/rest_v1/page/summary/{topic}
```

---

### MyMemory Translation API

Used to translate generated information into multiple Indian languages.

Example:

```
https://api.mymemory.translated.net/
```

---

## 🔊 Text-to-Speech

The application uses the browser's built-in **Speech Synthesis API**.

Features include:

- Play
- Pause
- Resume
- Stop

Voice selection is automatically matched with available English voices.

---

## 🌐 Supported Languages

- English
- Hindi
- Kannada
- Tamil
- Telugu
- Malayalam
- Marathi
- Bengali
- Gujarati
- Punjabi

---

## 🔄 Application Workflow

```
User enters a topic
        │
        ▼
Wikipedia Search API
        │
        ▼
Find Best Matching Article
        │
        ▼
Wikipedia Summary API
        │
        ▼
Display
 • Information
 • Image
        │
        ▼
(Optional)
Translate using MyMemory API
        │
        ▼
(Optional)
Play Audio using Speech Synthesis API
```

---

## 🎨 User Interface

The application includes:

- Glassmorphism container
- AI futuristic theme
- Animated energy background
- Mouse glow effect
- Floating particles
- Electric pulse animation
- Responsive layout

---

## 📌 Future Improvements

- 🎤 Voice input (Speech Recognition)
- 🤖 AI-generated summaries using Gemini/OpenAI
- 🌙 Dark and Light themes
- 📄 Download as PDF
- 🔊 Audio download (MP3)
- 📚 Search history
- ❤️ Favorite topics
- 🌍 More translation languages
- 📱 Progressive Web App (PWA)

---

## 💻 Available Scripts

### Start development server

```bash
npm start
```

### Build production

```bash
npm run build
```

### Run tests

```bash
npm test
```

---

## 👩‍💻 Author

**Nishchitha Gowda**

GitHub:
https://github.com/Nishchitha98

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.

---
