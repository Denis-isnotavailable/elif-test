'use client'

import { Shop } from "@/types/db.types";
import ProductList from "./ProductList";
import ShopList from "./ShopList";
import { useState } from "react";

type ShopPageProps = {
    shopList: Shop[];
}

const ShopPage = ({ shopList }: ShopPageProps) => {
    const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxRating, setMaxRating] = useState<number>(5);

    const filteredShops = shopList.filter(
        shop => shop.rating >= minRating && shop.rating <= maxRating
    );
    
    return (
        <div className="flex flex-col md:flex-row gap-6">
            
            <aside className="w-full md:w-1/4 space-y-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold mb-3">Filter Shops by Rating</h3>
                    <select
                        onChange={(e) => {
                            const [min, max] = e.target.value.split('-').map(Number);
                            setMinRating(min);
                            setMaxRating(max);
                        }}
                        className="w-full p-2 border rounded"
                    >
                        <option value="0-5">All Ratings</option>
                        <option value="4-5">4.0 - 5.0 ⭐</option>
                        <option value="3-4">3.0 - 4.0 ⭐</option>
                        <option value="2-3">2.0 - 3.0 ⭐</option>
                    </select>
                </div>

                <ShopList
                    shopList={filteredShops}
                    selectedId={selectedShopId}
                    onSelect={setSelectedShopId}
                />
            </aside>
            
            <div className="flex-1">
                {selectedShopId ? (
                    <ProductList shopId={selectedShopId} />
                ) : (
                    <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl text-gray-400">
                        Please select a shop to view products
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShopPage