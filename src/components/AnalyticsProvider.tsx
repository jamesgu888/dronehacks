"use client";

import { useEffect } from "react";
import { getAnalyticsInstance } from "@/lib/firebase";

export default function AnalyticsProvider() {
  useEffect(() => {
    // Initialize analytics on mount - this enables automatic page view tracking
    getAnalyticsInstance();
  }, []);

  return null;
}
