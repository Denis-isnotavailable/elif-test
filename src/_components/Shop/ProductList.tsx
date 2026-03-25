'use client'
import { Product } from "@/types/db.types";
import { addToCart } from "@/utils/cart-utils";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type ProductList = {
    shopId: number;
}

const categories = ['Burger', 'Drink', 'Pizza'];

const ProductList = ({ shopId }: ProductList) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [sortBy, setSortBy] = useState('name-asc');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const { ref, inView } = useInView();
    
    const fetchProducts = async (pageNum: number, isFirstLoad: boolean) => {
        const params = new URLSearchParams({
            shopId: shopId.toString(),
            page: pageNum.toString(),
            sortBy,
            category: selectedCategory
        });

        const res = await fetch(`/api/products?${params}`);
        const newData = await res.json();

        if (newData.length === 0) {
            if (isFirstLoad) setProducts([]);
            setHasMore(false);
        } else {
            setProducts(prev => isFirstLoad ? newData : [...prev, ...newData]);
            setPage(pageNum + 1);
            setHasMore(newData.length >= 6);
        }
    };


useEffect(() => {     
    setHasMore(true);    
    fetchProducts(1, true); 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [shopId, sortBy, selectedCategory]); 


useEffect(() => {    
    if (inView && hasMore && page > 1) {         
        fetchProducts(page, false);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [inView]);

    return (
        <div className="space-y-4">
            
            <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-white shadow-sm border rounded-lg">
                <div className="flex gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(prev => prev === category ? '' : category)}
                            className={`px-3 py-1 rounded-full text-sm border ${selectedCategory ===category ? 'bg-blue-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded text-sm">
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Alphabetical (A-Z)</option>
                </select>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                        <div className="aspect-square bg-gray-100 relative">
                            {product.image ? (
                                <Image src={product.image} alt={product.name} className="object-cover w-full h-full" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="p-4">
                            <span className="text-xs font-semibold text-blue-500 uppercase">{product.category}</span>
                            <h4 className="font-bold text-lg">{product.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xl font-black text-gray-900">${product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            <div ref={ref} className="h-20 flex items-center justify-center">
                {hasMore ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div> : "No more products"}
            </div>
        </div>
    );
}

export default ProductList