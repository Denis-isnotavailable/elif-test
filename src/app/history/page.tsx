'use client';

import { OrderItemExtended, OrderWithItems } from '@/types/db.types';
import Image from 'next/image';
import { useState } from 'react';

export default function HistoryPage() {
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState<OrderWithItems[]>([]);
    const [loading, setLoading] = useState(false);

  const fetchHistory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/orders/history?email=${email}`);
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
  };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
                Order History
            </h1>
            
            <form onSubmit={fetchHistory} className="mb-10 flex gap-2">
                <div className="relative flex-1">                    
                    <input
                        type="email"
                        placeholder="Enter your email to find orders..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
           
            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="border-2 rounded-2xl overflow-hidden bg-white shadow-sm">                            
                            <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <p className="text-gray-500 uppercase text-[10px] font-bold">Order ID</p>
                                        <p className="font-mono">#{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 uppercase text-[10px] font-bold">Date</p>
                                        <p className="flex items-center gap-1">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 uppercase text-[10px] font-bold">Total Price</p>
                                    <p className="text-xl font-black text-blue-600">${order.totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <div className="flex items-start gap-2 text-gray-600 text-sm mb-4">                                    
                                    <span>{order.address}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {order.items.map((item: OrderItemExtended) => (
                                        <div key={item.id} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl">
                                            <div className="w-12 h-12 bg-white rounded-lg border overflow-hidden shrink-0">
                                                {item.product?.image && (
                                                    <Image src={item.product.image} alt="" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm truncate">{item.product?.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {item.quantity} x ${item.priceAtPurchase}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && email && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                            <p className="text-gray-400">No orders found for this email address.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}