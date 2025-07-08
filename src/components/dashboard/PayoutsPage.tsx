"use client";

import * as React from "react";
import { format } from "date-fns";
import { useMediaQuery } from "@/hooks/customhooks/use-media-query";
import { Landmark, Wallet, PlusCircle, CheckCircle, Edit } from "lucide-react";

import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// --- Mock Data & Types ---

type PayoutMethodType = "Bank Transfer" | "Revolut" | "PayPal";
interface PayoutMethod {
  id: string;
  type: PayoutMethodType;
  details: string;
  isDefault: boolean;
}
type PayoutStatus = "Paid" | "Processing" | "Cancelled";
interface PayoutHistoryItem {
  id: string;
  requestDate: Date;
  amount: number;
  status: PayoutStatus;
  paidOn: Date | null;
  method: string;
}

const availableAmount = 450.00;
const minPayout = 100.00;

const payoutMethods: PayoutMethod[] = [
  { id: "pm1", type: "Bank Transfer", details: "Bank of Valletta, IBAN: MT...1234", isDefault: true },
  { id: "pm2", type: "Revolut", details: "Username: @maria123", isDefault: false },
];

const payoutHistory: PayoutHistoryItem[] = [
  { id: "ph1", requestDate: new Date("2023-10-01"), amount: 800.00, status: "Paid", paidOn: new Date("2023-10-05"), method: "Bank Transfer" },
  { id: "ph2", requestDate: new Date("2023-09-01"), amount: 650.00, status: "Paid", paidOn: new Date("2023-09-04"), method: "Bank Transfer" },
  { id: "ph3", requestDate: new Date("2023-08-01"), amount: 520.50, status: "Paid", paidOn: new Date("2023-08-03"), method: "Revolut" },
];

// --- Helper Components ---
const PayoutStatusBadge = ({ status }: { status: PayoutStatus }) => {
  const variantMap = { Paid: "default", Processing: "secondary", Cancelled: "destructive" } as const;
  return <Badge variant={variantMap[status]}>{status}</Badge>;
};

// --- Main Component ---
export function PayoutsPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const handleRequestPayout = () => {
    toast.success(`Payout request for €${availableAmount.toFixed(2)} has been submitted!`);
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payouts</h1>
        <p className="text-muted-foreground">Manage your payout methods and view your payment history.</p>
      </header>
      
      {/* Payout Request Section */}
      <Card>
        <CardHeader>
          <CardTitle>Request a Payout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertTitle>Available for Payout: €{availableAmount.toFixed(2)}</AlertTitle>
            <AlertDescription>The minimum amount for a payout request is €{minPayout.toFixed(2)}.</AlertDescription>
          </Alert>
          <Button 
            size="lg" 
            className="w-full sm:w-auto" 
            disabled={availableAmount < minPayout}
            onClick={handleRequestPayout}
          >
            Request Payout of €{availableAmount.toFixed(2)}
          </Button>
        </CardContent>
      </Card>

      {/* Payout Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Payout Methods</CardTitle>
          <CardDescription>Select your default method for receiving payments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="pm1" className="space-y-2">
            {payoutMethods.map((method) => (
              <Label key={method.id} htmlFor={method.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex items-center gap-3">
                  {method.type === "Bank Transfer" && <Landmark className="h-6 w-6 text-muted-foreground" />}
                  {method.type === "Revolut" && <Wallet className="h-6 w-6 text-muted-foreground" />}
                  <div className="text-sm">
                    <p className="font-semibold">{method.type}</p>
                    <p className="text-muted-foreground">{method.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-auto">
                  {method.isDefault && <Badge variant="secondary"><CheckCircle className="mr-1 h-3 w-3" /> Default</Badge>}
                  <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                </div>
              </Label>
            ))}
          </RadioGroup>
          <Separator />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add New Payout Method</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add a New Method</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form to add new method would go here */}
                <p>Form fields for Bank, Revolut, etc. would be here.</p>
              </div>
              <DialogFooter>
                <Button type="submit">Save Method</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Payout History Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>A record of all payouts requested and sent to you.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className={cn("hidden", isDesktop && "block")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Paid On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{format(item.requestDate, "dd MMM yyyy")}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell className="text-right font-medium">€{item.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-center"><PayoutStatusBadge status={item.status} /></TableCell>
                    <TableCell>{item.paidOn ? format(item.paidOn, "dd MMM yyyy") : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Mobile Card List */}
          <div className={cn("block space-y-4", isDesktop && "hidden")}>
            {payoutHistory.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">€{item.amount.toFixed(2)}</CardTitle>
                      <CardDescription>{item.method}</CardDescription>
                    </div>
                    <PayoutStatusBadge status={item.status} />
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Requested:</strong> {format(item.requestDate, "PPP")}</p>
                  <p><strong>Paid On:</strong> {item.paidOn ? format(item.paidOn, "PPP") : "N/A"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}