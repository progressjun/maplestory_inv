import { useState } from "react";
import { wedding, type Account } from "../config/wedding";
import { Section, Title } from "../components/ui";
import { useToast } from "../components/Toast";
import { copyText, cx } from "../lib/utils";

/** 섹션9 — 마음 전하실 곳 (신랑측/신부측 아코디언) */
export default function Accounts() {
  const groom = wedding.groomAccounts.filter((a) => a.number);
  const bride = wedding.brideAccounts.filter((a) => a.number);
  if (groom.length === 0 && bride.length === 0) return null;

  return (
    <Section id="accounts">
      <Title label="GIFT">마음 전하실 곳</Title>
      <p className="mx-auto mb-4 max-w-[320px] text-center text-[13px] leading-relaxed text-maple-ink/70">
        참석이 어려우신 분들을 위해 계좌를 안내드립니다.
        <br />
        전해주시는 따뜻한 마음 소중히 간직하겠습니다.
      </p>

      <div className="mx-auto flex max-w-[360px] flex-col gap-3">
        {groom.length > 0 && <AccountGroup title="신랑 측" accent="blue" list={groom} />}
        {bride.length > 0 && <AccountGroup title="신부 측" accent="rose" list={bride} />}
      </div>
    </Section>
  );
}

function AccountGroup({
  title,
  accent,
  list,
}: {
  title: string;
  accent: "blue" | "rose";
  list: Account[];
}) {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  const onCopy = async (num: string) => {
    const ok = await copyText(num);
    toast.show(ok ? "계좌번호를 복사했어요." : "복사에 실패했어요. 길게 눌러 복사해 주세요.");
  };

  return (
    <div className="dialog overflow-hidden p-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cx(
          "flex w-full items-center justify-between px-5 py-4 text-left",
          accent === "blue" ? "text-maple-blue" : "text-maple-rosedeep"
        )}
      >
        <span className="flex items-center gap-2 text-[15px] font-bold">
          <span aria-hidden>{accent === "blue" ? "🤵" : "👰"}</span>
          {title} 계좌 보기
        </span>
        <span className={cx("transition-transform", open && "rotate-180")} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className="space-y-2 border-t-2 border-dashed border-maple-wooddark/30 px-4 py-3">
          {list.map((a, i) => (
            <div key={i} className="rounded-xl bg-maple-cream px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-maple-ink">
                    {a.bank} <span className="text-maple-ink/60">· {a.holder}</span>
                  </p>
                  <p className="mt-0.5 select-all break-all font-pixel text-[14px] text-maple-wooddark">
                    {a.number}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onCopy(a.number)}
                  className="btn-pixel shrink-0 bg-white !min-h-[38px] !px-3 !text-[12px] text-maple-ink"
                  aria-label={`${a.bank} 계좌번호 복사`}
                >
                  복사
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
