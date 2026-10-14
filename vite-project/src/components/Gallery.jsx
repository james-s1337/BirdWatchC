import { useState } from 'react'
import { birds } from '../data/birds'
import { BirdCard } from './BirdCard'

const categories = ['all', 'songbirds', 'waterfowl', 'shorebirds', "birds of prey", 'tropical', 'flightless']

export function Gallery(){
    const [filter, setFilter] = useState('all')
    const filteredBirds = filter === 'all' ? birds : birds.filter(bird => bird.category === filter)
    return (
        <section id="gallery" className="gallery">
            <h2>This Week's Featured Birds</h2>
            <div className="filter-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={filter === category ? 'active' : ''}
                        onClick={() => setFilter(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <div className="gallery-grid">
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