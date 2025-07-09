'use client';

import * as React from 'react';
import { useMediaQuery } from '@/hooks/customhooks/use-media-query';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
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

// --- Mock Data & Types (replace with your actual data fetching) ---
type CommissionStatus = 'Paid' | 'Confirmed' | 'Pending' | 'Cancelled';
interface Commission {
  id: string;
  bookingId: string;
  tourName: string;
  tourDate: Date;
  amount: number;
  status: CommissionStatus;
}
const commissionHistory: Commission[] = [
  {
    id: '1',
    bookingId: '#12345',
    tourName: 'Gozo Jeep Safari',
    tourDate: new Date('2023-10-25'),
    amount: 11.25,
    status: 'Confirmed'
  },
  {
    id: '2',
    bookingId: '#12340',
    tourName: 'Comino Blue Lagoon Cruise',
    tourDate: new Date('2023-10-23'),
    amount: 4.5,
    status: 'Paid'
  },
  {
    id: '3',
    bookingId: '#12333',
    tourName: 'Valletta Walking Tour',
    tourDate: new Date('2023-10-22'),
    amount: 3.0,
    status: 'Paid'
  },
  {
    id: '4',
    bookingId: '#12321',
    tourName: 'Mdina Ghost Tour',
    tourDate: new Date('2023-11-05'),
    amount: 5.5,
    status: 'Pending'
  },
  {
    id: '5',
    bookingId: '#12311',
    tourName: 'Gozo Jeep Safari',
    tourDate: new Date('2023-09-15'),
    amount: 11.25,
    status: 'Cancelled'
  },
  {
    id: '6',
    bookingId: '#12305',
    tourName: 'Comino Blue Lagoon Cruise',
    tourDate: new Date('2023-10-28'),
    amount: 4.5,
    status: 'Confirmed'
  },
  {
    id: '7',
    bookingId: '#12299',
    tourName: 'Sightseeing Bus Tour',
    tourDate: new Date('2023-11-10'),
    amount: 7.0,
    status: 'Pending'
  },
  {
    id: '8',
    bookingId: '#12298',
    tourName: 'Harbour Cruise',
    tourDate: new Date('2023-10-30'),
    amount: 6.5,
    status: 'Confirmed'
  },
  {
    id: '9',
    bookingId: '#12295',
    tourName: 'Valletta Walking Tour',
    tourDate: new Date('2023-09-05'),
    amount: 3.0,
    status: 'Paid'
  },
  {
    id: '10',
    bookingId: '#12290',
    tourName: 'Gozo Jeep Safari',
    tourDate: new Date('2023-11-12'),
    amount: 11.25,
    status: 'Pending'
  }
];

// --- Helper Components & Functions ---
const StatusBadge = ({ status }: { status: CommissionStatus }) => {
  const variantMap = {
    Paid: 'default',
    Confirmed: 'outline',
    Pending: 'secondary',
    Cancelled: 'destructive'
  } as const;
  return <Badge variant={variantMap[status]}>{status}</Badge>;
};

// --- The Main Component ---
export function CommissionsPage() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date('2023-08-01'),
    to: new Date('2023-11-30')
  });
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const filteredCommissions = React.useMemo(() => {
    const sorted = [...commissionHistory].sort(
      (a, b) => b.tourDate.getTime() - a.tourDate.getTime()
    );
    return sorted.filter((commission) => {
      const dateFilter =
        date?.from && date?.to
          ? commission.tourDate >= date.from && commission.tourDate <= date.to
          : true;
      const statusCheck =
        statusFilter === 'all' ||
        commission.status.toLowerCase() === statusFilter;
      return dateFilter && statusCheck;
    });
  }, [date, statusFilter]);

  return (
    <div className='space-y-8 p-4 md:p-6 lg:p-8'>
      <header>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Commissions
        </h1>
        <p className='text-muted-foreground'>
          Track your earnings, view history, and manage your payouts.
        </p>
      </header>

      <div>
        <h2 className='mb-4 text-xl font-semibold tracking-tight md:text-2xl'>
          Lifetime Earnings: €2,450.00
        </h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Summary Cards */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Awaiting Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>€450.00</div>
              <p className='text-muted-foreground text-xs'>(Confirmed)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>€187.50</div>
              <p className='text-muted-foreground text-xs'>(Tour not taken)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Last Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>€800.00</div>
              <p className='text-muted-foreground text-xs'>On 1 Oct 2023</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <CardTitle>Commission History</CardTitle>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              {/* Date Range Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id='date'
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal sm:w-auto',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4 text-red-500 dark:text-white' />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='end'>
                  <Calendar
                    initialFocus
                    mode='range'
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={isDesktop ? 2 : 1}
                  />
                </PopoverContent>
              </Popover>
              {/* Filters */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-full sm:w-[180px]'>
                  <SelectValue placeholder='Filter by Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Statuses</SelectItem>
                  <SelectItem value='paid'>Paid</SelectItem>
                  <SelectItem value='confirmed'>Confirmed</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='cancelled'>Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant='outline' className='w-full sm:w-auto'>
                <Download className='mr-2 h-4 w-4 text-red-500 dark:text-white' />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className='hidden md:block'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Tour Name</TableHead>
                  <TableHead>Tour Date</TableHead>
                  <TableHead className='text-right'>Commission</TableHead>
                  <TableHead className='text-center'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.length > 0 ? (
                  filteredCommissions.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className='font-medium'>
                        {c.bookingId}
                      </TableCell>
                      <TableCell>{c.tourName}</TableCell>
                      <TableCell>{format(c.tourDate, 'dd MMM yyyy')}</TableCell>
                      <TableCell className='text-right'>
                        €{c.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className='text-center'>
                        <StatusBadge status={c.status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className='h-24 text-center'>
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className='block md:hidden'>
            <div className='space-y-4'>
              {filteredCommissions.length > 0 ? (
                filteredCommissions.map((c) => (
                  <Card key={c.id} className='w-full'>
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div>
                          <CardTitle className='text-base'>
                            {c.tourName}
                          </CardTitle>
                          <CardDescription>{c.bookingId}</CardDescription>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                    </CardHeader>
                    <CardContent className='flex items-end justify-between'>
                      <div className='text-muted-foreground text-sm'>
                        {format(c.tourDate, 'PPP')}
                      </div>
                      <div className='text-lg font-bold'>
                        €{c.amount.toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className='text-muted-foreground pt-8 text-center'>
                  No results found.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
