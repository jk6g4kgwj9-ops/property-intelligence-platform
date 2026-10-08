import Link from "next/link";
import { useState } from "react";

const initialForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "USA",
  propertyType: "Residential",
  description: "",
  bedrooms: 3,
  bathrooms: 2,
  size: 1800,
};

export default function AddPropertyPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "bedrooms" || name === "bathrooms" || name === "size" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error || "Something went wrong while creating the property.");
      }

      const property = await response.json();
      window.location.href = `/property/${property.id}`;
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong while creating the property.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Property form</p>
          <h1 className="mt-2 text-4xl font-black text-white">Add a property</h1>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Property name</span>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-brand-400" placeholder="My Test Property" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Property type</span>
              <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-brand-400">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Land</option>
                <option>Mixed Use</option>
              </select>
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-200">Address</span>
              <input name="address" value={form.address} onChange={handleChange} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="145 Cedar Lane" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">City</span>
              <input name="city" value={form.city} onChange={handleChange} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="San Francisco" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">State</span>
              <input name="state" value={form.state} onChange={handleChange} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="California" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Country</span>
              <input name="country" value={form.country} onChange={handleChange} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="USA" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Bedrooms</span>
              <input type="number" min={0} name="bedrooms" value={form.bedrooms} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-brand-400" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Bathrooms</span>
              <input type="number" min={0} name="bathrooms" value={form.bathrooms} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-brand-400" />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-200">Description</span>
              <textarea name="description" value={form.description} onChange={handleChange} rows={5} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="Modern residential property with open-plan rooms and natural light." />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-200">Property size (sq ft)</span>
              <input type="number" min={0} name="size" value={form.size} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-brand-400" />
            </label>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-700/70 bg-red-900/20 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-end">
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? "Creating property..." : "Create Property"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
