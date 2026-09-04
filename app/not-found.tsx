import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
        {/* Large 404 Accent */}
        <p className="text-6xl font-extrabold tracking-tight text-fuchsia-600 sm:text-7xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          Oops! The page you are looking for doesn't exist, has been removed, or
          is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <HomeIcon sx={{ fontSize: 18 }} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <ShoppingBagIcon sx={{ fontSize: 18 }} />
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}