import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ContentStudio from './pages/ContentStudio';
import ContentVerification from './pages/ContentVerification';
import Reports from './pages/Reports';
import ReviewHistory from './pages/ReviewHistory';
import { checkHealth } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [healthStatus, setHealthStatus] = useState(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);
  const [verificationContent, setVerificationContent] = useState('');

  const fetchHealth = useCallback(async () => {
    setIsLoadingHealth(true);
    try {
      const result = await checkHealth();
      setHealthStatus(result);
    } catch (err) {
      setHealthStatus({
        success: false,
        error: err.message || 'Unknown network error',
      });
    } finally {
      setIsLoadingHealth(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    // Poll health status periodically every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const handleTransferToVerification = (content) => {
    setVerificationContent(content);
    setActiveTab('verification');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            setActiveTab={setActiveTab}
            healthStatus={healthStatus}
            onRefreshHealth={fetchHealth}
            isLoadingHealth={isLoadingHealth}
          />
        );
      case 'dashboard':
        return <Dashboard />;
      case 'studio':
        return (
          <ContentStudio
            onVerifyContent={handleTransferToVerification}
          />
        );
      case 'verification':
        return (
          <ContentVerification
            initialContent={verificationContent}
            onContentChange={setVerificationContent}
          />
        );
      case 'reports':
        return <Reports />;
      case 'history':
        return <ReviewHistory />;
      default:
        return (
          <Home
            setActiveTab={setActiveTab}
            healthStatus={healthStatus}
            onRefreshHealth={fetchHealth}
            isLoadingHealth={isLoadingHealth}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        healthStatus={healthStatus}
        onRefreshHealth={fetchHealth}
        isLoadingHealth={isLoadingHealth}
      />

      <main className="flex-1">
        {renderActiveView()}
      </main>

      <Footer />
    </div>
  );
}
