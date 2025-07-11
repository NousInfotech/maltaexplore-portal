'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Minus,
  Plus,
  Calendar,
  Clock,
  User,
  ChevronsUpDown,
  Check
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { tours } from './TourCatalogPage';

const pickupLocations = [
  { value: 'st-julians', label: "St. Julian's" },
  { value: 'sliema', label: 'Sliema' },
  { value: 'valletta', label: 'Valletta City Gate' },
  { value: 'bugibba', label: 'Bugibba Square' },
  { value: 'other', label: 'Other (Enter Address)' }
];

// --- Helper Components ---
const NumberInput = ({
  value,
  onValueChange
}: {
  value: number;
  onValueChange: (newValue: number) => void;
}) => (
  <div className='flex items-center gap-2'>
    <Button
      type='button'
      variant='outline'
      size='icon'
      className='h-10 w-10'
      onClick={() => onValueChange(Math.max(1, value - 1))}
    >
      <Minus className='h-4 w-4' />
    </Button>
    <Input type='number' className='w-16 text-center' value={value} readOnly />
    <Button
      type='button'
      variant='outline'
      size='icon'
      className='h-10 w-10'
      onClick={() => onValueChange(value + 1)}
    >
      <Plus className='h-4 w-4' />
    </Button>
  </div>
);

export function BookingModulePage() {
  const [selectedTourId, setSelectedTourId] = React.useState<
    string | undefined
  >(tours[0].id);
  const [isTourPopoverOpen, setTourPopoverOpen] = React.useState(false);
  const [numPeople, setNumPeople] = React.useState(2);
  const [paymentMethod, setPaymentMethod] = React.useState<
    'reseller' | 'customer'
  >('reseller');
  const [customerName, setCustomerName] = React.useState('');
  const [customerContact, setCustomerContact] = React.useState('');
  const [pickupValue, setPickupValue] = React.useState('');
  const [showOtherAddress, setShowOtherAddress] = React.useState(false);
  const [otherAddress, setOtherAddress] = React.useState('');

  const selectedTour = tours.find((tour) => tour.id === selectedTourId);
  const totalPrice = (selectedTour?.price || 0) * numPeople;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTour) {
      toast.error('Please select a tour before confirming.');
      return;
    }

    const bookingDetails = {
      tourId: selectedTour.id,
      tourName: selectedTour.name,
      numPeople,
      totalPrice,
      paymentMethod,
      customerName,
      customerContact,
      pickupLocation: pickupValue === 'other' ? otherAddress : pickupValue
    };
    console.log('Booking Confirmed:', bookingDetails);
    toast.success('Booking Confirmed!', {
      description: `${selectedTour.name} for ${numPeople} people has been booked.`
    });
  };

  return (
    <div className='mx-auto max-w-4xl p-4 md:p-8'>
      <header className='mb-4'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Make a booking
        </h1>
        <p className='text-muted-foreground mt-1'>
          {selectedTour
            ? `Booking for: ${selectedTour.name}`
            : 'Please select a tour'}
        </p>
        <div className='text-muted-foreground mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base'>
          <span className='flex items-center'>
            <Calendar className='mr-1.5 h-4 w-4' /> 26 October 2023
          </span>
          <span className='flex items-center'>
            <Clock className='mr-1.5 h-4 w-4' /> 10:00 AM
          </span>
          <span className='flex items-center'>
            <User className='mr-1.5 h-4 w-4' /> {numPeople} Adults
          </span>
          <Separator orientation='vertical' className='hidden h-4 sm:block' />
          <span className='text-foreground text-lg font-bold'>
            Total: €{totalPrice.toFixed(2)}
          </span>
        </div>
      </header>

      <form onSubmit={handleConfirmBooking}>
        <Card>
          <CardContent className='p-6'>
            <div className='space-y-8'>
              {/* Tour Selection */}
              <div>
                <Label className='text-base font-semibold'>Select Tour</Label>
                <Popover
                  open={isTourPopoverOpen}
                  onOpenChange={setTourPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={isTourPopoverOpen}
                      className='mt-2 w-full justify-between'
                    >
                      {selectedTour ? selectedTour.name : 'Select a tour...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                      <CommandInput placeholder='Search tours...' />
                      <CommandEmpty>No tour found.</CommandEmpty>
                      <CommandGroup>
                        {tours.map((tour) => (
                          <CommandItem
                            key={tour.id}
                            value={tour.name}
                            onSelect={() => {
                              setSelectedTourId(tour.id);
                              setTourPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                selectedTourId === tour.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {tour.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Number of People */}
              <div>
                <Label htmlFor='numPeople' className='text-base font-semibold'>
                  Number of People
                </Label>
                <div className='pt-2'>
                  <NumberInput value={numPeople} onValueChange={setNumPeople} />
                </div>
              </div>

              {/* Customer Details */}
              <div className='space-y-4'>
                <Label className='text-base font-semibold'>
                  Customer Details (Optional)
                </Label>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
              </div>

              {/* Pickup Location */}
              <div className='space-y-2'>
                <Label className='text-base font-semibold'>
                  Pickup Location (if applicable)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='w-full justify-between'
                    >
                      {pickupValue
                        ? pickupLocations.find(
                            (loc) => loc.value === pickupValue
                          )?.label
                        : 'Select from list or enter address...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                      <CommandInput placeholder='Search locations...' />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {pickupLocations.map((loc) => (
                          <CommandItem
                            key={loc.value}
                            onSelect={(currentValue) => {
                              const value = loc.value;
                              setPickupValue(
                                value === pickupValue ? '' : value
                              );
                              setShowOtherAddress(value === 'other');
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                pickupValue === loc.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {loc.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {showOtherAddress && (
                  <Input
                    placeholder='Please enter the full address'
                    value={otherAddress}
                    onChange={(e) => setOtherAddress(e.target.value)}
                    className='mt-2'
                  />
                )}
              </div>

              {/* Payment Method */}
              <div>
                <Label className='text-base font-semibold'>
                  Payment Method
                </Label>
                <RadioGroup
                  defaultValue={paymentMethod}
                  onValueChange={(value: 'reseller' | 'customer') =>
                    setPaymentMethod(value)
                  }
                  className='space-y-2 pt-2'
                >
                  <Label
                    htmlFor='paid-by-reseller'
                    className='hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex cursor-pointer items-start gap-3 rounded-md border p-4'
                  >
                    <RadioGroupItem value='reseller' id='paid-by-reseller' />
                    <div>
                      <p className='font-medium'>Paid by Reseller</p>
                      <p className='text-muted-foreground text-sm'>
                        You have collected payment (e.g., cash).
                      </p>
                    </div>
                  </Label>
                  <Label
                    htmlFor='paid-by-customer'
                    className='hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex cursor-pointer items-start gap-3 rounded-md border p-4'
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
          </CardContent>
          <CardFooter className='bg-muted/50 flex flex-col-reverse gap-2 border-t p-6 sm:flex-row sm:justify-end'>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
            <Button type='submit'>Confirm Booking</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
