export type BillStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type BillType = 'condominium' | 'water' | 'energy' | 'extra' | 'fine';

export interface Bill {
  id: string;
  residentId: string;
  apartment: string;
  title: string;
  description?: string;
  type: BillType;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: BillStatus;
  referenceMonth: string;
  barCode?: string;
  pixCode?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBillDTO {
  residentId: string;
  apartment: string;
  title: string;
  description?: string;
  type: BillType;
  amount: number;
  dueDate: string;
  referenceMonth: string;
  barCode?: string;
  pixCode?: string;
}

export interface UpdateBillDTO extends Partial<CreateBillDTO> {
  id: string;
  status?: BillStatus;
  paidAt?: string;
}

export interface BillPayment {
  billId: string;
  amount: number;
  paymentMethod: 'pix' | 'credit_card' | 'debit_card' | 'bank_slip';
  paidAt: string;
  transactionId?: string;
}
