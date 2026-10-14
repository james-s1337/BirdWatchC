export function Footer() {
    return (
        <footer id="contact">

            <div className="footer-grid">

                <div className="footer-brand">
                    <p className="footer-logo">Bird <span>Watch</span></p>
                    <p>Your Local Bird Photography Hub</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact-form">Book a Shoot</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>Email: <a href="mailto:info@birdwatch.com">info@birdwatch.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
                    <p>Address: 123 Birdwatch Lane, Nature City, NC 12345</p>
                </div>

            </div>

            <p>&copy; 2026 Bird Watch. Built as a learning project.</p>

        </footer>
    ) 
}