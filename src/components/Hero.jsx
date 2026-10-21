export function Hero() {
    return (
        <section id="hero" className="hero-background relative flex min-h-[30rem] flex-col items-start justify-center overflow-hidden px-page-gutter py-[clamp(4rem,10vw,8rem)] md:min-h-[clamp(29rem,55vw,39rem)]">
            <h1 className="relative z-10 mb-5 max-w-[min(100%,44rem)] font-display text-[clamp(3rem,8vw,6rem)] font-normal leading-[.98] tracking-[-.065em] text-forest">Capture the <span className="text-leaf italic">Beauty</span> of Birds</h1>
            <p className="relative z-10 mb-8 max-w-[min(100%,44rem)] text-[clamp(1rem,1.7vw,1.15rem)] text-muted">Join us in exploring the world of bird photography. Discover tips, techniques, and stunning images from local bird enthusiast Jamie Sint.</p>
            <a href="#gallery" className="relative z-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-[2px] border border-forest bg-forest px-[1.35rem] py-[.8rem] text-[.9rem] font-bold text-white no-underline transition-[background-color,transform] duration-[160ms] hover:-translate-y-0.5 hover:bg-[#193a2c] motion-reduce:duration-[.01ms]">Explore Featured Gallery</a>
        </section>
    );
}