import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Challenge from './pages/Challenge.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import { AppThemeProvider } from './theme.jsx'

export default function App() {
  return (
    <AppThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* The wall of achievements, and the next stage after it. */}
          <Route path="/" element={<Home />} />
          <Route path="/desafio" element={<Challenge />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  )
}
