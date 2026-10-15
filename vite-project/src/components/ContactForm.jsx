export function ContactForm() {
    return (
        <section id="contact-form" className="bg-paper px-page-gutter py-[clamp(4rem,8vw,6.5rem)]">
            <div className="mx-auto w-full max-w-[760px]">
                <h2 className="mb-3 font-display text-[clamp(2rem,4vw,3.1rem)] font-normal leading-[1.15] tracking-[-.045em] text-forest">Plan a Photo Shoot</h2>
                <p className="mb-8 mt-0 max-w-[42rem] text-muted">Tell us a little about yourself and when you would like to meet. Submitting the form opens your email app with the details ready to send.</p>
                <form action="mailto:james21s1337@gmail.com" method="post" encType="text/plain">
                    <div className="mb-6 grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
                        <div className="flex min-w-0 flex-col gap-[.45rem]">
                            <label className="text-[.9rem] font-bold text-forest" htmlFor="first-name">First name</label>
                            <input className="w-full min-w-0 rounded-[2px] border border-line bg-surface px-[.9rem] py-[.8rem] font-[inherit] text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)] focus-visible:outline-offset-1" id="first-name" name="First name" type="text" autoComplete="given-name" required/>
                        </div>
                        <div className="flex min-w-0 flex-col gap-[.45rem]">
                            <label className="text-[.9rem] font-bold text-forest" htmlFor="last-name">Last name</label>
                            <input className="w-full min-w-0 rounded-[2px] border border-line bg-surface px-[.9rem] py-[.8rem] font-[inherit] text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)] focus-visible:outline-offset-1" id="last-name" name="Last name" type="text" autoComplete="family-name" required/>
                        </div>
                        <div className="flex min-w-0 flex-col gap-[.45rem]">
                            <label className="text-[.9rem] font-bold text-forest" htmlFor="shoot-date">Preferred date</label>
                            <input className="w-full min-w-0 rounded-[2px] border border-line bg-surface px-[.9rem] py-[.8rem] font-[inherit] text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)] focus-visible:outline-offset-1" id="shoot-date" name="Preferred date" type="date" required/>
                        </div>
                        <div className="col-span-2 flex min-w-0 flex-col gap-[.45rem] max-[680px]:col-span-1">
                            <label className="text-[.9rem] font-bold text-forest" htmlFor="message">Message</label>
                            <textarea className="min-h-36 w-full min-w-0 resize-y rounded-[2px] border border-line bg-surface px-[.9rem] py-[.8rem] font-[inherit] text-ink focus-visible:border-leaf focus-visible:outline-[3px] focus-visible:outline-[rgb(102_132_90_/_20%)] focus-visible:outline-offset-1" id="message" name="Message" rows="5" required></textarea>
                        </div>
                    </div>
                    <button className="inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center rounded-[2px] border border-forest bg-forest px-[1.35rem] py-[.8rem] font-[inherit] font-bold text-white transition-[background-color,transform] duration-[160ms] hover:-translate-y-0.5 hover:bg-[#193a2c] motion-reduce:duration-[.01ms]" type="submit">Send Request</button>
                </form>
                <p className="mt-4 mb-0 text-[.82rem] text-muted [overflow-wrap:anywhere]">Your email app will open to send your message to <a className="text-forest underline-offset-2" href="mailto:info@birdwatch.com">info@birdwatch.com</a>.</p>
            </div>
        </section>
    )
}