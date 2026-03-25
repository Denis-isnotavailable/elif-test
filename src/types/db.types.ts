export type Shop = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    shopName: string;
    rating: number;
};

export type Product = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    category: string;
    price: number;
    image: string | null;
    shopId: number;
};

export type OrderProduct = {
    id: number;
    name: string;
    image: string | null;
}

export type OrderItemExtended = {
    id: number;
    quantity: number;
    priceAtPurchase: number;
    product: OrderProduct;
}

export type OrderWithItems = {
    id: number;
    createdAt: Date;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalPrice: number;
    items: OrderItemExtended[];
}
