import { TourCatalogPage } from '@/components/dashboard/TourCatalogPage'
import PageContainer from '@/components/layout/page-container'
import React from 'react'

const page = () => {
  return (
    <>
    <PageContainer>
        <div className='container mx-auto'>
            <TourCatalogPage />
        </div>
    
    </PageContainer>
    </>
  )
}

export default page