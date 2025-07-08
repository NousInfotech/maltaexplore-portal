import { CommissionsPage } from '@/components/dashboard/CommissionsPage';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

const page = () => {
  return (
    <>
      <PageContainer>
        <div className='container mx-auto'>
          <CommissionsPage />
        </div>
      </PageContainer>
    </>
  );
};

export default page;
