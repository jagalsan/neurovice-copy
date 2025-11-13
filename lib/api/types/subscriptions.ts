/**
 * Subscriptions related types and interfaces
 */

import { SubscriptionStatus } from "./common";

export interface SubscriptionListItem {
  id: number;
  planId: number;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  paypalId?: string;
  ccbillId?: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  plan: {
    name: string;
    externalPlan: {
      origin: string;
    };
  };
  _count: {
    payments: number;
    promocodeUsages: number;
  };
}

export interface Payment {
  id: number;
  amount: number;
  currency: string;
  paymentDate: string;
  refunds: Refund[];
}

export interface Refund {
  id: number;
  amount: number;
  refundDate: string;
  reason?: string;
}

export interface SubscriptionDetail extends Omit<SubscriptionListItem, "_count"> {
  payments: Payment[];
  promocodeUsages: unknown[];
}

export interface SubscriptionListParams {
  limit?: number;
  offset?: number;
  filter?: SubscriptionStatus;
}