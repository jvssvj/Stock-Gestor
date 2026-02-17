import Card from "./components/Card";
import Header from "./components/header";
import Subscriptions from "./components/Subscriptions";
import styles from './index.module.css'

import { TrendingUp, ShieldCheck, Headset, WandSparkles, Settings, ChartNoAxesColumn } from "lucide-react";

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
                <h2>Tudo o que você precisa para gerenciar seu estoque</h2>
                <p>Recursos essenciais para controle, segurança e crescimento do seu negócio.</p>
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

            <section className={styles.subscriptions}>
                <h3>Escolha o plano ideal para seu negócio</h3>
                <p>Sem taxas ocultas. Cancele quando quiser. Todos os planos incluem 14 dias de teste grátis.</p>

                <div>
                    <Subscriptions
                        title={"Free"}
                        paragraph={"Ideal para pequenos negócios com recursos básicos."}
                        price={0}
                        benefits={[
                            "Até 100 produtos",
                            "Gestão de estoque simples",
                            "1 usuário",
                            "Suporte por comunidade"
                        ]}
                        buttonTitle={"Selecionar"}
                    />
                    <Subscriptions
                        title={"Pro"}
                        paragraph={"O plano ideal para negócios em crescimento que precisam de controle total e decisões rápidas."}
                        price={49}
                        benefits={[
                            "Produtos ilimitados",
                            "Controle de estoque em tempo real",
                            "Multi-filiais e múltiplos depósitos",
                            "Até 5 usuários com permissões",
                            "Relatórios avançados e exportação",
                            "Alertas de estoque baixo",
                            "Histórico de movimentações",
                            "Suporte prioritário"
                        ]}
                        buttonTitle={"Selecionar"}
                        popular
                    />
                    <Subscriptions
                        title={"Enterprise"}
                        paragraph={"Para grandes centros de distribuição e customização."}
                        price={null}
                        benefits={[
                            "Produtos e usuários ilimitados",
                            "Multi-filiais e múltiplos centros de distribuição",
                            "Relatórios personalizados",
                            "Integrações sob medida (ERP, BI, APIs)",
                            "Automações avançadas de estoque",
                            "Permissões e auditoria de usuários",
                            "SLA dedicado",
                            "Suporte técnico especializado"
                        ]}
                        buttonTitle={"Falar com vendas"}
                        enterprise
                    />
                </div>
            </section>
        </>
    )
}