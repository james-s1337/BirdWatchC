import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Gallery } from './components/Gallery'
import { About } from './components/About'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'

function App({ birds }) {
  return (
    <div>
      <Header />
      <Hero />
      <Gallery birds={birds} />
      <About />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default App
