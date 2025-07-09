import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, Heart, MapPin } from "lucide-react";

// Helper component for the top statistics cards
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

function StatCard({ title, value, icon, iconBgColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}


// Main Dashboard Component
export function DashboardTest() {
  // Mock data
  const bookingCounts = {
    total: 0,
    upcoming: 0,
    past: 0,
  };

  return (
    <div className="not-dark:bg-slate-50/50 rounded-md w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Text */}
        <p className="text-lg text-muted-foreground">
          Here's an overview of your bookings and travel activities
        </p>

        {/* Quick Actions Card */}
        <Card className="not-dark:bg-rose-50/40 border-rose-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button variant="outline" className="bg-white shadow-sm">
                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                Explore Tours
              </Button>
              <Button variant="outline" className="bg-white shadow-sm">
                <Heart className="mr-2 h-4 w-4 text-red-500" />
                My Favorites
              </Button>
              <Button variant="outline" className="bg-white shadow-sm">
                <Clock className="mr-2 h-4 w-4 text-red-500" />
                My Bookings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Bookings"
            value={String(bookingCounts.total)}
            icon={<CalendarDays className="h-6 w-6 text-red-600" />}
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Upcoming Bookings"
            value={String(bookingCounts.upcoming)}
            icon={<Clock className="h-6 w-6 text-orange-600" />}
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Past Bookings"
            value={String(bookingCounts.past)}
            icon={<CheckCircle2 className="h-6 w-6 text-green-600" />}
            iconBgColor="bg-green-100"
          />
        </div>
        
        {/* Detailed Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings Card */}
          <Card className="flex flex-col min-h-[350px] shadow-sm">
             <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Upcoming Bookings</CardTitle>
                <CardDescription>Your next adventures</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center p-6">
               <div className="p-5 bg-blue-100 rounded-full mb-4">
                  <CalendarDays className="h-16 w-16 text-blue-600" />
               </div>
               <p className="font-medium">No upcoming bookings</p>
               <p className="text-sm text-muted-foreground">When you book a tour, it will appear here.</p>
            </CardContent>
          </Card>

          {/* Past Bookings Card */}
          <Card className="flex flex-col min-h-[350px] shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Past Bookings</CardTitle>
                <CardDescription>Your travel memories</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center p-6">
              <div className="p-5 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <p className="font-medium">No past bookings found</p>
              <p className="text-sm text-muted-foreground">Your completed adventures will be stored here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}