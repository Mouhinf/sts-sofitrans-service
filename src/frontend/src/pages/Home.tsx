import { CTASection } from "@/components/home/CTASection";
import { Engagements } from "@/components/home/Engagements";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { Hero } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Processus } from "@/components/home/Processus";
import { ServicesGrid } from "@/components/home/ServicesGrid";

/**
 * Home page — public landing for STS SOFITRANS SERVICE.
 *
 * Composed from independent section components under `src/components/home/`.
 * Each section owns its own data fetching and presentational concern.
 */
export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesGrid />
      <FeaturedProperties />
      <FeaturedVehicles />
      <Engagements />
      <Processus />
      <CTASection />
      <NewsletterSection />
    </div>
  );
}
