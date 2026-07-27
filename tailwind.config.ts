import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 본문: 가독성 우선 현대식 한글 폰트 (Pretendard)
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Apple SD Gothic Neo"',
          '"Malgun Gothic"',
          "sans-serif",
        ],
        // 장식/제목: 픽셀 감성 한글 폰트 (Galmuri)
        pixel: ['"Galmuri11"', '"Galmuri9"', "monospace"],
        pixelbold: ['"Galmuri14"', '"Galmuri11"', "monospace"],
      },
      colors: {
        // 오리지널 판타지 마을 팔레트 (파스텔)
        maple: {
          sky: "#bfe3ff",
          sky2: "#e6f5ff",
          grass: "#8fd67a",
          grassdark: "#63b55a",
          brick: "#f6cf6b",
          brickdark: "#e0ac45",
          wood: "#c99a6b",
          wooddark: "#8a5f3c",
          woodlight: "#e6c79b",
          parchment: "#fff6e6", // 대화창 배경
          parchment2: "#ffe9c7",
          ink: "#5b4636", // 본문 진한 갈색
          npc: "#ffd94d",
          rose: "#ff9dc0",
          rosedeep: "#ef6ba0",
          orange: "#ffab5e",
          blue: "#7cc0ff",
          purple: "#b79bff",
          lav: "#d9c9ff", // 라벤더
          cream: "#fff3dd",
          mint: "#b7ecd6",
          sunset: "#ffb27a",
          dusk: "#8b6fb0",
        },
      },
      boxShadow: {
        pixel: "4px 4px 0 0 rgba(58,36,16,0.35)",
        pixelsm: "2px 2px 0 0 rgba(58,36,16,0.35)",
        window: "0 0 0 3px #5e3a17, 0 8px 0 0 rgba(58,36,16,0.35), inset 0 0 0 3px #fdf3d8",
      },
      keyframes: {
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        bobslow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        blink: {
          "0%,45%,55%,100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.1)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) translateX(40px)", opacity: "0.2" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        levelup: {
          "0%": { transform: "translateY(20px) scale(0.8)", opacity: "0" },
          "40%": { transform: "translateY(0) scale(1.1)", opacity: "1" },
          "100%": { transform: "translateY(-30px) scale(1)", opacity: "0" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.25", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        walk: {
          "0%,100%": { transform: "translateY(0) rotate(-1.5deg)" },
          "50%": { transform: "translateY(-3px) rotate(1.5deg)" },
        },
        sway: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floatup: {
          "0%": { transform: "translateY(0) scale(0.6)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(-90px) scale(1)", opacity: "0" },
        },
        reveal: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        bob: "bob 2.2s ease-in-out infinite",
        bobslow: "bobslow 3.4s ease-in-out infinite",
        drift: "drift 30s linear infinite",
        pop: "pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        wiggle: "wiggle 1.6s ease-in-out infinite",
        fall: "fall linear infinite",
        shine: "shine 3s linear infinite",
        levelup: "levelup 1.6s ease-out forwards",
        twinkle: "twinkle 2.4s ease-in-out infinite",
        walk: "walk 0.5s ease-in-out infinite",
        sway: "sway 3.2s ease-in-out infinite",
        floatup: "floatup 1.8s ease-out forwards",
        reveal: "reveal 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
