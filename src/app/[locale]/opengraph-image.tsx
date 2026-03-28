import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Calmika — Autism-friendly educational app';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 'bold',
            marginBottom: 24,
            letterSpacing: '-2px',
          }}
        >
          ✨ Calmika
        </div>
        <div
          style={{
            fontSize: 34,
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Autism-friendly educational app for children
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.7,
            marginTop: 20,
            letterSpacing: '1px',
          }}
        >
          AAC • Visual Schedules • Music Therapy • 30+ Modules
        </div>
      </div>
    ),
    { ...size }
  );
}
