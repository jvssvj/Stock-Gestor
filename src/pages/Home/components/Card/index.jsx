import styles from "./index.module.css";

export default function Card({ icon: Icon, title, paragraph, bgColor, iconColor }) {
  return (
    <div className={styles.card}>
      <div style={{ backgroundColor: bgColor }} className="card__icon">
        <Icon color={iconColor} />
      </div>

      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  )
}
