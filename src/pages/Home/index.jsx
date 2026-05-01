import { Link } from "react-router-dom";
import Card from "./components/Card";
import Header from "./components/Header";
import Subscriptions from "./components/Subscriptions";
import styles from './index.module.css'
import { TrendingUp, ShieldCheck, Headset, WandSparkles, Settings, ChartNoAxesColumn, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <>
            <Header />
            <section
                id="home"
                className="text-start flex flex-col items-center justify-center p-4 min-h-[calc(100dvh-70px)] bg-white max-[720px]:min-h-[calc(100dvh+70px)]"
            >
                <div className="w-full max-w-[var(--container-max-width)]">
                    <span className="w-max flex items-center gap-2 bg-primary-subtle border border-primary text-primary py-[0.6rem] px-4 rounded-[2rem] mb-6">
                        <div className={styles.home__slug__dot}></div>
                        Gestão de estoque simplificada
                    </span>
                    <h1 className="w-full max-w-[700px] text-[5rem] text-[var(--color-text)] leading-[1em] max-[740px]:text-4xl">
                        Controle total do seu <strong className="text-primary font-bold">estoque</strong>, em um só lugar.
                    </h1>
                    <p className="my-4 mb-8 max-w-[700px] text-text-muted text-xl leading-7 max-[740px]:text-base">
                        Elimine planilhas complexas e erros de inventário. Gerencie produtos, acompanhe movimentações e tome decisões inteligentes com dados em tempo real.
                    </p>

                    <div className="flex items-center gap-4 max-[440px]:flex-col">
                        <a
                            className="py-4 px-8 rounded-lg cursor-pointer transition-all duration-200 ease-in-out no-underline flex items-center gap-2 active:scale-[0.92] bg-primary text-white hover:bg-primary-light max-[440px]:w-full"
                            href="/dashboard"
                        >
                            Gerenciar estoque <ArrowRight size={'20px'} />
                        </a>
                        <a
                            className="py-4 px-8 rounded-lg cursor-pointer transition-all duration-200 ease-in-out no-underline flex items-center gap-2 active:scale-[0.92] text-[var(--color-text)] border border-border hover:border-text-muted max-[440px]:w-full"
                            href="#subscriptions"
                        >
                            Ver planos
                        </a>
                    </div>
                </div>
            </section>

            <main className="flex items-center justify-center flex-col bg-white py-12 px-4">
                <h2 className="text-4xl text-[var(--color-text)] text-center max-[440px]:text-2xl">Tudo o que você precisa para gerenciar seu estoque</h2>
                <p className="text-text-muted my-4 mb-8 text-center">Recursos essenciais para controle, segurança e crescimento do seu negócio.</p>
                <div className="w-full max-w-[var(--container-max-width)] grid grid-cols-3 gap-6 max-[1280px]:grid-cols-2 max-[560px]:grid-cols-1">
                    <Card
                        bgColor="var(--color-primary-subtle)"
                        iconColor={"var(--color-primary)"}
                        icon={TrendingUp}
                        title="Escalabilidade"
                        paragraph="Seu estoque cresce conosco. Nossa arquitetura suporta desde pequenos negócios até grandes centros de distribuição."
                    />
                    <Card
                        bgColor="var(--color-success-subtle)"
                        iconColor={"var(--color-success)"}
                        icon={ShieldCheck}
                        title="Segurança e Dados"
                        paragraph="Suas informações são criptografadas e protegidas com os mais altos padrões de segurança cibernética do mercado."
                    />
                    <Card
                        bgColor="var(--color-warning-subtle)"
                        iconColor={"var(--color-warning)"}
                        icon={Headset}
                        title="Suporte Especializado"
                        paragraph="Atendimento humanizado e ágil por especialistas prontos para resolver qualquer dúvida operacional."
                    />
                    <Card
                        bgColor="var(--color-purple-subtle)"
                        iconColor={"var(--color-purple)"}
                        icon={WandSparkles}
                        title="Interface Intuitiva"
                        paragraph="Fácil de usar para todos. Design pensado na experiência do usuário para minimizar a curva de aprendizado."
                    />
                    <Card
                        bgColor="var(--color-teal-subtle)"
                        iconColor={"var(--color-teal)"}
                        icon={Settings}
                        title="Automação de Processos"
                        paragraph="Automatize tarefas repetitivas, reduza erros manuais e ganhe eficiência operacional no controle do estoque."
                    />
                    <Card
                        bgColor="var(--color-danger-subtle)"
                        iconColor={"var(--color-danger)"}
                        icon={ChartNoAxesColumn}
                        title="Relatórios em Tempo Real"
                        paragraph="Acompanhe métricas vitais e tome decisões estratégicas com dados atualizados instantaneamente."
                    />
                </div>
            </main>

            <section id="subscriptions" className="py-8 px-4 flex items-center justify-center flex-col bg-off-white">
                <h2 className="text-center text-4xl font-bold max-[440px]:text-2xl">Escolha o plano ideal para seu negócio</h2>
                <p className="text-center text-text-muted my-2 mb-12">Sem taxas ocultas. Cancele quando quiser. Todos os planos incluem 14 dias de teste grátis.</p>

                <div className="grid grid-cols-3 w-full max-w-[var(--container-max-width)] gap-6 max-[1280px]:grid-cols-1 max-[1280px]:gap-8">
                    <Subscriptions
                        title={"Free"}
                        paragraph={"Ideal para pequenos negócios com recursos básicos."}
                        price={0}
                        benefits={["Até 100 produtos", "Gestão de estoque simples", "1 usuário", "Suporte por comunidade"]}
                        buttonTitle={"Selecionar"}
                        buttonLink={'/dashboard'}
                    />
                    <Subscriptions
                        title={"Pro"}
                        paragraph={"O plano ideal para negócios em crescimento que precisam de controle total e decisões rápidas."}
                        price={49}
                        benefits={["Produtos ilimitados", "Controle de estoque em tempo real", "Multi-filiais e múltiplos depósitos", "Até 5 usuários com permissões", "Relatórios avançados e exportação", "Alertas de estoque baixo", "Histórico de movimentações", "Suporte prioritário"]}
                        buttonTitle={"Selecionar"}
                        buttonLink={'/dashboard'}
                        popular
                    />
                    <Subscriptions
                        title={"Enterprise"}
                        paragraph={"Para grandes centros de distribuição e customização."}
                        price={null}
                        benefits={["Produtos e usuários ilimitados", "Multi-filiais e múltiplos centros de distribuição", "Relatórios personalizados", "Integrações sob medida (ERP, BI, APIs)", "Automações avançadas de estoque", "Permissões e auditoria de usuários", "SLA dedicado", "Suporte técnico especializado"]}
                        buttonTitle={"Falar com vendas"}
                        buttonLink={'/dashboard'}
                        enterprise
                    />
                </div>
                <p className="text-text-muted my-12 text-center">
                    Precisa de algo diferente?{' '}
                    <Link className="text-primary no-underline">Entre em contato</Link>
                    {' '}para um plano personalizado.
                </p>
            </section>

            <footer className="bg-[var(--color-text)] flex items-start justify-center py-16 px-4">
                <div className="flex items-center justify-center w-full max-w-[var(--container-max-width)] flex-col">
                    <div className="w-full flex items-center justify-between text-center max-[740px]:flex-col max-[740px]:justify-center max-[740px]:gap-8">
                        <p className="text-border max-[440px]:text-xs">&copy; 2026 Stock Gestor. Todos os direitos reservados.</p>
                        <p className="max-[440px]:text-xs">Feito com 💙 e código</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
