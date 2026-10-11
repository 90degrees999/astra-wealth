import { ArrowUpRight, BarChart3, ChevronRight, LockKeyhole, Network, ShieldCheck, Sparkles } from "lucide-react";

import logo from "@/assets/90degrees-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const privateAppUrl = "https://app.90degreesfintech.com";

const Index = () => (
  <div className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#14251f]">
    <div className="bg-[#11261d] text-[#d8eadc]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em]">
        <span>90degrees Fintech</span>
        <span className="hidden sm:block">Research-led systems for market intelligence</span>
      </div>
    </div>

    <nav className="relative z-10 border-b border-[#14251f]/10 bg-[#f7f5ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="90degrees" className="h-10 w-10 object-contain" />
          <span className="text-lg font-extrabold tracking-tight">90degrees</span>
        </a>
        <div className="hidden items-center gap-7 text-sm font-medium text-[#486058] md:flex">
          <a href="#platform" className="transition-colors hover:text-[#14251f]">Platform</a>
          <a href="#principles" className="transition-colors hover:text-[#14251f]">Principles</a>
          <a href="#contact" className="transition-colors hover:text-[#14251f]">About</a>
        </div>
        <a href={privateAppUrl}>
          <Button className="gap-2 rounded-full bg-[#11261d] px-5 hover:bg-[#1d4030]">
            <LockKeyhole className="h-4 w-4" /> Client login
          </Button>
        </a>
      </div>
    </nav>

    <main>
      <section className="relative isolate border-b border-[#14251f]/10">
        <div className="absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(#1f4b36_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-[-14rem] top-[-20rem] -z-10 h-[44rem] w-[44rem] rounded-full bg-[#b7dec4]/60 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-32">
          <div>
            <Badge className="mb-7 rounded-full border border-[#276342]/20 bg-[#d6ebdc] px-3 py-1 text-[#1c5839] hover:bg-[#d6ebdc]">Quantitative intelligence, deliberately operated</Badge>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-[#14251f] sm:text-7xl">
              The operating system for disciplined market decisions.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#52675e]">
              90degrees unifies market research, systematic signals, execution oversight, and performance intelligence into one controlled environment.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={privateAppUrl}><Button size="lg" className="gap-2 rounded-full bg-[#11261d] px-6 hover:bg-[#1d4030]">Open operator workspace <ArrowUpRight className="h-4 w-4" /></Button></a>
              <a href="#platform"><Button size="lg" variant="outline" className="gap-2 rounded-full border-[#14251f]/20 bg-white/50 px-6">Explore the platform <ChevronRight className="h-4 w-4" /></Button></a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#14251f]/10 bg-[#11261d] p-6 text-white shadow-2xl shadow-[#14251f]/20 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/15 pb-5"><span className="text-xs font-medium uppercase tracking-[0.18em] text-[#b9d9c0]">Platform status</span><span className="flex items-center gap-2 text-xs text-[#b9d9c0]"><span className="h-2 w-2 rounded-full bg-[#8ee1a7]" /> Private access</span></div>
            <div className="grid grid-cols-2 gap-4 py-7">
              <div><p className="text-3xl font-semibold">01</p><p className="mt-2 text-sm text-[#bdd1c2]">Strategy in monitored production</p></div>
              <div><p className="text-3xl font-semibold">24/7</p><p className="mt-2 text-sm text-[#bdd1c2]">VPS-based automation oversight</p></div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-[#d4e4d7]">The client workspace provides authenticated access to strategy state, execution records, P&amp;L reporting, and model outputs. Broker credentials remain outside the browser.</div>
          </div>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#397757]">The platform</p><h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">From research to accountable operations.</h2></div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#14251f]/10 bg-[#14251f]/10 md:grid-cols-3">
          {[
            [BarChart3, "Decision intelligence", "Signals, forecast context, model evaluation, and data freshness in one research-grade view."],
            [Network, "Execution oversight", "A clean record of position state, entry and exit events, realised P&L, and historical operations."],
            [ShieldCheck, "Controlled access", "Email-verified private workspaces and a strict separation between the browser, data layer, and broker credentials."],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof BarChart3;
            return <article key={title as string} className="bg-[#f7f5ef] p-8"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6ebdc] text-[#1d5939]"><IconComponent className="h-5 w-5" /></div><h3 className="mt-8 text-xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-[#596b63]">{text as string}</p></article>;
          })}
        </div>
      </section>

      <section id="principles" className="bg-[#dbe9d9] py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div><Sparkles className="h-7 w-7 text-[#1d5939]" /><h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.04em]">Sophistication without hidden risk.</h2></div>
          <div className="grid gap-6 sm:grid-cols-2"><p className="text-lg leading-8 text-[#3e554a]">Every system is designed around transparent state: what the model saw, what it decided, what executed, and what the result was.</p><p className="text-lg leading-8 text-[#3e554a]">Research models and live execution remain deliberately separated. A dashboard observes and explains; the private VPS remains responsible for automation.</p></div>
        </div>
      </section>
    </main>

    <footer id="contact" className="bg-[#11261d] text-[#d8eadc]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between"><span>90degrees Fintech</span><span className="text-[#a8c2af]">Private operator access is invitation-only.</span></div></footer>
  </div>
);

export default Index;
