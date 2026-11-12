import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ActionLink, ContactLinks, MinistryGrid, PageHero, SectionHeading, VisitSection } from '../components/ContentBlocks.jsx';
import { CloudImage } from '../components/CloudImage';
import { CONTAINER_CLASSES } from '../constants';
import { useMediaCollection } from '../hooks/useMediaCollection';

const CAROUSEL_INTERVAL_MS = 5000;
const CAROUSEL_SIZES = '(max-width: 647px) 220px, (max-width: 1235px) 34vw, 420px';

function PhotoCarousel() {
  const { images: photos, status } = useMediaCollection('worship');
  const touchStart = useRef(null);
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

  function move(direction) {
    if (photos.length < 2) return;
    setActive((index) => (index + direction + photos.length) % photos.length);
  }

  function handleKeyDown(event) {
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
        <SectionHeading tone="inverse" spacing="tight" title="Life at Encounter" description="A look at what's happening in our church family." />
      </div>
      <div
        className="photo-carousel-stage"
        tabIndex="0"
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
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; setFocused(true); }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
          setFocused(false);
        }}
      >
        {status === 'loading' && <p className="absolute inset-0 grid place-items-center text-paper/80" role="status">Loading photos...</p>}
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

function LeadershipSection() {
  const { images, status } = useMediaCollection('leadership');
  const pastor = images.find((image) => image.objectKey === 'encounter-ministries-photos/leadership/pastor.jpg');

  return (
    <section className="relative py-22 max-[820px]:py-14" id="leaders">
      <div className={CONTAINER_CLASSES}>
        <SectionHeading title="Encounter Leadership" description="Meet the people who lead and serve at Encounter. Reach out to any of them directly." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[1.4rem]">
          <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-paper">
            {pastor ? (
              <CloudImage
                className="block aspect-square w-full bg-surface-soft object-cover"
                image={pastor}
                alt="The Lachance family"
                sizes="(max-width: 820px) calc(100vw - 2rem), 420px"
                style={{ height: 'auto', aspectRatio: '1 / 1' }}
              />
            ) : (
              <div className="aspect-square w-full bg-surface-soft" aria-hidden="true" />
            )}
            {status === 'error' && <p className="m-0 px-[1.4rem] pt-4 text-sm text-ink-muted" role="alert">Photo is temporarily unavailable.</p>}
            {status === 'ready' && !pastor && <p className="m-0 px-[1.4rem] pt-4 text-sm text-ink-muted" role="status">Photo is not listed.</p>}
            <div className="flex flex-1 flex-col gap-2 px-[1.4rem] pb-6 pt-[1.4rem]">
              <h3 className="m-0 font-display text-[1.35rem] font-semibold">Pastor Jordan Lachance</h3>
              <p className="m-0 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-sea-ink">Pastor</p>
              <p className="m-0 text-base leading-[1.6] text-ink-muted">Pastor Jordan and Melanie Lachance are graduates of Christ for the Nations Institute in the Dallas-Fort Worth area, originally from the Northeast. They love people and carry a fire for the Holy Spirit, a heart for evangelism and pastoral ministry, and a passion to see people far from God planted firmly in the local church.</p>
              <ContactLinks />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero title="About Encounter." description="A local church family in Pullman, Washington, united in our desire to experience God together." short>
        <ActionLink to="#leaders" purpose="leadership">Meet our leadership</ActionLink>
      </PageHero>

      <section className="relative py-26 max-[820px]:py-16" id="who">
        <div className="relative mx-auto grid w-[calc(100%-3rem)] max-w-265 grid-cols-[1.35fr_1fr] items-center gap-18 max-[820px]:w-[calc(100%-2rem)] max-[820px]:grid-cols-1 max-[820px]:gap-8">
          <div>
            <SectionHeading spacing="who" eyebrow="Who we are" title="A family united in faith" />
            <p className="mb-0 font-display text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold leading-[1.2] text-brand">We are a diverse group of brothers and sisters united in our desire to experience God together,</p>
            <p className="mb-0 mt-[0.6rem] font-display text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold leading-[1.2] text-sea-ink">so that the lost may encounter God through us.</p>
          </div>
          <div className="border-l-4 border-highlight pl-8 max-[820px]:pl-[1.4rem]">
            <p className="mb-[1.3rem] text-ink-muted">Encounter Ministries is a local church family in Pullman, Washington. Whoever you are and wherever you are in your faith, there is a seat for you.</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              <li className="rounded-full bg-surface-soft px-[0.85rem] py-[0.35rem] text-[0.9rem] font-semibold text-brand">Non-denominational</li>
              <li className="rounded-full bg-surface-soft px-[0.85rem] py-[0.35rem] text-[0.9rem] font-semibold text-brand">Spirit-filled</li>
              <li className="rounded-full bg-surface-soft px-[0.85rem] py-[0.35rem] text-[0.9rem] font-semibold text-brand">Local church family</li>
              <li className="rounded-full bg-surface-soft px-[0.85rem] py-[0.35rem] text-[0.9rem] font-semibold text-brand">Pullman, WA</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-surface-soft py-22 max-[820px]:py-14" id="believe">
        <div className={CONTAINER_CLASSES}>
          <SectionHeading title="What we believe" description="Our faith rests on three foundations." />
          <MinistryGrid ministries={[
            { name: 'The Trinity', description: 'One God in three persons: Father, Son, and Holy Spirit.' },
            { name: 'The authority of Scripture', description: 'The Bible guides what we believe and how we live.' },
            { name: 'Salvation by grace', description: 'Received through faith, not earned.' },
          ]} />
        </div>
      </section>

      <PhotoCarousel />

      <LeadershipSection />

      <VisitSection compact />
    </>
  );
}