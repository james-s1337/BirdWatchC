export function Header() {
  return (
    <header className="flex min-h-28 flex-col items-start justify-between gap-3 border-b border-[rgb(30_41_36_/_8%)] bg-paper px-page-gutter pt-5 pb-4 md:min-h-24 md:flex-row md:items-center md:gap-6 md:pt-0 md:pb-0 lg:min-h-20">
        <h1 className="m-0 shrink-0 font-display text-3xl font-bold tracking-[-.06em] text-forest md:text-3xl lg:text-[1.7rem]">Bird <span className="text-leaf">Watch</span></h1>
        <nav className="w-full max-w-full md:w-auto md:max-w-none">
            <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-[.4rem] p-0 sm:gap-x-[clamp(1rem,6vw,1.75rem)] md:gap-x-[clamp(1rem,3vw,2.25rem)] md:gap-y-0">
                <li><a className="inline-block py-2 text-base font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] md:text-base lg:text-[.9rem]" href="#hero">Home</a></li>
                <li><a className="inline-block py-2 text-base font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] md:text-base lg:text-[.9rem]" href="#gallery">Gallery</a></li>
                <li><a className="inline-block py-2 text-base font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] md:text-base lg:text-[.9rem]" href="#about">About</a></li>
                <li><a className="inline-block py-2 text-base font-semibold text-muted no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms] md:text-base lg:text-[.9rem]" href="#contact-form">Book a Shoot</a></li>
            </ul>
        </nav>
    </header>
  )
}