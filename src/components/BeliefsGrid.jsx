import { BeliefCard } from './BeliefCard.jsx';

export function BeliefsGrid({ beliefs }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {beliefs.map((belief, index) => (
        <BeliefCard key={belief.name} {...belief} index={index} />
      ))}
    </div>
  );
}