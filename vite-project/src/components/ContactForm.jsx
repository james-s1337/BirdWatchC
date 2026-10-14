export function ContactForm() {
    return (
        <section id="contact-form" className="contact-form">
            <div className="contact-form-content">
                <h2>Plan a Photo Shoot</h2>
                <p className="contact-form-intro">Tell us a little about yourself and when you would like to meet. Submitting the form opens your email app with the details ready to send.</p>
                <form action="mailto:james21s1337@gmail.com" method="post" enctype="text/plain">
                    <div className="contact-form-fields">
                        <div className="form-field">
                            <label for="first-name">First name</label>
                            <input id="first-name" name="First name" type="text" autocomplete="given-name" required/>
                        </div>
                        <div className="form-field">
                            <label for="last-name">Last name</label>
                            <input id="last-name" name="Last name" type="text" autocomplete="family-name" required/>
                        </div>
                        <div className="form-field">
                            <label for="shoot-date">Preferred date</label>
                            <input id="shoot-date" name="Preferred date" type="date" required/>
                        </div>
                        <div className="form-field form-field-message">
                            <label for="message">Message</label>    
                            <textarea id="message" name="Message" rows="5" required></textarea>
                        </div>
                    </div>
                    <button className="btn" type="submit">Send Request</button>
                </form>
                <p className="contact-form-note">Your email app will open to send your message to <a href="mailto:info@birdwatch.com">info@birdwatch.com</a>.</p>
            </div>
        </section>
    )
}