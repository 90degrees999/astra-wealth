import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/90degrees-logo.png";

const Analysis = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    monthlySavings: "",
    totalAssets: "",
    totalLiabilities: "",
    retirementAge: "",
    retirementCorpus: "",
    educationFund: "",
    homePurchase: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least basic income info is provided
    if (!formData.monthlyIncome || !formData.monthlySavings) {
      toast.error("Please provide at least your monthly income and savings");
      return;
    }

    toast.success("Analysis complete! Redirecting to your dashboard...");
    
    // Store data in sessionStorage for the dashboard
    sessionStorage.setItem("wealthData", JSON.stringify(formData));
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                Back
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Wealth Analysis</h1>
            <p className="text-lg text-muted-foreground">
              Provide your financial details to receive personalized AI-powered recommendations
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Income & Savings */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">1</span>
                  Income & Savings
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="₹50,000"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleChange("monthlyIncome", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlySavings">Monthly Savings *</Label>
                    <Input
                      id="monthlySavings"
                      type="number"
                      placeholder="₹15,000"
                      value={formData.monthlySavings}
                      onChange={(e) => handleChange("monthlySavings", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Assets & Liabilities */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">2</span>
                  Assets & Liabilities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalAssets">Total Assets (Optional)</Label>
                    <Input
                      id="totalAssets"
                      type="number"
                      placeholder="₹10,00,000"
                      value={formData.totalAssets}
                      onChange={(e) => handleChange("totalAssets", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalLiabilities">Total Liabilities (Optional)</Label>
                    <Input
                      id="totalLiabilities"
                      type="number"
                      placeholder="₹5,00,000"
                      value={formData.totalLiabilities}
                      onChange={(e) => handleChange("totalLiabilities", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Financial Goals */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">3</span>
                  Financial Goals
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retirementAge">Retirement Age (Optional)</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      placeholder="60"
                      value={formData.retirementAge}
                      onChange={(e) => handleChange("retirementAge", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retirementCorpus">Retirement Corpus Target (Optional)</Label>
                    <Input
                      id="retirementCorpus"
                      type="number"
                      placeholder="₹2,00,00,000"
                      value={formData.retirementCorpus}
                      onChange={(e) => handleChange("retirementCorpus", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationFund">Education Fund Needed (Optional)</Label>
                    <Input
                      id="educationFund"
                      type="number"
                      placeholder="₹20,00,000"
                      value={formData.educationFund}
                      onChange={(e) => handleChange("educationFund", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="homePurchase">Home Purchase Target (Optional)</Label>
                    <Input
                      id="homePurchase"
                      type="number"
                      placeholder="₹50,00,000"
                      value={formData.homePurchase}
                      onChange={(e) => handleChange("homePurchase", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                Generate AI Analysis
                <Sparkles className="h-5 w-5" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
