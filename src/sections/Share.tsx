import { wedding } from "../config/wedding";
import { Section, Title, ActionButton } from "../components/ui";
import { useToast } from "../components/Toast";
import { copyText, hasValue } from "../lib/utils";

/** 섹션11 — 공유하기 (Web Share API → 실패 시 링크 복사 폴백) */
export default function Share() {
  const toast = useToast();

  const shareUrl = () =>
    hasValue(wedding.shareUrl) ? wedding.shareUrl : typeof window !== "undefined" ? window.location.href : "";

  const onShare = async () => {
    const url = shareUrl();
    const data: ShareData = {
      title: wedding.shareTitle,
      text: wedding.shareDescription,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
    } catch (err) {
      // 사용자가 취소한 경우엔 조용히 종료
      if (err instanceof DOMException && err.name === "AbortError") return;
      // 그 외 오류 → 복사 폴백
    }
    const ok = await copyText(url);
    toast.show(ok ? "초대장 링크를 복사했어요!" : "링크 복사에 실패했어요.");
  };

  const onCopyLink = async () => {
    const ok = await copyText(shareUrl());
    toast.show(ok ? "초대장 링크를 복사했어요!" : "링크 복사에 실패했어요.");
  };

  const kakaoEnabled = hasValue(wedding.kakaoJsKey);

  return (
    <Section id="share">
      <Title label="SHARE">초대장 공유하기</Title>

      <div className="mx-auto max-w-[320px]">
        <div className="dialog px-5 py-6 text-center">
          <div className="mb-3 text-[30px]" aria-hidden>
            💌
          </div>
          <p className="mb-5 text-[14px] leading-relaxed text-maple-ink/80">
            소중한 분들에게 저희의 초대장을
            <br />
            함께 전해주세요.
          </p>

          <div className="flex flex-col gap-2.5">
            <ActionButton onClick={onShare} color="purple" className="w-full">
              📤 초대장 공유하기
            </ActionButton>
            <ActionButton onClick={onCopyLink} color="cream" className="w-full">
              🔗 링크 복사하기
            </ActionButton>
            {/* 카카오 공유: SDK 키 입력 전까지 비활성화된 선택 기능 */}
            <button
              type="button"
              disabled={!kakaoEnabled}
              onClick={() => {
                if (!kakaoEnabled) return;
                toast.show("카카오 공유를 준비 중입니다.");
              }}
              className="btn-pixel w-full bg-[#FEE500] text-[#3c1e1e] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="카카오톡으로 공유하기"
            >
              💬 카카오톡 공유{!kakaoEnabled && " (준비 중)"}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
