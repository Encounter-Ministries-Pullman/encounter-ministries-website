import { useState } from 'react';

function DeliveryNotice() {
  return <p className="form-status" role="status" aria-live="polite">Your form is ready, but online message delivery is not configured yet. Please call 509-715-1500 to reach the team.</p>;
}

export function PrayerForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form className="site-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      {submitted && <DeliveryNotice />}
      <label>Name (optional)<input name="name" autoComplete="name" /></label>
      <label>Email (optional)<input type="email" name="email" autoComplete="email" /></label>
      <label>Your request<textarea name="request" rows="4" required /></label>
      <label className="check-field"><input type="checkbox" name="private" value="yes" defaultChecked /> Keep this private to the prayer team</label>
      <button className="button button-dark" type="submit">Send prayer request</button>
    </form>
  );
}

const interestOptions = [
  'Visiting for the first time', 'Serving', 'Encounter Youth', 'Encounter Students',
  'Encounter WMN', 'Encounter Singles', 'Encounter Men', 'Encounter Marriages', 'Something else',
];

export function ConnectForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.email.value && !form.phone.value) {
      form.phone.setCustomValidity('Please add an email address or phone number.');
      form.reportValidity();
      return;
    }
    form.phone.setCustomValidity('');
    setSubmitted(true);
  }

  return (
    <form className="site-form" onSubmit={handleSubmit} onChange={(event) => event.target.setCustomValidity?.('')}>
      {submitted && <DeliveryNotice />}
      <label>Name<input name="name" required autoComplete="name" /></label>
      <div className="form-row">
        <label>Email<input type="email" name="email" autoComplete="email" /></label>
        <label>Phone<input type="tel" name="phone" autoComplete="tel" /></label>
      </div>
      <fieldset>
        <legend>I'm interested in</legend>
        <div className="interest-options">
          {interestOptions.map((interest) => (
            <label key={interest}><input type="checkbox" name="interest" value={interest} /> {interest}</label>
          ))}
        </div>
      </fieldset>
      <label>Anything else you'd like us to know? (optional)<textarea name="message" rows="4" /></label>
      <button className="button button-dark" type="submit">Send</button>
    </form>
  );
}