import type { Metadata, Viewport } from 'next';
import './globals.css';
import './vengeance.css';
import './experience.css';
import './light-flow.css';
import {branches, gagan} from '@/lib/branches';
const origin = 'https://club91-gyms-gagan-fitness.ashlurk367.chatgpt.site';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: 'Club 91 Gyms by Gagan Fitness | Gian Sager, SVIET, Zirakpur & Rajpura',
  description: 'Train beyond ordinary. Discover Club 91 Gyms at Gian Sager Medical College, SVIET Campus and Ram Lila Ground in Baltana, Zirakpur. Discover the upcoming Kanika Garden flagship in Rajpura with fitness, luxury wellness, premium lifestyle facilities and HYROX training.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Club 91 Gyms — Where Limits Don’t Exist', description: 'Train. Transform. Belong. A new chapter in Rajpura.', images: [{url:'/images/flagship.webp',width:1500,height:1000}], type:'website',locale:'en_IN' },
  twitter: { card:'summary_large_image' },
  icons: { icon:'/images/logo.webp' },
  robots: { index:false,follow:false }
};
export const viewport: Viewport = { themeColor: '#0a0a0a' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  const schema = { '@context':'https://schema.org', '@type':'Organization', name:'Club 91 Gyms by Gagan Fitness',url:origin,logo:`${origin}/images/logo.webp`,telephone:'+'+gagan.phone,sameAs:['https://www.instagram.com/gagan_fitnesss/'],department:branches.map(branch => ({
    '@type':'ExerciseGym', name:'Club 91 Gyms — '+branch.name+(branch.upcoming?' (opening soon)':''),
    address:branch.address, telephone:'+'+branch.contact.phone,
  })) };
  return <html lang="en"><head><link rel="preload" href="/fonts/bebas.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} /></body></html>;
}
