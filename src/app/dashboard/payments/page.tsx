'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Clock, Bell, Zap } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';

export default function PaymentsPage() {
  return (
    <PageContainer>
      <div className='container mx-auto py-6 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Payments & Billing</h1>
            <p className='text-muted-foreground'>
              Manage invoices, payments, and billing for your audit engagements.
            </p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card className='max-w-2xl mx-auto'>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
              <CreditCard className='h-8 w-8 text-primary' />
            </div>
            <CardTitle className='text-2xl'>Coming Soon</CardTitle>
            <CardDescription className='text-lg'>
              {"We're working hard to bring you a comprehensive payments and billing system."}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Features Preview */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-start gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                  <CreditCard className='h-4 w-4 text-blue-600' />
                </div>
                <div>
                  <h4 className='font-semibold'>Invoice Management</h4>
                  <p className='text-sm text-muted-foreground'>
                    Create, send, and track invoices for all your engagements.
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100'>
                  <Zap className='h-4 w-4 text-green-600' />
                </div>
                <div>
                  <h4 className='font-semibold'>Payment Processing</h4>
                  <p className='text-sm text-muted-foreground'>
                    Accept payments online with secure payment gateways.
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-100'>
                  <Clock className='h-4 w-4 text-purple-600' />
                </div>
                <div>
                  <h4 className='font-semibold'>Payment Tracking</h4>
                  <p className='text-sm text-muted-foreground'>
                    Monitor payment status and send automated reminders.
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-100'>
                  <Bell className='h-4 w-4 text-orange-600' />
                </div>
                <div>
                  <h4 className='font-semibold'>Automated Notifications</h4>
                  <p className='text-sm text-muted-foreground'>
                    Get notified about payments, overdue invoices, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between text-sm'>
                <span>Development Progress</span>
                <span className='font-semibold'>75%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div className='bg-primary h-2 rounded-full' style={{ width: '75%' }}></div>
              </div>
              <p className='text-xs text-muted-foreground text-center'>
                Expected launch: Q1 2024
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Button className='flex items-center gap-2'>
                <Bell className='h-4 w-4' />
                Get Notified
              </Button>
              <Button variant='outline' className='flex items-center gap-2'>
                <CreditCard className='h-4 w-4' />
                Learn More
              </Button>
            </div>

            {/* Current Status */}
            <div className='bg-muted/50 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='secondary'>Current Status</Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                {"For now, you can manage your engagements and proposals. The payments system will be integrated once it's ready, allowing you to seamlessly handle billing for all your completed projects."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Cards for Future Features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50'>
          <Card>
            <CardHeader>
              <CardTitle className='text-sm'>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center py-4'>
                <CreditCard className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>No invoices yet</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-sm'>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center py-4'>
                <Clock className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>No payments yet</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-sm'>Billing Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center py-4'>
                <Zap className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
} 