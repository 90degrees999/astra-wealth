import { useDeferredValue, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Activity, ArrowUpRight, BadgeCheck, Bot, CalendarClock, ChartNoAxesCombined,
  CircleDollarSign, Clock3, Database, Filter, Gauge, Landmark, LineChart,
  LockKeyhole, Radar, RefreshCw, ShieldCheck, TrendingDown, TrendingUp, Workflow,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import logo from "@/assets/90degrees-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Trade = {
  TradeDate?: string; EntryTime?: string; ExitTime?: string; Status?: string;
  GrossPnL?: string; NetPnL?: string; CEEntry?: string; PEEntry?: string;
  CEExit?: string; PEExit?: string; LotQty?: string;
};

type Snapshot = {
  updatedAt: string; sourceMode: string; sourceNote: string;
  signal: { generatedAt: string; signalDate: string; previousClose: number; probability: number; confidence: string; threshold: number; trade: boolean; tradeLabel: string; modelVersion?: string; signalFor?: string };
  forecast: { generatedAt: string; signalDate: string; currentClose: number; predictedNextClose: number; predictedMovePoints: number; predictedMovePct: number; expectedMoveRangePoints: [number, number]; interpretation: { directionBias: string; magnitudeBucket: string; uncertaintyBucket: string; summaryText: string } };
  performance: { overall: { evaluationDays: number; accuracyPct: number; tradeFrequencyPct: number; hitRatePctOnTradeDays: number; auc: number }; rolling: Array<{ window: string; accuracyPct: number; tradeFrequencyPct: number; hitRatePctOnTradeDays: number; auc: number }> };
  operations: { timezone: string; entryWindow: string; exitTime: string; signalTime: string; tokenRefreshTimes: string[]; telegramEnabled: boolean; vpsMode: boolean };
  controls: { liveTradingEnabled: boolean; writeActionsEnabled: boolean; shortVol90: string; intraday90: string };
  dataHealth: { latestDhanDailyDate: string | null; signalAgeSeconds: number | null; signalFilePresent: boolean; orderStatePresent: boolean };
  dataQuality?: { status: string; dataAsOf: string; expectedCompletedSession: string; sourceForLatestSession: string; recentWeekdayGaps: string[] };
  modelGovernance?: {
    modelVersion: string; target: string; validation: string; minimumResearchAuc: number; status: string; executionEligible: boolean; reason: string;
    overall: { accuracyPct: number; auc: number; evaluationDays: number };
    holdout: { accuracyPct: number; auc: number; evaluationDays: number };
  };
  position: { status: string; detail: string; legs: Array<{ name: string; securityId: string; strike: number; entryPrice: number; filledQty: number; status: string; hasExitOrder: boolean }> };
  tradeAnalytics: { records: number; completedTrades: number; realisedNetPnl: number; averageTradePnl: number; winRatePct: number; wins: number; losses: number; latestTradeDate: string };
  recentEvents: Array<{ timestamp: string; title: string; detail: string }>;
  recentTrades: Trade[];
  signalHistory: Array<{ SignalDate?: string; Close?: string; Probability?: string; Confidence?: string; Signal?: string; ActualMove?: string; Correct?: string }>;
};

const apiBase = import.meta.env.VITE_PROJECT90_API_URL?.replace(/\/$/, "");
const currency = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
const number = (value: string | number | undefined) => Number(value || 0);
const signalClass = (enabled: boolean) => enabled ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-amber-300 bg-amber-50 text-amber-800";
const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const Metric = ({ label, value, detail, positive }: { label: string; value: string; detail: string; positive?: boolean }) => (
  <div className="border-l border-[#1a3026]/10 pl-5 first:border-l-0 first:pl-0">
    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#708077]">{label}</p>
    <p className={`mt-2 text-2xl font-semibold tracking-tight ${positive === undefined ? "text-[#15271f]" : positive ? "text-[#11713a]" : "text-[#9b382e]"}`}>{value}</p>
    <p className="mt-1 text-xs text-[#708077]">{detail}</p>
  </div>
);

const StrategyDashboard = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const snapshotUrl = apiBase ? `${apiBase}/api/v1/overview` : "/strategy/project90-dashboard.json";
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["project90-command-centre"],
    queryFn: async (): Promise<Snapshot> => {
      const response = await fetch(snapshotUrl, { cache: "no-store", credentials: apiBase ? "include" : "same-origin" });
      if (!response.ok) throw new Error("Unable to load the command centre.");
      return response.json();
    },
    refetchInterval: apiBase ? 30_000 : false,
  });

  const chartData = useMemo(() => data?.performance.rolling.map((item) => ({
    window: item.window, Accuracy: Number(item.accuracyPct.toFixed(1)), "Hit rate": Number(item.hitRatePctOnTradeDays.toFixed(1)), AUC: Number((item.auc * 100).toFixed(1)),
  })) ?? [], [data]);
  const matchingSignals = useMemo(() => (data?.signalHistory ?? []).filter((row) => JSON.stringify(row).toLowerCase().includes(deferredQuery.toLowerCase())).slice(0, 12), [data, deferredQuery]);

  if (isLoading) return <LoadingScreen />;
  if (error || !data) return <UnavailableScreen onRetry={() => void refetch()} />;

  const pnl = data.tradeAnalytics.realisedNetPnl;
  const active = data.position.status !== "FLAT";
  const governance = data.modelGovernance;
  const researchOnly = governance ? !governance.executionEligible : true;
  const sourceLabel = data.dataQuality?.sourceForLatestSession?.replaceAll("_", " ") || data.sourceMode;

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#15271f] selection:bg-[#bfdfc8]">
      <header className="sticky top-0 z-40 border-b border-[#1a3026]/10 bg-[#f5f4ef]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link to="/" className="flex items-center gap-3"><img src={logo} alt="90degrees" className="h-9 w-9 object-contain" /><div><p className="font-bold leading-none">90degrees</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#789084]">Operator workspace</p></div></Link>
          <nav className="hidden items-center gap-1 rounded-xl border border-[#1a3026]/10 bg-white p-1 lg:flex" aria-label="Workspace sections">{[["Overview", "overview"], ["Research", "research"], ["Ledger", "ledger"], ["System", "system"]].map(([label, id]) => <button key={id} onClick={() => jumpTo(id)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#53675b] transition hover:bg-[#e8f0e7] hover:text-[#173827]">{label}</button>)}</nav>
          <div className="flex items-center gap-2"><Button variant="outline" onClick={() => void refetch()} disabled={isFetching} className="gap-2 border-[#1a3026]/15 bg-white"><RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh</Button><Link to="/app"><Button className="hidden gap-2 bg-[#152d22] hover:bg-[#234735] sm:flex">Workspace <ArrowUpRight className="h-4 w-4" /></Button></Link></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1540px] space-y-6 px-5 py-7 sm:px-8 sm:py-10">
        <section className="overflow-hidden rounded-[2rem] bg-[#152d22] px-6 py-7 text-white shadow-xl shadow-[#152d22]/15 sm:px-9 sm:py-9">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div><div className="mb-4 flex flex-wrap items-center gap-2"><Badge className="border border-white/15 bg-white/10 text-[#d5ecd9] hover:bg-white/10"><LockKeyhole className="mr-1 h-3 w-3" />Private operator environment</Badge><span className="text-xs text-[#a8c7af]">Updated {data.updatedAt}</span></div><h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Project90 command centre.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[#c2d5c5] sm:text-base">Live strategy state, Dhan-linked execution records, P&amp;L, signal research, and automation health. The console observes the VPS; it does not submit orders.</p></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><HeroStatus label="Model" value={researchOnly ? "Research only" : "Reviewed"} good={!researchOnly} /><HeroStatus label="Position" value={data.position.status} good={active} /><HeroStatus label="Data" value={data.dataQuality?.dataAsOf || data.dataHealth.latestDhanDailyDate || "Waiting"} good={Boolean(data.dataHealth.latestDhanDailyDate)} /><HeroStatus label="Telegram" value={data.operations.telegramEnabled ? "Online" : "Check"} good={data.operations.telegramEnabled} /></div>
          </div>
        </section>

        {researchOnly && <section className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-amber-950 shadow-sm"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><div><p className="font-bold">Research mode: order submission is locked</p><p className="mt-1 text-sm leading-6 text-amber-900">{governance?.reason || "The dashboard is read-only. Trading remains disabled until the model completes independent validation and formal risk review."}</p></div></div></section>}

        <section id="overview" className="scroll-mt-24 grid gap-3 md:grid-cols-3">
          <StrategyShelf name="Project90" state={researchOnly ? "Research review" : "Reviewed"} detail="Next-session NIFTY move classifier" icon={Workflow} tone={researchOnly ? "amber" : "green"} selected />
          <StrategyShelf name="Short Vol 90" state={data.controls.shortVol90.replaceAll("_", " ")} detail="Iron-condor research and risk design" icon={TrendingDown} tone="slate" />
          <StrategyShelf name="Intraday 90" state={data.controls.intraday90.replaceAll("_", " ")} detail="Separate intraday research pipeline" icon={Gauge} tone="slate" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.24fr_0.76fr]">
          <Card className="border-[#1a3026]/10 bg-white shadow-sm"><CardHeader className="border-b border-[#1a3026]/10 pb-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397757]">Live position</p><CardTitle className="mt-2 text-2xl">Dhan execution state</CardTitle><CardDescription className="mt-2">{data.position.detail}</CardDescription></div><Badge className={active ? "bg-[#d7f1dd] text-[#136e3a] hover:bg-[#d7f1dd]" : "bg-[#edf0ed] text-[#516158] hover:bg-[#edf0ed]"}>{data.position.status}</Badge></div></CardHeader><CardContent className="p-0">
            {data.position.legs.length ? <div className="divide-y divide-[#1a3026]/10">{data.position.legs.map((leg) => <div key={leg.name} className="grid gap-3 px-6 py-5 sm:grid-cols-[0.7fr_1fr_1fr_1fr_auto] sm:items-center"><div><p className="font-bold">{leg.name}</p><p className="text-xs text-[#718078]">{leg.securityId}</p></div><div><p className="text-xs text-[#718078]">Strike</p><p className="font-semibold">{leg.strike || "—"}</p></div><div><p className="text-xs text-[#718078]">Entry price</p><p className="font-semibold">{leg.entryPrice || "—"}</p></div><div><p className="text-xs text-[#718078]">Filled quantity</p><p className="font-semibold">{leg.filledQty || "—"}</p></div><Badge variant="outline" className="w-fit border-[#1a3026]/15">{leg.status}</Badge></div>)}</div> : <EmptyState icon={Activity} title="No open position" body="The executor has not recorded an active Project90 position. New Dhan order activity will appear here automatically." />}
          </CardContent></Card>

          <Card className="border-[#1a3026]/10 bg-[#e8f0e7] shadow-sm"><CardHeader><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397757]">Realised P&amp;L</p><CardTitle className="mt-2 text-4xl tracking-tight">{currency(pnl)}</CardTitle><CardDescription>Completed trade ledger only. No unrealised P&amp;L is inferred.</CardDescription></CardHeader><CardContent className="grid grid-cols-2 gap-y-6"><Metric label="Completed" value={String(data.tradeAnalytics.completedTrades)} detail="execution records" /><Metric label="Win rate" value={`${data.tradeAnalytics.winRatePct.toFixed(1)}%`} detail={`${data.tradeAnalytics.wins} wins / ${data.tradeAnalytics.losses} losses`} positive={data.tradeAnalytics.winRatePct >= 50} /><Metric label="Average trade" value={currency(data.tradeAnalytics.averageTradePnl)} detail="net P&L" positive={data.tradeAnalytics.averageTradePnl >= 0} /><Metric label="Ledger state" value={data.tradeAnalytics.records ? "Ready" : "Waiting"} detail={data.tradeAnalytics.latestTradeDate || "no execution history"} positive={Boolean(data.tradeAnalytics.records)} /></CardContent></Card>
        </section>

        <section id="research" className="scroll-mt-24 grid gap-5 xl:grid-cols-[0.76fr_1.24fr]">
          <Card className="border-[#1a3026]/10 bg-white shadow-sm"><CardHeader><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397757]">Nightly decision</p><div className="mt-3 flex flex-wrap items-center gap-3"><Badge className={signalClass(data.signal.trade)}>{data.signal.tradeLabel}</Badge><span className="text-sm text-[#65756c]">Data as of {data.dataQuality?.dataAsOf || data.signal.signalDate} · for the next NSE session</span></div></CardHeader><CardContent className="space-y-5"><div className="grid grid-cols-2 gap-4"><MiniValue label="Move probability" value={`${(data.signal.probability * 100).toFixed(1)}%`} /><MiniValue label="Model threshold" value={`${(data.signal.threshold * 100).toFixed(0)}%`} /><MiniValue label="Previous close" value={data.signal.previousClose.toFixed(2)} /><MiniValue label="Confidence" value={data.signal.confidence} /></div><div className="rounded-2xl border border-[#1a3026]/10 bg-[#f8faf7] p-4 text-sm text-[#5f7168]"><span className="font-bold text-[#263b30]">Decision rule: </span>The classifier estimates whether the next completed NSE session could exceed the move threshold. The close forecast remains a separate research tool and never submits orders.</div></CardContent></Card>
          <Card className="border-[#1a3026]/10 bg-white shadow-sm"><CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397757]">Forecast research layer</p><CardTitle className="mt-2">Directional context, kept separate</CardTitle><CardDescription className="mt-2">{data.forecast.interpretation.summaryText}</CardDescription></div><Radar className="h-6 w-6 text-[#397757]" /></CardHeader><CardContent className="grid gap-5 border-t border-[#1a3026]/10 pt-5 sm:grid-cols-4"><Metric label="Bias" value={data.forecast.interpretation.directionBias} detail={data.forecast.interpretation.magnitudeBucket} /><Metric label="Next close" value={data.forecast.predictedNextClose.toFixed(2)} detail={`from ${data.forecast.currentClose.toFixed(2)}`} /><Metric label="Expected move" value={`${data.forecast.predictedMovePoints > 0 ? "+" : ""}${data.forecast.predictedMovePoints.toFixed(1)}`} detail={`${data.forecast.predictedMovePct.toFixed(2)}%`} positive={data.forecast.predictedMovePoints >= 0} /><Metric label="Range" value={`${data.forecast.expectedMoveRangePoints[0].toFixed(0)} / ${data.forecast.expectedMoveRangePoints[1].toFixed(0)}`} detail={data.forecast.interpretation.uncertaintyBucket} /></CardContent></Card>
        </section>

        <section id="system" className="scroll-mt-24 grid gap-5 xl:grid-cols-[1.13fr_0.87fr]">
          <Card className="border-[#1a3026]/10 bg-white shadow-sm"><CardHeader><div className="flex items-center gap-3"><ChartNoAxesCombined className="h-5 w-5 text-[#397757]" /><div><CardTitle>Model evaluation</CardTitle><CardDescription>Time-ordered validation for the next-session move classifier. This is research evidence, not a return promise.</CardDescription></div></div></CardHeader><CardContent className="h-[280px] pt-2"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid vertical={false} stroke="#dfe6e0" /><XAxis dataKey="window" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="Accuracy" fill="#1c6240" radius={[5, 5, 0, 0]} /><Bar dataKey="Hit rate" fill="#8cba96" radius={[5, 5, 0, 0]} /><Bar dataKey="AUC" fill="#d6a850" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></CardContent><CardContent className="grid grid-cols-2 gap-4 border-t border-[#1a3026]/10 py-5 sm:grid-cols-4"><MiniValue label="Holdout AUC" value={(governance?.holdout.auc ?? data.performance.overall.auc).toFixed(3)} /><MiniValue label="Holdout accuracy" value={`${(governance?.holdout.accuracyPct ?? data.performance.overall.accuracyPct).toFixed(1)}%`} /><MiniValue label="Review floor" value={`AUC ${(governance?.minimumResearchAuc ?? 0.6).toFixed(2)}`} /><MiniValue label="Sessions" value={String(governance?.holdout.evaluationDays ?? data.performance.overall.evaluationDays)} /></CardContent><CardContent className="border-t border-[#1a3026]/10 pb-5 pt-4 text-xs leading-5 text-[#617168]"><span className="font-bold text-[#263b30]">Version: </span>{governance?.modelVersion || data.signal.modelVersion || "legacy snapshot"} · <span className="font-bold text-[#263b30]">Target: </span>{governance?.target?.replaceAll("_", " ") || "move-threshold classification"} · <span className="font-bold text-[#263b30]">Validation: </span>{governance?.validation || "rolling validation"}</CardContent></Card>
          <Card className="border-[#1a3026]/10 bg-[#152d22] text-white shadow-sm"><CardHeader><div className="flex items-center gap-3"><CalendarClock className="h-5 w-5 text-[#a9d8b3]" /><div><CardTitle className="text-white">Automation & data health</CardTitle><CardDescription className="text-[#b8cdbc]">VPS schedule, Asia/Kolkata.</CardDescription></div></div></CardHeader><CardContent className="space-y-3">{[["Token refresh", data.operations.tokenRefreshTimes.join(" · ")], ["Entry guard", data.operations.entryWindow], ["Exit guard", data.operations.exitTime], ["Nightly model", data.operations.signalTime], ["Latest source", sourceLabel]].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm"><span className="text-[#b8cdbc]">{label}</span><span className="text-right font-semibold">{value}</span></div>)}{data.dataQuality?.recentWeekdayGaps?.length ? <p className="text-xs leading-5 text-[#a9c1ae]">Unfilled weekday dates: {data.dataQuality.recentWeekdayGaps.join(", ")}. These are retained as reported dates and are not fabricated into market candles.</p> : null}<div className="pt-2 text-xs leading-5 text-[#a9c1ae]">Web controls are intentionally disabled. The browser cannot expose broker tokens or silently change trading behaviour.</div></CardContent></Card>
        </section>

        <section id="ledger" className="scroll-mt-24 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="overflow-hidden border-[#1a3026]/10 bg-white shadow-sm"><CardHeader className="border-b border-[#1a3026]/10"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397757]">Trade ledger</p><CardTitle className="mt-2">Live and historical Dhan executions</CardTitle><CardDescription>Entries are written by the VPS executor after it receives broker order status.</CardDescription></div><Badge variant="outline" className="w-fit border-[#1a3026]/15">{data.tradeAnalytics.records} records</Badge></div></CardHeader><CardContent className="p-0">{data.recentTrades.length ? <TradeTable trades={data.recentTrades} /> : <EmptyState icon={Landmark} title="No trade ledger records yet" body="When a position is completed, the executor will append its entry, exit, and realised P&L to this ledger automatically." />}</CardContent></Card>
          <Card className="border-[#1a3026]/10 bg-white shadow-sm"><CardHeader><div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-[#397757]" /><div><CardTitle>Operations audit</CardTitle><CardDescription>Latest VPS lifecycle records.</CardDescription></div></div></CardHeader><CardContent className="max-h-[360px] space-y-3 overflow-auto pr-2">{data.recentEvents.length ? data.recentEvents.map((event) => <div key={`${event.timestamp}-${event.title}`} className="rounded-xl border border-[#1a3026]/10 bg-[#f8faf7] p-3"><div className="flex justify-between gap-3"><p className="text-sm font-bold">{event.title}</p><p className="whitespace-nowrap text-[11px] text-[#77877e]">{event.timestamp}</p></div><p className="mt-2 text-xs leading-5 text-[#66766d]">{event.detail}</p></div>) : <p className="text-sm text-[#687970]">No recent VPS events are available.</p>}</CardContent></Card>
        </section>

        <section className="overflow-hidden rounded-[1.5rem] border border-[#1a3026]/10 bg-white shadow-sm"><div className="flex flex-col gap-4 border-b border-[#1a3026]/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397757]">Research record</p><h2 className="mt-1 text-xl font-bold">Historical signal outcomes</h2></div><div className="relative w-full sm:w-72"><Filter className="absolute left-3 top-3 h-4 w-4 text-[#77877e]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter date, signal or outcome" className="border-[#1a3026]/15 bg-[#f8faf7] pl-9" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f1f5f0] text-[11px] uppercase tracking-[0.1em] text-[#687970]"><tr>{["Session", "Close", "Probability", "Signal", "Actual move", "Outcome"].map((heading) => <th key={heading} className="px-6 py-3 font-bold">{heading}</th>)}</tr></thead><tbody>{matchingSignals.map((row, index) => <tr key={`${row.SignalDate}-${index}`} className="border-t border-[#1a3026]/8"><td className="px-6 py-4 font-medium">{row.SignalDate || "—"}</td><td className="px-6 py-4">{row.Close || "—"}</td><td className="px-6 py-4">{row.Probability ? `${(number(row.Probability) * 100).toFixed(1)}%` : "—"}</td><td className="px-6 py-4"><Badge variant="outline" className="border-[#1a3026]/15">{row.Signal || "—"}</Badge></td><td className="px-6 py-4">{row.ActualMove ? `${row.ActualMove}%` : "Pending"}</td><td className="px-6 py-4"><span className={row.Correct === "YES" ? "font-semibold text-[#11713a]" : "text-[#687970]"}>{row.Correct || "Pending"}</span></td></tr>)}</tbody></table>{!matchingSignals.length && <div className="p-8 text-center text-sm text-[#687970]">No research records match this filter.</div>}</div></section>

        <p className="px-1 pb-5 text-center text-xs text-[#74837a]">90degrees operator workspace · Source: {data.sourceMode} · {data.sourceNote}</p>
      </main>
    </div>
  );
};

const HeroStatus = ({ label, value, good }: { label: string; value: string; good?: boolean }) => <div className="min-w-[105px] rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#9bbba2]">{label}</p><p className={`mt-1 text-sm font-bold ${good ? "text-[#c5edcb]" : "text-white"}`}>{value}</p></div>;
const StrategyShelf = ({ name, state, detail, icon: Icon, tone, selected = false }: { name: string; state: string; detail: string; icon: typeof Activity; tone: "green" | "amber" | "slate"; selected?: boolean }) => {
  const palette = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    slate: "border-[#1a3026]/10 bg-white text-[#53675b]",
  }[tone];
  return <div className={`group rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selected ? "border-[#397757] bg-[#173827] text-white" : "border-[#1a3026]/10 bg-white"}`}><div className="flex items-start justify-between gap-3"><div className={`grid h-9 w-9 place-items-center rounded-xl ${selected ? "bg-white/10 text-[#bfe5c6]" : "bg-[#edf4ed] text-[#397757]"}`}><Icon className="h-4 w-4" /></div><Badge variant="outline" className={selected ? "border-white/15 bg-white/10 text-[#d6eddb]" : palette}>{state}</Badge></div><p className="mt-4 font-bold">{name}</p><p className={`mt-1 text-xs leading-5 ${selected ? "text-[#b7cfbc]" : "text-[#6b7b72]"}`}>{detail}</p></div>;
};
const MiniValue = ({ label, value }: { label: string; value: string }) => <div className="rounded-xl bg-[#f2f6f2] p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#75857c]">{label}</p><p className="mt-1 text-sm font-bold text-[#23382c]">{value}</p></div>;
const EmptyState = ({ icon: Icon, title, body }: { icon: typeof Activity; title: string; body: string }) => <div className="flex flex-col items-center px-8 py-12 text-center"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf4ed] text-[#397757]"><Icon className="h-5 w-5" /></div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[#687970]">{body}</p></div>;
const TradeTable = ({ trades }: { trades: Trade[] }) => <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f1f5f0] text-[11px] uppercase tracking-[0.1em] text-[#687970]"><tr>{["Date", "Entry / exit", "CE / PE", "Quantity", "Status", "Net P&L"].map((heading) => <th key={heading} className="px-6 py-3 font-bold">{heading}</th>)}</tr></thead><tbody>{trades.map((trade, index) => { const pnl = number(trade.NetPnL || trade.GrossPnL); return <tr key={`${trade.TradeDate}-${index}`} className="border-t border-[#1a3026]/8"><td className="px-6 py-4 font-medium">{trade.TradeDate || "—"}</td><td className="px-6 py-4 text-[#66766d]">{trade.EntryTime || "—"} <span className="mx-1">/</span> {trade.ExitTime || "—"}</td><td className="px-6 py-4">{trade.CEEntry || "—"} <span className="text-[#87948d]">/</span> {trade.PEEntry || "—"}</td><td className="px-6 py-4">{trade.LotQty || "—"}</td><td className="px-6 py-4"><Badge variant="outline" className="border-[#1a3026]/15">{trade.Status || "—"}</Badge></td><td className={`px-6 py-4 font-bold ${pnl >= 0 ? "text-[#11713a]" : "text-[#9b382e]"}`}>{currency(pnl)}</td></tr>; })}</tbody></table></div>;
const LoadingScreen = () => <div className="grid min-h-screen place-items-center bg-[#f5f4ef]"><div className="text-center"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#397757]" /><p className="mt-4 font-semibold">Loading the operator workspace…</p></div></div>;
const UnavailableScreen = ({ onRetry }: { onRetry: () => void }) => <div className="grid min-h-screen place-items-center bg-[#f5f4ef] p-6"><Card className="max-w-md border-[#1a3026]/10 bg-white text-center"><CardContent className="p-9"><Database className="mx-auto h-8 w-8 text-[#397757]" /><h1 className="mt-5 text-xl font-bold">Console data is unavailable</h1><p className="mt-3 text-sm leading-6 text-[#687970]">Your login is valid, but the protected VPS data source could not be reached. Refresh or sign in to the data endpoint once, then return here.</p><Button onClick={onRetry} className="mt-6 gap-2 bg-[#152d22] hover:bg-[#234735]"><RefreshCw className="h-4 w-4" /> Retry connection</Button></CardContent></Card></div>;

export default StrategyDashboard;
