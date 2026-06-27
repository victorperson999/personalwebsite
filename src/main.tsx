import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource-variable/space-grotesk'
import './index.css'

// Experiment gate: visit /#lab to preview the 3D hero prototypes. The lab is
// lazy-loaded so it stays out of the live bundle. Remove this block and
// src/experiments/ once a hero direction is chosen.
const root = createRoot(document.getElementById('root')!)

if (window.location.hash === '#lab') {
  import('./experiments/Lab.tsx').then(({ default: Lab }) => {
    root.render(
      <StrictMode>
        <Lab />
      </StrictMode>,
    )
  })
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Toggling between / and /#lab mounts a different tree, so reload on change.
window.addEventListener('hashchange', () => window.location.reload())
