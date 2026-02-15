import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCategories, mockCities } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Building2 } from 'lucide-react';

export default function AddBusiness() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast({ title: 'Business Submitted', description: 'The business has been submitted for review. Status: Pending' });
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Add New Business</h1>
        <p className="text-muted-foreground">Submit a new business listing for review</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border bg-card card-shadow p-6 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Business Details</h3>
            <p className="text-xs text-muted-foreground">Fill in the business information</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Business Name *</Label>
            <Input placeholder="Enter business name" required maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select required>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {mockCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>City *</Label>
            <Select required>
              <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
              <SelectContent>
                {mockCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Phone *</Label>
            <Input placeholder="+91 98765 43210" required maxLength={15} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Address *</Label>
            <Input placeholder="Full business address" required maxLength={200} />
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <h4 className="font-semibold text-foreground mb-4">Listing & Payment</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Listing Type *</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (Free)</SelectItem>
                  <SelectItem value="premium">Premium (Paid)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payment Mode</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount Collected (₹)</Label>
              <Input type="number" placeholder="0" min={0} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Payment Note</Label>
              <Textarea placeholder="Any notes about the payment..." maxLength={500} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="gradient-primary text-primary-foreground px-8" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Business'}
          </Button>
        </div>
      </form>
    </div>
  );
}
