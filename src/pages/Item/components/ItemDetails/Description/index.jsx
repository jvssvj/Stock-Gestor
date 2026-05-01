export default function Description({ item }) {
  return (
    <section>
      <h3 className="text-2xl text-[var(--color-text)] mb-4">Descrição</h3>
      <p className="text-text-muted leading-6 break-words overflow-wrap-anywhere whitespace-normal">{item.description}</p>
    </section>
  );
}
