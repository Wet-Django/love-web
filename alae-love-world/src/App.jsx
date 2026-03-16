import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Music2,
  Pause,
  Play,
  Volume2,
  Cake,
  Gift,
  Mail,
  Star,
  Lock,
  Unlock,
  RotateCcw,
  Gem,
  ChevronDown,
} from "lucide-react";

const CONFIG = {
  title: "Alae's Love World",
  girlfriendName: "Alae",
  relationshipStart: "2026-02-18T00:00:00",
  birthdayMonth: 10,
  birthdayDay: 27,
  heroTitle: "For Alae, my sweetest world.",
  heroSubtitle:
    "A tiny universe built from soft shadows, glowing hearts, and all the love I carry for you.",
  enterButtonText: "Enter Alae's Love World",
  finalMessage:
    "Alae, if love could build a place, it would look like this: soft, glowing, a little mischievous, and full of you. Every game, every heart, every hidden letter leads back to one truth — I adore you more than words can hold. You are my calm, my chaos, my sweetest favorite feeling. This little world will always be waiting for you.",
  birthdayMessage:
    "Happy Birthday, my beautiful Alae. Today the whole sky should glow for you. I hope this little world feels like a thousand soft kisses wrapped in light.",
  assets: {
    mainCharacterGif: "/assets/alae-main.gif",
    floatingCompanionGif: "/assets/alae-float.gif",
  },
  music: {
    romanticPlaylist: [
      "/assets/music/song1.mp3",
      "/assets/music/song2.mp3",
      "/assets/music/song3.mp3",
    ],
    birthdayPlaylist: [
      "/assets/music/birthday1.mp3",
      "/assets/music/birthday2.mp3",
    ],
  },
  dialogues: [
    "Alae… you make even the darkest colors feel warm.",
    "I made this little world so you would always have a place full of my love.",
    "Welcome back, princess. I missed you more than you know.",
    "Every little heart here belongs to you.",
    "You are my favorite feeling.",
    "This site smiles when you arrive.",
    "Another day, another reason to love you more.",
    "You are the softest chaos in my universe.",
    "I tucked kisses between these glowing little stars for you.",
    "You make my whole heart feel chosen.",
    "If this world feels magical, it's because you inspired all of it.",
    "Every time you visit, my heart acts like it's seeing you for the first time.",
    "You are my cutest thought and my sweetest ache.",
    "This little dream place was handcrafted with all my softest feelings for you.",
    "If love had a favorite person, it would pick you immediately.",
    "Stay here a little… I like the world better when you're in it.",
  ],
  birthdayDialogues: [
    "Happy Birthday, my beautiful Alae. Today is glowing because of you.",
    "Birthday mode activated: extra hearts, extra sparkles, extra love.",
    "Today the whole world should celebrate how special you are.",
    "Alae, this day is softer, brighter, and sweeter because you were born.",
  ],
  dailyLetters: [
    "Alae, today I just want you to remember that even on quiet days, my heart is still reaching for you. You make ordinary moments feel golden.",
    "My sweet Alae, if I could fold tenderness into a letter and send it through the stars, it would arrive looking exactly like this little note for you.",
    "Alae, I hope today wraps around you gently. I hope you feel wanted, protected, admired, and loved in every tiny moment.",
    "My love, some days romance is fireworks but some days it is simply me thinking of you again and again and still smiling every single time.",
    "Alae, you are proof that softness can be powerful. You enter my thoughts and suddenly everything feels more beautiful.",
    "Today’s note: you are still my favorite hello, my favorite comfort, and my favorite reason to believe feelings can be this deep.",
    "My precious girl, if I had one wish for today, it would be for you to feel exactly how adored you are.",
    "Alae, every day you exist, the world becomes easier to love. That is your magic.",
    "I built this place because loving you made me want to leave little traces of my heart everywhere.",
    "You are the type of person who makes songs feel more real, sunsets look softer, and silence feel full instead of empty.",
    "My Alae, I still get that soft chest feeling when I think about you. The kind that makes the whole day sweeter.",
    "This is your reminder that you are never ordinary to me. Not your smile, not your voice, not your name, not your existence.",
  ],
  finalPrizeMessages: [
    "Alae, today’s prize is a little reminder that my heart still blushes when I think of you.",
    "My princess, today’s reward is simple: I love you more than yesterday and softer than words can say.",
    "Alae, if today feels heavy, let this be your prize: you are adored deeply, gently, and truly.",
    "My love, today’s final surprise is this truth — you are the place my heart feels most at home.",
  ],
  floatingCompanionMessages: [
    "I love you 💜",
    "Je t’aime 💜",
    "Te amo 💜",
    "Ti amo 💜",
    "Ich liebe dich 💜",
    "Ana behibek 💜",
    "Kanbghik 💜",
    "Seni seviyorum 💜",
    "Eu te amo 💜",
    "Aishiteru 💜",
  ],
  sentencePools: [
    ["You", "are", "my", "favorite", "feeling"],
    ["You", "make", "my", "world", "softer"],
    ["My", "heart", "always", "chooses", "you"],
    ["You", "are", "my", "sweetest", "home"],
    ["Alae", "is", "my", "soft", "magic"],
  ],
  choiceGamePools: [
    {
      question: "Why is this whole little world made for Alae?",
      correct: "Because you make my world softer.",
      options: [
        "Because you make my world softer.",
        "Because stars are shiny.",
        "Because coffee is dramatic.",
      ],
    },
    {
      question: "What feels most true?",
      correct: "My heart feels safest with you.",
      options: [
        "My heart feels safest with you.",
        "I only like weekends.",
        "Purple looks loud.",
      ],
    },
    {
      question: "Which one sounds like real love?",
      correct: "I still choose you in the quiet moments.",
      options: [
        "I still choose you in the quiet moments.",
        "Rain is made of glitter.",
        "Music is a sandwich.",
      ],
    },
  ],
  memoryPools: [
    ["❤", "✦", "🎀", "💌"],
    ["🌙", "💜", "✨", "🎀"],
    ["💋", "❤", "🌸", "✨"],
  ],
};

const STORAGE_KEYS = {
  visits: "alae-love-visits",
  streak: "alae-love-streak",
  lastVisit: "alae-love-last-visit",
  progress: "alae-love-progress",
  replayCount: "alae-love-replay-count",
  musicOn: "alae-love-music",
  currentTrack: "alae-love-current-track",
};

function useNow(interval = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}

function getNextBirthday(month, day) {
  const now = new Date();
  const y = now.getFullYear();
  const birthday = new Date(y, month - 1, day, 0, 0, 0);
  if (birthday.toDateString() === now.toDateString()) return birthday;
  if (birthday < now) return new Date(y + 1, month - 1, day, 0, 0, 0);
  return birthday;
}

function isBirthdayToday(month, day) {
  const now = new Date();
  return now.getMonth() + 1 === month && now.getDate() === day;
}

function diffDetailed(startDate, endDate = new Date()) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthDays;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  return { years, months, days, hours, minutes };
}

function countdownParts(targetDate, nowTs) {
  const diff = Math.max(0, +new Date(targetDate) - nowTs);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function getDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getDailySeed() {
  const today = new Date();
  return Math.floor(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) / 86400000
  );
}

function getLetterForToday() {
  const seed = getDailySeed();
  return CONFIG.dailyLetters[seed % CONFIG.dailyLetters.length];
}

function getSentenceForToday() {
  const seed = getDailySeed();
  return CONFIG.sentencePools[seed % CONFIG.sentencePools.length];
}

function getChoiceGameForToday() {
  const seed = getDailySeed();
  return CONFIG.choiceGamePools[seed % CONFIG.choiceGamePools.length];
}

function getMemoryPairsForToday() {
  const seed = getDailySeed();
  return CONFIG.memoryPools[seed % CONFIG.memoryPools.length];
}

function getFinalPrizeForToday() {
  const seed = getDailySeed();
  return CONFIG.finalPrizeMessages[seed % CONFIG.finalPrizeMessages.length];
}

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="mx-auto mb-8 max-w-2xl text-center"
      >
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-pink-200/90 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">{description}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 7 + Math.random() * 8,
        size: 10 + Math.random() * 16,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.8, 0.2, 0.75, 0], y: [0, -24, -60], x: [0, 8, -8, 4] }}
          transition={{ repeat: Infinity, delay: h.delay, duration: h.duration, ease: "easeInOut" }}
          className="absolute text-pink-200/70"
          style={{ left: `${h.left}%`, top: `${h.top}%`, fontSize: h.size }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
}

function SparkleDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        size: 2 + Math.random() * 4,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          animate={{ opacity: [0.2, 1, 0.25], scale: [1, 1.55, 1] }}
          transition={{ repeat: Infinity, duration: d.duration, delay: d.delay }}
          className="absolute rounded-full bg-white/80"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
        />
      ))}
    </div>
  );
}

function LoadingScreen({ onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#09060d]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(207,182,255,0.22),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,143,211,0.18),transparent_28%)]" />
      <FloatingHearts />
      <SparkleDots />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mx-6 max-w-md rounded-[32px] border border-white/10 bg-white/5 p-7 text-center shadow-2xl backdrop-blur-xl"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-pink-200 shadow-[0_0_30px_rgba(255,143,211,0.25)]">
          <Heart className="h-7 w-7" />
        </div>
        <p className="mb-2 text-xs uppercase tracking-[0.38em] text-pink-200/80">A private dream</p>
        <h1 className="bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-4xl font-semibold text-transparent">
          {CONFIG.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/70">
          A soft little world made only for {CONFIG.girlfriendName}, wrapped in glowing hearts,
          warm feelings, and quiet magic.
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          onClick={onEnter}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-gradient-to-r from-pink-400/25 to-violet-400/25 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(255,143,211,0.16)]"
        >
          <Sparkles className="h-4 w-4" />
          {CONFIG.enterButtonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function useVisitStats() {
  const [visits, setVisits] = useState(1);
  const [streak, setStreak] = useState(1);
  const [welcomeBack, setWelcomeBack] = useState(false);
  useEffect(() => {
    const today = getDayKey();
    const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit);
    const previousVisits = Number(localStorage.getItem(STORAGE_KEYS.visits) || 0);
    const previousStreak = Number(localStorage.getItem(STORAGE_KEYS.streak) || 0);
    let nextVisits = previousVisits + 1;
    let nextStreak = previousStreak || 1;
    let isWelcome = false;
    if (!lastVisit) {
      nextStreak = 1;
    } else {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      const yKey = getDayKey(y);
      if (lastVisit === today) {
        nextVisits = previousVisits || 1;
        nextStreak = previousStreak || 1;
        isWelcome = previousVisits > 0;
      } else if (lastVisit === yKey) {
        nextStreak = (previousStreak || 0) + 1;
        isWelcome = true;
      } else {
        nextStreak = 1;
        isWelcome = true;
      }
    }
    localStorage.setItem(STORAGE_KEYS.lastVisit, today);
    localStorage.setItem(STORAGE_KEYS.visits, String(nextVisits));
    localStorage.setItem(STORAGE_KEYS.streak, String(nextStreak));
    setVisits(nextVisits);
    setStreak(nextStreak);
    setWelcomeBack(isWelcome);
  }, []);
  return { visits, streak, welcomeBack };
}

function MascotDialogue({ isBirthday, welcomeBack, sectionHint }) {
  const pool = isBirthday ? CONFIG.birthdayDialogues : CONFIG.dialogues;
  const [activeText, setActiveText] = useState("");
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    setActiveText(
      welcomeBack
        ? `Welcome back, ${CONFIG.girlfriendName}. This little world missed you.`
        : `${CONFIG.girlfriendName}, this whole place was made with love just for you.`
    );
  }, [welcomeBack]);
  useEffect(() => {
    if (!sectionHint) return;
    setActiveText(sectionHint);
  }, [sectionHint]);
  useEffect(() => {
    let index = 0;
    const id = setInterval(() => {
      setActiveText(pool[index % pool.length]);
      index++;
    }, 6500);
    return () => clearInterval(id);
  }, [pool]);
  useEffect(() => {
    setDisplayText("");
    let i = 0;
    const type = setInterval(() => {
      i++;
      setDisplayText(activeText.slice(0, i));
      if (i >= activeText.length) clearInterval(type);
    }, 28);
    return () => clearInterval(type);
  }, [activeText]);
  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeText}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.38 }}
          className="relative mb-5 w-full rounded-[26px] border border-white/10 bg-white/10 px-4 py-4 text-center text-sm leading-7 text-white/90 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-white/10" />
          <span>{displayText}</span>
          <span className="ml-0.5 inline-block h-4 w-[1px] animate-pulse bg-pink-200/80 align-middle" />
        </motion.div>
      </AnimatePresence>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-pink-300/10 blur-3xl" />
        <img
          src={CONFIG.assets.mainCharacterGif}
          alt="romantic mascot"
          className="relative z-10 h-[240px] w-[240px] rounded-[30px] border border-white/10 object-cover shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:h-[280px] sm:w-[280px]"
        />
      </motion.div>
    </div>
  );
}

function FloatingCompanion() {
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const handleClick = () => {
    const messages = CONFIG.floatingCompanionMessages || ["I love you 💜"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 2500);
  };
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      className="fixed bottom-4 left-4 z-30"
    >
      <div className="relative">
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-full left-1/2 mb-3 w-max max-w-[220px] -translate-x-1/2 rounded-2xl border border-pink-300/20 bg-[#24122f]/95 px-4 py-3 text-center text-sm text-pink-50 shadow-[0_12px_35px_rgba(255,143,211,0.18)] backdrop-blur-xl"
            >
              {message}
              <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-pink-300/20 bg-[#24122f]/95" />
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={handleClick} type="button" className="rounded-full focus:outline-none" aria-label="Show love message">
          <img
            src={CONFIG.assets.floatingCompanionGif}
            alt="floating companion"
            className="h-16 w-16 rounded-full border border-white/10 bg-white/5 object-cover shadow-xl transition hover:scale-105 active:scale-95 sm:h-20 sm:w-20"
          />
        </button>
      </div>
    </motion.div>
  );
}

function MusicControls({ isBirthday, shouldAutoStart }) {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [trackIndex, setTrackIndex] = useState(Number(localStorage.getItem(STORAGE_KEYS.currentTrack) || 0));
  const playlist = isBirthday ? CONFIG.music.birthdayPlaylist : CONFIG.music.romanticPlaylist;
  const safeTrackIndex = playlist.length > 0 ? ((trackIndex % playlist.length) + playlist.length) % playlist.length : 0;
  const currentTrack = playlist[safeTrackIndex];
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack;
    audioRef.current.load();
    localStorage.setItem(STORAGE_KEYS.currentTrack, String(safeTrackIndex));
    if (enabled) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [currentTrack, safeTrackIndex, enabled]);
  useEffect(() => {
    if (!shouldAutoStart || !audioRef.current || !currentTrack) return;
    const startMusic = async () => {
      try {
        audioRef.current.src = currentTrack;
        audioRef.current.load();
        audioRef.current.volume = volume;
        await audioRef.current.play();
        setEnabled(true);
        setPlaying(true);
        localStorage.setItem(STORAGE_KEYS.musicOn, "true");
      } catch {
        setEnabled(false);
        setPlaying(false);
      }
    };
    startMusic();
  }, [shouldAutoStart, currentTrack, volume]);
  const toggle = async () => {
    if (!audioRef.current || !currentTrack) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      setEnabled(false);
      localStorage.setItem(STORAGE_KEYS.musicOn, "false");
    } else {
      try {
        audioRef.current.src = currentTrack;
        audioRef.current.load();
        await audioRef.current.play();
        setPlaying(true);
        setEnabled(true);
        localStorage.setItem(STORAGE_KEYS.musicOn, "true");
      } catch {
        setPlaying(false);
      }
    }
  };
  const nextTrack = () => {
    if (!playlist.length) return;
    setTrackIndex((prev) => (prev + 1) % playlist.length);
  };
  const prevTrack = () => {
    if (!playlist.length) return;
    setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };
  const shuffleTrack = () => {
    if (playlist.length <= 1) return;
    let randomIndex = safeTrackIndex;
    while (randomIndex === safeTrackIndex) {
      randomIndex = Math.floor(Math.random() * playlist.length);
    }
    setTrackIndex(randomIndex);
  };
  return (
    <div className="fixed bottom-4 right-4 z-[100] pointer-events-auto">
      <audio ref={audioRef} preload="auto" onEnded={nextTrack} />
      <div className="flex items-center gap-2 rounded-full border border-pink-300/20 bg-gradient-to-r from-[#22112f]/90 to-[#180e23]/90 px-3 py-2 shadow-[0_12px_35px_rgba(255,143,211,0.18)] backdrop-blur-xl">
        <button onClick={toggle} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-300/20 bg-pink-300/10 text-pink-100 transition hover:scale-105 hover:bg-pink-300/20 active:scale-95" aria-label="Toggle music" type="button">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button onClick={prevTrack} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:scale-105 hover:bg-white/10 active:scale-95" aria-label="Previous track" type="button">⏮</button>
        <button onClick={nextTrack} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:scale-105 hover:bg-white/10 active:scale-95" aria-label="Next track" type="button">⏭</button>
        <button onClick={shuffleTrack} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/10 text-violet-100 transition hover:scale-105 hover:bg-violet-300/20 active:scale-95" aria-label="Shuffle track" type="button">🔀</button>
        <div className="hidden items-center gap-2 sm:flex pl-1">
          <Music2 className="h-4 w-4 text-pink-200" />
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-24 accent-pink-300" />
          <Volume2 className="h-4 w-4 text-white/70" />
        </div>
      </div>
    </div>
  );
}

function Hero({ onStart, isBirthday, welcomeBack, streak, visits, sectionHint, setSectionHint }) {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(207,182,255,0.15),transparent_26%),radial-gradient(circle_at_20%_70%,rgba(255,143,211,0.12),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(157,116,255,0.12),transparent_24%)]" />
      <FloatingHearts />
      <SparkleDots />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-400/10 blur-[90px]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-pink-200/80 backdrop-blur-xl">
            <Heart className="h-3.5 w-3.5" />
            {welcomeBack ? `Welcome back, ${CONFIG.girlfriendName}` : `A private world for ${CONFIG.girlfriendName}`}
          </div>
          <h1 className="max-w-2xl bg-gradient-to-r from-white via-pink-100 to-violet-200 bg-clip-text text-5xl font-semibold leading-[1.02] text-transparent sm:text-6xl lg:text-7xl">{CONFIG.heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0">{CONFIG.heroSubtitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">Visit streak: <span className="text-pink-200">{streak} day{streak > 1 ? "s" : ""}</span></div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">Visits: <span className="text-violet-200">{visits}</span></div>
            {isBirthday && <div className="rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2 text-sm text-pink-100 backdrop-blur-xl">Birthday mode active ✨</div>}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onStart} className="inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-gradient-to-r from-pink-400/25 to-violet-400/25 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_35px_rgba(255,143,211,0.2)]"><Sparkles className="h-4 w-4" />Start the love journey</motion.button>
            <button onClick={() => setSectionHint(`Alae, keep scrolling… there are little pieces of my heart waiting for you below.`)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur-xl"><ChevronDown className="h-4 w-4" />Scroll for magic</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <MascotDialogue isBirthday={isBirthday} welcomeBack={welcomeBack} sectionHint={sectionHint} />
        </motion.div>
      </div>
    </section>
  );
}

function RelationshipCounter() {
  const now = useNow(1000);
  const data = useMemo(() => diffDetailed(CONFIG.relationshipStart, new Date(now)), [now]);
  const items = [["Years", data.years], ["Months", data.months], ["Days", data.days], ["Hours", data.hours], ["Minutes", data.minutes]];
  return (
    <Section id="relationship" eyebrow="Our time" title="A love measured in soft little forever moments" description="Not just time passing — time filled with memories, longing, laughter, affection, and all the ways you changed my world.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{items.map(([label, value]) => <GlassCard key={label} className="text-center"><div className="text-3xl font-semibold text-white sm:text-4xl">{String(value).padStart(2, "0")}</div><div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/55">{label}</div></GlassCard>)}</div>
      <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-pink-400/10 via-white/5 to-violet-400/10 p-5 text-center text-sm leading-7 text-white/75 backdrop-blur-xl">Since <span className="text-pink-200">{new Date(CONFIG.relationshipStart).toLocaleDateString()}</span>, every hour has quietly carried more of you in it.</div>
    </Section>
  );
}

function BirthdaySection({ isBirthday }) {
  const now = useNow(1000);
  const nextBirthday = useMemo(() => getNextBirthday(CONFIG.birthdayMonth, CONFIG.birthdayDay), []);
  const c = countdownParts(nextBirthday, now);
  return (
    <Section id="birthday" eyebrow="Birthday magic" title={isBirthday ? "Today belongs to her glow" : "A countdown to Alae's special day"} description={isBirthday ? CONFIG.birthdayMessage : "When your day arrives, this world blooms brighter on its own, with extra glow, special music, and birthday-only sweetness."}>
      <GlassCard className="overflow-hidden">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-pink-200/80"><Cake className="h-4 w-4" />{isBirthday ? "Birthday mode active" : "Birthday countdown"}</div>
            <h3 className="text-2xl font-semibold text-white">{isBirthday ? `Happy Birthday, ${CONFIG.girlfriendName}` : `Until ${CONFIG.girlfriendName}'s next magical day...`}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">{isBirthday ? "The lights are brighter, the particles are softer, and this whole little universe is celebrating her existence." : `Set the birthday in the config once, and the site will automatically switch into celebration mode every year on ${CONFIG.birthdayMonth}/${CONFIG.birthdayDay}.`}</p>
          </div>
          {isBirthday ? <div className="grid grid-cols-2 gap-3">{["Confetti glow", "Birthday dialogues", "Special music", "Hidden surprise"].map((x) => <div key={x} className="rounded-3xl border border-pink-300/20 bg-pink-300/10 p-4 text-center text-sm text-pink-100">{x}</div>)}</div> : <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Days", c.days], ["Hours", c.hours], ["Minutes", c.minutes], ["Seconds", c.seconds]].map(([label, value]) => <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl"><div className="text-3xl font-semibold text-white">{String(value).padStart(2, "0")}</div><div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">{label}</div></div>)}</div>}
        </div>
      </GlassCard>
    </Section>
  );
}

function SentenceGame({ onComplete }) {
  const target = useMemo(() => getSentenceForToday(), []);
  const [words, setWords] = useState(() => [...target].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState([]);
  const choose = (word, i) => {
    const copy = [...words];
    copy.splice(i, 1);
    setWords(copy);
    setSelected((prev) => [...prev, word]);
  };
  useEffect(() => {
    if (selected.length === target.length && selected.join(" ") === target.join(" ")) onComplete();
  }, [selected, target, onComplete]);
  return <GlassCard><div className="mb-3 flex items-center gap-2 text-white"><Gem className="h-4 w-4 text-pink-200" /> Rebuild the hidden sentence</div><p className="text-sm text-white/65">Tap the words in the sweetest order.</p><div className="mt-4 min-h-[72px] rounded-3xl border border-dashed border-white/10 bg-white/5 p-3 text-center text-white/90">{selected.length ? selected.join(" ") : "Your sentence will appear here..."}</div><div className="mt-4 flex flex-wrap gap-2">{words.map((word, i) => <button key={`${word}-${i}`} onClick={() => choose(word, i)} className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/90">{word}</button>)}</div></GlassCard>;
}

function ChoiceGame({ onComplete }) {
  const game = useMemo(() => getChoiceGameForToday(), []);
  const [picked, setPicked] = useState(null);
  useEffect(() => {
    if (picked === game.correct) onComplete();
  }, [picked, game, onComplete]);
  return <GlassCard><div className="mb-3 flex items-center gap-2 text-white"><Heart className="h-4 w-4 text-pink-200" /> Choose the truest answer</div><p className="text-sm text-white/65">{game.question}</p><div className="mt-4 space-y-2">{game.options.map((o) => <button key={o} onClick={() => setPicked(o)} className={cn("w-full rounded-3xl border px-4 py-3 text-left text-sm transition", picked === o ? o === game.correct ? "border-pink-300/30 bg-pink-300/12 text-pink-100" : "border-red-300/20 bg-red-400/10 text-white" : "border-white/10 bg-white/5 text-white/90")}>{o}</button>)}</div></GlassCard>;
}

function MemoryGame({ onComplete }) {
  const basePairs = useMemo(() => getMemoryPairsForToday(), []);
  const values = useMemo(() => [...basePairs, ...basePairs].sort(() => Math.random() - 0.5), [basePairs]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (values[a] === values[b]) {
        setMatched((prev) => [...prev, a, b]);
        setFlipped([]);
      } else {
        const t = setTimeout(() => setFlipped([]), 700);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, values]);
  useEffect(() => {
    if (matched.length === values.length && values.length > 0) onComplete();
  }, [matched, values, onComplete]);
  return <GlassCard><div className="mb-3 flex items-center gap-2 text-white"><Star className="h-4 w-4 text-pink-200" /> Match the hidden symbols</div><p className="text-sm text-white/65">A tiny memory game with love symbols that change each day.</p><div className="mt-4 grid grid-cols-4 gap-2">{values.map((v, i) => { const show = flipped.includes(i) || matched.includes(i); return <button key={i} onClick={() => !flipped.includes(i) && !matched.includes(i) && flipped.length < 2 && setFlipped((prev) => [...prev, i])} className={cn("aspect-square rounded-2xl border text-2xl transition", show ? "border-pink-300/25 bg-pink-300/10" : "border-white/10 bg-white/5")}>{show ? v : "?"}</button>; })}</div></GlassCard>;
}

function RevealGame({ onComplete }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= 5) onComplete();
  }, [count, onComplete]);
  return <GlassCard><div className="mb-3 flex items-center gap-2 text-white"><Gift className="h-4 w-4 text-pink-200" /> Gather the glowing hearts</div><p className="text-sm text-white/65">Tap the hearts until the hidden reward wakes up.</p><div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">{Array.from({ length: 5 }).map((_, i) => <motion.button key={i} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.04 }} onClick={() => count === i && setCount(i + 1)} className={cn("inline-flex h-14 w-14 items-center justify-center rounded-full border text-xl", i < count ? "border-pink-300/30 bg-pink-300/12 text-pink-100" : "border-white/10 bg-white/5 text-white/50")}>❤</motion.button>)}</div></GlassCard>;
}

function CompleteTile({ title, text }) {
  return <GlassCard className="h-full border-pink-300/20 bg-pink-300/10 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-300/12 text-pink-100"><Unlock className="h-6 w-6" /></div><h4 className="text-lg font-medium text-white">{title}</h4><p className="mt-3 text-sm leading-7 text-white/75">{text}</p></GlassCard>;
}

function MiniGameJourney({ progress, setProgress, setSectionHint }) {
  const completed = progress.completedGames || [];
  const finish = (id) => {
    if (completed.includes(id)) return;
    const next = [...completed, id];
    const nextProgress = { ...progress, completedGames: next };
    setProgress(nextProgress);
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(nextProgress));
    setSectionHint(`Alae, you unlocked another little piece of my heart. ${next.length}/4 rewards awakened.`);
  };
  return (
    <Section id="games" eyebrow="Puzzle journey" title="Little tests of love, made to feel soft and satisfying" description="Each one unlocks a fragment of the final reward. Simple, touch-friendly, and wrapped in sparkles instead of stress.">
      <div className="mb-6 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl"><div className="mb-2 flex items-center justify-between px-3 text-xs uppercase tracking-[0.25em] text-white/50"><span>Reward progress</span><span>{completed.length}/4</span></div><div className="h-3 rounded-full bg-white/5"><motion.div className="h-3 rounded-full bg-gradient-to-r from-pink-300 to-violet-300" animate={{ width: `${(completed.length / 4) * 100}%` }} /></div></div>
      <div className="grid gap-4 lg:grid-cols-2">
        {completed.includes("sentence") ? <CompleteTile title="Sentence complete" text="You found one hidden truth written just for today." /> : <SentenceGame onComplete={() => finish("sentence")} />}
        {completed.includes("choice") ? <CompleteTile title="Choice complete" text="You chose the truest answer from today’s heart prompt." /> : <ChoiceGame onComplete={() => finish("choice")} />}
        {completed.includes("memory") ? <CompleteTile title="Memory complete" text="Every symbol matched. Every little memory points back to you." /> : <MemoryGame onComplete={() => finish("memory")} />}
        {completed.includes("reveal") ? <CompleteTile title="Heart collection complete" text="The final seal is glowing now. One more section waits for you below." /> : <RevealGame onComplete={() => finish("reveal")} />}
      </div>
    </Section>
  );
}

function DailyLetter() {
  const [opened, setOpened] = useState(false);
  const letter = useMemo(() => getLetterForToday(), []);
  return (
    <Section id="daily-letter" eyebrow="Daily letter" title="A secret note waits for today" description="Every 24 hours a new letter appears, filled with love and little surprises. Open it to find today’s hidden message, and check back tomorrow for another.">
      <div className="mx-auto max-w-3xl">
        {!opened ? <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[34px] border border-white/10 bg-gradient-to-br from-pink-300/10 via-white/5 to-violet-300/10 p-6 text-center shadow-2xl backdrop-blur-xl"><div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-pink-300/20 bg-pink-300/10 text-pink-100"><Mail className="h-9 w-9" /></div><h3 className="text-2xl font-semibold text-white">Open today's love letter</h3><p className="mt-3 text-sm leading-7 text-white/70">A soft little note has arrived for {CONFIG.girlfriendName}. Tap to unfold today’s secret message.</p><button onClick={() => setOpened(true)} className="mt-6 rounded-full border border-pink-300/25 bg-pink-300/10 px-6 py-3 text-sm font-medium text-pink-100">Open the envelope</button></motion.div> : <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[34px] border border-white/10 bg-[#fff7fc] p-6 text-[#40263f] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"><div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.3em] text-[#9f6b8d]">For {CONFIG.girlfriendName}</p><h4 className="mt-2 text-2xl font-semibold text-[#432643]">Today’s hidden note</h4></div><button onClick={() => setOpened(false)} className="rounded-full border border-[#ecd7ea] px-3 py-1 text-xs text-[#7b5176]">Close</button></div><div className="rounded-[24px] border border-[#f0dff0] bg-white/80 p-5 text-sm leading-8">{letter}</div><p className="mt-4 text-xs text-[#8a6281]">Tomorrow, a different letter will appear automatically.</p></motion.div>}
      </div>
    </Section>
  );
}

function FinalReward({ unlocked, replayCount, onReplay }) {
  const dailyPrize = useMemo(() => getFinalPrizeForToday(), []);
  return (
    <Section id="final" eyebrow="Final reward" title="The heart at the center of this whole little world" description="I love u so deeply princess, and this is my favorite way to show it. A secret message just for you, wrapped in sparkles and unlocked with love.">
      <div className="mx-auto max-w-4xl">
        {!unlocked ? <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[34px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl"><div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70"><Lock className="h-8 w-8" /></div><h3 className="text-2xl font-semibold text-white">The final letter is still sleeping</h3><p className="mt-3 text-sm leading-7 text-white/70">Complete the little puzzle journey above to wake it up. Every finished game unlocks another hidden seal.</p></motion.div> : <motion.div key={replayCount} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-[36px] border border-pink-300/20 bg-gradient-to-br from-pink-300/12 via-white/6 to-violet-300/12 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8"><FloatingHearts /><div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_bottom,rgba(255,143,211,0.12),transparent_30%)]" /><div className="relative z-10 text-center"><motion.div animate={{ scale: [1, 1.06, 1], rotate: [0, 1.2, -1, 0] }} transition={{ repeat: Infinity, duration: 4.5 }} className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-pink-300/20 bg-pink-300/10 text-pink-100"><Mail className="h-9 w-9" /></motion.div><h3 className="bg-gradient-to-r from-white via-pink-100 to-violet-100 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">For {CONFIG.girlfriendName}, with all my heart</h3><p className="mx-auto mt-5 max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm leading-8 text-white/85 backdrop-blur-xl sm:text-base">{CONFIG.finalMessage}</p><p className="mx-auto mt-4 max-w-2xl rounded-[28px] border border-pink-300/20 bg-pink-300/10 p-5 text-sm leading-8 text-pink-50 backdrop-blur-xl sm:text-base">{dailyPrize}</p><div className="mt-5 text-2xl">💋 ✨ ❤ ✨ 💋</div><div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"><button onClick={onReplay} className="inline-flex items-center gap-2 rounded-full border border-pink-300/25 bg-pink-300/10 px-5 py-3 text-sm font-medium text-pink-100"><RotateCcw className="h-4 w-4" />Replay the moment</button><div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">Secret replays: {replayCount}</div></div></div></motion.div>}
      </div>
    </Section>
  );
}

function FooterNote() {
  return <footer className="mx-auto max-w-6xl px-4 pb-12 pt-6 text-center text-xs leading-7 text-white/40 sm:px-6">Built as a dreamy romantic experience. Your loyal husband Oussama💖</footer>;
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [shouldAutoStartMusic, setShouldAutoStartMusic] = useState(false);
  const { visits, streak, welcomeBack } = useVisitStats();
  const [sectionHint, setSectionHint] = useState("");
  const isBirthday = isBirthdayToday(CONFIG.birthdayMonth, CONFIG.birthdayDay);
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.progress)) || { completedGames: [] };
    } catch {
      return { completedGames: [] };
    }
  });
  const unlocked = (progress.completedGames || []).length >= 4;
  const [replayCount, setReplayCount] = useState(Number(localStorage.getItem(STORAGE_KEYS.replayCount) || 0));
  useEffect(() => {
    const move = (e) => {
      const trail = document.createElement("div");
      trail.className = "pointer-events-none fixed z-[80] h-2.5 w-2.5 rounded-full bg-pink-200/60 blur-[1px]";
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      document.body.appendChild(trail);
      requestAnimationFrame(() => {
        trail.style.transition = "transform 0.8s ease, opacity 0.8s ease";
        trail.style.transform = "translate(-50%, -50%) scale(2.8)";
        trail.style.opacity = "0";
      });
      setTimeout(() => trail.remove(), 800);
    };
    if (window.innerWidth >= 1024) {
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }
  }, []);
  const replayReward = () => {
    const next = replayCount + 1;
    setReplayCount(next);
    localStorage.setItem(STORAGE_KEYS.replayCount, String(next));
    setSectionHint(`Alae, I would replay choosing you forever.`);
  };
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0d0812] text-white" style={{ backgroundImage: "radial-gradient(circle at top, rgba(207,182,255,0.12), transparent 22%), radial-gradient(circle at bottom, rgba(255,143,211,0.09), transparent 20%), linear-gradient(180deg, #0d0812 0%, #140b1d 40%, #0d0812 100%)" }}>
      {!entered && <LoadingScreen onEnter={() => { setEntered(true); setShouldAutoStartMusic(true); }} />}
      <MusicControls isBirthday={isBirthday} shouldAutoStart={shouldAutoStartMusic} />
      <FloatingCompanion />
      <Hero onStart={() => { document.getElementById("relationship")?.scrollIntoView({ behavior: "smooth" }); setSectionHint(`Come closer, ${CONFIG.girlfriendName}… the next section is carrying our time together.`); }} isBirthday={isBirthday} welcomeBack={welcomeBack} streak={streak} visits={visits} sectionHint={sectionHint} setSectionHint={setSectionHint} />
      <RelationshipCounter />
      <BirthdaySection isBirthday={isBirthday} />
      <MiniGameJourney progress={progress} setProgress={setProgress} setSectionHint={setSectionHint} />
      <DailyLetter />
      <FinalReward unlocked={unlocked} replayCount={replayCount} onReplay={replayReward} />
      <FooterNote />
    </div>
  );
}
