import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function FooterNav({ title, links = [{ link: '', label: '' }] }) {
    return (
        <section className={styles.footer__content__info}>
            <h3>{title}</h3>
            <ul>
                {links.map((link) => (

                    <li key={link.label}>
                        <a key={link.label} href={link.link}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </section>
    )
}