"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface NotificationContextType {
  customerNotifications: number;
  adminNotifications: number;
  addCustomerNotification: () => void;
  addAdminNotification: () => void;
  clearCustomerNotifications: () => void;
  clearAdminNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [customerNotifications, setCustomerNotifications] = useState(0);
  const [adminNotifications, setAdminNotifications] = useState(0);

  const addCustomerNotification = useCallback(() => {
    setCustomerNotifications(count => count + 1);
  }, []);
  
  const addAdminNotification = useCallback(() => {
    setAdminNotifications(count => count + 1);
  }, []);

  const clearCustomerNotifications = useCallback(() => {
    setCustomerNotifications(0);
  }, []);
  
  const clearAdminNotifications = useCallback(() => {
    setAdminNotifications(0);
  }, []);


  return (
    <NotificationContext.Provider value={{ 
      customerNotifications, 
      adminNotifications,
      addCustomerNotification,
      addAdminNotification,
      clearCustomerNotifications,
      clearAdminNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
