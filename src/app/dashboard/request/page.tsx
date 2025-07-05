'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Import Lucide icons
import {
  ChevronLeft,
  DollarSign,
  File as FileIcon,
  Calendar as CalendarIcon,
  UploadCloud
} from 'lucide-react';

// Import Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import PageContainer from '@/components/layout/page-container'; // Make sure this path is correct

// Zod schema
const formSchema = z
  .object({
    financialYear: z.date({
      required_error: 'Financial year end date is required.'
    }),
    framework: z.enum(['GAPSME', 'IFRS'], {
      required_error: 'You need to select a framework.'
    }),
    businessSize: z.enum(['Micro', 'Small', 'Medium', 'Large'], {
      required_error: 'Business size is required.'
    }),
    isTaxReturnNeeded: z.enum(['Yes', 'No']),
    deliveryDeadline: z.date({
      required_error: 'A delivery deadline is required.'
    }),
    notes: z.string().optional(),
    files: z.any().optional(),
    budget: z.string().optional(),
    urgency: z.enum(['Normal', 'Urgent'])
  })
  .refine((data) => data.deliveryDeadline > data.financialYear, {
    message: 'Deadline must be after the financial year end.',
    path: ['deliveryDeadline']
  });

type AuditFormValues = z.infer<typeof formSchema>;

const RequestPage = () => {
  const [step, setStep] = useState<'selection' | 'auditForm' | 'taxForm'>(
    'selection'
  );

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isTaxReturnNeeded: 'No',
      urgency: 'Normal',
      notes: '',
      budget: ''
    },
    mode: 'onChange'
  });

  function onSubmit(data: AuditFormValues) {
    // ... your submit logic
    console.log('Form submitted:', data);
    toast.success('Request Submitted!');
    form.reset();
    setStep('selection');
  }

  // --- Render Functions ---

  const renderSelectionStep = () => (
    <div className='flex min-h-screen min-w-xs flex-1 flex-col md:min-w-xl lg:min-w-6xl'>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-2 text-3xl font-bold tracking-tight'>
            Create a New Request
          </h2>
          <p className='text-muted-foreground mb-8'>
            What type of service do you need?
          </p>
          <div className='flex flex-col justify-center gap-6 md:flex-row'>
            <Card
              onClick={() => setStep('auditForm')}
              className='group hover:border-primary w-full transform cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-64'
            >
              <CardHeader className='items-center'>
                <FileIcon className='text-primary mb-4 h-12 w-12 transition-transform duration-300 group-hover:scale-110' />
                <CardTitle>Financial Audit</CardTitle>
                <CardDescription>(GAPSME / IFRS)</CardDescription>
              </CardHeader>
            </Card>
            <Card
              onClick={() => setStep('taxForm')}
              className='group hover:border-primary w-full transform cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-64'
            >
              <CardHeader className='items-center'>
                <DollarSign className='text-primary mb-4 h-12 w-12 transition-transform duration-300 group-hover:scale-110' />
                <CardTitle>Tax Return Filing</CardTitle>
                <CardDescription>(Standalone Service)</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuditForm = () => (
    <div className='mx-auto w-full max-w-4xl'>
      <Button
        variant='ghost'
        onClick={() => setStep('selection')}
        className='mb-6'
      >
        <ChevronLeft className='mr-2 h-4 w-4' /> Back to selection
      </Button>
      <h2 className='mb-6 text-3xl font-bold tracking-tight'>
        Financial Audit Request
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* Financial Year */}
            <FormField
              control={form.control}
              name='financialYear'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Financial Year End</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4 opacity-50' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Delivery Deadline */}
            <FormField
              control={form.control}
              name='deliveryDeadline'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Delivery Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4 opacity-50' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Framework */}
            <FormField
              control={form.control}
              name='framework'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Framework</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row items-center space-x-6'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='GAPSME' />
                        </FormControl>
                        <FormLabel className='font-normal'>GAPSME</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='IFRS' />
                        </FormControl>
                        <FormLabel className='font-normal'>IFRS</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Business Size */}
            <FormField
              control={form.control}
              name='businessSize'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a business size' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Micro'>Micro</SelectItem>
                      <SelectItem value='Small'>Small</SelectItem>
                      <SelectItem value='Medium'>Medium</SelectItem>
                      <SelectItem value='Large'>Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tax Return Needed? */}
            <div className='md:col-span-2'>
              <FormField
                control={form.control}
                name='isTaxReturnNeeded'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Is Tax Return Needed with this Audit?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-row items-center space-x-6'
                      >
                        <FormItem className='flex items-center space-y-0 space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='Yes' />
                          </FormControl>
                          <FormLabel className='font-normal'>Yes</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-y-0 space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='No' />
                          </FormControl>
                          <FormLabel className='font-normal'>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* File Upload */}
            <div className='md:col-span-2'>
              <FormField
                control={form.control}
                name='files'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Upload (Trial Balance, etc.)</FormLabel>
                    <FormControl>
                      <div className='relative flex h-32 w-full justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6'>
                        <div className='space-y-1 text-center'>
                          <UploadCloud className='text-muted-foreground mx-auto h-12 w-12' />
                          <div className='flex text-sm'>
                            <label
                              htmlFor='file-upload'
                              className='text-primary focus-within:ring-primary hover:text-primary/80 relative cursor-pointer rounded-md font-medium focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none'
                            >
                              <span>Upload files</span>
                              <Input
                                id='file-upload'
                                type='file'
                                className='sr-only'
                                multiple
                                onChange={(e) => field.onChange(e.target.files)}
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-muted-foreground text-xs'>
                            PNG, JPG, PDF, XLSX up to 10MB
                          </p>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      {field.value && field.value.length > 0
                        ? `Selected: ${Array.from(field.value as FileList)
                            .map((file: any) => file.name)
                            .join(', ')}`
                        : 'No files selected.'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Notes */}
            <div className='md:col-span-2'>
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes / Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Add any specific notes or requirements for this audit...'
                        className='resize-y'
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Budget */}
            <FormField
              control={form.control}
              name='budget'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (Optional)</FormLabel>
                  <div className='relative'>
                    <DollarSign className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0.00'
                        className='pl-8'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Urgency */}
            <FormField
              control={form.control}
              name='urgency'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Urgency Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row items-center space-x-6'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='Normal' />
                        </FormControl>
                        <FormLabel className='font-normal'>Normal</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='Urgent' />
                        </FormControl>
                        <FormLabel className='font-normal'>Urgent</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end pb-8'>
            {' '}
            {/* Add padding to the bottom */}
            <Button type='submit' size='lg'>
              Submit Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  const renderTaxForm = () => (
    <div className='flex h-full flex-col items-center justify-center text-center'>
      <div>
        <Button
          variant='ghost'
          onClick={() => setStep('selection')}
          className='mb-6'
        >
          <ChevronLeft className='mr-2 h-4 w-4' /> Back to selection
        </Button>
        <Card>
          <CardHeader>
            <DollarSign className='text-primary mx-auto mb-4 h-16 w-16' />
            <CardTitle className='text-2xl'>Tax Return Filing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              This feature is coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <PageContainer>
      {step === 'selection' && renderSelectionStep()}
      {step === 'auditForm' && renderAuditForm()}
      {step === 'taxForm' && renderTaxForm()}
    </PageContainer>
  );
};

export default RequestPage;
