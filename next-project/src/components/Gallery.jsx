"use client";

import { useState } from 'react'
import { birds } from '../data/birds'
import { BirdCard } from './BirdCard'

const categories = ['all', 'songbirds', 'waterfowl', 'shorebirds', "birds of prey", 'tropical', 'flightless']

export function Gallery(){
    const [filter, setFilter] = useState('all')
    const filteredBirds = filter === 'all' ? birds : birds.filter(bird => bird.category === filter)
    return (
        <section id="gallery" className="mx-auto w-full max-w-content px-page-gutter py-[clamp(4rem,8vw,6.5rem)]">
            <h2 className="mb-8 font-display text-[clamp(2rem,4vw,3.1rem)] font-normal leading-[1.15] tracking-[-.045em] text-forest">This Week&apos;s Featured Birds</h2>
            <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        aria-pressed={filter === category}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2 motion-reduce:duration-[.01ms] ${
                            filter === category
                                ? 'border-forest bg-forest text-white'
                                : 'border-line bg-surface text-muted hover:border-leaf hover:bg-moss hover:text-forest'
                        }`}
                        onClick={() => setFilter(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-[clamp(1.25rem,3vw,2rem)] md:grid-cols-2">
                {filteredBirds.map((bird, index) => (
                    <BirdCard
                        key={index}
                        imageSrc={bird.image}
                        altText={bird.alt}
                        birdName={bird.name}
                        location={bird.location}
                    />
                ))}
            </div>
        </section>
    )
}