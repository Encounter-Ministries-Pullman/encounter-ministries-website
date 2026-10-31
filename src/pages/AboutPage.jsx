import { useEffect, useRef, useState } from 'react';
import { ActionLink, ContactLinks, MinistryGrid, PageHero, SectionHeading, VisitSection } from '../components/ContentBlocks.jsx';
import { BUTTON_CLASSES } from '../constants.tsx';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/';
const INSTAGRAM_FEED_URL = '';
const INSTAGRAM_SECONDS = 5;

function InstagramCarousel() {
  const stageRef = useRef(null);
  const touchStart = useRef(null);
  const [posts, setPosts] = useState(() => Array.from({ length: 6 }, () => ({})));
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!INSTAGRAM_FEED_URL) return undefined;

    let cancelled = false;
    fetch(INSTAGRAM_FEED_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Instagram feed request failed');
        return response.json();
      })
      .then((json) => {
        const list = json.posts || json.data || json;
        const loadedPosts = list.map((post) => {
          const size = post.sizes && (post.sizes.medium || post.sizes.large || post.sizes.small);
          const image = (size && size.mediaUrl) || post.thumbnailUrl || post.thumbnail_url || post.mediaUrl || post.media_url;
          const caption = (post.caption || '').replace(/\s+/g, ' ').trim().slice(0, 110);
          return { image, link: post.permalink, alt: caption || undefined };
        }).filter((post) => post.image).slice(0, 12);
        if (!loadedPosts.length) throw new Error('Instagram feed contains no photos');
        if (!cancelled) setPosts(loadedPosts);
      })
      .catch(() => {
        if (!cancelled) setHidden(true);
      });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (hidden || hovering || focused || tabHidden || posts.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % posts.length), INSTAGRAM_SECONDS * 1000);
    return () => window.clearInterval(timer);
  }, [hidden, hovering, focused, tabHidden, posts.length]);

  useEffect(() => {
    const pauseWhenHidden = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, []);

  function move(direction) {
    setActive((index) => (index + direction + posts.length) % posts.length);
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

  if (hidden) {
    return (
      <section className="relative overflow-hidden bg-brand py-22 text-paper max-[820px]:py-14" id="instagram">
        <div className={CONTAINER_CLASSES}>
          <SectionHeading tone="inverse" spacing="tight" title="Life at Encounter" description="A look at what's happening in our church family." />
          <p className="mb-0 mt-6 text-center"><a className={BUTTON_CLASSES.instagram} href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Follow us on Instagram</a></p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-brand py-22 text-paper max-[820px]:py-14" id="instagram">
      <div className={CONTAINER_CLASSES}>
        <SectionHeading tone="inverse" spacing="tight" title="Life at Encounter" description="A look at what's happening in our church family." />
      </div>
      <div
        className="instagram-stage"
        ref={stageRef}
        tabIndex="0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Instagram photos"
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
        {posts.map((post, index) => {
          const count = posts.length;
          let distance = ((index - active) % count + count) % count;
          if (distance > count / 2) distance -= count;
          const position = distance === 0 ? '0' : distance === -1 ? '-1' : distance === 1 ? '1' : 'x';
          const content = post.image ? (
            <img src={post.image} alt={post.alt || 'Photo from Encounter Ministries on Instagram'} loading="lazy" draggable="false" />
          ) : 'Sample photo';
          const sharedProps = {
            className: post.image ? 'instagram-slide' : 'instagram-slide is-sample',
            'data-pos': position,
            'aria-hidden': position !== '0',
            onClick: (event) => {
              if (position === '-1' || position === '1') {
                event.preventDefault();
                move(Number(position));
              }
            },
          };

          return post.image ? (
            <a {...sharedProps} href={post.link || INSTAGRAM_PROFILE} target="_blank" rel="noreferrer" tabIndex={position === '0' ? 0 : -1} key={`${post.image}-${index}`}>
              {content}
            </a>
          ) : (
            <div {...sharedProps} key={`sample-${index}`}>{content}</div>
          );
        })}
        <button className="instagram-arrow instagram-prev" type="button" aria-label="Previous photo" onClick={() => move(-1)}>‹</button>
        <button className="instagram-arrow instagram-next" type="button" aria-label="Next photo" onClick={() => move(1)}>›</button>
      </div>
      <div className={CONTAINER_CLASSES}>
        <p className="mb-0 mt-6 text-center"><a className={BUTTON_CLASSES.instagram} href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Follow us on Instagram</a></p>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="relative py-22 max-[820px]:py-14" id="leaders">
      <div className={CONTAINER_CLASSES}>
        <SectionHeading title="Encounter Leadership" description="Meet the people who lead and serve at Encounter. Reach out to any of them directly." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[1.4rem]">
          <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-paper">
            <img className="block aspect-square w-full bg-surface-soft object-cover" src="/photos/leadership/pastor.jpg" alt="The Lachance family" loading="lazy" />
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

      <InstagramCarousel />

      <LeadershipSection />

      <VisitSection compact />
    </>
  );
}