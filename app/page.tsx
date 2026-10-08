import Link from "next/link";
import { getAllProperties } from "@/lib/properties";
import PropertyMap from "@/components/PropertyMap";
import PropertyCard from "@/components/PropertyCard";

export default function HomePage() {
  const properties = getAllProperties();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Property Intelligence
          </Link>

          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/map" className="hover:text-white">Map</Link>
            <Link href="/add-property" className="rounded-full border border-brand-500 bg-brand-500/10 px-4 py-2 font-medium text-brand-200 hover:bg-brand-500/20">
              Add Property
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
              First real asset
            </div>
            <h1 className="max-w-xl text-5xl font-black tracking-tight text-white md:text-6xl">
              Build a public property layer that people can trust.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Turn addresses into property pages, map views, and a structured public data system that can later evolve into verification, intelligence, and AI insights.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/add-property" className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-brand-400">
                Add property
              </Link>
              <Link href="/map" className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900">
                Explore map
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-soft">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900/40 p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Live property count</p>
                  <p className="mt-2 text-4xl font-black text-white">{properties.length}</p>
                </div>
                <div className="rounded-2xl bg-brand-500/20 px-3 py-2 text-sm font-medium text-brand-100">Map online</div>
              </div>
              <PropertyMap properties={properties} highlightId={properties[0]?.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">MVP product</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Featured properties</h2>
          </div>
          <Link href="/map" className="text-sm font-medium text-brand-200 hover:text-brand-100">
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}
