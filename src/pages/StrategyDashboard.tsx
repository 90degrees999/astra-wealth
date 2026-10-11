import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  Bot,
  Clock3,
  Database,
  Gauge,
  LineChart,
  Radar,
  Send,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import logo from "@/assets/90degrees-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Snapshot = {
  updatedAt: string;
  sourceMode: string;
  sourceNote: string;
  signal: {
    generatedAt: string;
    signalDate: string;
    previousClose: number;
    probability: number;
    confidence: string;
    threshold: number;
    trade: boolean;
    tradeLabel: string;
  };
  forecast: {
    generatedAt: string;
    signalDate: string;
    currentClose: number;
    predictedNextClose: number;
    predictedMovePoints: number;
    predictedMovePct: number;
    expectedMoveRangePoints: [number, number];
    interpretation: {
      directionBias: string;
      magnitudeBucket: string;
      uncertaintyBucket: string;
      summaryText: string;
    };
  };
  performance: {
    overall: {
      evaluationDays: number;
      accuracyPct: number;
      tradeFrequencyPct: number;
      hitRatePctOnTradeDays: number;
      auc: number;
      threshold: number;
    };
    rolling: Array<{
      window: string;
      accuracyPct: number;
      tradeFrequencyPct: number;
      hitRatePctOnTradeDays: number;
      auc: number;
    }>;
  };
  operations: {
    timezone: string;
    entryWindow: string;
    exitTime: string;
    signalTime: string;
    tokenRefreshTimes: string[];
    telegramEnabled: boolean;
    vpsMode: boolean;
  };
  recentEvents: Array<{
    timestamp: string;
    title: string;
    detail: string;
  }>;
  recentTrades: Array<Record<string, unknown>>;
};

const StrategyDashboard = () => {
  const dashboardApiUrl = import.meta.env.VITE_PROJECT90_API_URL?.replace(/\/$/, "");
  const snapshotUrl = dashboardApiUrl
    ? `${dashboardApiUrl}/api/v1/overview`
    : "/strategy/project90-dashboard.json";

  const { data, isLoading, error } = useQuery({
    queryKey: ["strategy-dashboard"],
    queryFn: async (): Promise<Snapshot> => {
      const response = await fetch(snapshotUrl, {
        cache: "no-store",
        credentials: dashboardApiUrl ? "include" : "same-origin",
      });
      if (!response.ok) {
        throw new Error("Unable to load strategy dashboard snapshot.");
      }
      return response.json();
    },
    refetchInterval: dashboardApiUrl ? 30_000 : false,
  });

  const performanceChart = useMemo(() => {
    if (!data) return [];
    return data.performance.rolling.map((item) => ({
      window: item.window,
      Accuracy: Number(item.accuracyPct.toFixed(1)),
      "Trade Freq": Number(item.tradeFrequencyPct.toFixed(1)),
      "Hit Rate": Number(item.hitRatePctOnTradeDays.toFixed(1)),
      AUC: Number((item.auc * 100).toFixed(1)),
    }));
  }, [data]);

  const formatPct = (value: number) => `${value.toFixed(2)}%`;

  const signalTone = data?.signal.trade ? "default" : "secondary";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <Card className="p-10 text-center">
            <p className="text-lg text-muted-foreground">Loading Project90 strategy console...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <Card className="p-10 text-center space-y-4">
            <p className="text-lg text-muted-foreground">Strategy snapshot is unavailable right now.</p>
            <Link to="/">
              <Button>Back Home</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="90degrees Logo" className="h-12 w-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">90degrees</span>
                <span className="text-xs text-muted-foreground">Project90 Strategy Console</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                {data.operations.timezone}
              </Badge>
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10 space-y-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
              Project90 Live Monitor
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">Signal-gated intraday NIFTY volatility dashboard</h1>
            <p className="max-w-3xl text-muted-foreground text-lg">
              This console surfaces the nightly signal, separate close-forecast model, automation cadence,
              and recent delivery events in one place so you can monitor the strategy without touching code.
            </p>
          </div>
          <Card className="min-w-[280px] bg-gradient-card border-2">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Database className="h-4 w-4" />
                Snapshot source
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{data.sourceMode}</Badge>
                <span className="text-sm text-muted-foreground">Updated {data.updatedAt}</span>
              </div>
              <p className="text-sm text-muted-foreground">{data.sourceNote}</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-2 bg-gradient-card">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Trade decision</span>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <Badge variant={signalTone} className="text-sm px-3 py-1">
                {data.signal.tradeLabel}
              </Badge>
              <p className="text-2xl font-bold">{formatPct(data.signal.probability * 100)}</p>
              <p className="text-sm text-muted-foreground">
                Generated {data.signal.generatedAt} for session {data.signal.signalDate}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-card">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Separate forecast</span>
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-2xl font-bold">{data.forecast.predictedNextClose.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Predicted next close from least-squares + ridge + RF ensemble
              </p>
              <Badge variant="outline">
                {data.forecast.interpretation.directionBias} / {data.forecast.interpretation.magnitudeBucket}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-card">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Classifier quality</span>
                <Gauge className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold">{data.performance.overall.auc.toFixed(3)}</p>
              <p className="text-sm text-muted-foreground">
                AUC across {data.performance.overall.evaluationDays} evaluated sessions
              </p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>Accuracy {data.performance.overall.accuracyPct.toFixed(1)}%</span>
                <span>Trade freq {data.performance.overall.tradeFrequencyPct.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-card">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Automation</span>
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{data.operations.vpsMode ? "VPS Live" : "Manual"}</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Entry {data.operations.entryWindow}</p>
                <p>Exit {data.operations.exitTime}</p>
                <p>Telegram {data.operations.telegramEnabled ? "enabled" : "disabled"}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Rolling model performance
              </CardTitle>
              <CardDescription>
                Accuracy, trade frequency, hit rate, and AUC trend across recent rolling windows.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[360px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceChart}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="window" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Accuracy" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Hit Rate" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Trade Freq" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="AUC" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="h-5 w-5 text-secondary" />
                Forecast interpretation
              </CardTitle>
              <CardDescription>
                Separate model output. This does not alter the trade executor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Current close</p>
                  <p className="mt-2 text-2xl font-bold">{data.forecast.currentClose.toFixed(2)}</p>
                </div>
                <div className="rounded-xl border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Move estimate</p>
                  <p className="mt-2 text-2xl font-bold">{data.forecast.predictedMovePoints.toFixed(2)}</p>
                </div>
              </div>

              <div className="rounded-2xl border bg-background/70 p-5 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{data.forecast.interpretation.directionBias}</Badge>
                  <Badge variant="outline">{data.forecast.interpretation.magnitudeBucket}</Badge>
                  <Badge variant="outline">{data.forecast.interpretation.uncertaintyBucket}</Badge>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {data.forecast.interpretation.summaryText}
                </p>
              </div>

              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { point: "Low", value: data.forecast.expectedMoveRangePoints[0] },
                      { point: "Base", value: data.forecast.predictedMovePoints },
                      { point: "High", value: data.forecast.expectedMoveRangePoints[1] },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="point" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.18)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-primary" />
                Automation timeline
              </CardTitle>
              <CardDescription>
                Daily live cadence running on VPS in {data.operations.timezone}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground">Token refresh</p>
                  <p className="mt-2 font-semibold">{data.operations.tokenRefreshTimes.join(" • ")}</p>
                </Card>
                <Card className="p-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground">Entry executor</p>
                  <p className="mt-2 font-semibold">{data.operations.entryWindow}</p>
                </Card>
                <Card className="p-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground">Exit executor</p>
                  <p className="mt-2 font-semibold">{data.operations.exitTime}</p>
                </Card>
                <Card className="p-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground">Nightly signal</p>
                  <p className="mt-2 font-semibold">{data.operations.signalTime}</p>
                </Card>
              </div>
              <div className="rounded-2xl border p-5 bg-gradient-card">
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <p className="font-semibold">Trade engine isolation is preserved</p>
                    <p className="text-sm text-muted-foreground">
                      The nightly classifier controls trade participation. The separate close forecast is appended after
                      the main signal and only sends its own interpretation message.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-secondary" />
                Recent events
              </CardTitle>
              <CardDescription>
                Latest strategy-side deliveries and lifecycle markers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.recentEvents.map((event) => (
                <div key={`${event.timestamp}-${event.title}`} className="rounded-xl border p-4 bg-muted/20">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{event.title}</p>
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{event.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default StrategyDashboard;
