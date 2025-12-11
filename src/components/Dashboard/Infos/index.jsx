import React from "react";
import styles from "./index.module.css";

export default function Infos({ iconElement, title, quantity, iconClass }) {
  const styledIcon = React.cloneElement(iconElement, {
    className: styles[iconClass] || styles.icon__default,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title__container}>
        {styledIcon}
        <span className={styles.title}>{title}</span>
      </div>
      <span className={styles.quantity}>{quantity}</span>
    </div>
  );
}
