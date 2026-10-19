import { useState } from 'react'
import Image from 'next/image'
import { SpottedToggle } from './SpottedToggle'

export function BirdCard({ imageSrc, altText, birdName, location }) {
    const [isSpotted, setIsSpotted] = useState(false);

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
            <SpottedToggle value={isSpotted} onChange={setIsSpotted} />
        </article>
    );
}
