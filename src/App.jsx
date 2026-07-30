import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import { AppThemeProvider } from './theme.jsx'

export default function App() {
  return (
    <AppThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* The whole site is a single page: the wall of achievements. */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  )
}
