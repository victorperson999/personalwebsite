import { usePath } from './router'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'

export default function App() {
  const path = usePath()

  if (path === '/projects') return <ProjectsPage />
  return <Home />
}
