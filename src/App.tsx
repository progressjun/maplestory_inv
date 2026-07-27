import { useCallback } from "react";
import { wedding } from "./config/wedding";
import { ToastProvider } from "./components/Toast";
import { StageConnector } from "./components/StageConnector";
import Bgm from "./components/Bgm";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { hasValue, toEmbedUrl, isDirectVideo } from "./lib/utils";

import Opening from "./sections/Opening";
import Hero from "./sections/Hero";
import Invite from "./sections/Invite";
import Profiles from "./sections/Profiles";
import CalendarSection from "./sections/CalendarSection";
import VideoSection from "./sections/VideoSection";
import Gallery from "./sections/Gallery";
import Location from "./sections/Location";
import Accounts from "./sections/Accounts";
import Contact from "./sections/Contact";
import Share from "./sections/Share";
import Ending from "./sections/Ending";

/** 하나의 게임 월드처럼 이어지는 배경 (아침 → 숲 → 구름 위 → 노을) */
const WORLD_BG =
  "linear-gradient(180deg,#bfe3ff 0%,#dcefff 10%,#d8f4dd 26%,#cdeec9 38%,#dfeaff 56%,#ece1ff 76%,#f1e6ff 100%)";

export default function App() {
  const reduced = useReducedMotion();
  const s = wedding.sections;

  // 갤러리/영상은 실제 콘텐츠가 있을 때만 노출
  const showGallery = s.gallery && wedding.gallery.filter(Boolean).length > 0;
  const videoEmbed = toEmbedUrl(wedding.weddingVideoUrl);
  const showVideo =
    s.video &&
    hasValue(wedding.weddingVideoUrl) &&
    (videoEmbed !== null || isDirectVideo(wedding.weddingVideoUrl));
  const showAccounts =
    s.accounts &&
    (wedding.groomAccounts.some((a) => a.number) || wedding.brideAccounts.some((a) => a.number));

  const scrollToHero = useCallback(() => {
    const el = document.getElementById("world-start");
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [reduced]);

  return (
    <ToastProvider>
      {/* PC 배경: 흐릿한 판타지 하늘 */}
      <div className="pc-backdrop" />

      <main
        className="relative mx-auto w-full max-w-[480px] overflow-hidden md:my-4 md:rounded-[28px] md:shadow-2xl"
        style={{ background: WORLD_BG }}
      >
        {/* 섹션1 오프닝 */}
        <Opening onEnter={scrollToHero} />

        {/* 월드 시작 지점 (초대장 열기 → 여기로 스크롤) */}
        <div id="world-start" />

        {s.hero && <Hero />}

        {s.invite && (
          <>
            <StageConnector variant="path" sign="초대의 숲" />
            <Invite />
          </>
        )}

        {s.profiles && (
          <>
            <StageConnector variant="bridge" />
            <Profiles />
          </>
        )}

        {s.calendar && (
          <>
            <StageConnector variant="cloud" sign="약속의 날" />
            <CalendarSection />
          </>
        )}

        {showVideo && (
          <>
            <StageConnector variant="path" />
            <VideoSection />
          </>
        )}

        {showGallery && (
          <>
            <StageConnector variant="path" sign="추억의 길" />
            <Gallery />
          </>
        )}

        {s.location && (
          <>
            <StageConnector variant="bridge" sign="예식의 성" />
            <Location />
          </>
        )}

        {showAccounts && (
          <>
            <StageConnector variant="path" />
            <Accounts />
          </>
        )}

        {s.contact && (
          <>
            <StageConnector variant="path" />
            <Contact />
          </>
        )}

        {s.share && (
          <>
            <StageConnector variant="cloud" />
            <Share />
          </>
        )}

        {s.ending && <Ending />}
      </main>

      <Bgm />
    </ToastProvider>
  );
}
