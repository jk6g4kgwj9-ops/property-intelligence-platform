import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <div className="max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">404</p>
        <h1 className="mt-4 text-4xl font-black text-white">Property not found</h1>
        <p className="mt-4 text-slate-300">
          That property link may not exist yet or it may have been removed.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950 hover:bg-brand-400">
          Return home
        </Link>
      </div>
    </main>
  );
}
