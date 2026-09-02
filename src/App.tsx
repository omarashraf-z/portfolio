import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { ProjectPage } from './pages/ProjectPage'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

/** Land at the top of every route change — the router does not do this itself. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <ScrollToTop />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
