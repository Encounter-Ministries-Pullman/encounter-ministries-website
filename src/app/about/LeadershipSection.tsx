import { LeadershipCard, type Leader } from '../../components/LeadershipCard';
import { CONTAINER_CLASSES } from '../../constants';
import { CHURCH_CONTACT } from '../../constants/site';
import type { CloudImageAsset } from '../../components/CloudImage';
import type { MediaCollectionStatus } from '../../constants/media';

type LeadershipEntry = Leader & { imageKey: string };

const LEADERSHIP: LeadershipEntry[] = [
  {
    name: 'Jordan Lachance',
    role: 'Pastor',
    imageKey: 'encounter-ministries-photos/leadership/pastor.jpg',
    imageAlt: 'The Lachance family',
    description: 'Pastor Jordan and his wife Melanie Lachance are graduates of Christ for the Nations Institute in the Dallas-Fort Worth area, originally from the Northeast. They love people and carry a fire for the Holy Spirit, a heart for evangelism and pastoral ministry, and a passion to see people far from God planted firmly in the local church.',
    contacts: [
      { type: 'email', label: 'Email', value: 'pastorjordan@encounterministries.org' },
      { type: 'phone', label: 'Church phone', value: CHURCH_CONTACT.phone },
    ],
  },
  {
    name: 'Bill Cofer',
    role: 'Church Elder',
    imageKey: 'encounter-ministries-photos/leadership/billcofer.jpg',
    imageAlt: 'Church Elder Bill Cofer',
    description: '',
    contacts: [],
  },
  {
    name: 'Bill Slinkard',
    role: 'Church Elder',
    imageKey: 'encounter-ministries-photos/leadership/billslinkard.jpg',
    imageAlt: 'Church Elder Bill Slinkard',
    description: '',
    contacts: [],
  },
];

export function LeadershipSection({ images, status }: {
  images: CloudImageAsset[];
  status: Exclude<MediaCollectionStatus, 'loading'>;
}) {
  return (
    <section className="relative py-22 max-[820px]:py-14" id="leaders">
      <div className={CONTAINER_CLASSES}>
        <h2 className="mb-8 font-display text-[clamp(1.9rem,4vw,2.7rem)] font-semibold leading-[1.1]">Encounter Leadership</h2>
        <p className="mb-8 max-w-[58ch] text-ink-muted">Meet the people who lead and serve at Encounter. Reach out to any of them directly.</p>
        <div className="flex flex-wrap items-stretch gap-[1.4rem]">
          {LEADERSHIP.map((leader) => {
            const image = images.find((item) => item.objectKey === leader.imageKey);
            return <LeadershipCard key={leader.name} leader={leader} image={image} imageStatus={status} />;
          })}
        </div>
      </div>
    </section>
  );
}