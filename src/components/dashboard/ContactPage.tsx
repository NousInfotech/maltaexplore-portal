'use client';

import * as React from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Building } from 'lucide-react';

// --- Main Component ---
export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted!');
    toast.success('Message Sent!', {
      description: 'Our support team will get back to you shortly.'
    });
  };

  const loggedInUser = {
    name: 'Maria Abela',
    email: 'maria.abela@examplehotel.com'
  };

  return (
    <div className='mx-auto max-w-6xl p-4 md:p-6 lg:p-8'>
      <header className='mb-8 text-center'>
        <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
          Get in Touch
        </h1>
        <p className='text-muted-foreground mt-2 text-lg'>
          Have questions about bookings, payouts, or technical issues? We're
          here to help.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* Contact Form Section */}
        <div className='lg:col-span-2'>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Your Name</Label>
                    <Input
                      id='name'
                      placeholder='Your Name'
                      defaultValue={loggedInUser.name}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Your Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Your Email'
                      defaultValue={loggedInUser.email}
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='subject'>Subject</Label>
                  <Select required>
                    <SelectTrigger id='subject'>
                      <SelectValue placeholder='Select a topic...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='booking-issue'>
                        Booking Issue
                      </SelectItem>
                      <SelectItem value='commission-payout'>
                        Commission & Payout Question
                      </SelectItem>
                      <SelectItem value='technical-support'>
                        Technical Support
                      </SelectItem>
                      <SelectItem value='marketing-tools'>
                        Marketing Tools Inquiry
                      </SelectItem>
                      <SelectItem value='general'>General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    placeholder='Please describe your issue in detail...'
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type='submit'>Send Message</Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Contact Info & FAQ Section */}
        <div className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Direct Contact</CardTitle>
              <CardDescription>For urgent matters.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start gap-3'>
                <Phone className='text-muted-foreground mt-1 h-5 w-5 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold'>Support Hotline</h3>
                  <a
                    href='tel:+35612345678'
                    className='text-primary text-sm hover:underline'
                  >
                    +356 1234 5678
                  </a>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Mail className='text-muted-foreground mt-1 h-5 w-5 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold'>Support Email</h3>
                  <a
                    href='mailto:reseller-support@maltaxplore.com.mt'
                    className='text-primary text-sm hover:underline'
                  >
                    reseller-support@maltaxplore.com.mt
                  </a>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Building className='text-muted-foreground mt-1 h-5 w-5 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold'>Office Address</h3>
                  <p className='text-muted-foreground text-sm'>
                    123, Tourist Street, Valletta, VLT 1010, Malta
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger>
                    How are my commissions calculated?
                  </AccordionTrigger>
                  <AccordionContent>
                    Your commission is calculated as a percentage of the total
                    booking value. You can see the exact percentage and amount
                    for each tour in the 'Tour Catalog' and track your earnings
                    in the 'Commission Tracker' tab.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>
                    When will I receive my payout?
                  </AccordionTrigger>
                  <AccordionContent>
                    Payouts are processed automatically at the beginning of each
                    month for all confirmed commissions from the previous month,
                    provided you have met the minimum payout threshold. You can
                    track your payout status under the 'Payouts' tab.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger>
                    What happens if a customer cancels?
                  </AccordionTrigger>
                  <AccordionContent>
                    If a customer cancels their booking according to our
                    cancellation policy, the associated commission will also be
                    cancelled and will not be eligible for payout. You can see
                    this reflected in your 'Commission Tracker'.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
