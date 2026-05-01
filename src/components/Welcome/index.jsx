import { PackageCheck } from 'lucide-react';

export default function Welcome({ name, onClick }) {
    return (
        <div className="w-full h-[100dvh] flex items-center justify-center fixed z-[6]">
            <div className="opacity-60 bg-black w-full h-full top-0 left-0 fixed"></div>
            <section className="z-[6] bg-white text-center rounded-lg py-8 px-4 max-w-[400px]">
                <div className="mx-auto w-[50px] h-[50px] bg-primary-subtle flex items-center justify-center rounded-full">
                    <PackageCheck size={25} color='var(--color-primary)' />
                </div>
                <h2 className="text-[var(--color-text)] mt-6 mb-4 font-bold">
                    Olá, <strong className="text-primary font-bold">{name}</strong>!
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
