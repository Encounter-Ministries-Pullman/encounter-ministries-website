import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BUTTON_CLASSES, CONTAINER_CLASSES, ENCOUNTER_COLORS } from '../constants';
import { CHURCH_CONTACT, SUNDAY_SERVICE_TIME } from '../constants/site';

const LANDSCAPE_HEIGHT = 360;
const HERO_CONTENT_CLASSES = 'relative mx-auto z-[2] w-[calc(100%-3rem)] max-w-265 pb-[250px] max-[820px]:w-[calc(100%-2rem)] max-[820px]:pb-[190px]';
const HERO_CLASSES = {
  full: 'relative min-h-[490px] overflow-hidden bg-[linear-gradient(180deg,var(--color-background-soft)_0,var(--color-background-subtle)_55%,var(--color-background)_100%)] pt-[8.5rem] text-brand max-[820px]:min-h-[400px] max-[820px]:pt-8',
  short: 'relative min-h-0 overflow-hidden bg-[linear-gradient(180deg,var(--color-background-soft)_0,var(--color-background-subtle)_55%,var(--color-background)_100%)] pt-[8.5rem] text-brand max-[820px]:min-h-[400px] max-[820px]:pt-8',
};
const MINISTRY_CARD_CLASSES = [
  'min-h-[150px] rounded bg-paper border-t-4 border-sea p-6',
  'min-h-[150px] rounded bg-paper border-t-4 border-brand p-6',
  'min-h-[150px] rounded bg-paper border-t-4 border-highlight p-6',
];
const LINK_CARD_CLASSES = [
  'flex min-h-[230px] flex-col justify-between rounded-lg bg-brand p-[1.6rem] text-paper no-underline transition-transform duration-200 hover:-translate-y-[3px]',
  'flex min-h-[230px] flex-col justify-between rounded-lg bg-brand-soft p-[1.6rem] text-paper no-underline transition-transform duration-200 hover:-translate-y-[3px]',
  'flex min-h-[230px] flex-col justify-between rounded-lg bg-highlight p-[1.6rem] text-brand no-underline transition-transform duration-200 hover:-translate-y-[3px]',
];
const LEAD_CLASSES = {
  default: 'mb-0 max-w-[58ch] text-ink-muted',
  inverse: 'mb-0 max-w-[58ch] text-paper-muted',
};
const CENTERED_LEAD_CLASSES = {
  default: 'mx-auto mb-0 max-w-[58ch] text-ink-muted',
  inverse: 'mx-auto mb-0 max-w-[58ch] text-paper-muted',
};
const SECTION_HEADING_CLASSES = {
  normal: 'mb-8',
  tight: 'mb-0',
  who: 'mb-[1.4rem]',
};

function createLandscape(width) {
  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const ridges = [];
  const ridgeX = [0, 110, 210, 360, 500, 650, 810, 970, 1120, 1290, 1440];

  function addRidge(heights, fill) {
    let d = `M0 ${LANDSCAPE_HEIGHT}`;
    ridgeX.forEach((x, index) => {
      d += `L${(x / 1440 * width).toFixed(1)} ${heights[index]}`;
    });
    ridges.push({ d: `${d}L${width} ${LANDSCAPE_HEIGHT}Z`, fill });
  }

  function addTrees(base, minHeight, maxHeight, step, fill) {
    let d = '';
    let x = -20;
    while (x < width + 40) {
      const height = minHeight + random() * (maxHeight - minHeight);
      const treeWidth = height * 0.46;
      for (let index = 0; index < 3; index += 1) {
        const apex = base - height + index * height * 0.26;
        const bottom = apex + height * 0.44;
        const halfWidth = treeWidth * (0.3 + 0.2 * index);
        d += `M${x.toFixed(1)} ${apex}L${(x + halfWidth).toFixed(1)} ${bottom}L${(x - halfWidth).toFixed(1)} ${bottom}Z`;
      }
      x += step * (0.7 + random() * 0.6);
    }
    d += `M0 ${base - minHeight * 0.1}H${width}V${LANDSCAPE_HEIGHT}H0Z`;
    ridges.push({ d, fill });
  }

  addRidge([130, 70, 110, 10, 90, 40, 110, 20, 100, 50, 95], ENCOUNTER_COLORS.background);
  addRidge([180, 130, 165, 90, 160, 120, 170, 105, 160, 125, 150], ENCOUNTER_COLORS.secondary);
  addTrees(215, 60, 95, 22, ENCOUNTER_COLORS.secondary);
  addTrees(270, 85, 135, 30, ENCOUNTER_COLORS.primary);
  addTrees(350, 120, 190, 40, ENCOUNTER_COLORS.primary);

  return { width, ridges };
}

function Landscape() {
  const svgRef = useRef(null);
  const [scene, setScene] = useState(() => createLandscape(1440));

  useEffect(() => {
    const svg = svgRef.current;
    let timer;
    const draw = () => {
      const width = Math.round(svg.getBoundingClientRect().width) || 1440;
      setScene(createLandscape(width));
    };
    const scheduleDraw = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(draw, 150);
    };

    draw();
    window.addEventListener('resize', scheduleDraw);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', scheduleDraw);
    };
  }, []);

  return (
    <svg ref={svgRef} className="landscape" viewBox={`0 0 ${scene.width} ${LANDSCAPE_HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ENCOUNTER_COLORS.text} stopOpacity="0" />
          <stop offset=".5" stopColor={ENCOUNTER_COLORS.text} stopOpacity=".55" />
          <stop offset="1" stopColor={ENCOUNTER_COLORS.text} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={scene.ridges[0].d} fill={scene.ridges[0].fill} />
      <path d={scene.ridges[1].d} fill={scene.ridges[1].fill} />
      <rect y="120" width={scene.width} height="110" fill="url(#mist)" />
      {scene.ridges.slice(2).map(({ d, fill }, index) => <path key={`ridge-${index}`} d={d} fill={fill} />)}
    </svg>
  );
}

export function PageHero({ title, description, children, short = false }) {
  return (
    <section className={HERO_CLASSES[short ? 'short' : 'full']}>
      <div className={HERO_CONTENT_CLASSES}>
        <h1 className="mb-4 max-w-[800px] font-display text-[clamp(2.6rem,7.2vw,5.2rem)] font-semibold leading-[1.1]">{title}</h1>
        <p className="mb-[1.8rem] max-w-[44ch] text-[1.2rem] text-brand">{description}</p>
        {children && <div className="flex flex-wrap gap-[0.8rem]">{children}</div>}
      </div>
      <Landscape />
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, tone = 'default', spacing = 'normal', centered = false }) {
  return (
    <div className={SECTION_HEADING_CLASSES[spacing] || SECTION_HEADING_CLASSES.normal}>
      {eyebrow && <p className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-sea-ink">{eyebrow}</p>}
      <h2 className="mb-4 font-display text-[clamp(1.9rem,4vw,2.7rem)] font-semibold leading-[1.1]">{title}</h2>
      {description && <p className={centered ? CENTERED_LEAD_CLASSES[tone] || CENTERED_LEAD_CLASSES.default : LEAD_CLASSES[tone] || LEAD_CLASSES.default}>{description}</p>}
    </div>
  );
}

export function ActionLink({ to, href, purpose = 'connect', children, ...props }) {
  const className = BUTTON_CLASSES[purpose] || BUTTON_CLASSES.connect;
  return to ? <Link className={className} to={to} {...props}>{children}</Link> : <a className={className} href={href} {...props}>{children}</a>;
}

export function MinistryGrid({ ministries }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {ministries.map(({ name, description }, index) => (
        <article className={MINISTRY_CARD_CLASSES[index % MINISTRY_CARD_CLASSES.length]} key={name}>
          <h3 className="mb-[0.4rem] font-display text-xl font-semibold">{name}</h3>
          <p className="m-0 text-base text-ink-muted">{description}</p>
        </article>
      ))}
    </div>
  );
}

export function LinkCardGrid({ items }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[1.2rem]">
      {items.map(({ eyebrow, title, description, label, to, href }, index) => {
        const content = (
          <>
            <div>
              <small className="font-semibold opacity-[0.85]">{eyebrow}</small>
              <h3 className="my-[0.4rem] mb-[0.8rem] font-display text-2xl font-semibold">{title}</h3>
              {description && <p className="mb-4">{description}</p>}
            </div>
            <span className="self-start border-b-2 border-current font-semibold">{label}</span>
          </>
        );
        const className = LINK_CARD_CLASSES[index < LINK_CARD_CLASSES.length ? index : 0];

        return to ? (
          <Link className={className} to={to} key={title}>{content}</Link>
        ) : (
          <a className={className} href={href} target="_blank" rel="noreferrer" key={title}>{content}</a>
        );
      })}
    </div>
  );
}

export function ServiceSchedule({ services }) {
  return (
    <ul className="m-0 grid list-none gap-[0.6rem] p-0">
      {services.map(({ time, name }) => (
        <li className="flex justify-between gap-4 rounded-lg bg-brand-soft p-4 first:bg-highlight first:text-brand max-[520px]:flex-col max-[520px]:gap-[0.1rem]" key={time}>
          <strong className="font-display text-[1.15rem] font-semibold">{time}</strong>
          <span className="text-right text-[0.95rem] max-[520px]:text-left">{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function ContactLinks({ light = false }) {
  return (
    <div className="mt-[1.4rem] grid justify-items-start gap-[0.2rem] font-medium">
      <a className={light ? 'text-highlight no-underline hover:underline' : 'text-secondary-ink no-underline hover:underline'} href="mailto:pastorjordan@encounterministries.org">pastorjordan@encounterministries.org</a>
      <a className={light ? 'text-highlight no-underline hover:underline' : 'text-secondary-ink no-underline hover:underline'} href={CHURCH_CONTACT.phoneHref}>{CHURCH_CONTACT.phone}</a>
    </div>
  );
}

export function VisitSection({ compact = false }) {
  return (
    <section className="relative bg-brand py-[5.5rem] text-paper max-[820px]:py-[3.5rem]" id="visit">
      <div className={CONTAINER_CLASSES}>
        {compact ? (
          <>
            <SectionHeading tone="inverse" title="Come see for yourself" description={`Join us Sundays at ${SUNDAY_SERVICE_TIME} at ${CHURCH_CONTACT.address} in ${CHURCH_CONTACT.city}.`} />
            <ActionLink to="/connect" purpose="connect">Get connected</ActionLink>
          </>
        ) : (
          <div className="grid grid-cols-[1fr_1.2fr] items-start gap-12 max-[820px]:grid-cols-1 max-[820px]:gap-8">
            <div>
              <SectionHeading tone="inverse" title="Visit us in Pullman" description="Everyone is welcome, whatever your background or where you are in your faith." />
              <address className="my-4 mb-[1.4rem] text-[1.15rem] not-italic">{CHURCH_CONTACT.address}<br />{CHURCH_CONTACT.city}, {CHURCH_CONTACT.state}</address>
              <div className="flex flex-wrap gap-[0.8rem]">
                <ActionLink href="https://maps.google.com/?q=645+N+Grand+Pullman+WA" purpose="directions" target="_blank" rel="noreferrer">Get directions</ActionLink>
                <ActionLink href={CHURCH_CONTACT.phoneHref} purpose="call">Call {CHURCH_CONTACT.phone}</ActionLink>
              </div>
            </div>
            <ServiceSchedule services={[
              { time: `Sunday, ${SUNDAY_SERVICE_TIME}`, name: 'Worship service' },
              { time: 'Monday, 6:00 AM', name: "Men's prayer meeting" },
              { time: 'Monday, 6:00 PM', name: 'Corporate intercession' },
              { time: 'Wednesday, 6 to 8 PM', name: 'Food at 6, teaching after' },
            ]} />
          </div>
        )}
      </div>
    </section>
  );
}