import { MarketingPage } from '@/components/dashboard/MarketingPage';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

const page = () => {
  return (
    <>
      <PageContainer>
        <div className='container mx-auto'>
          <MarketingPage />
        </div>
      </PageContainer>
    </>
  );
};

export default page;
