import AnnouncementStrip from "@/components/announcement-strip"
import HeroSection from "@/components/hero-section"
import RegistrationForm from "@/components/registration-form"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import MeshOverlay from "@/components/mesh-overlay"

export default function Home() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#ffffff" }}>
      <MeshOverlay />
      <Navbar />
      <AnnouncementStrip />
      <HeroSection />
      <RegistrationForm />
      <Footer />
    </main>
  )
}