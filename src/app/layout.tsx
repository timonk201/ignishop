import './globals.css';
import Header from './components/Header';
import AuthModal from './components/AuthModal';

export const metadata = {
  title: 'IgniShop',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <AuthModal />
      </body>
    </html>
  );
}