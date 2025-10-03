import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, PieChart, Landmark, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/90degrees-logo.png";

const Trading = () => {
  return (
    <div className="min-h-screen bg-background">
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
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Trading & Investment Portal</h1>
            <p className="text-lg text-muted-foreground">
              Connect with brokers to buy and sell shares, mutual funds, ETFs, and bonds
            </p>
          </div>

          <Tabs defaultValue="stocks" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stocks" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Stocks
              </TabsTrigger>
              <TabsTrigger value="mutual-funds" className="gap-2">
                <PieChart className="h-4 w-4" />
                Mutual Funds
              </TabsTrigger>
              <TabsTrigger value="etf" className="gap-2">
                <Wallet className="h-4 w-4" />
                ETFs
              </TabsTrigger>
              <TabsTrigger value="bonds" className="gap-2">
                <Landmark className="h-4 w-4" />
                Bonds
              </TabsTrigger>
            </TabsList>

            {/* Stocks Tab */}
            <TabsContent value="stocks" className="space-y-6">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Stock Trading</h2>
                      <p className="text-muted-foreground">Connect with leading brokers to trade equities</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Zerodha</h3>
                      <p className="text-sm text-muted-foreground mb-4">India's largest broker with lowest brokerage</p>
                      <Button className="w-full">Connect Zerodha Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Upstox</h3>
                      <p className="text-sm text-muted-foreground mb-4">Modern trading platform with advanced tools</p>
                      <Button className="w-full">Connect Upstox Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Angel One</h3>
                      <p className="text-sm text-muted-foreground mb-4">Full-service broker with research support</p>
                      <Button className="w-full">Connect Angel One Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">ICICI Direct</h3>
                      <p className="text-sm text-muted-foreground mb-4">Banking-backed trading platform</p>
                      <Button className="w-full">Connect ICICI Direct Account</Button>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Mutual Funds Tab */}
            <TabsContent value="mutual-funds" className="space-y-6">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <PieChart className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Mutual Funds Investment</h2>
                      <p className="text-muted-foreground">Invest in curated mutual funds with zero commission</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Groww</h3>
                      <p className="text-sm text-muted-foreground mb-4">Direct mutual funds with zero commission</p>
                      <Button className="w-full">Connect Groww Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Kuvera</h3>
                      <p className="text-sm text-muted-foreground mb-4">Goal-based mutual fund investing</p>
                      <Button className="w-full">Connect Kuvera Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Paytm Money</h3>
                      <p className="text-sm text-muted-foreground mb-4">Easy mutual fund investments via Paytm</p>
                      <Button className="w-full">Connect Paytm Money Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">ET Money</h3>
                      <p className="text-sm text-muted-foreground mb-4">Smart mutual fund recommendations</p>
                      <Button className="w-full">Connect ET Money Account</Button>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* ETF Tab */}
            <TabsContent value="etf" className="space-y-6">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ETF Trading</h2>
                      <p className="text-muted-foreground">Trade exchange-traded funds for diversified exposure</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Zerodha Coin</h3>
                      <p className="text-sm text-muted-foreground mb-4">Direct mutual funds and ETFs on Zerodha</p>
                      <Button className="w-full">Connect Zerodha Coin</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">NSE/BSE Direct</h3>
                      <p className="text-sm text-muted-foreground mb-4">Trade ETFs directly on stock exchanges</p>
                      <Button className="w-full">Connect Exchange Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Groww ETF</h3>
                      <p className="text-sm text-muted-foreground mb-4">Simple ETF investing platform</p>
                      <Button className="w-full">Connect Groww Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Upstox ETF</h3>
                      <p className="text-sm text-muted-foreground mb-4">Low-cost ETF trading</p>
                      <Button className="w-full">Connect Upstox Account</Button>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Bonds Tab */}
            <TabsContent value="bonds" className="space-y-6">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Landmark className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Bond Investment</h2>
                      <p className="text-muted-foreground">Invest in government and corporate bonds for stable returns</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">GoldenPi</h3>
                      <p className="text-sm text-muted-foreground mb-4">Corporate and government bonds platform</p>
                      <Button className="w-full">Connect GoldenPi Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Wint Wealth</h3>
                      <p className="text-sm text-muted-foreground mb-4">Fixed income investment platform</p>
                      <Button className="w-full">Connect Wint Wealth Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">Yield</h3>
                      <p className="text-sm text-muted-foreground mb-4">Digital bond investing made simple</p>
                      <Button className="w-full">Connect Yield Account</Button>
                    </Card>

                    <Card className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="font-semibold text-lg mb-2">RBI Retail Direct</h3>
                      <p className="text-sm text-muted-foreground mb-4">Direct government securities investment</p>
                      <Button className="w-full">Connect RBI Account</Button>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Trading;
