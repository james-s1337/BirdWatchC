export function BirdCard({ key, imageSrc, altText, birdName, location }) {
    return (
        <article className="bird-card" key={key}>
            <img className="bird-image" src={imageSrc} alt={altText} loading="lazy" />
            <h3>{birdName}</h3>
            <p>Captured in {location}</p>
        </article>
    );
}

