import Link from "next/link";
import type { Property } from "@/lib/properties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-soft">
      <div className="relative">
        <img src={property.imageUrl} alt={property.name} className="h-52 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{property.propertyType}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{property.name}</h3>
          </div>
          <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-2 py-1 text-xs font-medium text-brand-200">
            {property.city}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-300">{property.address}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1">{property.bedrooms} bd</span>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1">{property.bathrooms} ba</span>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1">{property.size} sq ft</span>
        </div>

        <Link href={`/property/${property.id}`} className="mt-6 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-brand-400">
          Open property page
        </Link>
      </div>
    </article>
  );
}
