import React, { useEffect, useState } from "react";

const FloatingDoc = ({ style, delay, size = 28 }) => (
  <div
    className="absolute"
    style={{
      animation: `floatDoc 3s ease-in-out infinite`,
      animationDelay: delay,
      ...style,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 28 36" fill="none">
      <rect x="2" y="2" width="22" height="28" rx="3"
        fill="#0051ff" opacity="0.08" style={{ filter: "blur(4px)" }} />
      <rect x="1" y="1" width="22" height="28" rx="3"
        fill="url(#docGrad)"
        stroke="rgba(0,120,255,0.35)" strokeWidth="0.8" />
      <path d="M17 1 L23 7 L17 7 Z"
        fill="rgba(0,207,255,0.15)"
        stroke="rgba(0,120,255,0.3)" strokeWidth="0.6" />
      <line x1="5" y1="12" x2="18" y2="12" stroke="rgba(0,180,255,0.4)" strokeWidth="1" strokeLinecap="round" />
      <line x1="5" y1="16" x2="18" y2="16" stroke="rgba(0,180,255,0.3)" strokeWidth="1" strokeLinecap="round" />
      <line x1="5" y1="20" x2="14" y2="20" stroke="rgba(0,180,255,0.2)" strokeWidth="1" strokeLinecap="round" />
      <defs>
        <linearGradient id="docGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1a4a" />
          <stop offset="100%" stopColor="#050d2a" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// ── Replace this with your actual page ──
const MainPage = ({ visible }) => (
  <div
    className="flex items-center justify-center min-h-screen"
    style={{
      background: "radial-gradient(ellipse at 60% 40%, #0a0f2e 0%, #020510 60%, #000308 100%)",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.97)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}
  >
    <div className="text-center">
      <h1 style={{
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        fontSize: "2rem", letterSpacing: "0.2em",
        color: "#ffffff", textTransform: "uppercase",
        textShadow: "0 0 30px #0051ff88"
      }}>Welcome to DOC GEN</h1>
      <p style={{
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        fontSize: "0.8rem", letterSpacing: "0.15em",
        color: "#ffffff55", marginTop: "1rem"
      }}>Your page content goes here.</p>
    </div>
  </div>
);

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  // "loading" | "complete" | "fadingOut" | "done"
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    if (phase !== "loading") return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 3.5;
        if (next >= 100) {
          clearInterval(timer);
          // Step 1: lock at 100, wait 600ms so user sees full bar
          setTimeout(() => setPhase("complete"), 600);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [phase]);

  // Step 2: after showing 100% briefly, start fade-out
  useEffect(() => {
    if (phase === "complete") {
      const t = setTimeout(() => setPhase("fadingOut"), 700);
      return () => clearTimeout(t);
    }
    // Step 3: after fade-out animation, unmount loader
    if (phase === "fadingOut") {
      const t = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return <MainPage visible={true} />;

  const isComplete = phase === "complete" || phase === "fadingOut";
  const isFading = phase === "fadingOut";

  return (
    <>
      {/* Loader overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, #0a0f2e 0%, #020510 60%, #000308 100%)",
          opacity: isFading ? 0 : 1,
          transform: isFading ? "scale(1.05)" : "scale(1)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
          pointerEvents: isFading ? "none" : "all",
        }}
      >
        {/* Ambient glow orbs */}
        <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #0051ff 0%, transparent 70%)", top: "20%", left: "30%" }} />
        <div className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)", bottom: "25%", right: "35%" }} />

        <div className="relative flex flex-col items-center gap-10">

          {/* Spinner */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="absolute w-full h-full" style={{ animation: "spin 12s linear infinite" }} viewBox="0 0 144 144">
              <circle cx="72" cy="72" r="68" fill="none" stroke="rgba(0,81,255,0.15)" strokeWidth="1" strokeDasharray="4 8" />
            </svg>

            <div className="absolute w-full h-full rounded-full"
              style={{
                border: "2px solid transparent",
                borderTopColor: "#0051ff", borderRightColor: "#0051ff44",
                animation: "spin 2.8s cubic-bezier(0.4,0,0.6,1) infinite",
                filter: "drop-shadow(0 0 6px #0051ff88)"
              }} />

            <div className="absolute w-24 h-24 rounded-full"
              style={{
                border: "2px solid transparent",
                borderBottomColor: "#00cfff", borderLeftColor: "#00cfff44",
                animation: "spin 1.8s cubic-bezier(0.4,0,0.6,1) infinite reverse",
                filter: "drop-shadow(0 0 6px #00cfff66)"
              }} />

            <div className="absolute w-14 h-14 rounded-full"
              style={{ border: "1.5px solid #0051ff22", animation: "pulse-ring 2s ease-in-out infinite" }} />

            {/* Floating Docs */}
            <FloatingDoc size={22} delay="0s"
              style={{ top: "6px", left: "4px", transform: "rotate(-18deg)", opacity: 0.85, filter: "drop-shadow(0 0 5px #0051ffaa)" }} />
            <FloatingDoc size={26} delay="0.6s"
              style={{ top: "4px", right: "2px", transform: "rotate(14deg)", opacity: 0.75, filter: "drop-shadow(0 0 5px #00cfffaa)" }} />
            <FloatingDoc size={18} delay="1.2s"
              style={{ bottom: "8px", left: "8px", transform: "rotate(10deg)", opacity: 0.65, filter: "drop-shadow(0 0 4px #0051ff88)" }} />
            <FloatingDoc size={20} delay="1.8s"
              style={{ bottom: "6px", right: "6px", transform: "rotate(-12deg)", opacity: 0.7, filter: "drop-shadow(0 0 4px #00cfff88)" }} />

            <div className="relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 10px #00cfff, 0 0 24px #00cfff66", animation: "pulse 2s ease-in-out infinite" }} />
            </div>
          </div>

          {/* Label + Progress */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-px h-4 bg-linear-to-b from-transparent via-blue-500 to-transparent" />
              <span style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: "11px", letterSpacing: "0.35em",
                color: "#ffffff88", textTransform: "uppercase"
              }}>DOC GEN</span>
              <div className="w-px h-4 bg-linear-to-b from-transparent via-blue-500 to-transparent" />
            </div>

            {/* Progress bar track */}
            <div className="relative w-48 h-px bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: isComplete
                    ? "linear-gradient(90deg, #00cfff, #00cfff)"
                    : "linear-gradient(90deg, #0051ff, #00cfff)",
                  boxShadow: isComplete ? "0 0 12px #00cfffcc" : "0 0 8px #00cfff88",
                  transition: "width 0.2s ease-out, background 0.4s ease, box-shadow 0.4s ease",
                }}
              />
            </div>

            {/* Percentage */}
            <span style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "10px", letterSpacing: "0.2em",
              color: isComplete ? "#00cfff" : "#ffffff44",
              transition: "color 0.4s ease",
            }}>
              {Math.min(Math.round(progress), 100)}%
            </span>

            {/* "Ready" label that appears at 100% */}
            <span style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: "9px", letterSpacing: "0.3em",
              color: "#00cfff",
              textTransform: "uppercase",
              opacity: isComplete ? 1 : 0,
              transform: isComplete ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}>
              ✦ Ready
            </span>
          </div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.1; }
          }
          @keyframes floatDoc {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-5px); }
          }
        `}</style>
      </div>
    </>
  );
};

export default PageLoader;