export function BirdCard({ imageSrc, altText, birdName, location }) {
    return (
        <article className="group min-w-0 overflow-hidden bg-surface">
            <img className="aspect-[4/3] w-full bg-moss object-cover object-center transition-transform duration-[350ms] group-hover:scale-[1.035] motion-reduce:duration-[.01ms] max-[680px]:aspect-[5/4]" src={imageSrc} alt={altText} loading="lazy" />
            <h3 className="mt-[1.1rem] mb-[.15rem] font-display text-[1.35rem] font-normal text-forest">{birdName}</h3>
            <p className="mt-0 mb-5 text-[.9rem] text-muted">Captured in {location}</p>
        </article>
    );
}
