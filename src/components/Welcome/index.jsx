import { PackageCheck } from 'lucide-react';
import styles from './index.module.css'

export default function Welcome({ name, onClick }) {
    return (
        <div className={styles.welcome__container}>
            <div className={styles.welcome__overlay}></div>
            <section className={styles.welcome__container__card}>
                <div className={styles.icon}>
                    <PackageCheck size={25} color='var(--blue)' />
                </div>
                <h2>Olá, <strong>{name}</strong>!</h2>
                <p>Estamos felizes em ter você por aqui. Agora você já pode começar a gerenciar seu estoque de forma simples e organizada.</p>
                <button onClick={onClick}>Começar</button>
            </section>
        </div>

    )
}