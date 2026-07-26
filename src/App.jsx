import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import { AppThemeProvider } from './theme.jsx'

export default function App() {
  return (
    <AppThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Every folder in src/projects becomes a URL: /playground/folder-name */}
          <Route path="/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  )
}
