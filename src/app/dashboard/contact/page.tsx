import { ContactPage } from '@/components/dashboard/ContactPage'
import PageContainer from '@/components/layout/page-container'
import React from 'react'

const page = () => {
  return (
    <PageContainer>
        <div className='container mx-auto'>
            <ContactPage />
        </div>
    </PageContainer>
  )
}

export default page