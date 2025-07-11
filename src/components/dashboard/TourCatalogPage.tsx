// 'use client';

// import * as React from 'react';
// import Image from 'next/image';
// import { LayoutGrid, List, Search, Filter as FilterIcon } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger
// } from '@/components/ui/sheet';
// import { cn } from '@/lib/utils';
// import { BookingDialog } from './BookingDialog'; // <-- IMPORT THE NEW COMPONENT

// // --- Mock Data & Types ---
// type TourCategory = 'Boat Trips' | 'Land Tours' | 'Cultural';
// type TourDuration = 'Half Day' | 'Full Day';
// type TourLocation = 'Gozo' | 'Valletta' | 'Sliema' | 'Mdina';

// interface Tour {
//   id: string;
//   name: string;
//   price: number;
//   commissionRate: number;
//   imageSrc: string;
//   category: TourCategory;
//   duration: TourDuration;
//   location: TourLocation;
// }

// export const tours: Tour[] = [
//   {
//     id: '1',
//     name: 'Gozo Jeep Safari',
//     price: 75,
//     commissionRate: 0.15,
//     imageSrc: 'https://picsum.photos/seed/jeep/400/300',
//     category: 'Land Tours',
//     duration: 'Full Day',
//     location: 'Gozo'
//   },
//   {
//     id: '2',
//     name: 'Comino Blue Lagoon Cruise',
//     price: 30,
//     commissionRate: 0.15,
//     imageSrc: 'https://picsum.photos/seed/lagoon/400/300',
//     category: 'Boat Trips',
//     duration: 'Full Day',
//     location: 'Sliema'
//   },
//   {
//     id: '3',
//     name: 'Valletta Walking Tour',
//     price: 20,
//     commissionRate: 0.15,
//     imageSrc: 'https://picsum.photos/seed/valletta/400/300',
//     category: 'Cultural',
//     duration: 'Half Day',
//     location: 'Valletta'
//   },
//   {
//     id: '4',
//     name: 'Mdina Ghost Tour',
//     price: 35,
//     commissionRate: 0.2,
//     imageSrc: 'https://picsum.photos/seed/mdina/400/300',
//     category: 'Cultural',
//     duration: 'Half Day',
//     location: 'Mdina'
//   },
//   {
//     id: '5',
//     name: 'Three Cities Harbour Tour',
//     price: 25,
//     commissionRate: 0.15,
//     imageSrc: 'https://picsum.photos/seed/harbour/400/300',
//     category: 'Boat Trips',
//     duration: 'Half Day',
//     location: 'Sliema'
//   },
//   {
//     id: '6',
//     name: 'Gozo & Comino Ferry',
//     price: 45,
//     commissionRate: 0.15,
//     imageSrc: 'https://picsum.photos/seed/ferry/400/300',
//     category: 'Boat Trips',
//     duration: 'Full Day',
//     location: 'Gozo'
//   }
// ];

// const filterConfig = [
//   {
//     id: 'category',
//     name: 'Category',
//     options: ['Boat Trips', 'Land Tours', 'Cultural'] as TourCategory[]
//   },
//   {
//     id: 'duration',
//     name: 'Duration',
//     options: ['Half Day', 'Full Day'] as TourDuration[]
//   },
//   {
//     id: 'location',
//     name: 'Location',
//     options: ['Gozo', 'Valletta', 'Sliema', 'Mdina'] as TourLocation[]
//   }
// ];

// const TourCard = ({
//   tour,
//   viewMode,
//   onBookClick
// }: {
//   tour: Tour;
//   viewMode: 'grid' | 'list';
//   onBookClick: (tour: Tour) => void;
// }) => {
//   const isList = viewMode === 'list';
//   return (
//     <Card
//       className={cn(
//         'overflow-hidden transition-all',
//         isList ? 'flex flex-col sm:flex-row' : 'flex h-full flex-col'
//       )}
//     >
//       {/* Image container */}
//       <div
//         className={cn(
//           'bg-muted relative',
//           isList ? 'flex-shrink-0 sm:w-48 md:w-56' : 'w-full',
//           'aspect-video sm:aspect-auto'
//         )}
//       >
//         <Image
//           src={tour.imageSrc}
//           alt={tour.name}
//           layout='fill'
//           objectFit='cover'
//         />
//       </div>

//       {/* Content container */}
//       <div className='flex flex-1 flex-col p-4'>
//         <CardHeader className='p-0'>
//           <CardTitle>{tour.name}</CardTitle>
//         </CardHeader>
//         <CardContent className='flex-grow p-0 pt-2'>
//           <p className='text-xl font-bold'>From €{tour.price.toFixed(2)}</p>
//           <p className='text-sm text-green-600 dark:text-green-400'>
//             Your Commission: {tour.commissionRate * 100}% (€
//             {(tour.price * tour.commissionRate).toFixed(2)})
//           </p>
//         </CardContent>
//         <CardFooter className='flex flex-col gap-2 p-0 pt-4'>
//           <Button variant='outline' className='w-full'>
//             View Details
//           </Button>
//           <Button className='w-full' onClick={() => onBookClick(tour)}>
//             Quick Book
//           </Button>
//         </CardFooter>
//       </div>
//     </Card>
//   );
// };

// // Filter Panel Component (reusable in sidebar and sheet)
// const FilterPanel = ({
//   selectedFilters,
//   onFilterChange
// }: {
//   selectedFilters: Record<string, string[]>;
//   onFilterChange: (
//     groupId: string,
//     option: string,
//     checked: boolean | 'indeterminate'
//   ) => void;
// }) => (
//   <div className='space-y-6'>
//     {filterConfig.map((group) => (
//       <div key={group.id}>
//         <h3 className='mb-2 text-lg font-semibold'>{group.name}</h3>
//         <div className='space-y-2'>
//           {group.options.map((option) => (
//             <div key={option} className='flex items-center space-x-2'>
//               <Checkbox
//                 id={`${group.id}-${option}`}
//                 checked={selectedFilters[group.id]?.includes(option) ?? false}
//                 onCheckedChange={(checked) =>
//                   onFilterChange(group.id, option, checked)
//                 }
//               />
//               <Label
//                 htmlFor={`${group.id}-${option}`}
//                 className='cursor-pointer font-normal'
//               >
//                 {option}
//               </Label>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // --- Main Component ---
// export function TourCatalogPage() {
//   const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [selectedFilters, setSelectedFilters] = React.useState<
//     Record<string, string[]>
//   >({});
//   const [bookingTour, setBookingTour] = React.useState<Tour | null>(null);

//   const handleFilterChange = (
//     groupId: string,
//     option: string,
//     checked: boolean | 'indeterminate'
//   ) => {
//     setSelectedFilters((prev) => {
//       const currentGroupFilters = prev[groupId] ? [...prev[groupId]] : [];
//       if (checked)
//         return { ...prev, [groupId]: [...currentGroupFilters, option] };
//       return {
//         ...prev,
//         [groupId]: currentGroupFilters.filter((item) => item !== option)
//       };
//     });
//   };

//   const filteredTours = React.useMemo(() => {
//     return tours.filter((tour) => {
//       const searchMatch = tour.name
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       const filterMatch = Object.entries(selectedFilters).every(
//         ([groupId, options]) => {
//           if (!options || options.length === 0) return true;
//           return options.includes(tour[groupId as keyof Tour] as string);
//         }
//       );
//       return searchMatch && filterMatch;
//     });
//   }, [searchQuery, selectedFilters]);

//   const handleOpenBookingDialog = (tour: Tour) => {
//     setBookingTour(tour);
//   };

//   const handleCloseBookingDialog = () => {
//     setBookingTour(null);
//   };

//   return (
//     <div className='p-4 md:p-6 lg:p-8'>
//       <header className='mb-6'>
//         <h1 className='text-3xl font-bold tracking-tight'>Tour Catalog</h1>
//         <div className='text-muted-foreground'>
//           Browse, filter, and book from our curated list of tours.
//         </div>
//       </header>

//       {/* **FIXED** Main Layout Container */}
//       <div className='flex flex-col lg:flex-row lg:gap-8'>
//         {/* Desktop Filter Sidebar */}
//         <aside className='hidden w-full flex-shrink-0 lg:block lg:w-64 xl:w-72'>
//           <div className='sticky top-20'>
//             {' '}
//             {/* Makes sidebar stick on scroll */}
//             <h2 className='mb-4 text-xl font-bold'>Filters</h2>
//             <FilterPanel
//               selectedFilters={selectedFilters}
//               onFilterChange={handleFilterChange}
//             />
//           </div>
//         </aside>

//         {/* **FIXED** Main Content Area */}
//         <main className='min-w-0 flex-1'>
//           {/* Search and View Toggles Bar */}
//           <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
//             <div className='relative min-w-[200px] flex-grow'>
//               <Search className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
//               <Input
//                 placeholder='Search by tour name...'
//                 className='pl-10'
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className='flex flex-shrink-0 items-center gap-2'>
//               {/* Mobile Filter Trigger */}
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant='outline' className='lg:hidden'>
//                     <FilterIcon className='mr-2 h-4 w-4' /> Filters
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent className='w-full max-w-sm'>
//                   <SheetHeader>
//                     <SheetTitle>Filters</SheetTitle>
//                   </SheetHeader>
//                   <div className='py-4'>
//                     <FilterPanel
//                       selectedFilters={selectedFilters}
//                       onFilterChange={handleFilterChange}
//                     />
//                   </div>
//                 </SheetContent>
//               </Sheet>
//               {/* View Mode Toggles */}
//               <div className='hidden gap-1 sm:flex'>
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'outline'}
//                   size='icon'
//                   onClick={() => setViewMode('grid')}
//                   aria-label='Grid View'
//                 >
//                   <LayoutGrid className='h-4 w-4' />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'outline'}
//                   size='icon'
//                   onClick={() => setViewMode('list')}
//                   aria-label='List View'
//                 >
//                   <List className='h-4 w-4' />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Tour Results */}
//           {filteredTours.length > 0 ? (
//             <div
//               className={cn(
//                 'grid gap-6',
//                 viewMode === 'grid'
//                   ? 'grid-cols-1 md:grid-cols-2'
//                   : 'grid-cols-1'
//               )}
//             >
//               {filteredTours.map((tour) => (
//                 <TourCard
//                   key={tour.id}
//                   tour={tour}
//                   viewMode={viewMode}
//                   onBookClick={handleOpenBookingDialog}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className='text-muted-foreground rounded-lg border-2 border-dashed py-16 text-center'>
//               <p className='text-lg font-semibold'>No Tours Found</p>
//               <p>Try adjusting your search or filters.</p>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* **RENDER THE DIALOG AT THE END** */}
//       {bookingTour && (
//         <BookingDialog
//           tour={bookingTour}
//           isOpen={!!bookingTour}
//           onOpenChange={(isOpen) => {
//             if (!isOpen) {
//               handleCloseBookingDialog();
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// }









// ##############################################################################################



'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  LayoutGrid,
  List,
  Search,
  Filter as FilterIcon,
  MapPin,
  Clock,
  Tag,
  ArrowLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { BookingDialog } from './BookingDialog';

// --- Mock Data & Types (No changes) ---
type TourCategory = 'Boat Trips' | 'Land Tours' | 'Cultural';
type TourDuration = 'Half Day' | 'Full Day';
type TourLocation = 'Gozo' | 'Valletta' | 'Sliema' | 'Mdina';

interface Tour {
  id: string;
  name: string;
  price: number;
  commissionRate: number;
  images: string[];
  description: string;
  category: TourCategory;
  duration: TourDuration;
  location: TourLocation;
}

export const tours: Tour[] = [
    {
    id: '1',
    name: 'Gozo Jeep Safari',
    price: 75,
    commissionRate: 0.15,
    images: [
      'https://picsum.photos/seed/jeep/1200/800',
      'https://picsum.photos/seed/gozo-cliffs/1200/800',
      'https://picsum.photos/seed/jeep-group/1200/800'
    ],
    description:
      'Explore the rugged landscapes of Gozo in a thrilling 4x4 Jeep safari. Discover hidden gems, breathtaking cliffs, and secluded bays that are inaccessible to standard tour buses. A delicious traditional lunch is included. This journey takes you off the beaten path to witness the raw beauty of the island. Our experienced drivers are also your guides, sharing fascinating stories and historical facts throughout the day. The safari includes multiple stops for photos, a refreshing swim stop in a secluded bay (weather permitting), and a full-course traditional Gozitan lunch with local wine. It\'s an action-packed day perfect for adventurous travelers of all ages.',
    category: 'Land Tours',
    duration: 'Full Day',
    location: 'Gozo'
  },
   {
    id: '2',
    name: 'Comino Blue Lagoon Cruise',
    price: 30,
    commissionRate: 0.15,
    images: [
      'https://picsum.photos/seed/lagoon/1200/800',
      'https://picsum.photos/seed/boat-deck/1200/800',
      'https://picsum.photos/seed/crystal-water/1200/800'
    ],
    description:
      'Sail away to the famous Blue Lagoon in Comino. Spend the day swimming, snorkeling, and sunbathing in the crystal-clear turquoise waters. Our modern catamaran features an open bar and onboard facilities for your comfort.',
    category: 'Boat Trips',
    duration: 'Full Day',
    location: 'Sliema'
  },
  {
    id: '3',
    name: 'Valletta Walking Tour',
    price: 20,
    commissionRate: 0.15,
    images: [
      'https://picsum.photos/seed/valletta/1200/800',
      'https://picsum.photos/seed/valletta-streets/1200/800',
      'https://picsum.photos/seed/st-johns/1200/800'
    ],
    description:
      "Step back in time with a guided walking tour of Malta's capital, Valletta. A UNESCO World Heritage site, you'll visit St. John's Co-Cathedral, the Upper Barrakka Gardens, and learn the rich history of the Knights of St. John.",
    category: 'Cultural',
    duration: 'Half Day',
    location: 'Valletta'
  },
  {
    id: '4',
    name: 'Mdina Ghost Tour',
    price: 35,
    commissionRate: 0.2,
    images: [
      'https://picsum.photos/seed/mdina/1200/800',
      'https://picsum.photos/seed/mdina-night/1200/800',
      'https://picsum.photos/seed/dark-alley/1200/800'
    ],
    description:
      "Experience the 'Silent City' of Mdina after dark. A licensed guide will lead you through the lamp-lit streets, recounting chilling ghost stories, historical legends, and unsolved mysteries of this ancient city.",
    category: 'Cultural',
    duration: 'Half Day',
    location: 'Mdina'
  },
  {
    id: '5',
    name: 'Three Cities Harbour Tour',
    price: 25,
    commissionRate: 0.15,
    images: [
      'https://picsum.photos/seed/harbour/1200/800',
      'https://picsum.photos/seed/three-cities/1200/800',
      'https://picsum.photos/seed/dghajsa/1200/800'
    ],
    description:
      "Discover the historical area of the Three Cities (Vittoriosa, Cospicua & Senglea) from the water. This tour of the Grand Harbour provides a unique perspective on Malta's maritime fortifications and history.",
    category: 'Boat Trips',
    duration: 'Half Day',
    location: 'Sliema'
  },
  {
    id: '6',
    name: 'Gozo & Comino Ferry',
    price: 45,
    commissionRate: 0.15,
    images: [
      'https://picsum.photos/seed/ferry/1200/800',
      'https://picsum.photos/seed/ferry-view/1200/800',
      'https://picsum.photos/seed/comino-caves/1200/800'
    ],
    description:
      'The perfect combination trip. Explore the island of Gozo at your own pace and then cool off with a swim stop at the beautiful Blue Lagoon in Comino. Includes ferry transport and an open-top bus ticket for Gozo.',
    category: 'Boat Trips',
    duration: 'Full Day',
    location: 'Gozo'
  }
];

const filterConfig = [
  {
    id: 'category',
    name: 'Category',
    options: ['Boat Trips', 'Land Tours', 'Cultural'] as TourCategory[]
  },
  {
    id: 'duration',
    name: 'Duration',
    options: ['Half Day', 'Full Day'] as TourDuration[]
  },
  {
    id: 'location',
    name: 'Location',
    options: ['Gozo', 'Valletta', 'Sliema', 'Mdina'] as TourLocation[]
  }
];

// --- Tour Detail Component (No changes) ---
const TourDetail = ({ tour, handleOpenBookingDialog }: { tour: Tour, handleOpenBookingDialog: (tour: Tour) => void }) => {
  return (
    <div className='flex flex-col gap-6'>
      <Carousel className='w-full overflow-hidden rounded-lg'>
        <CarouselContent>
          {tour.images.map((img, index) => (
            <CarouselItem key={index}>
              <div className='relative aspect-video w-full'>
                <Image
                  src={img}
                  alt={`${tour.name} - Image ${index + 1}`}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-md'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-2' />
        <CarouselNext className='right-2' />
      </Carousel>

      <div className='flex flex-col gap-4 px-1'>
        <h2 className='text-4xl font-extrabold tracking-tight'>{tour.name}</h2>
        <p className='text-lg text-muted-foreground'>{tour.description}</p>
        <Separator className='my-4' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <div className='flex items-start gap-3'>
            <Tag className='mt-1 h-5 w-5 flex-shrink-0 text-primary' />
            <div>
              <p className='font-semibold'>Category</p>
              <p className='text-muted-foreground'>{tour.category}</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <Clock className='mt-1 h-5 w-5 flex-shrink-0 text-primary' />
            <div>
              <p className='font-semibold'>Duration</p>
              <p className='text-muted-foreground'>{tour.duration}</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <MapPin className='mt-1 h-5 w-5 flex-shrink-0 text-primary' />
            <div>
              <p className='font-semibold'>Location</p>
              <p className='text-muted-foreground'>{tour.location}</p>
            </div>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <div className='text-center sm:text-left'>
            <p className='text-sm text-muted-foreground'>Starting from</p>
            <p className='text-4xl font-bold'>€{tour.price.toFixed(2)}</p>
          </div>
          <Button size='lg' className='w-full sm:w-auto' onClick={() => handleOpenBookingDialog(tour)}>
            Book This Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- TourDetailView Component (No changes) ---
const TourDetailView = ({
  tour,
  onBackClick,
  handleOpenBookingDialog
}: {
  tour: Tour;
  onBackClick: () => void;
  handleOpenBookingDialog: (tour: Tour) => void;
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Button variant='ghost' onClick={onBackClick} className='mb-4'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Catalog
        </Button>
      </div>
      <Card>
        <CardContent className='p-6'>
          <TourDetail tour={tour} handleOpenBookingDialog={handleOpenBookingDialog}/>
        </CardContent>
      </Card>
    </div>
  );
};


// --- Tour Card Component (UPDATED with smaller image) ---
const TourCard = ({
  tour,
  viewMode,
  onBookClick,
  onViewDetailsClick
}: {
  tour: Tour;
  viewMode: 'grid' | 'list';
  onBookClick: (tour: Tour) => void;
  onViewDetailsClick: (tour: Tour) => void;
}) => {
  const isList = viewMode === 'list';
  return (
    <Card
      className={cn(
        'overflow-hidden transition-all',
        isList ? 'flex flex-col sm:flex-row' : 'flex h-full flex-col'
      )}
    >
      {/* Image container with updated class logic */}
      <div
        className={cn(
          'relative bg-muted',
          // For list view, use a fixed-width container that doesn't shrink
          isList
            ? 'flex-shrink-0 sm:w-48 md:w-56'
            // For grid view, use a fixed height to make the image smaller
            : 'w-full h-40' // <-- THIS IS THE CHANGE
        )}
      >
        <Image
          src={tour.images[0]}
          alt={tour.name}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className='flex flex-1 flex-col p-4'>
        <CardHeader className='p-0'>
          <CardTitle>{tour.name}</CardTitle>
        </CardHeader>
        <CardContent className='flex-grow p-0 pt-2'>
          <p className='text-muted-foreground mb-2 text-sm line-clamp-2'>
            {tour.description}
          </p>
          <p className='text-xl font-bold'>From €{tour.price.toFixed(2)}</p>
          <p className='text-sm text-green-600 dark:text-green-400'>
            Your Commission: {tour.commissionRate * 100}% (€
            {(tour.price * tour.commissionRate).toFixed(2)})
          </p>
        </CardContent>
        <CardFooter className='flex flex-col gap-2 p-0 pt-4'>
          <Button
            variant='outline'
            className='w-full'
            onClick={() => onViewDetailsClick(tour)}
          >
            View Details
          </Button>
          <Button className='w-full' onClick={() => onBookClick(tour)}>
            Quick Book
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};


// --- FilterPanel and TourCatalogPage (No Changes) ---
const FilterPanel = ({
  selectedFilters,
  onFilterChange
}: {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (
    groupId: string,
    option: string,
    checked: boolean | 'indeterminate'
  ) => void;
}) => (
  <div className='space-y-6'>
    {filterConfig.map((group) => (
      <div key={group.id}>
        <h3 className='mb-2 text-lg font-semibold'>{group.name}</h3>
        <div className='space-y-2'>
          {group.options.map((option) => (
            <div key={option} className='flex items-center space-x-2'>
              <Checkbox
                id={`${group.id}-${option}`}
                checked={selectedFilters[group.id]?.includes(option) ?? false}
                onCheckedChange={(checked) =>
                  onFilterChange(group.id, option, checked)
                }
              />
              <Label
                htmlFor={`${group.id}-${option}`}
                className='cursor-pointer font-normal'
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export function TourCatalogPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({});
  const [bookingTour, setBookingTour] = React.useState<Tour | null>(null);
  const [detailedTour, setDetailedTour] = React.useState<Tour | null>(null);

  const handleFilterChange = (
    groupId: string,
    option: string,
    checked: boolean | 'indeterminate'
  ) => {
    setSelectedFilters((prev) => {
      const currentGroupFilters = prev[groupId] ? [...prev[groupId]] : [];
      if (checked)
        return { ...prev, [groupId]: [...currentGroupFilters, option] };
      return {
        ...prev,
        [groupId]: currentGroupFilters.filter((item) => item !== option)
      };
    });
  };

  const filteredTours = React.useMemo(() => {
    return tours.filter((tour) => {
      const searchMatch = tour.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const filterMatch = Object.entries(selectedFilters).every(
        ([groupId, options]) => {
          if (!options || options.length === 0) return true;
          return options.includes(tour[groupId as keyof Tour] as string);
        }
      );
      return searchMatch && filterMatch;
    });
  }, [searchQuery, selectedFilters]);

  const handleOpenBookingDialog = (tour: Tour) => setBookingTour(tour);
  const handleCloseBookingDialog = () => setBookingTour(null);
  const handleViewDetails = (tour: Tour) => setDetailedTour(tour);
  const handleBackToCatalog = () => setDetailedTour(null);

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <header className='mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Tour Catalog</h1>
        <div className='text-muted-foreground'>
          Browse, filter, and book from our curated list of tours.
        </div>
      </header>

      <div className='flex flex-col lg:flex-row lg:gap-8'>
        {!detailedTour && (
           <aside className='hidden w-full flex-shrink-0 lg:block lg:w-64 xl:w-72'>
            <div className='sticky top-20'>
              <h2 className='mb-4 text-xl font-bold'>Filters</h2>
              <FilterPanel
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>
        )}
       
        <main className='min-w-0 flex-1'>
          {detailedTour ? (
            <TourDetailView
              tour={detailedTour}
              onBackClick={handleBackToCatalog}
              handleOpenBookingDialog={handleOpenBookingDialog}
              
            />
          ) : (
            <>
              <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
                <div className='relative min-w-[200px] flex-grow'>
                  <Search className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                  <Input
                    placeholder='Search by tour name...'
                    className='pl-10'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className='flex flex-shrink-0 items-center gap-2'>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant='outline' className='lg:hidden'>
                        <FilterIcon className='mr-2 h-4 w-4' /> Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent className='w-full max-w-sm'>
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className='py-4'>
                        <FilterPanel
                          selectedFilters={selectedFilters}
                          onFilterChange={handleFilterChange}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className='hidden gap-1 sm:flex'>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size='icon'
                      onClick={() => setViewMode('grid')}
                      aria-label='Grid View'
                    >
                      <LayoutGrid className='h-4 w-4' />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size='icon'
                      onClick={() => setViewMode('list')}
                      aria-label='List View'
                    >
                      <List className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
              {filteredTours.length > 0 ? (
                <div
                  className={cn(
                    'grid gap-6',
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1'
                  )}
                >
                  {filteredTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      viewMode={viewMode}
                      onBookClick={handleOpenBookingDialog}
                      onViewDetailsClick={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className='text-muted-foreground rounded-lg border-2 border-dashed py-16 text-center'>
                  <p className='text-lg font-semibold'>No Tours Found</p>
                  <p>Try adjusting your search or filters.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {bookingTour && (
        <BookingDialog
          tour={bookingTour}
          isOpen={!!bookingTour}
          onOpenChange={(isOpen) => {
            if (!isOpen) handleCloseBookingDialog();
          }}
        />
      )}
    </div>
  );
}
