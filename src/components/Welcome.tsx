import Logo from './Logo';

interface WelcomeProps {
    firstName: string
    onClick: () => void
}

export default function Welcome({ firstName, onClick }: WelcomeProps) {
    return (
        <div className="w-full h-[100dvh] flex items-center justify-center fixed z-[6] right-0 top-0">
            <div className="opacity-70 bg-black w-full h-full top-0 left-0 fixed"></div>
            <section className="z-[6] bg-white text-center rounded-lg py-8 px-4 max-w-[400px]">
                <div className="mx-auto flex justify-center">
                    <Logo showLabel={false} />
                </div>
                <h2 className="text-text-main mt-6 mb-4 font-bold text-2xl">
                    Olá, <strong className="text-primary font-bold">{firstName}</strong>!
                </h2>
                <p className="text-text-muted leading-6">
                    Estamos felizes em ter você por aqui. Agora você já pode começar a gerenciar seu estoque de forma simples e organizada.
                </p>
                <button
                    onClick={onClick}
                    className="bg-primary text-white py-4 px-8 mt-8 rounded-[5rem] cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light active:scale-[0.92]"
                >
                    Começar
                </button>
            </section>
        </div>
    )
}
