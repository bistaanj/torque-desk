import { useState } from "react";

export default function TorqueDeskLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        {/* Left: Brand / Info */}
        <aside className="hidden flex-col justify-between p-10 lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
                <path
                  d="M13 2L3 14h7l-1 8 12-14h-7l-1-6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Torque Desk</h1>
              <p className="text-xs text-slate-300">Admin & Booking Console</p>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-semibold leading-tight">
              Manage appointments, customers, and services — fast.
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              Secure access for staff to view schedules, update statuses, and keep the shop running smoothly.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                Live appointment status tracking
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                Customer records & notes
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                Service menu management
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Torque Desk</p>
        </aside>

        {/* Right: Form */}
        <main className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
              {/* Mobile brand */}
              <div className="mb-6 flex items-center gap-3 lg:hidden">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
                    <path
                      d="M13 2L3 14h7l-1 8 12-14h-7l-1-6Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">Torque Desk</h1>
                  <p className="text-xs text-slate-300">Admin & Booking Console</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
              <p className="mt-1 text-sm text-slate-300">
                Use your staff account to access the dashboard.
              </p>

              <form className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@torquedesk.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-white/20 focus:bg-slate-950/60 focus:outline-none focus:ring-4 focus:ring-emerald-500/15"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 pr-12 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-white/20 focus:bg-slate-950/60 focus:ring-4 focus:ring-emerald-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-xs font-medium text-slate-300 hover:text-white"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-slate-950/40 text-emerald-500 focus:ring-emerald-500/20"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-[0.99]"
                >
                  Sign in
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-transparent px-2 text-xs text-slate-400">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Continue with Google
                </button>

                <p className="pt-1 text-center text-xs text-slate-400">
                  By signing in, you agree to our{" "}
                  <span className="text-slate-200">Terms</span> &{" "}
                  <span className="text-slate-200">Privacy Policy</span>.
                </p>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              Need access? Contact your admin.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
