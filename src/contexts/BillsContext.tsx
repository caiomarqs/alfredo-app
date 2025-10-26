import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Bill, BillPayment, PaginationParams } from '../@types';
import { billsService } from '../api';
import { useAuth } from './AuthContext';

interface BillsContextValue {
  bills: Bill[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchBills: (params?: PaginationParams & { status?: string }) => Promise<void>;
  processPayment: (payment: BillPayment) => Promise<void>;
  refresh: () => Promise<void>;
  getTotalPending: () => number;
  getOverdueBills: () => Bill[];
}

const BillsContext = createContext<BillsContextValue | undefined>(undefined);

export const useBills = (): BillsContextValue => {
  const context = useContext(BillsContext);
  if (!context) {
    throw new Error('useBills must be used within a BillsProvider');
  }
  return context;
};

interface BillsProviderProps {
  children: React.ReactNode;
}

export const BillsProvider: React.FC<BillsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchBills = useCallback(async (params?: PaginationParams & { status?: string }) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = user.role === 'admin'
        ? await billsService.getAll(params)
        : await billsService.getByResident(user.id, params);
        
      setBills(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch bills:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const processPayment = useCallback(async (payment: BillPayment) => {
    try {
      await billsService.processPayment(payment);
      
      // Update bill status locally
      setBills(prev =>
        prev.map(bill =>
          bill.id === payment.billId
            ? { ...bill, status: 'paid', paidAt: payment.paidAt }
            : bill
        )
      );
    } catch (err) {
      console.error('Failed to process payment:', err);
      throw err;
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchBills({ page: pagination.page, limit: pagination.limit });
  }, [fetchBills, pagination.page, pagination.limit]);

  const getTotalPending = useCallback(() => {
    return bills
      .filter(bill => bill.status === 'pending')
      .reduce((sum, bill) => sum + bill.amount, 0);
  }, [bills]);

  const getOverdueBills = useCallback(() => {
    const today = new Date();
    return bills.filter(
      bill =>
        bill.status === 'pending' &&
        new Date(bill.dueDate) < today
    );
  }, [bills]);

  // Auto-fetch on mount or when user changes
  useEffect(() => {
    if (user) {
      fetchBills();
    }
  }, [user, fetchBills]);

  const value: BillsContextValue = {
    bills,
    isLoading,
    error,
    pagination,
    fetchBills,
    processPayment,
    refresh,
    getTotalPending,
    getOverdueBills,
  };

  return (
    <BillsContext.Provider value={value}>
      {children}
    </BillsContext.Provider>
  );
};
