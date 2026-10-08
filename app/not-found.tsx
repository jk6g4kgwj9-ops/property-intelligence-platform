import type { Property } from "@/lib/properties";

function toMapPosition(latitude: number, longitude: number) {
  return {
    left: ((longitude + 180) / 360) * 100,
    top: ((90 - latitude) / 180) * 100,
  };
}

export default function PropertyMap({
  properties,
  highlightId,
  compact = false,
}: {
  properties: Property[];
  highlightId?: string;
  compact?: boolean;
}) {
  const baseClasses = compact
    ? "relative h-[280px] overflow-hidden rounded-3xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(32,140,116,0.18),_transparent_35%),linear-gradient(135deg,#0f172a,#111827)]"
    : "relative h-[420px] overflow-hidden rounded-3xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(32,140,116,0.18),_transparent_35%),linear-gradient(135deg,#0f172a,#111827)]";

  return (
    <div className={baseClasses}>
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {properties.map((property) => {
        const position = toMapPosition(property.latitude, property.longitude);
        const isHighlighted = property.id === highlightId;

        return (
          <a
            key={property.id}
            href={`/property/${property.id}`}
            title={property.name}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${position.left}%`, top: `${position.top}%` }}
          >
            <div
              className={[
                "flex items-center justify-center rounded-full border text-[10px] font-bold text-slate-950 shadow-lg transition duration-200",
                isHighlighted ? "h-7 w-7 border-brand-200 bg-brand-400 ring-4 ring-brand-400/30" : "h-5 w-5 border-slate-200 bg-white/90",
              ].join(" ")}
            >
              <span className="sr-only">{property.name}</span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
