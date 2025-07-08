import { BookingModulePage } from '@/components/dashboard/BookingModule';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

const page = () => {
  return (
    <>
      <PageContainer>
        <div className='container mx-auto'>
          <BookingModulePage />
        </div>
      </PageContainer>
    </>
  );
};

export default page;
