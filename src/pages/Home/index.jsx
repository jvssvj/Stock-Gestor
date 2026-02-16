import Header from "./components/header";
import styles from './index.module.css'

export default function Home() {
    return (
        <>
            <Header />
            <section className={styles.home}>
                <h1>Controle total do seu estoque, sem complexidade.</h1>
                <p> Centralize entradas, saídas e níveis de produtos em um só lugar. Tenha visão clara do que entra, do que sai e do que precisa de reposição. Reduza erros, evite perdas e tome decisões mais rápidas no dia a dia.</p>

                <button>Gerenciar estoque</button>
            </section>

            <main></main>
        </>
    )
}