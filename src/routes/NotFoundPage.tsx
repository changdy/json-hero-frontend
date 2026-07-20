import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[rgb(56,52,139)]">
      <div className="w-2/3 text-center">
        <h1 className="text-8xl font-bold text-lime-300 mb-4">404</h1>
        <h2 className="text-2xl text-white mb-8">Sorry! Something went wrong...</h2>
        <p className="text-slate-200 mb-8">We couldn't find the page you were looking for.</p>
        <Link
          to="/"
          className="mx-auto w-24 bg-lime-500 text-slate-900 text-lg font-bold px-5 py-1 rounded-sm uppercase cursor-pointer hover:opacity-90 transition inline-block"
        >
          HOME
        </Link>
      </div>
    </div>
  );
}
