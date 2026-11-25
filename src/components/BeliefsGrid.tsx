import { BeliefCard, type Belief } from './BeliefCard';

export function BeliefsGrid({ beliefs }: { beliefs: readonly Belief[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {beliefs.map((belief, index) => (
        <BeliefCard key={belief.name} {...belief} index={index} />
      ))}
    </div>
  );
}