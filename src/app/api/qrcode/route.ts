import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';


// Dummy auth check (replace with your real auth logic)
function isAuthorized(req: NextRequest, resellerId: string): boolean {
  // TODO: Implement real authentication/authorization logic
  return true;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resellerId = searchParams.get('reseller');
  const tourId = searchParams.get('tour');
  const format = searchParams.get('format') || 'svg';

  if (!resellerId) {
    return NextResponse.json({ error: 'Missing reseller ID' }, { status: 400 });
  }

  // Security: check authorization
  if (!isAuthorized(req, resellerId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Build the target URL
  let targetUrl = `https://maltaxplore.com/track?reseller=${encodeURIComponent(resellerId)}`;
  if (tourId) {
    targetUrl += `&tour=${encodeURIComponent(tourId)}`;
  }
  // Add a unique UUID to ensure uniqueness
  const uniqueId = uuidv4();
  targetUrl += `&uuid=${uniqueId}`;

  try {
    if (format === 'png') {
      // Generate QR code as PNG (base64 data URL)
      const dataUrl = await QRCode.toDataURL(targetUrl, { type: 'image/png' });
      // Convert base64 to buffer
      const base64 = dataUrl.split(',')[1];
      const buffer = Buffer.from(base64, 'base64');
      return new NextResponse(buffer, {
        status: 200,
        headers: { 'Content-Type': 'image/png' },
      });
    } else {
      // Default: SVG
      const svg = await QRCode.toString(targetUrl, { type: 'svg' });
      return new NextResponse(svg, {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
      });
    }
  } catch (err) {
    return NextResponse.json({ error: 'QR code generation failed' }, { status: 500 });
  }
} 