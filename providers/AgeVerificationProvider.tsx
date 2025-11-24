"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import { getCookie, setCookie } from "@/lib/utils/cookies";

interface AgeVerificationContextType {
  isVerified: boolean;
  verifyAge: () => void;
}

const AgeVerificationContext = createContext<AgeVerificationContextType | undefined>(undefined);

const AGE_VERIFICATION_KEY = "neurovice_age_verified";

export function AgeVerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const verified = getCookie(AGE_VERIFICATION_KEY);
    
    if (verified === "true") {
      setIsVerified(true);
      setShowModal(false);
    } else {
      setIsVerified(false);
      setShowModal(true);
    }
  }, []);

  const verifyAge = () => {
    setCookie(AGE_VERIFICATION_KEY, "true");
    setIsVerified(true);
    setShowModal(false);
  };

  const denyAge = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  };

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
