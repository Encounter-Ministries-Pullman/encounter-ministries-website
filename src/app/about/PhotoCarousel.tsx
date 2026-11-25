'use client';

import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from 'react';
import { SectionHeading } from "../../components/ContentBlocks";
import { CONTAINER_CLASSES } from "../../constants";
import { CloudImage } from "../../components/CloudImage";
import type { CloudImageAsset } from "../../components/CloudImage";
import type { MediaCollectionStatus } from "../../constants/media";
import { ArrowLeft, ArrowRight } from "lucide-react";


const CAROUSEL_INTERVAL_MS = 5000;
const CAROUSEL_SIZES = '(max-width: 647px) 220px, (max-width: 1235px) 34vw, 420px';

export function PhotoCarousel({ photos, status }: {
    photos: CloudImageAsset[],
  status: Exclude<MediaCollectionStatus, 'loading'>,
}) {
  const touchStart = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    if (photos.length < 2 || hovering || focused || tabHidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % photos.length), CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [photos.length, hovering, focused, tabHidden]);

  useEffect(() => {
    const pauseWhenHidden = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, []);

  function move(direction: -1 | 1) {
    if (photos.length < 2) return;
    setActive((index) => (index + direction + photos.length) % photos.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  }

  return (
    <section className="relative overflow-hidden bg-brand py-22 text-paper max-[820px]:py-14" id="photos">
      <div className={CONTAINER_CLASSES}>
        <SectionHeading eyebrow={null} tone="inverse" spacing="tight" title="Life at Encounter" description="A look at what's happening in our church family." />
      </div>
      <div
        className="photo-carousel-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Encounter photos"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; setFocused(true); }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
          setFocused(false);
        }}
      >
        {status === 'error' && <p className="absolute inset-0 grid place-items-center text-paper/80" role="alert">Photos are temporarily unavailable.</p>}
        {status === 'ready' && photos.length === 0 && <p className="absolute inset-0 grid place-items-center text-paper/80" role="status">No photos are available right now.</p>}
        {photos.map((image, index) => {
          const count = photos.length;
          let distance = ((index - active) % count + count) % count;
          if (distance > count / 2) distance -= count;
          const position = distance === 0 ? '0' : distance === -1 ? '-1' : distance === 1 ? '1' : 'x';
          return (
            <div className="photo-carousel-slide" data-pos={position} aria-hidden={position !== '0'} key={image.objectKey}>
              <CloudImage
                image={image}
                alt={`Encounter Ministries worship photo ${index + 1}`}
                sizes={CAROUSEL_SIZES}
                draggable={false}
                style={{ height: '100%' }}
              />
            </div>
          );
        })}
        {photos.length > 1 && (
          <>
            <button className="photo-carousel-arrow photo-carousel-prev" type="button" aria-label="Previous photo" onClick={() => move(-1)}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button className="photo-carousel-arrow photo-carousel-next" type="button" aria-label="Next photo" onClick={() => move(1)}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}