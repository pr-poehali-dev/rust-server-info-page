import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BanListSection from '@/components/BanListSection';

const BanList = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <BanListSection />
      </main>
      <Footer />
    </div>
  );
};

export default BanList;
