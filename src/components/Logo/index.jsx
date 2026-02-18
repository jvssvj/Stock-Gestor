import logoWhite from '@/assets/images/stockgestor-icon-white.png'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Logo() {
    return (
        <Link className={styles.logo} to={'/'}>
            <div>
                <img src={logoWhite} alt="" />
            </div>
            Stock Gestor
        </Link>
    )
}