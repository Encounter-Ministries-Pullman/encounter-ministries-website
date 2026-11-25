import { CHURCH_CONTACT } from '../constants/site';

export function PageFooter() {
  return (
    <footer className="bg-brand-deep py-10 text-[0.95rem] text-paper-muted">
      <div className="relative mx-auto flex w-[calc(100%-3rem)] max-w-265 flex-wrap justify-between gap-8 max-[820px]:w-[calc(100%-2rem)] max-[520px]:flex-col max-[520px]:gap-4">
        <p className="m-0">{CHURCH_CONTACT.name}<br />{CHURCH_CONTACT.address}, {CHURCH_CONTACT.city}, {CHURCH_CONTACT.state} <span aria-hidden="true">|</span> {CHURCH_CONTACT.phone}</p>
        <div className="flex gap-4">
          <a className="text-paper" href="https://www.facebook.com/EMPalouse/" target="_blank" rel="noreferrer">Facebook</a>
          <a className="text-paper" href="https://www.youtube.com/channel/UCECIy1zJmZWYAqKruTIBB-w/videos" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
