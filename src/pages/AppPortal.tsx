import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Bot,
  ChevronRight,
  LineChart,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import logo from "@/assets/90degrees-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AppPortal = () => (
  <div className="min-h-screen bg-[#f4f2ed] text-slate-950">
    <div className="border-b border-slate-900/10 bg-[#10251d] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-xs tracking-wide">
        <span className="flex items-center gap-2"><LockKeyhole className="h-3.5 w-3.5" /> Private workspace protected by email OTP</span>
        <span>Asia/Kolkata · Production monitoring</span>
      </div>
    </div>

    <nav className="border-b border-slate-900/10 bg-[#f4f2ed]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">
        <Link to="/app" className="flex items-center gap-3">
          <img src={logo} alt="90degrees" className="h-10 w-10 object-contain" />
          <div>
            <p className="text-lg font-bold leading-none">90degrees</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Algo operating system</p>
          </div>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#workspace">Workspace</a>
          <a href="#strategies">Strategies</a>
          <a href="#governance">Governance</a>
        </div>
        <Link to="/strategy">
          <Button className="gap-2 bg-[#10251d] hover:bg-[#173426]">Open live console <ArrowUpRight className="h-4 w-4" /></Button>
        </Link>
      </div>
    </nav>

    <main className="mx-auto max-w-7xl px-6 py-12">
      <section id="workspace" className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <Badge className="mb-5 bg-[#cfecdb] text-[#164a2b] hover:bg-[#cfecdb]">Private operator workspace</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">One calm control plane for every algorithm you operate.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">Monitor models, verify data freshness, review outcomes, and graduate strategies through research, paper, and live environments without exposing broker credentials in the web app.</p>
        </div>
        <Card className="border-slate-900/10 bg-[#10251d] text-white shadow-xl">
          <CardHeader className="pb-3">
            <CardDescription className="text-emerald-100">Current workspace</CardDescription>
            <CardTitle className="text-2xl text-white">Owner · Private</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-emerald-50">
            <div className="flex items-center justify-between border-t border-white/15 pt-3"><span>Identity</span><span>Email OTP verified</span></div>
            <div className="flex items-center justify-between"><span>Live strategies</span><span>1 active</span></div>
            <div className="flex items-center justify-between"><span>Order authority</span><span>VPS only</span></div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {[
          [Activity, "Live state", "Signal, automation state, model freshness, and recent delivery events.", "Project90 console", "/strategy"],
          [Radar, "Research lab", "Compare new models, feature sets, thresholds, and validation reports before deployment.", "Coming next", "#governance"],
          [Workflow, "Execution guardrails", "Controlled promotion from research to paper to live, with an immutable event trail.", "Design phase", "#governance"],
        ].map(([Icon, title, description, action, href]) => {
          const IconComponent = Icon as typeof Activity;
          return (
            <Card key={title as string} className="border-slate-900/10 bg-white shadow-sm transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f0e9] text-[#164a2b]"><IconComponent className="h-5 w-5" /></div>
                <CardTitle>{title as string}</CardTitle>
                <CardDescription className="min-h-12 leading-relaxed">{description as string}</CardDescription>
              </CardHeader>
              <CardContent>
                {typeof href === "string" && href.startsWith("/") ? <Link to={href}><Button variant="outline" className="w-full justify-between">{action as string}<ChevronRight className="h-4 w-4" /></Button></Link> : <a href={href as string}><Button variant="outline" className="w-full justify-between">{action as string}<ChevronRight className="h-4 w-4" /></Button></a>}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section id="strategies" className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#35734c]">Strategy registry</p><h2 className="mt-2 text-3xl font-bold">Strategies are products, not scripts.</h2></div>
          <Badge variant="outline" className="border-slate-900/20">1 registered</Badge>
        </div>
        <Card className="overflow-hidden border-slate-900/10 bg-white">
          <CardContent className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#10251d] text-white"><LineChart className="h-5 w-5" /></div>
              <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">Project90</h3><Badge className="bg-[#cfecdb] text-[#164a2b] hover:bg-[#cfecdb]">Production monitor</Badge></div><p className="mt-1 text-sm leading-relaxed text-slate-600">Signal-gated NIFTY volatility workflow with a separate price-forecast research layer.</p></div>
            </div>
            <Link to="/strategy"><Button className="gap-2 bg-[#10251d] hover:bg-[#173426]">View strategy <ArrowUpRight className="h-4 w-4" /></Button></Link>
          </CardContent>
        </Card>
      </section>

      <section id="governance" className="mt-16 grid gap-6 rounded-3xl bg-[#dce8d4] p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
        <div><BookOpen className="mb-4 h-7 w-7 text-[#164a2b]" /><h2 className="text-3xl font-bold">Built for disciplined scale.</h2></div>
        <div className="space-y-3 text-slate-700"><p>Every strategy will have its own data lineage, evaluation report, access policy, paper-trading record, and deployment status.</p><p className="flex items-center gap-2 font-medium"><ShieldCheck className="h-4 w-4 text-[#164a2b]" /> Credentials and order submission stay on the private VPS.</p><p className="flex items-center gap-2 font-medium"><Bot className="h-4 w-4 text-[#164a2b]" /> The app will request, review, and audit actions; it will not silently trade.</p></div>
      </section>
    </main>
  </div>
);

export default AppPortal;
