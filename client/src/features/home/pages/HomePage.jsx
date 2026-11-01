import { useItemStats } from '../../items/hooks/useItemQueries';
import CallToActionSection from '../components/CallToActionSection';
import CategoriesSection from '../components/CategoriesSection';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage = () => {
  const { data: stats } = useItemStats();

  return (
    <div className="bg-white">
      <HeroSection stats={stats} />
      <CategoriesSection categoryCounts={stats?.categories} />
      <HowItWorksSection />
      <CallToActionSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
