import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/layout/ScrollToTop'

// Pages
import HomePage from '@/pages/HomePage'
import WorkPage from '@/pages/WorkPage'
import ProcessPage from '@/pages/ProcessPage'
import JournalPage from '@/pages/JournalPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
