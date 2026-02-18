import styles from "./index.module.css";

export default function Card({ icon: Icon, title, paragraph, color }) {
  return (
    <div className={styles.card}>
      <div style={{ backgroundColor: `var(--very-light-${color})` }} className="card__icon">
        <Icon color={`var(--${color})`} />
      </div>

      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  )
}
