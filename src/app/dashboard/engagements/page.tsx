import { Project, columns } from '@/components/audit-projects-table/columns';
import { DataTable } from '@/components/audit-projects-table/data-table';
import PageContainer from '@/components/layout/page-container';

// This is your dummy data from the previous step.
// In a real app, you would fetch this from an API.
const dummyAuditProjects: Project[] = [
  {
    projectName: 'Innovate Corp - FY2023 Financial Audit',
    startDate: '2024-01-15',
    endDate: '2024-04-10',
    status: 'Completed',
    budget: 120000
  },
  {
    projectName: 'Global Tech Inc - Q1 2024 Tax Provision',
    startDate: '2024-04-01',
    endDate: '2024-04-25',
    status: 'Fieldwork',
    budget: 45000
  },
  {
    projectName: 'Sunrise Retail - Internal Controls Review',
    startDate: '2024-02-01',
    endDate: '2024-05-30',
    status: 'Manager Review',
    budget: 75000
  },
  {
    projectName: 'Legacy Bank - Due Diligence Project',
    startDate: '2024-03-10',
    endDate: '2024-04-20',
    status: 'Awaiting Client Info',
    budget: 95000
  },
  {
    projectName: 'SmallBiz Co - 2023 Annual Tax Filing',
    startDate: '2024-02-20',
    endDate: '2024-04-15',
    status: 'Completed',
    budget: 8500
  },
  {
    projectName: 'Venture Holdings - FY2024 Audit Planning',
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    status: 'Planning',
    budget: 250000
  },
  {
    projectName: 'Healthcare Solutions - Forensic Investigation',
    startDate: '2023-11-05',
    endDate: '2024-03-15',
    status: 'Completed',
    budget: 180000
  },
  {
    projectName: 'Maritime Logistics - IFRS 16 Implementation',
    startDate: '2024-01-02',
    endDate: '2024-06-28',
    status: 'Partner Review',
    budget: 65000
  }
  // Add more data here to test pagination
];

async function getData(): Promise<Project[]> {
  // In a real app, you'd fetch data from your database or API here.
  // For now, we'll just return our dummy data.
  return dummyAuditProjects;
}

export default async function AuditProjectsPage() {
  const data = await getData();

  return (
    <PageContainer>
      <div className='container mx-auto py-10'>
        <h1 className='mb-4 text-3xl font-bold'>Audit & Tax Engagements</h1>
        <p className='text-muted-foreground mb-8'>
          A list of your firm's current and past engagements.
        </p>
        <div className='overflow-x-auto'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </PageContainer>
  );
}
