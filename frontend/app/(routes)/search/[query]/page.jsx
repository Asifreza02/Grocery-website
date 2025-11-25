'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ShinyText from '@/app/_components/ShinyText';
import ProductItem from '@/app/_components/ProductItem';

const SearchPage = ({ params }) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const unwrappedParams = await params;
                const query = decodeURIComponent(unwrappedParams.query);
                setSearchQuery(query);

                const response = await fetch('/api/products?search=' + encodeURIComponent(query));
                const res = await response.json();
                setProductList(res?.data || []);
            } catch (error) {
                console.error('Error fetching search results:', error);
                toast.error('Failed to load search results');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [params]);

    if (loading) {
        return (
            <div className="w-full h-[200px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="my-12 px-4 md:px-14">
            <ShinyText
                text={`Search Results for "${searchQuery}"`}
                className="text-3xl font-bold mb-8 text-center md:text-left"
            />

            {!productList.length ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <p className="text-xl font-medium mb-2">No products found</p>
                    <p className="text-sm">Try searching for something else</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {productList.map((product, index) => (
                        <ProductItem key={product._id || index} product={product} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
