'use client';

import * as React from 'react';
import { Copy, QrCode, Download, Eye, Share2, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// --- Mock Data & Types ---
interface Tour {
  id: string;
  name: string;
  slug: string;
}

interface PromoMaterial {
  id: string;
  name: string;
  type: 'PDF' | 'Poster' | 'ZIP';
  size: string;
  previewUrl: string;
  downloadUrl: string;
}

const resellerId = 'abc-hotel';
const baseUrl = 'https://maltaxplore.com.mt';

const tours: Tour[] = [
  { id: '1', name: 'Gozo Jeep Safari', slug: 'gozo-jeep-safari' },
  { id: '2', name: 'Comino Blue Lagoon Cruise', slug: 'comino-cruise' },
  { id: '3', name: 'Valletta Walking Tour', slug: 'valletta-walk' },
  { id: '4', name: 'Mdina Ghost Tour', slug: 'mdina-ghost-tour' }
];

const promoMaterials: PromoMaterial[] = [
  {
    id: 'p1',
    name: 'Gozo Jeep Safari Flyer',
    type: 'PDF',
    size: 'A5',
    previewUrl: '#',
    downloadUrl: '#'
  },
  {
    id: 'p2',
    name: 'Comino Cruise Poster',
    type: 'Poster',
    size: 'A4',
    previewUrl: '#',
    downloadUrl: '#'
  },
  {
    id: 'p3',
    name: 'Social Media Banner Pack',
    type: 'ZIP',
    size: '15MB',
    previewUrl: '#',
    downloadUrl: '#'
  }
];

// --- The Main Component ---
export function MarketingPage() {
  const [selectedTourId, setSelectedTourId] = React.useState<string>(
    tours[0].id
  );
  const [whatsAppMessage, setWhatsAppMessage] = React.useState<string>('');

  const generalQrRef = React.useRef<SVGSVGElement>(null);
  const specificQrRef = React.useRef<SVGSVGElement>(null);

  const selectedTour = tours.find((t) => t.id === selectedTourId) || tours[0];
  const generalLink = `${baseUrl}/ref/${resellerId}`;
  const specificTourLink = `${baseUrl}/ref/${resellerId}/${selectedTour.slug}`;

  React.useEffect(() => {
    const message = `Hey! Check out this amazing "${selectedTour.name}" in Malta. You can get more details and book it directly here: ${specificTourLink}`;
    setWhatsAppMessage(message);
  }, [selectedTour, specificTourLink]);

  const handleCopy = (textToCopy: string, successMessage: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast.success(successMessage);
  };

  const triggerDownload = (url: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadQR = (
    qrRef: React.RefObject<SVGSVGElement | null>,
    format: 'svg' | 'png',
    fileName: string
  ) => {
    const svgElement = qrRef.current;
    if (!svgElement) {
      toast.error('QR Code element not found. Please try again.');
      return;
    }

    if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${fileName}.svg`);
      URL.revokeObjectURL(url);
      toast.success('SVG downloaded!');
    } else {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        const scaleFactor = 2;
        canvas.width = svgElement.width.baseVal.value * scaleFactor;
        canvas.height = svgElement.height.baseVal.value * scaleFactor;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        triggerDownload(pngUrl, `${fileName}.png`);
        toast.success('PNG downloaded!');
      };
      img.src =
        'data:image/svg+xml;base64,' +
        btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  const handlePreviewMaterial = (materialName: string) =>
    toast.info(`Generating preview for ${materialName}...`);
  const handleDownloadMaterial = (materialName: string) =>
    toast.success(`Downloading ${materialName}...`);

  return (
    <div className='mx-auto max-w-7xl space-y-8 p-4 md:p-6 lg:p-8'>
      <header>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-50'>
          Marketing Tools
        </h1>
        <p className='text-muted-foreground mt-1'>
          Your central hub for links, QR codes, and materials to promote our
          tours.
        </p>
      </header>

      <main className='grid gap-8 md:grid-cols-1 lg:grid-cols-2'>
        <div className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Your General Affiliate Link</CardTitle>
              <CardDescription>
                Share this to direct customers to our homepage. Any booking will
                be credited to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-stretch gap-2 sm:flex-row sm:items-center'>
                <Input
                  value={generalLink}
                  readOnly
                  className='flex-grow text-sm'
                />
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    className='w-full sm:w-auto'
                    onClick={() =>
                      handleCopy(generalLink, 'General link copied!')
                    }
                  >
                    <Copy className='mr-2 h-4 w-4' />
                    <span className='hidden sm:inline'>Copy Link</span>
                    <span className='sm:hidden'>Copy</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        className='flex-shrink-0'
                      >
                        <QrCode className='h-4 w-4' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md'>
                      <DialogHeader>
                        <DialogTitle>General Link QR Code</DialogTitle>
                        <DialogDescription>
                          For posters, signs, or digital displays.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='flex flex-col items-center justify-center space-y-4 py-4'>
                        <QRCodeSVG
                          ref={generalQrRef}
                          value={generalLink}
                          size={224}
                          bgColor={'#ffffff'}
                          fgColor={'#000000'}
                          level={'L'}
                          includeMargin={true}
                        />
                        <p className='text-muted-foreground px-4 text-center text-sm break-all'>
                          {generalLink}
                        </p>
                      </div>
                      <div className='flex justify-center gap-2'>
                        <Button
                          variant='secondary'
                          onClick={() =>
                            handleDownloadQR(
                              generalQrRef,
                              'png',
                              'general-affiliate-qr'
                            )
                          }
                        >
                          <Download className='mr-2 h-4 w-4' /> PNG
                        </Button>
                        <Button
                          variant='secondary'
                          onClick={() =>
                            handleDownloadQR(
                              generalQrRef,
                              'svg',
                              'general-affiliate-qr'
                            )
                          }
                        >
                          <Download className='mr-2 h-4 w-4' /> SVG
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate a Link for a Specific Tour</CardTitle>
              <CardDescription>
                Create a direct link to a specific tour page for targeted
                promotions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={setSelectedTourId}
                defaultValue={selectedTourId}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a tour' />
                </SelectTrigger>
                <SelectContent>
                  {tours.map((tour) => (
                    <SelectItem key={tour.id} value={tour.id}>
                      {tour.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter className='flex flex-col items-stretch gap-2 bg-slate-50 p-4 sm:flex-row sm:items-center dark:bg-slate-800/50'>
              <Input
                value={specificTourLink}
                readOnly
                className='flex-grow bg-white text-sm dark:bg-slate-900'
              />
              <div className='flex items-center gap-2'>
                <Button
                  className='w-full sm:w-auto'
                  onClick={() =>
                    handleCopy(specificTourLink, 'Tour link copied!')
                  }
                >
                  <Copy className='mr-2 h-4 w-4' /> Copy
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='secondary' className='w-full sm:w-auto'>
                      <QrCode className='mr-2 h-4 w-4' />
                      <span className='hidden md:inline'>View/Download </span>QR
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>{selectedTour.name} QR Code</DialogTitle>
                      <DialogDescription>
                        Directs customers to the tour page.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col items-center justify-center space-y-4 py-4'>
                      <QRCodeSVG
                        ref={specificQrRef}
                        value={specificTourLink}
                        size={224}
                        bgColor={'#ffffff'}
                        fgColor={'#000000'}
                        level={'L'}
                        includeMargin={true}
                      />
                      <p className='text-muted-foreground px-4 text-center text-sm break-all'>
                        {specificTourLink}
                      </p>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <Button
                        variant='secondary'
                        onClick={() =>
                          handleDownloadQR(
                            specificQrRef,
                            'png',
                            `${selectedTour.slug}-qr`
                          )
                        }
                      >
                        <Download className='mr-2 h-4 w-4' /> PNG
                      </Button>
                      <Button
                        variant='secondary'
                        onClick={() =>
                          handleDownloadQR(
                            specificQrRef,
                            'svg',
                            `${selectedTour.slug}-qr`
                          )
                        }
                      >
                        <Download className='mr-2 h-4 w-4' /> SVG
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className='space-y-8'>
          <Card className='flex flex-col'>
            <CardHeader>
              <CardTitle>Share via WhatsApp</CardTitle>
              <CardDescription>
                Quickly share a pre-written message for the selected tour.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <div className='relative'>
                <p className='bg-muted text-muted-foreground h-32 overflow-y-auto rounded-md border p-4 text-sm'>
                  {whatsAppMessage}
                </p>
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute top-2 right-2 h-8 w-8'
                  onClick={() => handleCopy(whatsAppMessage, 'Message copied!')}
                >
                  <Copy className='h-4 w-4' />
                  <span className='sr-only'>Copy Message</span>
                </Button>
              </div>
            </CardContent>
            {/* RESPONSIVE DESIGN */}
            <CardFooter className='flex gap-2'>
              <Button
                className='flex-1'
                onClick={() => handleCopy(whatsAppMessage, 'Message copied!')}
              >
                <Copy className='mr-2 h-4 w-4' />
                <span className='hidden sm:inline'>Copy Text</span>
                <span className='sm:hidden'>Copy</span>
              </Button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1'
              >
                <Button
                  variant='secondary'
                  className='w-full bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/80'
                >
                  <Smartphone className='mr-2 h-4 w-4' />
                  <span className='hidden sm:inline'>Share on WhatsApp</span>
                  <span className='sm:hidden'>Share</span>
                </Button>
              </a>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotional Materials</CardTitle>
              <CardDescription>
                Download ready-to-use flyers and posters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* This container ensures the table can be scrolled horizontally on small screens */}
              <div className='overflow-x-auto rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='whitespace-nowrap'>
                        Material
                      </TableHead>
                      <TableHead>Info</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promoMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className='font-medium'>
                          {material.name}
                        </TableCell>
                        <TableCell className='text-muted-foreground whitespace-nowrap'>
                          {material.type} ({material.size})
                        </TableCell>
                        <TableCell className='space-x-1 text-right'>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handlePreviewMaterial(material.name)}
                          >
                            <Eye className='h-4 w-4' />
                            <span className='sr-only'>Preview</span>
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() =>
                              handleDownloadMaterial(material.name)
                            }
                          >
                            <Download className='h-4 w-4' />
                            <span className='sr-only'>Download</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
