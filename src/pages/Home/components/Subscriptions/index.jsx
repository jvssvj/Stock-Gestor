import { ArrowRight, CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";

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
            className={`bg-white w-full py-8 px-4 rounded-2xl border border-border flex flex-col ${popular ? 'bg-text-main relative' : ''} ${enterprise ? '' : ''}`}
        >
            {popular && (
                <div className="absolute left-0 top-[-0.6rem] text-center w-full">
                    <span className="bg-primary py-2 px-4 rounded-[2rem] text-white">Popular</span>
                </div>
            )}

            <h3 className="text-2xl text-text-main">{title}</h3>
            <p className="my-2 mb-4 text-text-muted">{paragraph}</p>

            {price === null ? (
                <strong className="text-[2rem] text-text-main">Sob consulta</strong>
            ) : (
                <strong className="text-[2rem] text-text-main">
                    {formatPrice(price)}
                    <span className="font-normal text-text-muted text-base"> /mês</span>
                </strong>
            )}

            <ul className="list-none my-4 mb-8">
                {benefits.map((b) => (
                    <li key={b} className={`flex items-center gap-2 text-text-muted [&:not(:first-child)]:mt-2 max-[420px]:text-sm`}>
                        <CircleCheck color="var(--color-success)" aria-hidden />
                        {b}
                    </li>
                ))}
            </ul>

            <Link
                className={`flex items-center justify-center gap-2 mt-auto py-4 px-8 rounded-lg no-underline transition-all duration-200 ease-in-out h-[54px] active:scale-[0.97] ${popular
                    ? 'text-white bg-primary border border-primary'
                    : enterprise
                        ? 'text-white bg-text-main border border-textbg-text-main hover:text-texthover:bg-transparent'
                        : 'bg-primary text-white'
                    }`}
                to={buttonLink}
            >
                {buttonTitle}
                {enterprise && <ArrowRight size={'20px'} />}
            </Link>
        </section>
    )
}
