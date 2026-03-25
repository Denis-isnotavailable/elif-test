import { prisma } from "@/lib/prisma";
import CopyButton from "@/_components/Coupons/CopyButton";
import Bounded from "@/_components/Bounded";

export default async function CouponsPage() {
    const coupons = await prisma.coupon.findMany();

    return (
        <Bounded>
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-black flex items-center justify-center gap-3 mb-2">
                    Exclusive Offers
                </h1>
                <p className="text-gray-500">Copy a code and apply it at checkout to save money!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        className="relative border-2 border-dashed border-blue-200 rounded-2xl p-6 bg-white hover:border-blue-400 transition-colors group"
                    >                        
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-black px-4 py-2 rounded-xl rotate-12 shadow-lg group-hover:rotate-0 transition-transform">
                            -{coupon.discount}$
                        </div>

                        <div className="mb-4">
                            <h3 className="text-2xl font-mono font-black text-gray-800">{coupon.code}$</h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                {coupon.name || "Valid for all items in the store."}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                            <CopyButton code={String(coupon.code)} />
                        </div>
                    </div>
                ))}
            </div>

            {coupons.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <p className="text-gray-400">No active coupons available at the moment.</p>
                </div>
            )}
        </Bounded>
    );
}