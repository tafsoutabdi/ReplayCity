export default function ScoreBadge({ score, priorite }) {
  const color =
    priorite === 'Prioritaire'
      ? 'bg-red-100 text-red-600'
      : priorite === 'Potentiel'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-600';

  const dot =
    priorite === 'Prioritaire'
      ? 'bg-red-500'
      : priorite === 'Potentiel'
      ? 'bg-green-500'
      : 'bg-gray-400';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {score} {priorite}
    </span>
  );
}
