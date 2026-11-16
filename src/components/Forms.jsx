import { useState } from 'react';
import { BUTTON_CLASSES } from '../constants.tsx';
import { useForm } from '@formspree/react';

const FORM_FIELD_CLASSES = 'mt-[0.3rem] block w-full rounded-lg border border-line bg-paper p-3 text-brand';
const FORM_TEXTAREA_CLASSES = 'mt-[0.3rem] block w-full resize-y rounded-lg border border-line bg-paper p-3 text-brand';
const FORM_LABEL_CLASSES = 'block text-[0.95rem] font-semibold';

function DeliveryNotice() {
  return <p 
    className="m-0 border-l-4 border-highlight bg-status-surface px-4 py-[0.9rem] font-semibold text-brand"
    role="status"
    aria-live="polite"
  >Thanks for reaching out! Your form has been submitted.</p>;
}

export function PrayerForm() {
  const [state, submitToFormspree] = useForm('mdeewege');

  return (
    <form className="grid gap-4" onSubmit={submitToFormspree}>
      {state.succeeded && <DeliveryNotice />}
      {state.errors?.length > 0 && <p className="m-0 border-l-4 border-highlight bg-status-surface px-4 py-[0.9rem] font-semibold text-brand" role="alert">There was a problem sending your message. Please try again.</p>}
      <label className={FORM_LABEL_CLASSES}>Name (optional)<input className={FORM_FIELD_CLASSES} name="name" autoComplete="name" /></label>
      <label className={FORM_LABEL_CLASSES}>Email (optional)<input className={FORM_FIELD_CLASSES} type="email" name="email" autoComplete="email" /></label>
      <label className={FORM_LABEL_CLASSES}>Your request<textarea className={FORM_TEXTAREA_CLASSES} name="request" rows="4" required /></label>
      <label className="flex items-center gap-[0.6rem] font-medium"><input className="accent-sea" type="checkbox" name="private" value="yes" defaultChecked /> Keep this private to the prayer team</label>
      <button className={BUTTON_CLASSES.submit} type="submit">Send prayer request</button>
    </form>
  );
}

const interestOptions = [
  'Visiting for the first time', 'Serving', 'Encounter Youth', 'Encounter Students',
  'Encounter WMN', 'Encounter Singles', 'Encounter Men', 'Encounter Marriages', 'Something else',
];

export function ConnectForm() {
  const [state, submitToFormspree] = useForm('mqppypab');

  function handleConnectSubmit(event) {
    const form = event.currentTarget;
    const email = form.elements.namedItem('email');
    const phone = form.elements.namedItem('phone');
    const missingContact = !email.value.trim() && !phone.value.trim();
    
    email.setCustomValidity(
      missingContact ? 'Please add an email or phone number.' : ''
    );

    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }

    submitToFormspree(event);
  }

  function clearContactValidity(event) {
    const form = event.currentTarget;
    form.elements.namedItem('email').setCustomValidity('');
    form.elements.namedItem('phone').setCustomValidity('');
  }

  return (
    <form className="grid gap-4" onSubmit={handleConnectSubmit} onChange={clearContactValidity}>
      {state.succeeded && <DeliveryNotice />}
      {state.errors?.length > 0 && <p className="m-0 border-l-4 border-highlight bg-status-surface px-4 py-[0.9rem] font-semibold text-brand" role="alert">There was a problem sending your message. Please try again.</p>}
      <label className={FORM_LABEL_CLASSES}>Name<input className={FORM_FIELD_CLASSES} name="name" required autoComplete="name" /></label>
      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <label className={FORM_LABEL_CLASSES}>Email<input className={FORM_FIELD_CLASSES} type="email" name="email" autoComplete="email" /></label>
        <label className={FORM_LABEL_CLASSES}>Phone<input className={FORM_FIELD_CLASSES} type="tel" name="phone" autoComplete="tel" /></label>
      </div>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-2 text-[0.95rem] font-semibold">I'm interested in</legend>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(205px,1fr))] gap-[0.6rem]">
          {interestOptions.map((interest) => (
            <label className="flex min-h-12 cursor-pointer items-center gap-[0.6rem] rounded-lg border border-line bg-paper px-[0.8rem] py-[0.6rem] font-medium" key={interest}><input className="accent-sea" type="checkbox" name="interest" value={interest} /> {interest}</label>
          ))}
        </div>
      </fieldset>
      <label className={FORM_LABEL_CLASSES}>Anything else you'd like us to know? (optional)<textarea className={FORM_TEXTAREA_CLASSES} name="message" rows="4" /></label>
      <button className={BUTTON_CLASSES.submit} type="submit" disabled={state.submitting}>{state.submitting ? 'Sending...' : 'Send'}</button>
    </form>
  );
}