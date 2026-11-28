import { ArrowUpRight, MapPin } from 'lucide-react';
import type { branches } from '@/lib/branches';
import './branch-map.css';

type Club = (typeof branches)[number];

export default function BranchMap({ club }: { club: Club }) {
  const searchUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(club.address);
  return (
    <div className="branch-map">
      {club.mapUrl && (
        <iframe
          key={club.mapUrl}
          className="branch-map-preview"
          src={club.mapUrl + '&output=embed'}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          title={club.name + ' location preview'}
        />
      )}
      <a className="branch-map-link" href={club.mapUrl ?? searchUrl} target="_blank" rel="noreferrer"
        aria-label={`${club.mapUrl ? 'Open' : 'Search for'} ${club.name} in Google Maps`}>
        <MapPin size={21} aria-hidden="true"/>
        <span>
          <small>{club.mapUrl ? 'View location on Google Maps' : 'Search Google Maps'}</small>
          <strong>{club.address}</strong>
        </span>
        <ArrowUpRight className="map-arrow" aria-hidden="true" size={21}/>
      </a>
    </div>
  );
}
