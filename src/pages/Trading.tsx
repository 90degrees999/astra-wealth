import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/90degrees-logo.png";

const Trading = () => {
  const { toast } = useToast();
  const [openAlgoUrl, setOpenAlgoUrl] = useState(localStorage.getItem('openalgo_url') || '');
  const [apiKey, setApiKey] = useState(localStorage.getItem('openalgo_key') || '');
  const [isConnected, setIsConnected] = useState(false);
  const [holdings, setHoldings] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);

  const connectToOpenAlgo = async () => {
    if (!openAlgoUrl || !apiKey) {
      toast({
        title: "Missing Configuration",
        description: "Please enter both OpenAlgo URL and API Key",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${openAlgoUrl}/api/v1/funds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apikey: apiKey }),
      });

      if (response.ok) {
        localStorage.setItem('openalgo_url', openAlgoUrl);
        localStorage.setItem('openalgo_key', apiKey);
        setIsConnected(true);
        toast({
          title: "Connected Successfully",
          description: "Your OpenAlgo instance is now connected",
        });
        loadHoldings();
        loadPositions();
      } else {
        toast({
          title: "Connection Failed",
          description: "Please check your OpenAlgo URL and API Key",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to OpenAlgo instance",
        variant: "destructive",
      });
    }
  };

  const loadHoldings = async () => {
    try {
      const response = await fetch(`${openAlgoUrl}/api/v1/holdings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apikey: apiKey }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setHoldings(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load holdings:', error);
    }
  };

  const loadPositions = async () => {
    try {
      const response = await fetch(`${openAlgoUrl}/api/v1/positionbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apikey: apiKey }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setPositions(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load positions:', error);
    }
  };

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
          {!isConnected ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Connect to OpenAlgo</CardTitle>
                <CardDescription>
                  OpenAlgo is a self-hosted trading platform that connects to Zerodha and 20+ other brokers.
                  You need to install OpenAlgo on your own infrastructure first.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openalgo-url">OpenAlgo Instance URL</Label>
                    <Input
                      id="openalgo-url"
                      type="url"
                      placeholder="http://localhost:5000"
                      value={openAlgoUrl}
                      onChange={(e) => setOpenAlgoUrl(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      The URL where your OpenAlgo instance is running
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Your OpenAlgo API Key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Get this from your OpenAlgo dashboard after logging in
                    </p>
                  </div>

                  <Button onClick={connectToOpenAlgo} className="w-full">
                    Connect to OpenAlgo
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-2">Don't have OpenAlgo yet?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Follow these steps to set up OpenAlgo:
                  </p>
                  <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                    <li>Visit <a href="https://docs.openalgo.in/getting-started" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAlgo Installation Guide</a></li>
                    <li>Install OpenAlgo on your computer or server</li>
                    <li>Connect your broker account (Zerodha, etc.)</li>
                    <li>Get your API key from the OpenAlgo dashboard</li>
                    <li>Return here and enter your OpenAlgo URL and API key</li>
                  </ol>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" asChild>
                      <a href="https://github.com/marketcalls/openalgo" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://openalgo.in" target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Trading Portal</h1>
                  <p className="text-muted-foreground">Connected to OpenAlgo</p>
                </div>
                <Button variant="outline" onClick={() => setIsConnected(false)}>
                  Disconnect
                </Button>
              </div>

              <Tabs defaultValue="holdings" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="holdings">Holdings</TabsTrigger>
                  <TabsTrigger value="positions">Positions</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="trade">Place Order</TabsTrigger>
                </TabsList>

                <TabsContent value="holdings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Holdings</CardTitle>
                      <CardDescription>Stocks and securities in your demat account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {holdings.length === 0 ? (
                        <p className="text-muted-foreground">No holdings found</p>
                      ) : (
                        <div className="space-y-2">
                          {holdings.map((holding, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded">
                              <div>
                                <p className="font-semibold">{holding.symbol}</p>
                                <p className="text-sm text-muted-foreground">Qty: {holding.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">₹{holding.ltp?.toFixed(2)}</p>
                                <p className={`text-sm ${(holding.pnl || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(holding.pnl || 0) >= 0 ? '+' : ''}₹{holding.pnl?.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="positions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Open Positions</CardTitle>
                      <CardDescription>Your active trading positions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {positions.length === 0 ? (
                        <p className="text-muted-foreground">No open positions</p>
                      ) : (
                        <div className="space-y-2">
                          {positions.map((position, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded">
                              <div>
                                <p className="font-semibold">{position.symbol}</p>
                                <p className="text-sm text-muted-foreground">Qty: {position.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">₹{position.ltp?.toFixed(2)}</p>
                                <p className={`text-sm ${(position.pnl || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(position.pnl || 0) >= 0 ? '+' : ''}₹{position.pnl?.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Management</CardTitle>
                      <CardDescription>View and manage your orders through OpenAlgo dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <a href={openAlgoUrl} target="_blank" rel="noopener noreferrer">
                          Open OpenAlgo Dashboard
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trade" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Place Orders</CardTitle>
                      <CardDescription>Use OpenAlgo dashboard for advanced order placement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        For the best trading experience with advanced features like smart orders, basket orders, and strategy execution, use the OpenAlgo dashboard directly.
                      </p>
                      <Button asChild>
                        <a href={openAlgoUrl} target="_blank" rel="noopener noreferrer">
                          Open OpenAlgo Dashboard
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trading;
