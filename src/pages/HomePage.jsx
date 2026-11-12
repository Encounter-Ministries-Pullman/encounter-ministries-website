import { ActionLink, LinkCardGrid, PageHero, SectionHeading, VisitSection } from '../components/ContentBlocks.jsx';
import { CONTAINER_CLASSES } from '../constants';
import { PrayerForm } from '../components/Forms.jsx';

export function HomePage() {
  return (
    <>
      <PageHero title={<>A church family<br />for the Palouse.</>} description="Come Encounter God together with us.">
        <ActionLink to="/#week" purpose="watch">Watch online</ActionLink>
      </PageHero>

      <VisitSection />

      <section className="relative py-22 max-[820px]:py-14" id="week">
        <div className={CONTAINER_CLASSES}>
          <SectionHeading title="This week at Encounter" description="Can't make it in person? Join a service online or catch up on the latest message." />
          <LinkCardGrid items={[
            { eyebrow: 'Sermons', title: 'Watch the latest message', label: 'Open YouTube', href: 'https://www.youtube.com/channel/UCECIy1zJmZWYAqKruTIBB-w/videos' },
            { eyebrow: 'Online services', title: 'Join us live on Facebook', label: 'Watch live', href: 'https://www.facebook.com/EMPalouse/' },
            { eyebrow: 'Prayer', title: 'Share a need with our team', label: 'Request prayer', to: '/#prayer' },
          ]} />
        </div>
      </section>

      <section className="relative py-22 max-[820px]:py-14" id="prayer">
        <div className="relative mx-auto grid w-[calc(100%-3rem)] max-w-265 grid-cols-2 items-start gap-14 max-[820px]:w-[calc(100%-2rem)] max-[820px]:grid-cols-1 max-[820px]:gap-8">
          <SectionHeading title="How can we pray for you?" description="Share a need and our prayer team will lift it up. You can keep it private." />
          <PrayerForm />
        </div>
      </section>

      <section className="relative bg-brand py-22 text-center text-paper max-[820px]:py-14" id="give">
        <div className={CONTAINER_CLASSES}>
          <SectionHeading tone="inverse" centered title="Bring your first and best." description="Your generosity supports our ministry efforts on the Palouse and so much more." />
          <ActionLink href="https://www.easytithe.com/encounterpullman" purpose="give" target="_blank" rel="noreferrer">Give securely online</ActionLink>
        </div>
      </section>
    </>
  );
}