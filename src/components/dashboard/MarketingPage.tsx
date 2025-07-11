'use client';

import * as React from 'react';
import { Copy, QrCode, Download, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
// import { QRCodeSVG } from 'qrcode.react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

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
import { Label } from '../ui/label';
import { Modal } from '@/components/ui/modal';

// --- Mock Data & Types
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
// we can use unique userID/SellerID here
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

// Helper to get affiliate link for a tour
const getAffiliateLink = (resellerId: string, tourSlug: string) => {
  return `${baseUrl}/ref/${resellerId}/${tourSlug}`;
};

// Helper to get backend QR code SVG URL for a tour
const getTourQrSvgUrl = (resellerId: string, tourId: string) => {
  return `/api/qrcode?reseller=${encodeURIComponent(resellerId)}&tour=${encodeURIComponent(tourId)}&format=svg&t=${Date.now()}`;
};

// --- The Main Component ---
export function MarketingPage() {
  const [selectedTourId, setSelectedTourId] = React.useState<string>(
    tours[0].id
  );
  const [whatsAppMessage, setWhatsAppMessage] = React.useState<string>('');
  const [qrSrc, setQrSrc] = React.useState<string>('');
  const resellerId = 'abc-hotel';

  // Generate a new QR code URL (forces unique QR code by adding a timestamp param)
  const generateQrSrc = React.useCallback(() => {
    setQrSrc(`/api/qrcode?reseller=${encodeURIComponent(resellerId)}&t=${Date.now()}`);
  }, [resellerId]);

  React.useEffect(() => {
    generateQrSrc();
  }, [generateQrSrc]);

  // For Advanced: Promote Specific Tours section
  const selectedTour = tours.find((t) => t.id === selectedTourId) || tours[0];
  const specificTourLink = getAffiliateLink(resellerId, selectedTour.slug);
  const [tourQrTimestamp, setTourQrTimestamp] = React.useState<number>(Date.now());
  const specificTourQrSvgUrl = getTourQrSvgUrl(resellerId, selectedTourId) + `&ts=${tourQrTimestamp}`;

  // helper function
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

  // Remove generalQrRef and QRCodeSVG usage
  // Update handleDownloadQR to download from qrSrc
  const handleDownloadQR = (format: 'svg' | 'png', fileName: string) => {
    if (!qrSrc) {
      toast.error('QR Code not loaded. Please try again.');
      return;
    }
    // Fetch the QR code image and trigger download
    fetch(qrSrc)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`${format.toUpperCase()} downloaded!`);
      })
      .catch(() => toast.error('Failed to download QR code.'));
  };

  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewMaterial, setPreviewMaterial] = React.useState<DynamicPromoMaterial | null>(null);
  const [previewSvg, setPreviewSvg] = React.useState<string>('');
  const [previewLoading, setPreviewLoading] = React.useState(false);
  const [previewError, setPreviewError] = React.useState<string | null>(null);
  const [lastPreviewedMaterial, setLastPreviewedMaterial] = React.useState<string | null>(null);
  const [lastPreviewedSvg, setLastPreviewedSvg] = React.useState<string>('');

  const handlePreviewMaterial = async (materialName: string, downloadUrl: string) => {
    setPreviewOpen(true);
    setPreviewMaterial(dynamicPromoMaterials.find(m => m.name === materialName) || null);
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewSvg('');
    try {
      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error('Failed to fetch QR code from API.');
      const svgText = await res.text();
      if (!svgText.startsWith('<svg')) throw new Error('QR code not generated yet. Please generate it first.');
      setPreviewSvg(svgText);
      setLastPreviewedMaterial(materialName);
      setLastPreviewedSvg(svgText);
    } catch (e: any) {
      setPreviewError(e.message || 'QR code not generated yet. Please generate it first.');
    } finally {
      setPreviewLoading(false);
    }
  };

  // For Downloadable Materials section, update downloadUrl for each material
  type DynamicPromoMaterial = PromoMaterial & { downloadUrl: string };
  const dynamicPromoMaterials: DynamicPromoMaterial[] = promoMaterials.map((material) => ({
    ...material,
    downloadUrl: getTourQrSvgUrl(resellerId, selectedTourId),
  }));

  const generalLink = `${baseUrl}/ref/${resellerId}`;

  // Add per-material QR state
  const [materialQrState, setMaterialQrState] = React.useState<Record<string, {
    svg: string;
    status: 'not_generated' | 'ready' | 'error';
    error?: string;
  }>>({});

  const handleGenerateMaterialQr = async (material: DynamicPromoMaterial) => {
    setMaterialQrState(prev => ({
      ...prev,
      [material.id]: { svg: '', status: 'not_generated' }
    }));
    try {
      const res = await fetch(material.downloadUrl);
      if (!res.ok) throw new Error('Failed to fetch QR code from API.');
      const svgText = await res.text();
      if (!svgText.startsWith('<svg')) throw new Error('QR code not generated yet.');
      setMaterialQrState(prev => ({
        ...prev,
        [material.id]: { svg: svgText, status: 'ready' }
      }));
      toast.success('QR code generated!');
    } catch (e: any) {
      setMaterialQrState(prev => ({
        ...prev,
        [material.id]: { svg: '', status: 'error', error: e.message || 'Error generating QR code.' }
      }));
      toast.error(e.message || 'Error generating QR code.');
    }
  };

  const handleDownloadMaterial = (material: DynamicPromoMaterial) => {
    const qr = materialQrState[material.id];
    if (!qr || qr.status !== 'ready' || !qr.svg) {
      toast.error('Please generate the QR code first.');
      return;
    }
    try {
      const blob = new Blob([qr.svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${material.name}-tour-qr.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('QR code downloaded!');
    } catch (e) {
      toast.error('Download failed.');
    }
  };

  return (
    <div className='mx-auto max-w-7xl space-y-8 p-4 md:p-6 lg:p-8'>
      <header>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-50'>
          Marketing Tools
        </h1>
        <p className='text-muted-foreground mt-1'>
          Your hub for links and materials to promote our tours and earn
          commission.
        </p>
      </header>

      <main className='space-y-12'>
        <Card className='border-primary/20 dark:border-primary/40 bg-card not-dark:bg-rose-50/40'>
          <CardHeader>
            <CardTitle className='text-xl'>
              Your All-in-One QR Code & Link
            </CardTitle>
            <CardDescription>
              Place this QR code at your location (e.g., in your Airbnb, at the
              hotel reception). When a customer scans it and books{' '}
              <strong className='text-primary'>any tour</strong>, you'll earn a
              commission. This is your main tool.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid items-center gap-6 md:grid-cols-[200px_1fr] md:gap-8'>
            {/* QR Code (Visible by default) */}
            <div className='mx-auto flex flex-col items-center justify-center space-y-2'>
              <img
                src={qrSrc}
                alt='General Affiliate QR Code'
                width={180}
                height={180}
                style={{ background: '#fff', padding: 8, borderRadius: 8 }}
              />
              <Button
                className='not-dark:text-red-400 mt-2'
                variant='outline'
                size='sm'
                onClick={generateQrSrc}
              >
                Regenerate QR Code
              </Button>
            </div>
            {/* Link and Actions */}
            <div className='space-y-4'>
              <div className='grid gap-2'>
                <Label htmlFor='general-link'>
                  Your General Affiliate Link
                </Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='general-link'
                    value={generalLink}
                    readOnly
                    className='flex-grow text-sm'
                  />
                  <Button
                    className='not-dark:text-red-400'
                    variant='outline'
                    size='icon'
                    onClick={() =>
                      handleCopy(generalLink, 'General link copied!')
                    }
                  >
                    <Copy className='h-4 w-4' />
                    <span className='sr-only'>Copy Link</span>
                  </Button>
                </div>
              </div>
              <div className='grid gap-2'>
                <Label>Download QR Code</Label>
                <div className='flex gap-2'>
                  <Button
                    className='not-dark:text-red-400'
                    variant='outline'
                    onClick={() => handleDownloadQR('svg', 'general-affiliate-qr')}
                  >
                    <Download className='mr-2 h-4 w-4' /> SVG
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='space-y-8'>
          <h2 className='text-xl font-semibold tracking-tight'>
            Advanced: Promote Specific Tours
          </h2>
          <div className='grid gap-8 md:grid-cols-1 lg:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Generate a Link for a Specific Tour</CardTitle>
                <CardDescription>
                  Create a direct link to a single tour page for targeted
                  promotions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col md:flex-row md:items-center gap-4'>
                  <div className='flex-1'>
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
                  </div>
                  <div className='flex-shrink-0 flex flex-col items-center'>
                    <img
                      src={specificTourQrSvgUrl}
                      alt={`QR code for ${selectedTour.name}`}
                      width={120}
                      height={120}
                      style={{ background: '#fff', padding: 8, borderRadius: 8 }}
                    />
                    <Button
                      className='not-dark:text-red-400 mt-2'
                      variant='outline'
                      size='sm'
                      onClick={() => setTourQrTimestamp(Date.now())}
                    >
                      Regenerate QR
                    </Button>
                    <span className='text-xs mt-1'>Tour QR</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='bg-muted flex flex-col items-stretch gap-2 p-4 sm:flex-row sm:items-center'>
                <Input
                  value={specificTourLink}
                  readOnly
                  className='bg-card flex-grow text-sm'
                />
                <Button
                  className='not-dark:text-red-400'
                  variant='outline'
                  onClick={() =>
                    handleCopy(specificTourLink, 'Tour link copied!')
                  }
                >
                  <Copy className='mr-2 h-4 w-4' /> Copy Link
                </Button>
              </CardFooter>
            </Card>

            <Card className='flex flex-col'>
              <CardHeader>
                <CardTitle>Share via WhatsApp</CardTitle>
                <CardDescription>
                  Quickly share a message for the selected tour above.
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
                    onClick={() =>
                      handleCopy(whatsAppMessage, 'Message copied!')
                    }
                  >
                    <Copy className='h-4 w-4 not-dark:text-red-400' />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className='flex gap-2'>
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
                    <Smartphone className='mr-2 h-4 w-4' /> Share
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Promotional Materials section  */}
        <div className='space-y-8'>
          <h2 className='text-xl font-semibold tracking-tight'>
            Downloadable Materials
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Promotional Materials</CardTitle>
              <CardDescription>
                Download ready-to-use flyers and posters featuring your QR code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Info</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dynamicPromoMaterials.map((material) => {
                      const qr = materialQrState[material.id];
                      return (
                        <TableRow key={material.id}>
                          <TableCell className='font-medium'>
                            {material.name}
                          </TableCell>
                          <TableCell className='text-muted-foreground'>
                            {material.type} ({material.size})
                          </TableCell>
                          <TableCell className='space-x-1 text-right'>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleGenerateMaterialQr(material)}
                            >
                              <QrCode className='h-4 w-4 not-dark:text-red-400' />
                              <span className='sr-only'>Generate QR</span>
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleDownloadMaterial(material)}
                              disabled={!qr || qr.status !== 'ready'}
                            >
                              <Download className='h-4 w-4 not-dark:text-red-400' />
                              <span className='sr-only'>Download QR</span>
                            </Button>
                            {/* Status and preview */}
                            <div className='inline-block align-middle ml-2'>
                              {qr?.status === 'ready' && (
                                <span className='text-green-500 text-xs mr-1'>Ready</span>
                              )}
                              {qr?.status === 'error' && (
                                <span className='text-red-500 text-xs mr-1'>Error</span>
                              )}
                              {qr?.status === 'not_generated' && (
                                <span className='text-gray-400 text-xs mr-1'>Not generated</span>
                              )}
                              {qr?.svg && qr.status === 'ready' && (
                                <span className='inline-block align-middle' style={{ verticalAlign: 'middle' }}>
                                  <span dangerouslySetInnerHTML={{ __html: qr.svg }} style={{ width: 32, height: 32, display: 'inline-block' }} />
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal for QR code preview */}
        <Modal
          title={previewMaterial ? `Preview: ${previewMaterial.name}` : 'Preview'}
          description={previewMaterial ? `QR code for ${previewMaterial.name}` : ''}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        >
          {previewLoading && <div className='text-center p-4'>Loading...</div>}
          {previewError && <div className='text-center text-red-500 p-4'>{previewError}</div>}
          {!previewLoading && !previewError && previewSvg && (
            <div className='flex flex-col items-center p-4'>
              <div dangerouslySetInnerHTML={{ __html: previewSvg }} />
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
