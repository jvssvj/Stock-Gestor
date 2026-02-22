import logoWhite from '@/assets/images/stockgestor-icon-white.png'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Logo({ label, color, size }) {
    return (
        <Link className={styles.logo} style={{ color: `var(--${color})` }} to={'/'}>
            <div style={{ color: `var(--${color})`, width: `${size}px`, height: `${size}px` }}>
                <img src={logoWhite} alt="" />
            </div>
            {label}
        </Link>
    )
}