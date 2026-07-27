import { Bridge, Signpost, Cloud } from "./Scenery";

/** 섹션과 섹션을 자연스럽게 잇는 연결 장식 (길/다리/구름/표지판). */
export function StageConnector({
  variant = "path",
  sign,
}: {
  variant?: "path" | "bridge" | "cloud";
  sign?: string;
}) {
  return (
    <div className="relative flex h-16 items-center justify-center" aria-hidden>
      {variant === "bridge" && <Bridge className="h-10 w-56 opacity-90" />}
      {variant === "cloud" && (
        <div className="flex w-full items-center justify-between px-8 opacity-90">
          <Cloud className="w-16" />
          <Cloud className="w-12" />
          <Cloud className="w-20" />
        </div>
      )}
      {variant === "path" && (
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-maple-woodlight"
              style={{ opacity: 0.5 + i * 0.1 }}
            />
          ))}
        </div>
      )}
      {sign && (
        <div className="absolute -top-1 right-6">
          <Signpost text={sign} />
        </div>
      )}
    </div>
  );
}
