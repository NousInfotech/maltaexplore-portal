'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';
import { EngagementsTable, EngagementDetailsModal } from '@/features/proposals/components';
import { useProposalsStore } from '@/features/proposals/store';
import { Engagement } from '@/features/proposals/types';
import { formatCurrency } from '@/features/proposals/utils';

export default function EngagementsPage() {
  const { engagements, getEngagementsByStatus } = useProposalsStore();
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);
  const [showEngagementDetails, setShowEngagementDetails] = useState(false);

  // Filter engagements by status
  const completedEngagements = getEngagementsByStatus('Completed');
  const activeEngagements = getEngagementsByStatus('Fieldwork');
  const planningEngagements = getEngagementsByStatus('Planning');
  const reviewEngagements = getEngagementsByStatus('Manager Review').concat(
    getEngagementsByStatus('Partner Review')
  );
  const awaitingInfoEngagements = getEngagementsByStatus('Awaiting Client Info');

  // Calculate statistics
  const totalEngagements = engagements.length;
  const totalBudget = engagements.reduce((sum, engagement) => sum + engagement.budget, 0);
  const activeCount = activeEngagements.length;
  const completedCount = completedEngagements.length;

  const handleEngagementSelect = (engagement: Engagement) => {
    setSelectedEngagement(engagement);
    setShowEngagementDetails(true);
  };

  return (
    <PageContainer>
      <div className='container mx-auto py-6 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Audit & Tax Engagements</h1>
            <p className='text-muted-foreground'>
              A list of your firm&rsquo;s current and past engagements.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Engagements</CardTitle>
              <Briefcase className='h-4 w-3 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalEngagements}</div>
              <p className='text-xs text-muted-foreground'>
                {activeCount} active, {completedCount} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Budget</CardTitle>
              <Briefcase className='h-4 w-3 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{formatCurrency(totalBudget)}</div>
              <p className='text-xs text-muted-foreground'>
                Across all engagements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Engagements</CardTitle>
              <Clock className='h-4 w-3 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeCount}</div>
              <p className='text-xs text-muted-foreground'>
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Completed</CardTitle>
              <CheckCircle className='h-4 w-3 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{completedCount}</div>
              <p className='text-xs text-muted-foreground'>
                Successfully delivered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Summary */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Badge variant='outline'>Planning</Badge>
                <span className='text-lg font-bold'>{planningEngagements.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                In planning phase
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Badge variant='secondary'>Active</Badge>
                <span className='text-lg font-bold'>{activeEngagements.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                Fieldwork in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Badge variant='secondary'>Review</Badge>
                <span className='text-lg font-bold'>{reviewEngagements.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                Under review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Badge variant='destructive'>Awaiting Info</Badge>
                <span className='text-lg font-bold'>{awaitingInfoEngagements.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                Waiting for client
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Badge variant='default'>Completed</Badge>
                <span className='text-lg font-bold'>{completedEngagements.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                Successfully completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Engagements Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Engagements</CardTitle>
            <CardDescription>
              Click on an engagement to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EngagementsTable
              engagements={engagements}
              onEngagementSelect={handleEngagementSelect}
            />
          </CardContent>
        </Card>

        {/* Engagement Details Modal */}
        <EngagementDetailsModal
          engagement={selectedEngagement}
          isOpen={showEngagementDetails}
          onClose={() => setShowEngagementDetails(false)}
        />
      </div>
    </PageContainer>
  );
}
