import type { Metadata, Viewport } from 'next';
import './globals.css';
import './vengeance.css';
import './experience.css';
const origin = 'https://club91-gyms-gagan-fitness.ashlurk367.chatgpt.site';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: 'Club 91 Gyms by Gagan Fitness | Baltana, Zirakpur & Rajpura',
  description: 'Train beyond ordinary. Discover Club 91 Gyms in Baltana and Zirakpur, and the upcoming Rajpura flagship with training, spa, massage and a café.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Club 91 Gyms — Where Limits Don’t Exist', description: 'Three gyms. One community. A new chapter in Rajpura.', images: [{url:'/images/flagship.webp',width:1500,height:1000}], type:'website',locale:'en_IN' },
  twitter: { card:'summary_large_image' },
  icons: { icon:'/images/logo.webp' },
  robots: { index:false,follow:false }
};
export const viewport: Viewport = { themeColor: '#0a0a0a' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  const schema = { '@context':'https://schema.org', '@type':'Organization', name:'Club 91 Gyms by Gagan Fitness',url:origin,logo:`${origin}/images/logo.webp`,telephone:'+917035000071',sameAs:['https://www.instagram.com/gagan_fitnesss/'],department:[{ '@type':'ExerciseGym',name:'Club 91 Gyms — Baltana 1',address:{'@type':'PostalAddress',addressLocality:'Baltana',addressRegion:'Punjab',addressCountry:'IN'}},{'@type':'ExerciseGym',name:'Club 91 Gyms — Baltana 2',address:{'@type':'PostalAddress',addressLocality:'Baltana',addressRegion:'Punjab',addressCountry:'IN'}},{'@type':'ExerciseGym',name:'Club 91 Gyms — Zirakpur',address:{'@type':'PostalAddress',addressLocality:'Zirakpur',addressRegion:'Punjab',addressCountry:'IN'}}] };
  return <html lang="en"><head><link rel="preload" href="/fonts/bebas.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} /></body></html>;
}
