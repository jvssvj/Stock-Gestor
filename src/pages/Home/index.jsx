import { Link } from "react-router-dom";
import Card from "./components/Card";
import Header from "./components/Header";
import Subscriptions from "./components/Subscriptions";
import styles from './index.module.css'
import { TrendingUp, ShieldCheck, Headset, WandSparkles, Settings, ChartNoAxesColumn, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import FooterNav from "./components/FooterNav";

export default function Home() {
    return (
        <>
            <Header />
            <section id="home" className={styles.home}>
                <div className={styles.home__content}>
                    <span className={styles.home__slug}>
                        <div className={styles.home__slug__dot}></div>
                        Gestão de estoque simplificada
                    </span>
                    <h1>Controle total do seu <strong>estoque</strong>, em um só lugar.</h1>
                    <p>Elimine planilhas complexas e erros de inventário. Gerencie produtos, acompanhe movimentações e tome decisões inteligentes com dados em tempo real.</p>

                    <div className={styles.home__buttons__container}>
                        <Link className={styles.home__manage__stock__button}>
                            Gerenciar estoque <ArrowRight size={'20px'} />
                        </Link>
                        <Link className={styles.home__view__plans__button}>Ver planos</Link>
                    </div>
                </div>
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

            <section id="subscriptions" className={styles.subscriptions}>
                <h2>Escolha o plano ideal para seu negócio</h2>
                <p className={styles.subscriptions__paragraph}>Sem taxas ocultas. Cancele quando quiser. Todos os planos incluem 14 dias de teste grátis.</p>

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
                <p className={styles.subscriptions__contact}>Precisa de algo diferente? <Link className={styles.subscriptions__contact__link}>Entre em contato</Link> para um plano personalizado.</p>
            </section>
            <footer className={styles.footer}>
                <div className={styles.footer__content}>
                    <div className={styles.footer__content__nav}>
                        <div className={styles.footer__content__nav__logo}>
                            <Logo color={'white'} label={"Stock Gestor"} />
                            <p>Simplificando a gestão de estoque para empresas que querem crescer.</p>
                        </div>
                        <FooterNav
                            title={'Produto'}
                            links={[
                                { label: 'Funcionalidades', link: '#features' },
                                { label: 'Integrações', link: '#integrations' },
                                { label: 'Preços', link: '#subscriptions' },
                                { label: 'Atualizações', link: '#updates' },
                            ]}
                        />
                        <FooterNav
                            title={'Empresa'}
                            links={[
                                { label: 'Sobre nós', link: '#about' },
                                { label: 'Blog', link: '#blog' },
                                { label: 'Carreiras', link: '#carrers' },
                                { label: 'Contato', link: '#contact' },
                            ]}
                        />
                        <FooterNav
                            title={'Suporte'}
                            links={[
                                { label: 'Central de ajuda', link: '#help-center' },
                                { label: 'Documentação', link: '#documentation' },
                                { label: 'Status', link: '#status' },
                                { label: 'Termos de uso', link: '#terms-of-use' },
                            ]}
                        />
                    </div>

                    <hr className={styles.line} />

                    <div className={styles.footer__content__copy}>
                        <p>&copy; 2026 Stock Gestor. Todos os direitos reservados.</p>

                        <div>
                            <Link>Privacidade</Link>
                            <Link>Termos</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}