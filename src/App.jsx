import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppRoutes } from './routes'
import AuthContextProvider from './context/auth'
import { Toaster } from 'sonner';
import { Navbar } from './components/navbar'
import DataContextProvider from './context/dataContext'
import { Footer } from './components/footer'

function App() {

  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <Navbar />
          <AppRoutes />
          <Footer/>
          <Toaster richColors position="top-right" />
        </DataContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App
