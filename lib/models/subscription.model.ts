export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INCOMPLETE = "INCOMPLETE",
}

export interface SubscriptionInfo {
  status: SubscriptionStatus;
}

export interface Price {
  id: string;
  unit_amount: number;
  product: string;
  recurring: object;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: Record<string, string>[];
  prices: Price[];
}

export function isSubscriptionValid({ status }: SubscriptionInfo): boolean {
  return (
    status === SubscriptionStatus.ACTIVE
  );
}
