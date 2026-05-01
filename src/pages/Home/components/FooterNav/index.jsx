import { Link } from 'react-router-dom'

export default function FooterNav({ title, links = [{ link: '', label: '' }] }) {
    return (
        <section>
            <h3 className="text-white text-xl mb-4">{title}</h3>
            <ul className="list-none">
                {links.map((link) => (
                    <li key={link.label} className="[&:not(:first-child)]:mt-4">
                        <a key={link.label} href={link.link} className="text-border no-underline text-sm">
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}
