import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const LANDSCAPE_HEIGHT = 360;

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

  addRidge([130, 70, 110, 10, 90, 40, 110, 20, 100, 50, 95], '#b7cbc5');
  addRidge([180, 130, 165, 90, 160, 120, 170, 105, 160, 125, 150], '#8fada5');
  addTrees(215, 60, 95, 22, '#5f8a79');
  addTrees(270, 85, 135, 30, '#2f5c49');
  addTrees(350, 120, 190, 40, '#12261f');

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
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={scene.ridges[0].d} fill={scene.ridges[0].fill} />
      <path d={scene.ridges[1].d} fill={scene.ridges[1].fill} />
      <rect y="120" width={scene.width} height="110" fill="url(#mist)" />
      {scene.ridges.slice(2).map(({ d, fill }) => <path key={fill} d={d} fill={fill} />)}
    </svg>
  );
}

export function PageHero({ title, description, children, short = false }) {
  return (
    <section className={short ? 'hero hero-short' : 'hero'}>
      <div className="container hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
        {children && <div className="button-row">{children}</div>}
      </div>
      <Landscape />
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="lead">{description}</p>}
    </div>
  );
}

export function ActionLink({ to, href, variant = 'gold', children, ...props }) {
  const className = `button button-${variant}`;
  return to ? <Link className={className} to={to} {...props}>{children}</Link> : <a className={className} href={href} {...props}>{children}</a>;
}

export function MinistryGrid({ ministries }) {
  return (
    <div className="ministry-grid">
      {ministries.map(({ name, description }) => (
        <article className="ministry-card" key={name}>
          <h3>{name}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}

export function LinkCardGrid({ items }) {
  return (
    <div className="link-card-grid">
      {items.map(({ eyebrow, title, description, label, to, href }) => {
        const content = (
          <>
            <div>
              <small>{eyebrow}</small>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </div>
            <span>{label}</span>
          </>
        );

        return to ? (
          <Link className="link-card" to={to} key={title}>{content}</Link>
        ) : (
          <a className="link-card" href={href} target="_blank" rel="noreferrer" key={title}>{content}</a>
        );
      })}
    </div>
  );
}

export function ServiceSchedule({ services }) {
  return (
    <ul className="service-schedule">
      {services.map(({ time, name }) => (
        <li key={time}>
          <strong>{time}</strong>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function ContactLinks({ light = false }) {
  return (
    <div className={light ? 'contact-links is-light' : 'contact-links'}>
      <a href="mailto:pastorjordan@encounterministries.org">pastorjordan@encounterministries.org</a>
      <a href="tel:+15097151500">509-715-1500</a>
    </div>
  );
}

export function VisitSection({ compact = false }) {
  return (
    <section className="visit-section" id="visit">
      <div className="container">
        {compact ? (
          <>
            <SectionHeading title="Come see for yourself" description="Join us Sundays at 10:00 AM at 645 N Grand in Pullman." />
            <ActionLink to="/connect">Get connected</ActionLink>
          </>
        ) : (
          <div className="visit-layout">
            <div>
              <SectionHeading title="Visit us in Pullman" description="Everyone is welcome, whatever your background or where you are in your faith." />
              <address>645 N Grand<br />Pullman, WA</address>
              <div className="button-row">
                <ActionLink href="https://maps.google.com/?q=645+N+Grand+Pullman+WA" target="_blank" rel="noreferrer">Get directions</ActionLink>
                <ActionLink href="tel:+15097151500" variant="outline">Call 509-715-1500</ActionLink>
              </div>
            </div>
            <ServiceSchedule services={[
              { time: 'Sunday, 10:00 AM', name: 'Worship service' },
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