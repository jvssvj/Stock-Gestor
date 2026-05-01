export default function Information({ title, information, emphasis, inStatusCard }) {
  return (
    <div className={`flex items-start flex-col gap-[0.2rem] ${inStatusCard ? 'flex-row gap-2' : ''}`}>
      <span className="text-text-muted whitespace-nowrap">{title}</span>
      <span
        className={`text-[var(--color-text)] font-medium ${emphasis ? 'text-success break-all' : ''} ${inStatusCard ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''}`}
      >
        {information}
      </span>
    </div>
  );
}
