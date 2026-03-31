import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Services } from '@/components/landing/Services'
import { Differentials } from '@/components/landing/Differentials'
import { Segments } from '@/components/landing/Segments'
import { About } from '@/components/landing/About'
import { Contact } from '@/components/landing/Contact'
import { Footer } from '@/components/landing/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export default function HomePage() {
  return (
    <>
      <BackgroundAnimation />
      <Header />
      <main>
        <Hero />
        <Services />
        <Differentials />
        <Segments />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
