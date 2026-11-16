import { CloudImage } from './CloudImage';

function getContactHref({ type, value }) {
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') return `tel:${value.replace(/[^\d+]/g, '')}`;
  return value;
}

export function LeadershipCard({ leader, image, imageStatus }) {
  const { name, role, description, imageAlt, contacts = [] } = leader;

  return (
    <article className="flex min-h-[37rem] min-w-0 max-w-[520px] flex-[1_1_340px] flex-col rounded-lg border border-line bg-paper p-5 max-[820px]:min-h-[42rem]">
      <div className="flex items-start gap-4">
        {image ? (
          <CloudImage
            className="block size-48 shrink-0 rounded-sm bg-surface-soft object-cover"
            image={image}
            alt={imageAlt || ''}
            sizes="192px"
            style={{ width: '192px', height: '192px', aspectRatio: '1 / 1' }}
          />
        ) : (
          <div className="size-48 shrink-0 rounded-sm bg-surface-soft" aria-hidden="true" />
        )}
        <div className="min-w-0 pt-1">
          <h3 className="m-0 font-display text-xl font-semibold leading-tight">{name}</h3>
          {role && <p className="mb-0 mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-sea-ink">{role}</p>}
        </div>
      </div>

      {imageStatus === 'error' && <p className="mb-0 mt-4 text-sm text-ink-muted" role="alert">Photo is temporarily unavailable.</p>}
      {imageStatus === 'ready' && !image && <p className="mb-0 mt-4 text-sm text-ink-muted" role="status">Photo is not listed.</p>}
      {description && <p className="mb-0 mt-5 border-t border-line pt-4 text-base leading-[1.6] text-ink-muted">{description}</p>}

      {contacts.length > 0 && (
        <dl className="mb-0 mt-5 grid gap-3 border-t border-line pt-4">
          {contacts.map(({ type, label, value }) => (
            <div className="grid gap-1" key={`${type}-${value}`}>
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">{label}</dt>
              <dd className="m-0 min-w-0 break-words font-medium">
                <a
                  className="text-secondary-ink no-underline hover:underline"
                  href={getContactHref({ type, value })}
                  target={type === 'website' ? '_blank' : undefined}
                  rel={type === 'website' ? 'noreferrer' : undefined}
                >
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}