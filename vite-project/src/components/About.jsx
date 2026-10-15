export function About() {
    return (
        <section id="about" className="w-full bg-moss px-[max(clamp(1.25rem,5vw,4rem),calc((100%_-_1160px)_/_2))] py-[clamp(4rem,8vw,6.5rem)]">
            <article className="mx-auto grid w-full max-w-content grid-cols-1 items-stretch overflow-hidden bg-surface shadow-[0_1.25rem_3.5rem_rgb(30_41_36_/_10%)] md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
                <div className="self-center p-[clamp(2rem,5vw,4rem)]">
                    <p className="mb-3 text-[.75rem] font-bold tracking-[.14em] text-leaf uppercase">Photographer &amp; naturalist</p>
                    <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3.1rem)] font-normal leading-[1.15] tracking-[-.045em] text-forest">About Jamie Sint</h2>
                    <p className="m-0 max-w-[38rem] text-[1.05rem] text-[#435349]">Jamie Sint is a passionate bird photographer with over a decade of experience capturing the beauty of local bird species. Through his lens, he brings the vibrant colors and unique behaviors of birds to life, inspiring others to appreciate and protect our feathered friends.</p>
                </div>
                <img className="aspect-[4/3] min-h-0 w-full bg-moss object-cover object-[center_35%] md:aspect-auto md:min-h-96" src="/images/jamie-sint.avif" alt="Jamie Sint, bird photographer" loading="lazy"/>
            </article>
        </section>
    )
}