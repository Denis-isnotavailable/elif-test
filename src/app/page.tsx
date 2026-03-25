import Bounded from "@/_components/Bounded";
import ShopPage from "@/_components/Shop/ShopPage";
import { prisma } from "@/lib/prisma";


export default async function Home() {
    const shops = await prisma.shop.findMany({
        orderBy: { rating: 'desc' }
    });

    return (
        <Bounded>
            <ShopPage shopList={shops} />
        </Bounded>
    );
}
