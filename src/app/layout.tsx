import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image'; // Импортируем Image для оптимизации

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ignishop',
  description: 'Ваш лучший интернет-магазин',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/phoenix.png" // Путь к логотипу в public/
                alt="Ignishop Logo"
                width={40} // Укажи ширину логотипа
                height={40} // Укажи высоту логотипа
                className="object-contain"
              />
              <h1 className="text-2xl font-bold">
                <Link href="/">Ignishop</Link>
              </h1>
            </div>
            <nav>
              <Link href="/" className="mr-4 hover:underline">
                Каталог
              </Link>
              <Link href="/cart" className="mr-4 hover:underline">
                Корзина
              </Link>
              <Link href="/admin" className="hover:underline">
                Админ
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center mt-8">
          © 2025 Ignishop
        </footer>
      </body>
    </html>
  );
}