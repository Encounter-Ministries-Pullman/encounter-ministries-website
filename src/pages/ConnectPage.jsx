import { ActionLink, ContactLinks, LinkCardGrid, MinistryGrid, PageHero, SectionHeading } from '../components/ContentBlocks.jsx';
import { ConnectForm } from '../components/Forms.jsx';

const ministries = [
  { name: 'Encounter Youth', description: 'A place for teens to grow in faith and friendship.' },
  { name: 'Encounter Students', description: 'Community for WSU and UI students.' },
  { name: 'Encounter WMN', description: 'Women encouraging one another in faith.' },
  { name: 'Encounter Singles', description: 'Friendship and faith for single adults.' },
  { name: 'Encounter Men', description: 'Fellowship and discipleship for men.' },
  { name: 'Encounter Marriages', description: 'Support and encouragement for married couples.' },
];

export function ConnectPage() {
  return (
    <>
      <PageHero title="Get connected." description="Wherever you are in your faith, there is a place for you here. Pick a first step below, or just tell us a little about yourself." short>
        <ActionLink to="#form" variant="dark">Tell us about you</ActionLink>
        <ActionLink to="#ways" variant="outline">See ways to connect</ActionLink>
      </PageHero>

      <section className="content-section" id="ways">
        <div className="container">
          <SectionHeading title="Three easy ways to start" description="You don't need to have it all figured out. Pick the one that fits where you are." />
          <LinkCardGrid items={[
            { eyebrow: 'New here?', title: 'Visit on a Sunday', description: 'Join us at 10:00 AM at 645 N Grand in Pullman.', label: 'See times and directions', to: '/#visit' },
            { eyebrow: 'Want a lower-key first step?', title: 'Come Wednesday night', description: 'Food at 6, teaching after, until 8.', label: 'See the full schedule', to: '/#visit' },
            { eyebrow: 'Ready to get involved?', title: 'Serve or join a ministry', description: "Tell us what you're interested in and we'll point you to the right leader.", label: 'Fill out the form', to: '#form' },
          ]} />
        </div>
      </section>

      <section className="content-section section-soft" id="ministries">
        <div className="container">
          <SectionHeading title="Find your people" description="Each ministry has its own leaders and gatherings. Check the ones you're interested in below, and we'll connect you." />
          <MinistryGrid ministries={ministries} />
        </div>
      </section>

      <section className="content-section" id="form">
        <div className="container form-container">
          <SectionHeading title="Tell us about you" description="Share a few details and someone from our team will be in touch. Please give at least an email or a phone number." />
          <ConnectForm />
        </div>
      </section>

      <section className="visit-section">
        <div className="container">
          <SectionHeading title="Prefer to talk to someone?" description="Reach out to Pastor Jordan directly." />
          <ContactLinks light />
        </div>
      </section>
    </>
  );
}