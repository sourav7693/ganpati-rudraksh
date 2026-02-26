"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "@/types/types";
import { getMe, logout } from "@/api/customer";

type CustomerContextType = {
  customer: Customer | null;
  loading: boolean;

  refreshCustomer: () => Promise<void>;
  logoutCustomer: () => Promise<void>;
  clearCustomer: () => void;
};

const CustomerContext = createContext<CustomerContextType | null>(null);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch customer safely
  const refreshCustomer = async () => {
    try {
      setLoading(true);

      const data = await getMe();

      setCustomer(data);
    } catch (err) {
      console.warn("Customer not logged in");

      // ❌ Don't clear instantly unless needed
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once on app load
  useEffect(() => {
    refreshCustomer();
  }, []);

  // ✅ Logout
  const logoutCustomer = async () => {
    await logout();
    setCustomer(null);
  };

  // ✅ Manual clear
  const clearCustomer = () => {
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        refreshCustomer,
        logoutCustomer,
        clearCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);

  if (!ctx) {
    throw new Error("useCustomer must be used inside CustomerProvider");
  }

  return ctx;
}
