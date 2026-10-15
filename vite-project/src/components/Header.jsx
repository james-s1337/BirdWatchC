export function Header() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-6 border-b border-[rgb(30_41_36_/_8%)] bg-paper px-page-gutter max-[680px]:items-start max-[680px]:flex-col max-[680px]:gap-[.4rem] max-[680px]:pt-4 max-[680px]:pb-[.6rem]">
        <h1 className="m-0 shrink-0 font-display text-[1.7rem] font-bold tracking-[-.06em] text-forest">Bird <span className="text-leaf">Watch</span></h1>
        <nav className="max-[680px]:w-full max-[680px]:max-w-full">
            <ul className="m-0 flex list-none flex-wrap items-center gap-[clamp(1rem,3vw,2.25rem)] p-0 max-[680px]:gap-x-[clamp(1rem,6vw,1.75rem)] max-[680px]:gap-y-[.4rem] max-[420px]:gap-x-4">
                <li><a className="inline-block py-2 text-[.9rem] font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] max-[680px]:text-[.85rem]" href="#hero">Home</a></li>
                <li><a className="inline-block py-2 text-[.9rem] font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] max-[680px]:text-[.85rem]" href="#gallery">Gallery</a></li>
                <li><a className="inline-block py-2 text-[.9rem] font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] max-[680px]:text-[.85rem]" href="#about">About</a></li>
                <li><a className="inline-block py-2 text-[.9rem] font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] max-[680px]:text-[.85rem]" href="#contact-form">Book a Shoot</a></li>
            </ul>
        </nav>
    </header>
  )
}