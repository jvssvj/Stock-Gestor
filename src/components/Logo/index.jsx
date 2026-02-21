import logoWhite from '@/assets/images/stockgestor-icon-white.png'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Logo({ label, color }) {
    return (
        <Link className={styles.logo} style={{ color: `var(--${color})` }} to={'/'}>
            <div>
                <img src={logoWhite} alt="" />
            </div>
            {label}
        </Link>
    )
}