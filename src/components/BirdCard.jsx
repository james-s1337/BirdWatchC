import Image from 'next/image'
import { SpottedToggle } from './SpottedToggle'

export function BirdCard({
    imageSrc,
    altText,
    birdName,
    location,
    price,
    currency,
    isSpotted,
    onSpottedChange,
    spottedDisabled,
    onOrder,
    ordering,
}) {
    return (
        <article className="group min-w-0 overflow-hidden bg-surface">
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-moss md:aspect-[4/3]">
                <Image
                    className="object-cover object-center transition-transform duration-[350ms] group-hover:scale-[1.035] motion-reduce:duration-[.01ms]"
                    src={imageSrc}
                    alt={altText}
                    fill
                    sizes="(max-width: 680px) 100vw, 50vw"
                />
            </div>
            <h3 className="mt-[1.1rem] mb-[.15rem] font-display text-[1.35rem] font-normal text-forest">{birdName}</h3>
            <p className="mt-0 mb-5 text-[.9rem] text-muted">Captured in {location}</p>
            <p className="mt-0 mb-3 text-sm font-semibold text-forest">
                {new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency,
                }).format(price / 100)}
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-leaf focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-60"
                    onClick={onOrder}
                    disabled={ordering}
                    aria-busy={ordering}
                >
                    {ordering ? 'Starting checkout...' : 'Order now'}
                </button>
                <SpottedToggle
                    value={isSpotted}
                    onChange={onSpottedChange}
                    disabled={spottedDisabled}
                />
            </div>
        </article>
    );
}
