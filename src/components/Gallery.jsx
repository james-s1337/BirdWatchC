"use client";

import { useEffect, useState } from 'react'
import { BirdCard } from './BirdCard'

const categories = ['all', 'songbirds', 'waterfowl', 'shorebirds', "birds of prey", 'tropical', 'flightless']

export function Gallery({ birds }){
    const [filter, setFilter] = useState('all')
    const [spottedBirdIds, setSpottedBirdIds] = useState(() => new Set())
    const [spottedStatus, setSpottedStatus] = useState('loading')
    const [spottedMessage, setSpottedMessage] = useState('')
    const [savingBirdIds, setSavingBirdIds] = useState(() => new Set())
    const [checkoutMessage, setCheckoutMessage] = useState('')
    const [checkoutBirdIds, setCheckoutBirdIds] = useState(() => new Set())
    const filteredBirds = filter === 'all' ? birds : birds.filter(bird => bird.category === filter)

    useEffect(() => {
        let isMounted = true

        function handleResponse(response) {
            if (response.status === 401) {
                if (isMounted) {
                    setSpottedBirdIds(new Set())
                    setSpottedStatus('signed-out')
                }
                return Promise.resolve()
            }

            if (!response.ok) {
                throw new Error('Unable to load your spotted birds.')
            }

            return response.json().then(({ birdIds }) => {
                if (!isMounted) {
                    return
                }
                setSpottedBirdIds(new Set(birdIds))
                setSpottedStatus('ready')
                setSpottedMessage('')
            })
        }

        function handleError(error) {
            if (!isMounted) {
                return
            }
            setSpottedStatus('error')
            setSpottedMessage(error.message || 'Unable to load your spotted birds.')
        }

        function reloadSpottedBirds() {
            fetch('/api/spotted')
                .then(handleResponse)
                .catch(handleError)
        }

        fetch('/api/spotted')
            .then(handleResponse)
            .catch(handleError)
        window.addEventListener('birdwatch:auth-change', reloadSpottedBirds)
        return () => {
            isMounted = false
            window.removeEventListener('birdwatch:auth-change', reloadSpottedBirds)
        }
    }, [])

    async function updateSpotted(birdId, spotted) {
        setSpottedMessage('')
        setSavingBirdIds((current) => new Set(current).add(birdId))

        try {
            const response = await fetch('/api/spotted', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ birdId, spotted }),
            })

            if (response.status === 401) {
                setSpottedStatus('signed-out')
                setSpottedMessage('Sign in to save your spotted birds.')
                return
            }
            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || 'Unable to save this sighting.')
            }

            setSpottedBirdIds((current) => {
                const updated = new Set(current)
                if (spotted) {
                    updated.add(birdId)
                } else {
                    updated.delete(birdId)
                }
                return updated
            })
            setSpottedStatus('ready')
        } catch (error) {
            setSpottedMessage(error.message || 'Unable to save this sighting.')
        } finally {
            setSavingBirdIds((current) => {
                const updated = new Set(current)
                updated.delete(birdId)
                return updated
            })
        }
    }

    async function startCheckout(birdId) {
        setCheckoutMessage('')
        setCheckoutBirdIds((current) => new Set(current).add(birdId))

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ birdId }),
            })
            const result = await response.json()

            if (!response.ok) {
                throw new Error(
                    response.status === 401
                        ? 'Sign in before ordering.'
                        : result.error || 'Unable to start checkout.',
                )
            }

            if (typeof result.checkoutUrl !== 'string') {
                throw new Error('Checkout did not return a Stripe URL.')
            }

            window.location.assign(result.checkoutUrl)
        } catch (error) {
            setCheckoutMessage(error.message || 'Unable to start checkout.')
            setCheckoutBirdIds((current) => {
                const updated = new Set(current)
                updated.delete(birdId)
                return updated
            })
        }
    }

    return (
        <section id="gallery" className="mx-auto w-full max-w-content px-page-gutter py-[clamp(4rem,8vw,6.5rem)]">
            <h2 className="mb-8 font-display text-[clamp(2rem,4vw,3.1rem)] font-normal leading-[1.15] tracking-[-.045em] text-forest">This Week&apos;s Featured Birds</h2>
            {spottedStatus === 'signed-out' && (
                <p className="mb-5 mt-0 text-sm text-muted" role="status">
                    Sign in to save your spotted birds.
                </p>
            )}
            {spottedMessage && (
                <p className="mb-5 mt-0 text-sm text-red-800" role="alert">
                    {spottedMessage}
                </p>
            )}
            {checkoutMessage && (
                <p className="mb-5 mt-0 text-sm text-red-800" role="alert">
                    {checkoutMessage}
                </p>
            )}
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
                {filteredBirds.map((bird) => (
                    <BirdCard
                        key={bird.id}
                        imageSrc={bird.image}
                        altText={bird.alt}
                        birdName={bird.name}
                        location={bird.location}
                        price={bird.price}
                        currency={bird.currency}
                        onOrder={() => startCheckout(bird.id)}
                        ordering={checkoutBirdIds.has(bird.id)}
                        isSpotted={spottedBirdIds.has(bird.id)}
                        onSpottedChange={(spotted) => updateSpotted(bird.id, spotted)}
                        spottedDisabled={
                            spottedStatus !== 'ready' || savingBirdIds.has(bird.id)
                        }
                    />
                ))}
            </div>
        </section>
    )
}