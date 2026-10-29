import { ActionLink, LinkCardGrid, PageHero, SectionHeading, VisitSection } from '../components/ContentBlocks.jsx';
import { PrayerForm } from '../components/Forms.jsx';

export function HomePage() {
  return (
    <>
      <PageHero title={<>A church family<br />for the Palouse.</>} description="Come Encounter God together with us.">
        <ActionLink to="/#week" variant="dark">Watch online</ActionLink>
      </PageHero>

      <VisitSection />

      <section className="content-section" id="week">
        <div className="container">
          <SectionHeading title="This week at Encounter" description="Can't make it in person? Join a service online or catch up on the latest message." />
          <LinkCardGrid items={[
            { eyebrow: 'Sermons', title: 'Watch the latest message', label: 'Open YouTube', href: 'https://www.youtube.com/channel/UCECIy1zJmZWYAqKruTIBB-w/videos' },
            { eyebrow: 'Online services', title: 'Join us live on Facebook', label: 'Watch live', href: 'https://www.facebook.com/EMPalouse/' },
            { eyebrow: 'Prayer', title: 'Share a need with our team', label: 'Request prayer', to: '/#prayer' },
          ]} />
        </div>
      </section>

      <section className="content-section" id="prayer">
        <div className="container form-layout">
          <SectionHeading title="How can we pray for you?" description="Share a need and our prayer team will lift it up. You can keep it private." />
          <PrayerForm />
        </div>
      </section>

      <section className="give-section" id="give">
        <div className="container">
          <SectionHeading title="Bring your first and best." description="Your generosity supports our ministry efforts on the Palouse and so much more." />
          <ActionLink href="https://www.easytithe.com/encounterpullman" target="_blank" rel="noreferrer">Give securely online</ActionLink>
        </div>
      </section>
    </>
  );
}