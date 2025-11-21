"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AgeVerificationModal from "@/components/AgeVerificationModal";

interface AgeVerificationContextType {
  isVerified: boolean;
  verifyAge: () => void;
}

const AgeVerificationContext = createContext<AgeVerificationContextType | undefined>(undefined);

const AGE_VERIFICATION_KEY = "age_verified";

export function AgeVerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState(true); // Start as true to avoid flash
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check sessionStorage for age verification
    const verified = sessionStorage.getItem(AGE_VERIFICATION_KEY);
    
    if (verified === "true") {
      setIsVerified(true);
      setShowModal(false);
    } else {
      setIsVerified(false);
      setShowModal(true);
    }
  }, []);

  const verifyAge = () => {
    sessionStorage.setItem(AGE_VERIFICATION_KEY, "true");
    setIsVerified(true);
    setShowModal(false);
  };

  const denyAge = () => {
    // Redirect to a safe page or close the window
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  };

  // Don't render modal on server-side
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <AgeVerificationContext.Provider value={{ isVerified, verifyAge }}>
      {children}
      <AgeVerificationModal 
        isOpen={showModal} 
        onConfirm={verifyAge}
        onDeny={denyAge}
      />
    </AgeVerificationContext.Provider>
  );
}

export function useAgeVerification() {
  const context = useContext(AgeVerificationContext);
  if (context === undefined) {
    throw new Error("useAgeVerification must be used within AgeVerificationProvider");
  }
  return context;
}
