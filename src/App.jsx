import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import TransformationShowcase from './components/funnel/TransformationShowcase'
import AuthGateway from './components/AuthGateway'
import OnboardingFlow from './components/funnel/ComprehensiveProfilingGate'
import AdminDashboard from './components/admin/AdminDashboard'

function LandingPage() {
  return (
    <div className="min-h-screen bg-luxury-black text-white font-sans selection:bg-neon-lime/30 selection:text-neon-lime">
      <Hero />
      <TransformationShowcase />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthGateway />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
