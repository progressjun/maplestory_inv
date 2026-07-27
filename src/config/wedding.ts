/**
 * ============================================================
 *  청첩장 콘텐츠 설정 파일 (여기만 수정하면 됩니다)
 * ============================================================
 *  - 이름 / 날짜 / 장소 등 텍스트를 이 파일에서 바꾸세요.
 *  - 아직 준비되지 않은 값은 "" (빈 문자열) 또는 [] (빈 배열) 로 두면
 *    해당 버튼/섹션이 자동으로 숨겨집니다.
 *  - [대괄호] 로 표시된 값은 "무엇을 넣어야 하는지" 알려주는 임시 안내문입니다.
 * ============================================================
 */

export interface Account {
  bank: string;
  holder: string;
  number: string;
}

export interface Person {
  name: string;
  nameEn: string;
  intro: string;
  image: string; // 프로필 이미지 경로 ("" 이면 오리지널 캐릭터 표시)
  phone: string; // "" 이면 전화/문자 버튼 숨김
}

export interface Parent {
  name: string;
  phone: string;
  label: string; // 예: "신랑 아버지"
  deceased?: boolean; // 고인일 경우 이름 앞에 국화(故) 표시
}

export interface WeddingConfig {
  // ---- 기본 문구 ----
  title: string; // 메인 제목
  subtitle: string; // 서브 제목
  inviteLabel: string; // 초대 섹션 상단 영문 라벨
  inviteTitle: string;
  inviteMessage: string; // 초대 본문 (줄바꿈은 \n)

  // ---- 신랑 / 신부 / 아기 ----
  groom: Person;
  bride: Person;
  babyName: string; // 아기 이름 ("" 이면 미표시)

  // ---- 예식 정보 ----
  dateISO: string; // ISO8601 (KST) — D-day 계산 기준
  dateText: string; // 화면 표시용 날짜
  timeText: string; // 화면 표시용 시간
  venueName: string;
  venueFloor: string;
  venueHall: string;
  address: string;

  // ---- 오프닝 인트로 영상 ----
  introVideo: string; // 인트로 영상 (mp4/webm, "" 이면 캐릭터 걷기 애니메이션으로 대체)
  introPoster: string; // 인트로 영상 poster 이미지

  // ---- 미디어 ----
  heroImage: string; // 대표 이미지 ("" 이면 일러스트 플레이스홀더)
  heroVideo: string; // 대표 영상 (mp4/webm, "" 이면 미사용)
  heroPoster: string; // 영상 poster 이미지
  heroText: string;
  gallery: string[]; // 갤러리 이미지 목록 (최대 20장 권장, [] 이면 섹션 숨김)
  weddingVideoUrl: string; // 유튜브/비메오/mp4 ("" 이면 섹션 숨김)

  // ---- 혼주 ----
  parents: Parent[];

  // ---- 계좌 (마음 전하실 곳) ----
  groomAccounts: Account[];
  brideAccounts: Account[];

  // ---- 오시는 길 ----
  mapNaverUrl: string;
  mapKakaoUrl: string;
  mapTmapUrl: string;
  transport: string; // 교통편 안내 ("" 이면 숨김)
  parking: string; // 주차 안내 ("" 이면 숨김)
  shuttle: string; // 셔틀버스 안내 ("" 이면 숨김)

  // ---- 공유 / 메타 ----
  shareTitle: string;
  shareDescription: string;
  shareImage: string;
  shareUrl: string; // 배포 후 실제 URL ("" 이면 현재 주소 사용)
  kakaoJsKey: string; // 카카오 SDK 키 ("" 이면 카카오 공유 버튼 비활성)

  // ---- 배경음악 ----
  bgmUrl: string; // "" 이면 음악 버튼 숨김
  bgmTitle: string;

  // ---- 섹션 노출 여부 ----
  sections: {
    hero: boolean;
    invite: boolean;
    profiles: boolean;
    calendar: boolean;
    video: boolean;
    gallery: boolean;
    location: boolean;
    accounts: boolean;
    contact: boolean;
    share: boolean;
    ending: boolean;
  };
}

const NAVER = "https://map.naver.com/p/search/";
const KAKAO = "https://map.kakao.com/?q=";

export const wedding: WeddingConfig = {
  title: "우리, 결혼합니다",
  subtitle: "서로 다른 길을 걷던 두 사람이 만나 하나의 모험을 시작합니다",
  inviteLabel: "A NEW JOURNEY",
  inviteTitle: "소중한 분들을 초대합니다",
  inviteMessage:
    "각자의 모험을 이어오던 두 사람이\n서로의 손을 잡고 같은 길을 걷기로 했습니다.\n\n작은 용기로 시작한 여정의 첫걸음에\n소중한 분들을 초대합니다.\n\n따뜻한 축복으로 새로운 이야기의\n시작을 함께 지켜봐 주세요.",

  groom: {
    name: "한준희",
    nameEn: "Han Junhee",
    intro: "매일이 새로운 퀘스트, 함께라 든든한 사람",
    image: "", // 예: "/assets/groom.png" (배경이 투명한 PNG 권장)
    phone: "", // 예: "010-1234-5678"
  },
  bride: {
    name: "강다희",
    nameEn: "Kang Dahee",
    intro: "어떤 모험도 웃으며 함께 걷는 사람",
    image: "", // 예: "/assets/bride.png"
    phone: "",
  },
  babyName: "한시아",

  dateISO: "2026-10-18T11:00:00+09:00",
  dateText: "2026년 10월 18일 일요일",
  timeText: "오전 11시",
  venueName: "마리드엘웨딩",
  venueFloor: "6층",
  venueHall: "",
  address: "대전광역시 서구 만년로 69, 6층",

  introVideo: "", // 예: "/assets/intro.mp4"  ← 인트로 영상을 넣으면 오프닝에서 재생됩니다
  introPoster: "", // 예: "/assets/intro-poster.jpg"

  heroImage: "", // 예: "/assets/hero.jpg"
  heroVideo: "",
  heroPoster: "",
  heroText: "우리의 새로운 모험이 시작됩니다",
  gallery: [
    // 예: "/assets/gallery/01.webp", "/assets/gallery/02.webp", ...
    // 사진을 넣기 전까지는 아래를 비워두면 갤러리 섹션이 자동으로 숨겨집니다.
  ],
  weddingVideoUrl: "", // 예: "https://www.youtube.com/watch?v=xxxxxxxx"

  parents: [
    { label: "신랑 아버지", name: "[신랑 아버지 성함]", phone: "" },
    { label: "신랑 어머니", name: "[신랑 어머니 성함]", phone: "" },
    { label: "신부 아버지", name: "[신부 아버지 성함]", phone: "" },
    { label: "신부 어머니", name: "[신부 어머니 성함]", phone: "" },
  ],

  groomAccounts: [
    { bank: "[은행명]", holder: "한준희", number: "[계좌번호 입력]" },
  ],
  brideAccounts: [
    { bank: "[은행명]", holder: "강다희", number: "[계좌번호 입력]" },
  ],

  mapNaverUrl: NAVER + encodeURIComponent("마리드엘웨딩 대전"),
  mapKakaoUrl: KAKAO + encodeURIComponent("마리드엘웨딩 대전"),
  mapTmapUrl: "tmap://search?name=" + encodeURIComponent("마리드엘웨딩"),
  transport: "지하철 · 버스 이용 시 상세 교통편 안내를 이곳에 입력하세요.",
  parking: "예식장 건물 주차장을 이용하실 수 있습니다. (상세 안내 입력 위치)",
  shuttle: "",

  shareTitle: "한준희 ♥ 강다희 결혼합니다",
  shareDescription:
    "서로 다른 길을 걷던 두 사람이 만나 새로운 모험을 시작합니다. 2026.10.18 SUN 11:00 · 마리드엘웨딩",
  shareImage: "/assets/og-image.png",
  shareUrl: "",
  kakaoJsKey: "",

  bgmUrl: "", // 예: "/assets/bgm.mp3"
  bgmTitle: "배경음악",

  sections: {
    hero: true,
    invite: true,
    profiles: true,
    calendar: true,
    video: true,
    gallery: true,
    location: true,
    accounts: true,
    contact: true,
    share: true,
    ending: true,
  },
};
