import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import EditorPane from './components/EditorPane';
import PreviewPane from './components/PreviewPane';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PaywallModal from './components/PaywallModal';
import Templates from './pages/Templates';
import AdminDashboard from './pages/AdminDashboard';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

const MarketingLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <AuthModal />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// We extract the editor layout into a separate component for routing
const EditorLayout = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-screen w-full overflow-hidden bg-white font-sans text-slate-900"
    >
      <NavBar />
      <AuthModal />
      
      <div className="flex h-[calc(100vh-64px)] w-full relative">
        <div className="w-1/2 h-full relative z-10">
          <EditorPane />
        </div>
        
        <div className="w-1/2 h-full bg-slate-100 border-l border-slate-200 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
          
          <PreviewPane />
        </div>
      </div>
    </motion.div>
  );
};

// Inner component to use location for AnimatePresence
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/editor" element={<EditorLayout />} />
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Helmet defaultTitle="Unformat | Free ATS-Friendly Resume Builder" titleTemplate="%s | Unformat">
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090b" />
        <meta name="description" content="Build the perfect ATS-friendly resume for free. Unformat is an intelligent JSON-powered resume builder featuring exact Jake's and Harvard resume templates." />
        <link rel="canonical" href="https://unformat.com" />
      </Helmet>
      <AppRoutes />
      <AuthModal />
      <PaywallModal />
    </BrowserRouter>
  );
}

export default App;
