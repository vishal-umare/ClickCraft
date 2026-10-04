import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import GeneratePage from '@/pages/GeneratePage'
import GenerationsPage from '@/pages/GenerationsPage'
import { AuthProvider } from '@/contexts/AuthContext'
import { GenerationProvider } from '@/contexts/GenerationContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useTheme } from '@/hooks/use-theme'

function AppToaster() {
  const { theme } = useTheme()
  return <Toaster theme={theme === 'dark' ? 'dark' : 'light'} position="bottom-center" />
}

function App() {
  return (
    <AuthProvider>
      <GenerationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route 
              path="/generate" 
              element={
                <ProtectedRoute>
                  <GeneratePage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/generations" 
              element={
                <ProtectedRoute>
                  <GenerationsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <AppToaster />
        </BrowserRouter>
      </GenerationProvider>
    </AuthProvider>
  )
}

export default App
