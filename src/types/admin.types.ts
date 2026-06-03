export enum OrderStatusEnum {
  Pending = 0,
  Confirmed = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Cancelled = 5,
  Refunded = 6,
}

export interface OrderItemDTO {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface OrderDTO {
  id: number;
  userId: number;
  orderNumber: string;
  status: OrderStatusEnum;
  totalAmount: number;
  deliveryAddress: string;
  comment?: string;
  items: OrderItemDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderCreateData {
  deliveryAddress: string;
  comment?: string;
  items: { productId: number; productName: string; price: number; quantity: number }[];
}

export interface OrderStatusUpdateData {
  status: OrderStatusEnum;
}

export interface AdminStatsDTO {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  ordersByStatus: { status: string; count: number }[];
  recentOrders: OrderDTO[];
  popularProducts: { productId: number; productName: string; totalSold: number; revenue: number }[];
}
