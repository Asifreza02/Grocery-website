'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ShinyText from '@/app/_components/ShinyText';
import ProductItem from '@/app/_components/ProductItem';
import { Loader2, Heart } from 'lucide-react';

const MyFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
            return;
        }
        fetchFavorites(token);
    }, []);

    const fetchFavorites = async (token) => {
        try {
            const response = await fetch('/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch favorites');
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load favorites');
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
                text="My Favorites"
                className="text-3xl font-bold mb-8 text-center md:text-left"
            />

            {!favorites.length ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <Heart size={64} className="mb-4 opacity-20" />
                    <p className="text-xl font-medium mb-2">No favorites yet</p>
                    <p className="text-sm">Heart items to save them for later</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {favorites.map((product, index) => (
                        <ProductItem key={product._id || index} product={product} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
