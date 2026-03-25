'use client';

import { useEffect, useState } from 'react';
import { updateQuantity, removeFromCart, getCart, CartItem } from '@/utils/cart-utils';
import Bounded from '@/_components/Bounded';
import Image from 'next/image';

export default function CartPage() {
    // const cart = getCart();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [quantityChanges, setQuantityChanges] = useState(true);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal * (1 - discount / 100);

    useEffect(() => {
        if (quantityChanges) {
            const cartFromStorage = getCart();
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCart(cartFromStorage);
            setQuantityChanges(false)
        }        
    }, [quantityChanges])

    // const handleApplyCoupon = async () => {
    //     // Тут буде логіка перевірки купона в БД
    //     if (coupon === 'FREE10') setDiscount(10);
    //     else alert('Invalid coupon');
    // };

    const handleQuantityChanges = (id: number, quantity: number) => {
        updateQuantity(id, quantity)
        setQuantityChanges(true)
    }

    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
        setQuantityChanges(true)
    }

    const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                priceAtPurchase: item.price
            })),
            totalPrice: total
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert('Order placed successfully!');
                
                localStorage.removeItem('cart');
            
                setQuantityChanges(true)
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (err) {
            alert('Failed to send order. Please try again.');
            console.log(err);
        }
    };

    return (
        <Bounded>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <section className="bg-gray-50 p-6 rounded-2xl shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                    <form id="order-form" onSubmit={handleSubmitOrder} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input name="name" required className="w-full mt-1 p-3 border rounded-xl" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input name="email" type="email" required className="w-full mt-1 p-3 border rounded-xl" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input name="phone" type="tel" required className="w-full mt-1 p-3 border rounded-xl" placeholder="+380..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea name="address" required className="w-full mt-1 p-3 border rounded-xl" rows={3} placeholder="City, Street, House..." />
                        </div>
                    </form>
                </section>
                
                <section className="space-y-6">
                    <h2 className="text-xl font-bold">Your Order</h2>
                    <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 border rounded-xl shadow-sm items-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    {item.image && <Image src={item.image} alt={item.name} className="object-cover w-full h-full" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p className="text-blue-600 font-bold">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleQuantityChanges(item.id, -1)} className="p-1 hover:bg-gray-100 rounded-md border">➖</button>
                                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => handleQuantityChanges(item.id, 1)} className="p-1 hover:bg-gray-100 rounded-md border">➕</button>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2">
                                    ✖️
                                </button>
                            </div>
                        ))}
                        {cart.length === 0 && <p className="text-gray-400 text-center py-10">Cart is empty</p>}
                    </div>
                    
                    <div className="border-t pt-6 space-y-4">
                        {/* <div className="flex gap-2">
                            <input
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Coupon code"
                                className="flex-1 p-2 border rounded-lg text-sm"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
                            >
                                Apply
                            </button>
                        </div> */}

                        <div className="space-y-2 text-lg">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 text-sm">
                                    <span>Discount ({discount}%):</span>
                                    <span>-${(subtotal * discount / 100).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-black text-2xl border-t pt-2">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="order-form"
                            disabled={cart.length === 0}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                        >
                            Submit Order
                        </button>
                    </div>
                </section>
            </div>
        </Bounded>
    );
}