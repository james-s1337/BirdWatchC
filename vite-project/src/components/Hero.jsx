export function Hero() {
    return (
        <section id="hero" className="relative flex min-h-[clamp(29rem,55vw,39rem)] flex-col items-start justify-center overflow-hidden bg-[image:linear-gradient(90deg,_rgb(237_241_232_/_98%)_0%,_rgb(237_241_232_/_92%)_48%,_rgb(36_74_58_/_30%)_100%),_radial-gradient(ellipse_at_85%_25%,_rgb(213_169_78_/_23%),_transparent_27rem),_url('/images/birds/bird-home.jpg')] bg-[length:auto,auto,cover] bg-[position:center,center,center_47%] bg-no-repeat px-page-gutter py-[clamp(4rem,10vw,8rem)] max-[680px]:min-h-[30rem]">
            <h1 className="relative z-10 mb-5 max-w-[min(100%,44rem)] font-display text-[clamp(3rem,8vw,6rem)] font-normal leading-[.98] tracking-[-.065em] text-forest">Capture the <span className="text-leaf italic">Beauty</span> of Birds</h1>
            <p className="relative z-10 mb-8 max-w-[min(100%,44rem)] text-[clamp(1rem,1.7vw,1.15rem)] text-muted">Join us in exploring the world of bird photography. Discover tips, techniques, and stunning images from local bird enthusiast Jamie Sint.</p>
            <a href="#gallery" className="relative z-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-[2px] border border-forest bg-forest px-[1.35rem] py-[.8rem] text-[.9rem] font-bold text-white no-underline transition-[background-color,transform] duration-[160ms] hover:-translate-y-0.5 hover:bg-[#193a2c] motion-reduce:duration-[.01ms]">Explore Featured Gallery</a>
        </section>
    );
}