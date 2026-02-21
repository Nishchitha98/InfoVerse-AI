import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;

  const [generatedText, setGeneratedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState("en");
  const [voices, setVoices] = useState([]);

  // ---------------- LANGUAGES ----------------
  const languages = {
    en: "English",
    hi: "Hindi",
    kn: "Kannada",
    ta: "Tamil",
    te: "Telugu",
    ml: "Malayalam",
    mr: "Marathi",
    bn: "Bengali",
    gu: "Gujarati",
    pa: "Punjabi",
  };

  // ---------------- LANGUAGE LOCALE MAP ----------------
  const languageLocaleMap = {
    en: "en-US",
    hi: "hi-IN",
    kn: "kn-IN",
    ta: "ta-IN",
    te: "te-IN",
    ml: "ml-IN",
    mr: "mr-IN",
    bn: "bn-IN",
    gu: "gu-IN",
    pa: "pa-IN",
  };

  // ---------------- REMOVE COMMAND WORDS ----------------
  const cleanTopic = (text) => {
    if (!text) return "";

    const commandWords = [
      "give information about",
      "give info about",
      "information about",
      "tell me about",
      "tell about",
      "who is",
      "who was",
      "what is",
      "what was",
      "explain",
      "define",
      "describe",
      "details about",
      "i want to know about",
      "can you tell me about",
      "please tell me about",
    ];

    let cleaned = text.toLowerCase();

    commandWords.forEach((phrase) => {
      if (cleaned.startsWith(phrase)) {
        cleaned = cleaned.replace(phrase, "");
      }
    });

    return cleaned.trim();
  };

  // ---------------- REMOVE USELESS WORDS ----------------
  const cleanText = (text) => {
    if (!text) return "";

    let cleaned = text;

    const uselessWords = [
      "wikipedia",
      "encyclopedia",
      "free encyclopedia",
      "this article",
      "this page",
      "may refer to",
      "learn more",
      "for more information",
      "citation needed",
      "jump to navigation",
      "jump to search",
      "from wikipedia",
      "the free encyclopedia",
      "read more",
      "see also",
      "external links",
      "references",
      "edit",
      "overview",
      "history",
      "biography",
      "however",
      "therefore",
      "moreover",
    ];

    uselessWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      cleaned = cleaned.replace(regex, "");
    });

    cleaned = cleaned.replace(/\s+/g, " ").trim();
    return cleaned;
  };

  // ---------------- LOAD VOICES ----------------
  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ---------------- FETCH WIKIPEDIA DATA ----------------
  useEffect(() => {
    if (!topic) {
      navigate("/");
      return;
    }

    const cleanedTopic = cleanTopic(topic);

    const fetchData = async () => {
      try {
        const searchResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
            cleanedTopic
          )}&format=json&origin=*`
        );

        const searchData = await searchResponse.json();

        if (searchData.query?.search?.length > 0) {
          const bestMatch = searchData.query.search[0].title;

          const summaryResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              bestMatch
            )}`
          );

          const summaryData = await summaryResponse.json();

          setGeneratedText(cleanText(summaryData.extract));

          if (summaryData.thumbnail?.source) {
            setImageUrl(summaryData.thumbnail.source);
          }
        } else {
          setGeneratedText("No information found.");
        }
      } catch (error) {
        setGeneratedText("Error fetching information.");
      }

      setLoading(false);
    };

    fetchData();

    return () => window.speechSynthesis.cancel();
  }, [topic, navigate]);

  // ---------------- TRANSLATION FUNCTION ----------------
  const translateText = async (langCode) => {
    if (langCode === "en") {
      setSelectedLang("en");
      setTranslatedText("");
      return;
    }

    try {
      window.speechSynthesis.cancel();
      setSelectedLang(langCode);

      const chunkSize = 450;
      let translatedFullText = "";

      for (let i = 0; i < generatedText.length; i += chunkSize) {
        const chunk = generatedText.substring(i, i + chunkSize);

        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            chunk
          )}&langpair=en|${langCode}`
        );

        const data = await response.json();

        if (data.responseData?.translatedText) {
          translatedFullText += data.responseData.translatedText + " ";
        }
      }

      setTranslatedText(cleanText(translatedFullText.trim()));
    } catch (error) {
      alert("Translation failed.");
    }
  };

  // ---------------- AUDIO FUNCTIONS ----------------
  const playAudio = () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(generatedText);
    utterance.lang = languageLocaleMap["en"];

    const matchedVoice = voices.find((voice) =>
      voice.lang.toLowerCase().includes("en")
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => window.speechSynthesis.pause();
  const resumeAudio = () => window.speechSynthesis.resume();
  const stopAudio = () => window.speechSynthesis.cancel();

  return (
    <div className="container">
      <h1>📄 Information</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="output">
          {imageUrl && <img src={imageUrl} alt="related" />}

          <p>
            {selectedLang === "en" ? generatedText : translatedText}
          </p>

          {/* SHOW AUDIO BUTTONS ONLY WHEN ENGLISH */}
          {selectedLang === "en" && (
            <div className="audioButtons">
              <button onClick={playAudio}>🔊 Play</button>
              <button onClick={pauseAudio}>⏸ Pause</button>
              <button onClick={resumeAudio}>▶ Resume</button>
              <button onClick={stopAudio}>⏹ Stop</button>
            </div>
          )}

          <div className="translateWrapper">
            <label className="translateLabel">Translate to</label>

            <select
              className="translateSelect"
              value={selectedLang}
              onChange={(e) => translateText(e.target.value)}
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                navigate("/");
              }}
            >
              ⬅ Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;