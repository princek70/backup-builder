import { prisma } from "@/lib/db";
import Link from "next/link";
import NavLinks from "./NavLinks";
import MobileMenuButton from "./MobileMenuButton";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const settingsArr = await prisma.siteSetting.findMany();
  const settings = Object.fromEntries(settingsArr.map((s: { key: string, value: string }) => [s.key, s.value]));

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      <header className="bg-white/80 dark:bg-primary/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-ambient">
        <nav className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-indigo-300">architecture</span>
            <span className="text-xl font-black text-primary dark:text-white tracking-tighter">
              {settings.site_name || "ArchitectAI"}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <Link href="/builder">
              <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold active:scale-[0.98] transition-transform duration-200">
                Go to Builder
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <MobileMenuButton siteName={settings.site_name || "ArchitectAI"} />
        </nav>
      </header>

      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low mt-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 py-8 gap-4 max-w-7xl mx-auto">
          <div className="text-sm text-on-surface-variant font-bold">
            {settings.footer_copyright || "© 2024 Intelligent Architect"}
          </div>
          <div className="flex gap-8">
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-bold" href="/pricing">Pricing</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-bold" href="#">Privacy Policy</Link>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-outline-variant/10 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[20px] text-primary">public</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-outline-variant/10 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[20px] text-primary">mail</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
