"use client";

import { useEffect } from "react";
import { initializeGA } from "@/utilities/ga";

declare global {
    interface Window {
      GA_INITIALIZED?: boolean;
    }
  }

export default function GoogleAnalytics() {
    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initializeGA();
            window.GA_INITIALIZED = true;
        }
    }, []);
    
    return null;
}