import Footer from "@/components/Footer";
import Banners from "@/components/Landing/Banners";
import BusinessCTA from "@/components/Landing/BusinessCTA";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import RecentMagazine from "@/components/Landing/RecentMagazine";
import RoleSelector from "@/components/Landing/RoleSelector";
import NavBar from "@/components/Navbar";
export default function Landing() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    <Banners/>
    <RoleSelector/>
    <RecentMagazine/>
    <HowItWorks/>
    <BusinessCTA/>
    <Footer/>
    </>
  );
}
