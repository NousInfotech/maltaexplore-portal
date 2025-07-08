'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { useMediaQuery } from '@/hooks/customhooks/use-media-query';
import {
  BarChart,
  Book,
  Calendar as CalendarIcon,
  DollarSign,
  Users
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// --- Mock Data & Types ---
interface Tour {
  id: string;
  name: string;
}
type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';
interface RecentBooking {
  id: string;
  tourName: string;
  customerName: string;
  customerInitials: string;
  date: Date;
  status: BookingStatus;
}

const stats = [
  {
    title: "Today's Bookings",
    value: '5',
    icon: Book,
    description: 'New bookings since midnight.'
  },
  {
    title: "This Month's Sales",
    value: '€1,250.00',
    icon: DollarSign,
    description: 'Total sales value this month.'
  },
  {
    title: "This Month's Commission",
    value: '€187.50',
    icon: BarChart,
    description: 'Pending + Confirmed commission.'
  }
];

const tours: Tour[] = [
  { id: '1', name: 'Gozo Jeep Safari' },
  { id: '2', name: 'Comino Blue Lagoon Cruise' },
  { id: '3', name: 'Valletta Walking Tour' }
];

const recentBookings: RecentBooking[] = [
  {
    id: '#12345',
    tourName: 'Gozo Jeep Safari',
    customerName: 'John Doe',
    customerInitials: 'JD',
    date: new Date('2023-10-25'),
    status: 'Confirmed'
  },
  {
    id: '#12344',
    tourName: 'Valletta Walking...',
    customerName: 'Jane Smith',
    customerInitials: 'JS',
    date: new Date('2023-10-25'),
    status: 'Confirmed'
  },
  {
    id: '#12343',
    tourName: 'Comino Blue Lagoon',
    customerName: 'Peter Jones',
    customerInitials: 'PJ',
    date: new Date('2023-10-24'),
    status: 'Pending'
  },
  {
    id: '#12342',
    tourName: 'Mdina Ghost Tour',
    customerName: 'Emily White',
    customerInitials: 'EW',
    date: new Date('2023-10-23'),
    status: 'Cancelled'
  }
];

// --- Helper Components ---
const BookingStatusBadge = ({ status }: { status: BookingStatus }) => {
  const variantMap = {
    Confirmed: 'default',
    Pending: 'secondary',
    Cancelled: 'destructive'
  } as const;
  return <Badge variant={variantMap[status]}>{status}</Badge>;
};

// --- Main Component ---
export function DashboardPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>
          MaltaXplore Reseller Portal
        </h2>
      </div>

      {/* Stat Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-muted-foreground text-xs'>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* Quick Book Card */}
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle>Quick Book</CardTitle>
            <CardDescription>
              Instantly create a new booking for a customer.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select a tour...' />
              </SelectTrigger>
              <SelectContent>
                {tours.map((tour) => (
                  <SelectItem key={tour.id} value={tour.id}>
                    {tour.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input type='time' placeholder='Time' />
              <Input type='number' placeholder='# of People' min='1' />
            </div>
            <Button className='w-full'>Book Now</Button>
          </CardContent>
        </Card>

        {/* Top Performing Tours Card */}
        <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle>Top Performing Tours</CardTitle>
            <CardDescription>
              Your most frequently booked tours this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {tours.map((tour, index) => (
                <div key={tour.id} className='flex items-center'>
                  <Avatar className='h-9 w-9'>
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm leading-none font-medium'>
                      {tour.name}
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>
                    +€{1250 / (index + 2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className={cn('hidden', isDesktop && 'block')}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tour Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className='text-right'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className='font-medium'>{booking.id}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking.tourName}</TableCell>
                    <TableCell>{format(booking.date, 'dd MMM yyyy')}</TableCell>
                    <TableCell className='text-right'>
                      <BookingStatusBadge status={booking.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className={cn('block space-y-4', isDesktop && 'hidden')}>
            {recentBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle className='text-base'>
                        {booking.tourName}
                      </CardTitle>
                      <CardDescription>{booking.id}</CardDescription>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                </CardHeader>
                <CardContent className='flex items-center justify-between text-sm'>
                  <div className='flex items-center'>
                    <Avatar className='mr-2 h-8 w-8'>
                      <AvatarFallback>
                        {booking.customerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{booking.customerName}</span>
                  </div>
                  <span className='text-muted-foreground'>
                    {format(booking.date, 'PPP')}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
