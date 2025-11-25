'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ShinyText from '@/app/_components/ShinyText';
import { Loader2, Package, Calendar, MapPin } from 'lucide-react';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
            return;
        }
        fetchOrders(token);
    }, []);

    const fetchOrders = async (token) => {
        try {
            const response = await fetch('/api/order', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 md:px-12">
            <ShinyText
                text="My Orders"
                className="text-3xl font-bold mb-8 text-center md:text-left"
            />

            {!orders.length ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <Package size={64} className="mb-4 opacity-20" />
                    <p className="text-xl font-medium mb-2">No orders yet</p>
                    <p className="text-sm">Start shopping to see your orders here</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                                <div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                        <span className="font-mono">#{order._id.slice(-8).toUpperCase()}</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-xl font-bold text-emerald-600">₹{order.totalAmount}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="h-16 w-16 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.product?.image}
                                                alt={item.product?.name}
                                                className="h-full w-full object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {item.product?.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity} × ₹{item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-start gap-2 text-sm text-gray-500">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                <p>{order.address}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrder;
