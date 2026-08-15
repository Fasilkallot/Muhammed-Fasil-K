import './globals.css';

export const metadata = {
  title: 'Muhammed Fasil K — Software Developer | Unity & Performance Engineer',
  description:
    'Portfolio of Muhammed Fasil K — Software Developer with 3+ years of experience shipping optimized, production-ready mobile applications. Specializing in Unity, performance optimization, cross-platform development (Android, iOS, WebGL, VR), and scalable game systems.',
  keywords: [
    'Software Developer',
    'Unity Developer',
    'Performance Engineer',
    'Game Developer',
    'WebGL',
    'VR',
    'Mobile Games',
    'C#',
    'Abu Dhabi',
    'Blender',
    'DOTween',
    'Firebase',
    'AWS',
    'Meta Quest',
    'Android',
    'iOS',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="scanlines" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
