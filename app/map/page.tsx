import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProperties, getPropertyById } from "@/lib/properties";
import PropertyMap from "@/components/PropertyMap";

export default function MapPage() {
  const properties = getAllProperties();

  if (!properties.length) {
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
            <Link href="/add-property" className="rounded-full border border-brand-500 bg-brand-500/10 px-4 py-2 font-medium text-brand-200 hover:bg-brand-500/20">
              Add Property
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Map</p>
            <h1 className="mt-2 text-4xl font-black text-white">Interactive property map</h1>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-soft">
          <PropertyMap properties={properties} />
        </div>
      </section>
    </main>
  );
}
