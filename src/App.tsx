import { usePath } from './router'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import About from './pages/About'
import Experience from './pages/Experience'

export default function App() {
  const path = usePath()

  if (path === '/projects') return <ProjectsPage />
  if (path === '/experience') return <Experience />
  if (path === '/about') return <About />
  return <Home />
}
