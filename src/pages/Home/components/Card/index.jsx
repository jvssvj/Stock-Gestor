import styles from "./index.module.css";

export default function Card({ icon: Icon, title, paragraph, color }) {
  return (
    <div className={styles.card}>
      <div style={{backgroundColor: `var(--very-light-${color})`}} className="card__icon">
        <Icon color={`var(--${color})`} />
      </div>

      <h2>{title}</h2>
      <p>{paragraph}</p>
    </div>
  )
}
