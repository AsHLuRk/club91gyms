import type {MetadataRoute} from 'next';
export const dynamic = 'force-static';
export default function robots():MetadataRoute.Robots {return {rules:{userAgent:'*',disallow:'/'},sitemap:'https://club91-gyms-gagan-fitness.ashlurk367.chatgpt.site/sitemap.xml'};}
