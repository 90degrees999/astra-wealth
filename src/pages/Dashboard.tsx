import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, TrendingDown, Target, Wallet, Shield, ArrowLeft, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

interface WealthData {
  monthlyIncome: string;
  monthlySavings: string;
  totalAssets: string;
  totalLiabilities: string;
  retirementAge: string;
  retirementCorpus: string;
  educationFund: string;
  homePurchase: string;
}

const Dashboard = () => {
  const [wealthData, setWealthData] = useState<WealthData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("wealthData");
    if (stored) {
      setWealthData(JSON.parse(stored));
    }
  }, []);

  const calculateMetrics = () => {
    if (!wealthData) return null;

    const income = parseFloat(wealthData.monthlyIncome) || 0;
    const savings = parseFloat(wealthData.monthlySavings) || 0;
    const assets = parseFloat(wealthData.totalAssets) || 0;
    const liabilities = parseFloat(wealthData.totalLiabilities) || 0;

    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const netWorth = assets - liabilities;
    const monthlyExpenses = income - savings;

    return {
      income,
      savings,
      assets,
      liabilities,
      savingsRate,
      netWorth,
      monthlyExpenses,
    };
  };

  const metrics = calculateMetrics();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!wealthData || !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">No wealth data found. Please complete the analysis first.</p>
          <Link to="/analysis">
            <Button>Start Analysis</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">WealthAI</span>
            </Link>
            <div className="flex gap-4">
              <Link to="/analysis">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  New Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Wealth Dashboard</h1>
          <p className="text-muted-foreground">AI-powered insights and personalized recommendations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-card border-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Net Worth</span>
              {metrics.netWorth >= 0 ? (
                <TrendingUp className="h-5 w-5 text-secondary" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </div>
            <p className="text-2xl font-bold">{formatCurrency(metrics.netWorth)}</p>
            <p className="text-xs text-muted-foreground mt-1">Assets - Liabilities</p>
          </Card>

          <Card className="p-6 bg-gradient-card border-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Monthly Income</span>
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{formatCurrency(metrics.income)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total monthly earnings</p>
          </Card>

          <Card className="p-6 bg-gradient-card border-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Monthly Savings</span>
              <PiggyBank className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-2xl font-bold">{formatCurrency(metrics.savings)}</p>
            <p className="text-xs text-muted-foreground mt-1">{metrics.savingsRate.toFixed(1)}% of income</p>
          </Card>

          <Card className="p-6 bg-gradient-card border-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Savings Rate</span>
              <Target className="h-5 w-5 text-accent" />
            </div>
            <p className="text-2xl font-bold">{metrics.savingsRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.savingsRate >= 20 ? "Excellent!" : "Can improve"}
            </p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Financial Health Score */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-semibold mb-6">Financial Health Score</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Savings Rate</span>
                  <Badge variant={metrics.savingsRate >= 20 ? "default" : "secondary"}>
                    {metrics.savingsRate >= 30 ? "Excellent" : metrics.savingsRate >= 20 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
                <Progress value={Math.min(metrics.savingsRate * 2.5, 100)} className="h-3" />
                <p className="text-sm text-muted-foreground mt-1">
                  Saving {metrics.savingsRate.toFixed(1)}% of income. Target: 20%+
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Emergency Fund</span>
                  <Badge variant="secondary">Building</Badge>
                </div>
                <Progress value={45} className="h-3" />
                <p className="text-sm text-muted-foreground mt-1">
                  Target: 6 months of expenses ({formatCurrency(metrics.monthlyExpenses * 6)})
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Debt Management</span>
                  <Badge variant={metrics.liabilities === 0 ? "default" : "secondary"}>
                    {metrics.liabilities === 0 ? "Debt Free" : "In Progress"}
                  </Badge>
                </div>
                <Progress value={metrics.liabilities === 0 ? 100 : 60} className="h-3" />
                <p className="text-sm text-muted-foreground mt-1">
                  {metrics.liabilities === 0 
                    ? "No outstanding liabilities" 
                    : `Outstanding: ${formatCurrency(metrics.liabilities)}`}
                </p>
              </div>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">AI Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <p className="text-sm font-medium text-secondary mb-1">Excellent Savings Rate! 🎯</p>
                <p className="text-sm text-muted-foreground">
                  Your {metrics.savingsRate.toFixed(1)}% savings rate is strong. Consider diversifying into equity for long-term growth.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Emergency Fund Priority 🛡️</p>
                <p className="text-sm text-muted-foreground">
                  Build an emergency fund covering 6 months of expenses before aggressive investing.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm font-medium text-accent mb-1">Investment Opportunity 📈</p>
                <p className="text-sm text-muted-foreground">
                  Consider 60% equity, 30% debt, 10% gold allocation for balanced growth.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommended Actions */}
        <Card className="mt-6 p-6">
          <h2 className="text-2xl font-semibold mb-6">Recommended Investment Allocation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-secondary" />
                <span className="font-medium">Equity (60%)</span>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Diversified mutual funds and ETFs for long-term wealth creation
              </p>
              <p className="text-lg font-semibold pl-5">
                {formatCurrency(metrics.savings * 0.6)}
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="font-medium">Debt (30%)</span>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Fixed deposits and bonds for stability and consistent returns
              </p>
              <p className="text-lg font-semibold pl-5">
                {formatCurrency(metrics.savings * 0.3)}
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span className="font-medium">Gold/Alternatives (10%)</span>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Gold ETFs and alternative investments for portfolio diversification
              </p>
              <p className="text-lg font-semibold pl-5">
                {formatCurrency(metrics.savings * 0.1)}
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Goals Tracking */}
        {(wealthData.retirementCorpus || wealthData.educationFund || wealthData.homePurchase) && (
          <Card className="mt-6 p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Financial Goals</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {wealthData.retirementCorpus && (
                <div className="p-4 rounded-lg border">
                  <Target className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Retirement Fund</h3>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(parseFloat(wealthData.retirementCorpus))}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Target by age {wealthData.retirementAge || "60"}
                  </p>
                </div>
              )}

              {wealthData.educationFund && (
                <div className="p-4 rounded-lg border">
                  <Target className="h-8 w-8 text-secondary mb-3" />
                  <h3 className="font-semibold mb-2">Education Fund</h3>
                  <p className="text-2xl font-bold text-secondary">
                    {formatCurrency(parseFloat(wealthData.educationFund))}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    For future education needs
                  </p>
                </div>
              )}

              {wealthData.homePurchase && (
                <div className="p-4 rounded-lg border">
                  <Target className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2">Home Purchase</h3>
                  <p className="text-2xl font-bold text-accent">
                    {formatCurrency(parseFloat(wealthData.homePurchase))}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dream home target amount
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
