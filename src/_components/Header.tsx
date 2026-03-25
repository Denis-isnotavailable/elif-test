'use client';
import { Pages } from '@/types/pages.routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Shop', href: Pages.Shop },
  { name: 'Cart', href: Pages.Cart },
  { name: 'History', href: Pages.History },
  { name: 'Coupones', href: Pages.Coupones },
];

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="max-w-7xl mx-auto border-b bg-white/95 backdrop-blur">
            <div className="container flex h-16 px-4">
                
                <nav className="flex items-center gap-6">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;                        

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center text-lg font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'
                                    }`}
                            >
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    )
}

export default Header