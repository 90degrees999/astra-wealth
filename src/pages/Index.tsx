import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Target, Shield, Sparkles, BarChart3, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/90degrees-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="90degrees Logo" className="h-12 w-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">90degrees</span>
                <span className="text-xs text-muted-foreground">90 Degrees Asset Management LLP</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/trading">
                <Button variant="ghost">Trading</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/analysis">
                <Button variant="default">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Financial Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Your Personal
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Wealth Advisor
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant, personalized financial analysis and investment recommendations powered by advanced AI. 
              Build wealth confidently with actionable insights tailored just for you.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/analysis">
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="gap-2">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Wealth Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, plan, and grow your wealth in one intelligent platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card border-2">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Wealth Analysis</h3>
              <p className="text-muted-foreground">
                AI analyzes your complete financial picture in seconds - income, assets, debts, and goals
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card border-2">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Action Plans</h3>
              <p className="text-muted-foreground">
                Get customized allocation strategies for equity, debt, insurance, and emergency funds
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card border-2">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Investments</h3>
              <p className="text-muted-foreground">
                AI-recommended mutual funds, ETFs, and bonds tailored to your risk profile and goals
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card border-2">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Protection</h3>
              <p className="text-muted-foreground">
                Comprehensive insurance recommendations to safeguard your wealth and family
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card border-2">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal-Based Planning</h3>
              <p className="text-muted-foreground">
                Track and achieve specific goals - retirement, education, home purchase, and more
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card border-2">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Guidance Coach</h3>
              <p className="text-muted-foreground">
                Simple explanations, simulations, and personalized learning to make you financially confident
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-white">
            <h2 className="text-4xl font-bold">Ready to Transform Your Financial Future?</h2>
            <p className="text-xl opacity-90">
              Join thousands who are building wealth with AI-powered guidance
            </p>
            <Link to="/analysis">
              <Button size="lg" variant="secondary" className="gap-2 shadow-xl hover:scale-105 transition-transform">
                Get Your Free Analysis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logo} alt="90degrees Logo" className="h-8 w-8 object-contain" />
              <div className="flex flex-col items-center">
                <span className="font-semibold text-foreground">90degrees</span>
                <span className="text-xs text-muted-foreground">90 Degrees Asset Management LLP</span>
              </div>
            </div>
            <p className="text-sm">© 2025 90 Degrees Asset Management LLP. Your AI-powered wealth advisor.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
