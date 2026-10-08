import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/properties";
import PropertyMap from "@/components/PropertyMap";

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Property Intelligence
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/map" className="hover:text-white">Map</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/map" className="hover:text-white">Map</Link>
          <span>/</span>
          <span className="text-slate-200">{property.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-soft">
              <img
                src={property.imageUrl}
                alt={property.name}
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Property overview</p>
              <h1 className="mt-4 text-4xl font-black text-white">{property.name}</h1>
              <p className="mt-3 text-lg text-slate-300">{property.address}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
                <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">{property.bedrooms} Bedrooms</span>
                <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">{property.bathrooms} Bathrooms</span>
                <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">{property.size} sq ft</span>
                <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">{property.propertyType}</span>
              </div>

              <p className="mt-6 text-base leading-7 text-slate-300">{property.description}</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Location</p>
              <h2 className="mt-4 text-2xl font-bold text-white">{property.city}, {property.state}</h2>
              <p className="mt-3 text-slate-300">{property.country}</p>
              <dl className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex justify-between gap-6"><dt>Latitude</dt><dd>{property.latitude.toFixed(4)}</dd></div>
                <div className="flex justify-between gap-6"><dt>Longitude</dt><dd>{property.longitude.toFixed(4)}</dd></div>
              </dl>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Property map</p>
              <div className="mt-4">
                <PropertyMap properties={[property]} highlightId={property.id} compact />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
