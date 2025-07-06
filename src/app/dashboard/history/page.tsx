'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, DollarSign, Calendar } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';
import { EngagementsTable, EngagementDetailsModal } from '@/features/proposals/components';
import { useProposalsStore } from '@/features/proposals/store';
import { Engagement } from '@/features/proposals/types';
import { formatCurrency, formatDate } from '@/features/proposals/utils';

export default function HistoryPage() {
  const { getEngagementsByStatus } = useProposalsStore();
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);
  const [showEngagementDetails, setShowEngagementDetails] = useState(false);

  // Get only completed engagements
  const completedEngagements = getEngagementsByStatus('Completed');

  // Calculate statistics for completed engagements
  const totalCompleted = completedEngagements.length;
  const totalRevenue = completedEngagements.reduce((sum, engagement) => sum + engagement.budget, 0);
  const averageProjectDuration = completedEngagements.length > 0 
    ? completedEngagements.reduce((sum, engagement) => {
        const start = new Date(engagement.startDate);
        const end = new Date(engagement.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0) / completedEngagements.length
    : 0;

  const handleEngagementSelect = (engagement: Engagement) => {
    setSelectedEngagement(engagement);
    setShowEngagementDetails(true);
  };

  // Group completed engagements by year
  const engagementsByYear = completedEngagements.reduce((acc, engagement) => {
    const year = new Date(engagement.endDate).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(engagement);
    return acc;
  }, {} as Record<number, Engagement[]>);

  const sortedYears = Object.keys(engagementsByYear)
    .map(Number)
    .sort((a, b) => b - a); // Sort years in descending order

  return (
    <PageContainer>
      <div className='container mx-auto py-6 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Project History</h1>
            <p className='text-muted-foreground'>
              A comprehensive view of all completed audit and tax engagements.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Completed</CardTitle>
              <CheckCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalCompleted}</div>
              <p className='text-xs text-muted-foreground'>
                Successfully delivered projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{formatCurrency(totalRevenue)}</div>
              <p className='text-xs text-muted-foreground'>
                From completed projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Average Duration</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{Math.round(averageProjectDuration)}</div>
              <p className='text-xs text-muted-foreground'>
                Days per project
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Success Rate</CardTitle>
              <CheckCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>100%</div>
              <p className='text-xs text-muted-foreground'>
                All projects completed successfully
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Completed Engagements by Year */}
        {sortedYears.length > 0 ? (
          <div className='space-y-6'>
            {sortedYears.map((year) => (
              <Card key={year}>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5' />
                    {year} - {engagementsByYear[year].length} Completed Projects
                  </CardTitle>
                  <CardDescription>
                    Total Revenue: {formatCurrency(
                      engagementsByYear[year].reduce((sum, engagement) => sum + engagement.budget, 0)
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EngagementsTable
                    engagements={engagementsByYear[year]}
                    onEngagementSelect={handleEngagementSelect}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Completed Projects</CardTitle>
              <CardDescription>
                No projects have been completed yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-8'>
                <CheckCircle className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-semibold mb-2'>No History Yet</h3>
                <p className='text-muted-foreground'>
                  Completed projects will appear here once they are finished.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

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