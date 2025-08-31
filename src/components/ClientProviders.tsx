"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HRProvider } from "@/contexts/HRContext";
import { EmployeeProvider } from "@/contexts/EmployeeContext";
import { Toaster } from "@/components/ui/sonner";
import { store, persistor } from "@/store";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HRProvider>
          <EmployeeProvider>
            {children}
            <Toaster />
          </EmployeeProvider>
        </HRProvider>
      </PersistGate>
    </Provider>
  );
}
