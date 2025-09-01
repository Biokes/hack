"use client";
import { HRProvider } from "@/contexts/HRContext";
import { Toaster } from "@/components/ui/sonner";
import { EmployeeProvider } from "@/contexts/EmployeeContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store"

export default function ClientProviders({children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HRProvider>
                    <EmployeeProvider>
                        <div className="flex h-screen overflow-hidden">
                            <div className="flex flex-1 flex-col overflow-hidden">
                                <main className="flex-1 overflow-auto">
                                    {children}
                                </main>
                            </div>
                        </div>
                        <Toaster />
                    </EmployeeProvider>
                </HRProvider>
            </PersistGate>
        </Provider>
    )
}