'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as Slider } from 'swiper';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css/effect-creative';
import './club-tour.css';

const stops = [
  { image: 'club-floor', title: 'The training floor', alt: 'Green turf between strength machines, illuminated mirrors and the gym mural' },
  { image: 'free-weights', title: 'Free weights', alt: 'Adjustable benches facing a mirrored wall and a full dumbbell rack' },
  { image: 'cardio-lane', title: 'The cardio lane', alt: 'Yellow indoor bikes beside the turf lane and illuminated arched mirrors' },
  { image: 'mural-platform', title: 'The lifting platform', alt: 'Barbell platform beside a floor-to-ceiling painted mural' },
  { image: 'club-seating', title: 'The seating area', alt: 'Club seating with a glass table and framed posters' },
];

export default function ClubTour() {
  const slider = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);
  const [reduced, setReduced] = useState(false);
  return (
    <section id="inside" className="tour section" aria-labelledby="tour-title">
      <div className="container tour-layout">
        <div className="tour-index">
          <h2 id="tour-title">Inside <br/>Club 91<span>.</span></h2>
          <div className="tour-stops" role="group" aria-label="Choose a gym view">
            {stops.map((stop, index) => (
              <button key={stop.image} aria-pressed={current === index} onClick={() => slider.current?.slideTo(index)}>
                {stop.title}<ArrowRight size={17}/>
              </button>
            ))}
          </div>
        </div>
        <div className="tour-browser" tabIndex={0} aria-label="Gym tour. Use the left and right arrow keys to browse." onKeyDown={event => {
          if (event.key === 'ArrowLeft') slider.current?.slidePrev();
          if (event.key === 'ArrowRight') slider.current?.slideNext();
        }}>
          <Swiper modules={[EffectCreative]} effect="creative" rewind speed={reduced ? 0 : 650}
            creativeEffect={{prev:{translate:['-25%',0,-1],scale:0.96}, next:{translate:['100%',0,0]}}}
            onSwiper={instance => { slider.current = instance; setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }}
            onSlideChange={instance => setCurrent(instance.activeIndex)}>
            {stops.map((stop, index) => <SwiperSlide key={stop.image} aria-hidden={index !== current}>
              <Image src={'/images/' + stop.image + '.webp'} alt={stop.alt} fill sizes="(max-width: 740px) 100vw, 65vw"/>
            </SwiperSlide>)}
          </Swiper>
          <div className="tour-controls">
            <span aria-live="polite">{stops[current].title}</span>
            <button aria-label="Previous gym view" onClick={() => slider.current?.slidePrev()}><ArrowLeft/></button>
            <button aria-label="Next gym view" onClick={() => slider.current?.slideNext()}><ArrowRight/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
