'use client';

import { X, Calendar, DollarSign, User, FileText, Building } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Engagement } from '../types';
import { 
  formatCurrency, 
  formatDate, 
  getEngagementStatusBadgeVariant 
} from '../utils';

interface EngagementDetailsModalProps {
  engagement: Engagement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EngagementDetailsModal({
  engagement,
  isOpen,
  onClose
}: EngagementDetailsModalProps) {
  if (!engagement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <div>
              <DialogTitle className='text-xl font-semibold'>
                {engagement.projectName}
              </DialogTitle>
              <DialogDescription className='mt-2'>
                Engagement Details
              </DialogDescription>
            </div>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Status */}
          <div className='flex items-center gap-4'>
            <Badge variant={getEngagementStatusBadgeVariant(engagement.status)}>
              {engagement.status}
            </Badge>
          </div>

          {/* Client and Auditor Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
                <Building className='h-5 w-5' />
                Client Information
              </h3>
              <div className='space-y-2'>
                <div>
                  <p className='text-sm text-muted-foreground'>Client Name</p>
                  <p className='font-medium'>{engagement.clientName}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Client Email</p>
                  <p className='font-medium'>{engagement.clientEmail}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
                <User className='h-5 w-5' />
                Auditor Information
              </h3>
              <div className='space-y-2'>
                <div>
                  <p className='text-sm text-muted-foreground'>Auditor Name</p>
                  <p className='font-medium'>{engagement.auditorName}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Auditor Email</p>
                  <p className='font-medium'>{engagement.auditorEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project Details */}
          <div>
            <h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
              <FileText className='h-5 w-5' />
              Project Details
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Framework</p>
                <Badge variant='outline'>{engagement.framework}</Badge>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Business Size</p>
                <Badge variant='secondary'>{engagement.businessSize}</Badge>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Tax Return Needed</p>
                <Badge variant={engagement.isTaxReturnNeeded ? 'default' : 'outline'}>
                  {engagement.isTaxReturnNeeded ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              Timeline
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Start Date</p>
                <p className='font-medium'>{formatDate(engagement.startDate)}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>End Date</p>
                <p className='font-medium'>{formatDate(engagement.endDate)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Budget */}
          <div>
            <h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
              <DollarSign className='h-5 w-5' />
              Budget Information
            </h3>
            <div>
              <p className='text-sm text-muted-foreground'>Total Budget</p>
              <p className='font-medium text-lg'>{formatCurrency(engagement.budget)}</p>
            </div>
          </div>

          {/* Timestamps */}
          <Separator />
          <div className='grid grid-cols-2 gap-4 text-sm text-muted-foreground'>
            <div>
              <p>Created: {formatDate(engagement.createdAt)}</p>
            </div>
            <div>
              <p>Updated: {formatDate(engagement.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-2 pt-4'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
          <Button>View Files</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 