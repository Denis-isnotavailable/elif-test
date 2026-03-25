import { Shop } from "@/types/db.types";

type ShopListProps = {
    shopList: Shop[];
    selectedId: number | null
    onSelect: (shopId: number | null) => void
}

const ShopList = ({shopList, selectedId, onSelect}: ShopListProps) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold px-1 text-gray-700">Shops</h3>
      
            {shopList.length === 0 ? (
                <p className="text-gray-500 italic p-4 text-center border rounded-lg">
                    No shops found for this rating.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {shopList.map((shop) => {
                        const isActive = selectedId === shop.id;
            
                        return (
                            <button
                                key={shop.id}
                                onClick={() => onSelect(shop.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2flex flex-col gap-1 group
                                        ${isActive
                                        ? "border-blue-600 bg-blue-50 shadow-md translate-x-1"
                                        : "border-transparent bg-white hover:bg-gray-50 hover:border-gray-200 shadow-sm"
                                    }
                                `}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={`font-bold text-lg ${isActive ? "text-blue-700" : "text-gray-800"}`}>
                                        {shop.shopName}
                                    </span>
                  
                                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-lg">
                                        ⭐
                                        <span className="text-xs font-black text-yellow-700">
                                            {shop.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ShopList