import { ArrowRight, CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import styles from './index.module.css'

export default function Subscriptions({ title, paragraph, price, benefits = [], buttonTitle, buttonLink, popular, enterprise }) {
    function formatPrice(price) {
        if (price === null) return 'Sob consulta'

        if (typeof price === 'number') {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(price)
        }

        return 'Sob consulta'
    }

    return (
        <section
            className={`${styles.subscriptions__card} 
                ${popular ? styles.subscriptions__card__popular : ''} 
                ${enterprise ? styles.subscriptions__card__enterprise : ''}`
            }
        >
            {popular && (
                <div className={styles.subscriptions__card__popular__tag}>
                    <span>Mais popular</span>
                </div>
            )}

            <h4>{title}</h4>
            <p>{paragraph}</p>

            {price === null ? (
                <strong>Sob consulta</strong>
            ) : (
                <strong>
                    {formatPrice(price)}
                    <span> /mês</span>
                </strong>
            )}

            <ul>
                {benefits.map((b) => (
                    <li key={b}>
                        <CircleCheck color="var(--green)" aria-hidden />
                        {b}
                    </li>
                ))}
            </ul>

            <Link className={styles.subscriptions__card__button} to={buttonLink}>
                {buttonTitle}
                {enterprise && (
                    <ArrowRight size={'20px'} />
                )}
            </Link>
        </section>
    )
}