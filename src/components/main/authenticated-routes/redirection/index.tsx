
import { AlertTriangle, ArrowLeft, Home, Mail } from "lucide-react";

export function RedirectOnlyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="p-8">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
            </div>
          </div>

          <h1 className="mt-6 text-center text-2xl font-bold">
            Restricted Route
          </h1>

          <p className="mt-3 text-center leading-7 text-slate-400">
            This page is reserved for <strong>internal redirection</strong> and
            is not intended to be accessed directly.
          </p>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-300">
              If you reached this page manually or unexpectedly, please return
              to the previous page. If the problem persists, contact the
              application owner or developer.
            </p>

            <div className="mt-4 rounded-lg bg-slate-900 p-3">
              <span className="text-xs tracking-wider text-slate-500 uppercase">
                Status
              </span>
              <p className="mt-1 font-mono text-emerald-400">REDIRECT_ONLY</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.history.back()}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 transition"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 transition"
            >
              <Home size={18} />
              Go Home
            </button>
          </div>

          <a
            href={`mailto:some@email.com`}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-slate-300 transition hover:bg-slate-800"
          >
            <Mail size={18} />
            Contact Owner / Developer
          </a>
        </div>
      </div>
    </div>
  );
}
