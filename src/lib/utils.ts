/** 여러 className 을 안전하게 합칩니다. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** 대괄호 플레이스홀더([...]) 인지 판별 — 실제 값이 없는 안내문입니다. */
export function isPlaceholder(v: string | undefined | null): boolean {
  if (!v) return true;
  const t = v.trim();
  return t.length === 0 || (t.startsWith("[") && t.endsWith("]"));
}

/** 실제로 채워진 값이 있는지 (플레이스홀더/빈값 제외) */
export function hasValue(v: string | undefined | null): boolean {
  return !isPlaceholder(v);
}

/** 클립보드 복사 — 실패 시 legacy execCommand 로 폴백. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* 아래 폴백으로 진행 */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** tel: 링크용 숫자만 남기기 */
export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^0-9+]/g, "");
}
export function smsHref(phone: string): string {
  return "sms:" + phone.replace(/[^0-9+]/g, "");
}

/** 유튜브/비메오 URL → 임베드 URL. 실패하면 null. */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (host.endsWith("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    if (u.pathname.endsWith(".mp4") || u.pathname.endsWith(".webm")) {
      return url; // 직접 파일은 <video> 로 처리
    }
  } catch {
    return null;
  }
  return null;
}

export function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}
