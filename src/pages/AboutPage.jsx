import { useEffect, useRef, useState } from 'react';
import { ActionLink, ContactLinks, MinistryGrid, PageHero, SectionHeading, VisitSection } from '../components/ContentBlocks.jsx';

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
      <section className="instagram-section" id="instagram">
        <div className="container">
          <SectionHeading title="Life at Encounter" description="A look at what's happening in our church family." />
          <p className="instagram-follow"><a className="button" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Follow us on Instagram</a></p>
        </div>
      </section>
    );
  }

  return (
    <section className="instagram-section" id="instagram">
      <div className="container">
        <SectionHeading title="Life at Encounter" description="A look at what's happening in our church family." />
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
            className: `instagram-slide${post.image ? '' : ' is-sample'}`,
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
      <div className="container">
        <p className="instagram-follow"><a className="button" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Follow us on Instagram</a></p>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="leadership-section" id="leaders">
      <div className="container">
        <SectionHeading title="Encounter Leadership" description="Meet the people who lead and serve at Encounter. Reach out to any of them directly." />
        <div className="leader-grid">
          <article className="leader-card">
            <img src="/pastor.jpg" alt="The Lachance family" loading="lazy" />
            <div className="leader-content">
              <h3>Pastor Jordan Lachance</h3>
              <p className="leader-role">Pastor</p>
              <p>Pastor Jordan and Melanie Lachance are graduates of Christ for the Nations Institute in the Dallas-Fort Worth area, originally from the Northeast. They love people and carry a fire for the Holy Spirit, a heart for evangelism and pastoral ministry, and a passion to see people far from God planted firmly in the local church.</p>
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
        <ActionLink to="#leaders" variant="dark">Meet our leadership</ActionLink>
      </PageHero>

      <section className="who-section" id="who">
        <div className="container who-layout">
          <div>
            <SectionHeading eyebrow="Who we are" title="A family united in faith" />
            <p className="statement">We are a diverse group of brothers and sisters united in our desire to experience God together,</p>
            <p className="statement accent">so that the lost may encounter God through us.</p>
          </div>
          <div className="who-aside">
            <p>Encounter Ministries is a local church family in Pullman, Washington. Whoever you are and wherever you are in your faith, there is a seat for you.</p>
            <ul className="tags">
              <li>Non-denominational</li><li>Spirit-filled</li><li>Local church family</li><li>Pullman, WA</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section section-soft" id="believe">
        <div className="container">
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