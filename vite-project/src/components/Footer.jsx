export function Footer() {
    return (
        <footer id="contact" className="bg-[#1d3027] px-page-gutter pt-14 pb-6 text-[#e9eee8]">

            <div className="mx-auto mb-12 grid w-full max-w-content grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-[1.2fr_.8fr_1fr] md:gap-8">

                <div className="col-auto sm:col-span-full md:col-auto">
                    <p className="mb-1 font-display text-[1.75rem] font-bold tracking-[-.05em] text-white">Bird <span className="text-[#a8c08f]">Watch</span></p>
                    <p className="mb-[.6rem] mt-0 text-[.9rem] text-[#c1cdc3] [overflow-wrap:anywhere]">Your Local Bird Photography Hub</p>
                </div>

                <div>
                    <h3 className="mb-3 mt-0 text-[.9rem] tracking-[.04em] text-white uppercase">Quick Links</h3>
                    <ul className="m-0 flex list-none flex-col items-start gap-[.35rem] p-0">
                        <li><a className="text-[.9rem] text-[#c1cdc3] no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms]" href="#hero">Home</a></li>
                        <li><a className="text-[.9rem] text-[#c1cdc3] no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms]" href="#gallery">Gallery</a></li>
                        <li><a className="text-[.9rem] text-[#c1cdc3] no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms]" href="#about">About</a></li>
                        <li><a className="text-[.9rem] text-[#c1cdc3] no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms]" href="#contact-form">Book a Shoot</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-3 mt-0 text-[.9rem] tracking-[.04em] text-white uppercase">Contact</h3>
                    <p className="mb-[.6rem] mt-0 text-[.9rem] text-[#c1cdc3] [overflow-wrap:anywhere]">Email: <a className="text-[.9rem] text-[#c1cdc3] no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms]" href="mailto:info@birdwatch.com">info@birdwatch.com</a></p>
                    <p className="mb-[.6rem] mt-0 text-[.9rem] text-[#c1cdc3] [overflow-wrap:anywhere]">Phone: <a className="text-[.9rem] text-[#c1cdc3] no-underline transition-colors duration-[160ms] hover:text-leaf motion-reduce:duration-[.01ms]" href="tel:+1234567890">(123) 456-7890</a></p>
                    <p className="mb-[.6rem] mt-0 text-[.9rem] text-[#c1cdc3] [overflow-wrap:anywhere]">Address: 123 Birdwatch Lane, Nature City, NC 12345</p>
                </div>

            </div>

            <p className="mx-auto mt-0 mb-0 w-full max-w-content border-t border-[rgb(255_255_255_/_16%)] pt-5 text-center text-[.8rem] text-[#aab8ad]">&copy; 2026 Bird Watch. Built as a learning project.</p>

        </footer>
    ) 
}