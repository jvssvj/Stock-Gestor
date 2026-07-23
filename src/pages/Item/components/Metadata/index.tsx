interface MetadataProps {
  formattedDate: string
  formattedUpdateDate: string
}

export default function Metadata({ formattedDate, formattedUpdateDate }: MetadataProps) {
  return (
    <section>
      <h3 className="text-2xl text-[var(--color-text)] mb-4">Metadados</h3>
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center flex-wrap gap-[0.2rem]">
          <span className="text-text-muted whitespace-nowrap min-w-[150px]">Data de adição:</span>
          <span className="text-[var(--color-text)] font-medium overflow-hidden text-ellipsis">{formattedDate}</span>
        </div>
        <div className="w-full flex justify-between items-center flex-wrap gap-[0.2rem]">
          <span className="text-text-muted whitespace-nowrap min-w-[150px]">Última modificação:</span>
          <span className="text-[var(--color-text)] font-medium overflow-hidden text-ellipsis">{formattedUpdateDate}</span>
        </div>
      </div>
    </section>
  );
}
