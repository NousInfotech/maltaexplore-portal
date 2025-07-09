'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus } from 'lucide-react';

interface Tour {
  id: string;
  name: string;
  price: number;
}

interface BookingDialogProps {
  tour: Tour;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// --- Helper Component for Number Input ---
const NumberInput = ({
  value,
  onValueChange
}: {
  value: number;
  onValueChange: (newValue: number) => void;
}) => {
  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='icon'
        className='h-10 w-10'
        onClick={() => onValueChange(Math.max(1, value - 1))}
      >
        <Minus className='h-4 w-4' />
      </Button>
      <Input
        type='number'
        className='w-16 text-center'
        value={value}
        readOnly
      />
      <Button
        variant='outline'
        size='icon'
        className='h-10 w-10'
        onClick={() => onValueChange(value + 1)}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
};

// --- The Main Booking Dialog Component ---
export function BookingDialog({
  tour,
  isOpen,
  onOpenChange
}: BookingDialogProps) {
  const [numPeople, setNumPeople] = React.useState(2);
  const [paymentMethod, setPaymentMethod] = React.useState<
    'reseller' | 'customer'
  >('reseller');
  const [customerName, setCustomerName] = React.useState('');
  const [customerContact, setCustomerContact] = React.useState('');

  const totalPrice = tour.price * numPeople;

  const handleConfirmBooking = () => {
    const bookingDetails = {
      tourId: tour.id,
      tourName: tour.name,
      numPeople,
      totalPrice,
      paymentMethod,
      customerName,
      customerContact
    };
    
    toast.success('Booking Confirmed!', {
      description: `${tour.name} for ${numPeople} people.`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl'>
            Make a Booking: {tour.name}
          </DialogTitle>
          <DialogDescription asChild >
            <div className='flex flex-wrap items-center gap-x-2 gap-y-1 pt-2'>
              <Badge variant='secondary'>26 October 2023</Badge>
            <Badge variant='secondary'>10:00 AM</Badge>
            <Badge variant='secondary'>{numPeople} Adults</Badge>
            <Separator orientation='vertical' className='h-4' />
            <span className='text-foreground font-bold'>
              Total: €{totalPrice.toFixed(2)}
            </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 py-4'>
          {/* Number of People */}
          <div>
            <Label htmlFor='numPeople' className='font-semibold'>
              Number of People
            </Label>
            <div className='pt-2'>
              <NumberInput value={numPeople} onValueChange={setNumPeople} />
            </div>
          </div>

          {/* Customer Details */}
          <div className='space-y-2'>
            <Label className='font-semibold'>Customer Details (Optional)</Label>
            <Input
              id='customerName'
              placeholder='Lead Customer Name'
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              id='customerContact'
              placeholder='Customer Email / Phone'
              value={customerContact}
              onChange={(e) => setCustomerContact(e.target.value)}
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label className='font-semibold'>Payment Method</Label>
            <RadioGroup
              defaultValue={paymentMethod}
              onValueChange={(value: 'reseller' | 'customer') =>
                setPaymentMethod(value)
              }
              className='space-y-2 pt-2'
            >
              <Label
                htmlFor='paid-by-reseller'
                className='hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex cursor-pointer items-start gap-3 rounded-md border p-3'
              >
                <RadioGroupItem value='reseller' id='paid-by-reseller' />
                <div>
                  <p className='font-medium'>Paid by Reseller</p>
                  <p className='text-muted-foreground text-sm'>
                    You have collected payment from the customer (e.g., cash).
                  </p>
                </div>
              </Label>
              <Label
                htmlFor='paid-by-customer'
                className='hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex cursor-pointer items-start gap-3 rounded-md border p-3'
              >
                <RadioGroupItem value='customer' id='paid-by-customer' />
                <div>
                  <p className='font-medium'>Paid by Customer</p>
                  <p className='text-muted-foreground text-sm'>
                    Customer will pay at pickup or via an online link.
                  </p>
                </div>
              </Label>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className='flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
