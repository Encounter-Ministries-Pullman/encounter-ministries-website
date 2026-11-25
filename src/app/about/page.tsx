import { PhotoCarousel } from "./PhotoCarousel";
import { ActionLink, PageHero, SectionHeading, VisitSection } from '../../components/ContentBlocks';
import { BeliefsGrid } from '../../components/BeliefsGrid';
import { LeadershipSection } from './LeadershipSection';
import { CONTAINER_CLASSES } from '../../constants';
import type { Metadata } from 'next';
import type { CloudImageAsset } from '../../components/CloudImage';
import { fetchMediaCollection } from '../../mediaApi';
import type { MediaCollection } from '../../constants/media';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Encounter Ministries, a local church family in Pullman, Washington.',
};

export const dynamic = 'force-dynamic';

type MediaLoadResult = {
  images: CloudImageAsset[];
  status: 'ready' | 'error';
};

async function loadMediaCollection(collection: MediaCollection): Promise<MediaLoadResult> {
  try {
    return { images: await fetchMediaCollection(collection), status: 'ready' };
  } catch (error) {
    console.error(`Failed to load ${collection} media from the Encounter API.`, error);
    return { images: [], status: 'error' };
  }
}

export default async function AboutPage() {
  const [worshipMedia, leadershipMedia] = await Promise.all([
    loadMediaCollection('worship'),
    loadMediaCollection('leadership'),
  ]);
    
  return (
    <>
      <PageHero title="About Encounter." description="A local church family in Pullman, Washington, united in our desire to experience God together." short>
        <ActionLink to="#leaders" variant="solid">Meet our leadership</ActionLink>
      </PageHero>

      <section className="relative py-26 max-[820px]:py-16" id="who">
        <div className="relative mx-auto grid w-[calc(100%-3rem)] max-w-265 grid-cols-[1.35fr_1fr] items-center gap-18 max-[820px]:w-[calc(100%-2rem)] max-[820px]:grid-cols-1 max-[820px]:gap-8">
          <div>
            <SectionHeading spacing="who" eyebrow="Who we are" title="A family united in faith" description="" />
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
          <SectionHeading eyebrow={null} title="What we believe" description="Our church affirms these essential truths." />
          <BeliefsGrid beliefs={[
            { name: 'The Trinity', description: 'One God in three persons: Father, Son, and Holy Spirit.' },
            { name: 'The authority of Scripture', description: 'The Bible guides what we believe and how we live.' },
            { name: 'Salvation by grace', description: 'Received through faith, not earned.' },
          ]} />
        </div>
      </section>

      <PhotoCarousel photos={worshipMedia.images} status={worshipMedia.status} />

      <LeadershipSection images={leadershipMedia.images} status={leadershipMedia.status} />

      <VisitSection compact />
    </>
  );
}
