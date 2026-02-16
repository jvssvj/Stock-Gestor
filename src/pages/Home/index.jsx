import Card from "./components/Card";
import Header from "./components/header";
import styles from './index.module.css'

import { TrendingUp, ShieldCheck, Headset, WandSparkles, Settings ,ChartNoAxesColumn } from "lucide-react";

export default function Home() {
    return (
        <>
            <Header />
            <section className={styles.home}>
                <h1>Controle total do seu estoque, sem complexidade.</h1>
                <p> Centralize entradas, saídas e níveis de produtos em um só lugar. Tenha visão clara do que entra, do que sai e do que precisa de reposição. Reduza erros, evite perdas e tome decisões mais rápidas no dia a dia.</p>

                <button>Gerenciar estoque</button>
            </section>

            <main>
                <div className={styles.cards__container}> 
                    <Card 
                        color="blue" 
                        icon={TrendingUp} 
                        title="Escalabilidade" 
                        paragraph="Seu estoque cresce conosco. Nossa arquitetura suporta desde pequenos negócios até grandes centros de distribuição."
                    />

                    <Card 
                        color="green" 
                        icon={ShieldCheck} 
                        title="Segurança e Dados" 
                        paragraph="Suas informações são criptografadas e protegidas com os mais altos padrões de segurança cibernética do mercado."
                    />

                    <Card 
                        color="orange" 
                        icon={Headset} 
                        title="Suporte Especializado" 
                        paragraph="Atendimento humanizado e ágil por especialistas prontos para resolver qualquer dúvida operacional."
                    />

                    <Card 
                        color="purple" 
                        icon={WandSparkles} 
                        title="Interface Intuitiva" 
                        paragraph="Fácil de usar para todos. Design pensado na experiência do usuário para minimizar a curva de aprendizado."
                    />

                    <Card 
                        color="teal" 
                        icon={Settings} 
                        title="Automação de Processos" 
                        paragraph="Automatize tarefas repetitivas, reduza erros manuais e ganhe eficiência operacional no controle do estoque."
                    />

                    <Card 
                        color="red" 
                        icon={ChartNoAxesColumn} 
                        title="Relatórios em Tempo Real" 
                        paragraph="Acompanhe métricas vitais e tome decisões estratégicas com dados atualizados instantaneamente."
                    />
            </div>
            </main>

        </>
    )
}