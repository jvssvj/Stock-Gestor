import { Navbar } from "./components/Navbar";
import { Logos } from "./components/Logos";
import { Features } from "./components/Features";
import { Workflow } from "./components/Workflow";
import { Stats } from "./components/Stats";
import { Pricing } from "./components/Pricing";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";


export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Logos />
                <Features />
                <Workflow />
                <Stats />
                <Pricing />
                <CTA />
            </main>
            <Footer />
        </>
    );
}