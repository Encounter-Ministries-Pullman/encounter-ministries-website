const BORDER_COLORS = ["sea", "brand", "highlight"];

function cycleBorderColors(index) {
    const classname = `min-h-[150px] rounded border-t-4 border-${BORDER_COLORS[index % BORDER_COLORS.length]} bg-paper p-6`;
    return classname;
}

export function BeliefCard({ name, description, scriptures, index = 0 }) {
    return (
        <article className={cycleBorderColors(index)}>
            <h3 className="mb-[0.4rem] font-display text-xl font-semibold">{name}</h3>
            <p className="m-0 text-base text-ink-muted">{description}</p>
            {scriptures && <p className="mb-0 mt-3 border-t border-line pt-3 text-sm text-ink-muted">{scriptures}</p>}
        </article>
    );
}