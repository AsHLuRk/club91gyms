'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Dumbbell, Laptop } from 'lucide-react';
import SectionLight from './section-light';
import './personal-training.css';

const formats = {
  'In person': {
    icon: Dumbbell,
    title: 'On the gym floor',
    description: 'Train alongside Gagan at Club 91. Work through your exercises together, ask about your technique between sets, and learn how to choose weights that suit your current strength.',
    next: 'Tell Gagan which club you can visit and when you like to train.',
  },
  Online: {
    icon: Laptop,
    title: 'Wherever you train',
    description: 'Work directly with Gagan from your own gym or home. Talk through the equipment you have, the movements you want to improve, and how training can fit into your week.',
    next: 'Tell Gagan where you train and what equipment you have access to.',
  },
};

type Format = keyof typeof formats;
const choices: Format[] = ['In person', 'Online'];

export default function PersonalTraining() {
  const [format, setFormat] = useState<Format>('In person');
  const detail = formats[format];
  const message = `Hi Club 91! I’d like to ask Gagan about ${format === 'Online' ? 'online' : 'in-person'} personal training. Could you share availability and pricing?`;

  return (
    <section className="personal-training section" id="personal-training" aria-labelledby="personal-training-title">
      <div className="container pt-layout">
        <div className="pt-portrait">
          <Image src="/images/gagan-cable.webp" alt="Gagan training at a cable station at Club 91" fill sizes="(max-width: 760px) 100vw, 43vw"/>
          <SectionLight variant="pulse" className="pt-light"/>
        </div>
        <div className="pt-copy">
          <p className="eyebrow">Personal training</p>
          <h2 id="personal-training-title">Train one-to-one<br/>with Gagan<span>.</span></h2>
          <p>Gagan has personally coached many people. Whether you’re learning your first lift or working towards a strength goal, he starts with your experience, your routine and what you want to achieve.</p>
          <div className="pt-switch" role="group" aria-label="Choose a coaching format">
            {choices.map(choice => {
              const Icon = formats[choice].icon;
              return <button key={choice} type="button" aria-pressed={format === choice} aria-controls="pt-details" onClick={() => setFormat(choice)}><Icon aria-hidden="true" size={18}/>{choice}</button>;
            })}
          </div>
          <div id="pt-details" aria-live="polite">
            <div className="pt-format" key={format}>
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
              <p>{detail.next}</p>
            </div>
          </div>
          <a className="button pt-enquire" href={`https://wa.me/917035000071?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
            Ask about {format === 'Online' ? 'online' : 'in-person'} coaching <ArrowUpRight size={18}/>
          </a>
        </div>
      </div>
    </section>
  );
}
