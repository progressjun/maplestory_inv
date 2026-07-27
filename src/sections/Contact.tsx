import { useState } from "react";
import { wedding } from "../config/wedding";
import { Section, Title } from "../components/ui";
import { useToast } from "../components/Toast";
import { copyText, hasValue, telHref, smsHref, cx } from "../lib/utils";

interface Contactee {
  label: string;
  name: string;
  phone: string;
}

/** 섹션10 — 연락하기 (신랑측/신부측 탭, 실사용성 우선) */
export default function Contact() {
  const groomFolks: Contactee[] = [
    { label: "신랑", name: wedding.groom.name, phone: wedding.groom.phone },
    ...wedding.parents
      .filter((p) => p.label.includes("신랑"))
      .map((p) => ({ label: p.label, name: p.name, phone: p.phone })),
  ];
  const brideFolks: Contactee[] = [
    { label: "신부", name: wedding.bride.name, phone: wedding.bride.phone },
    ...wedding.parents
      .filter((p) => p.label.includes("신부"))
      .map((p) => ({ label: p.label, name: p.name, phone: p.phone })),
  ];

  const [tab, setTab] = useState<"groom" | "bride">("groom");
  const list = tab === "groom" ? groomFolks : brideFolks;

  return (
    <Section id="contact">
      <Title label="CONTACT">연락하기</Title>

      <div className="mx-auto max-w-[360px]">
        {/* 탭 */}
        <div className="mb-3 flex gap-2">
          <TabButton active={tab === "groom"} onClick={() => setTab("groom")} accent="blue">
            🤵 신랑 측
          </TabButton>
          <TabButton active={tab === "bride"} onClick={() => setTab("bride")} accent="rose">
            👰 신부 측
          </TabButton>
        </div>

        <div className="dialog divide-y-2 divide-dashed divide-maple-wooddark/20 px-4 py-1">
          {list.map((c, i) => (
            <ContactRow key={i} c={c} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TabButton({
  active,
  onClick,
  accent,
  children,
}: {
  active: boolean;
  onClick: () => void;
  accent: "blue" | "rose";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "btn-pixel flex-1 !text-[14px]",
        active
          ? accent === "blue"
            ? "bg-maple-blue text-white"
            : "bg-maple-rose text-white"
          : "bg-maple-cream text-maple-ink/70"
      )}
    >
      {children}
    </button>
  );
}

function ContactRow({ c }: { c: Contactee }) {
  const toast = useToast();
  const hasPhone = hasValue(c.phone);

  const onCopy = async () => {
    const ok = await copyText(c.phone);
    toast.show(ok ? "연락처를 복사했어요!" : "복사에 실패했어요.");
  };

  return (
    <div className="flex items-center justify-between gap-2 py-3">
      <div className="min-w-0">
        <span className="font-pixel text-[11px] font-bold text-maple-wooddark">{c.label}</span>
        <p className="truncate text-[15px] font-semibold text-maple-ink">{c.name}</p>
      </div>
      {hasPhone ? (
        <div className="flex shrink-0 gap-1.5">
          <a
            href={telHref(c.phone)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-maple-wooddark bg-maple-grass text-white"
            aria-label={`${c.label} ${c.name}에게 전화`}
          >
            📞
          </a>
          <a
            href={smsHref(c.phone)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-maple-wooddark bg-maple-blue text-white"
            aria-label={`${c.label} ${c.name}에게 문자`}
          >
            ✉️
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-maple-wooddark bg-white"
            aria-label={`${c.label} ${c.name} 연락처 복사`}
          >
            📋
          </button>
        </div>
      ) : (
        <span className="shrink-0 text-[12px] text-maple-ink/40">연락처 준비 중</span>
      )}
    </div>
  );
}
