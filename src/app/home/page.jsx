import Footer from "@/components/Footer";
import EliteProfessionals from "@/components/Home/EliteProfessionals";
import PopularCategories from "@/components/Home/PopularCategories";
import Banners from "@/components/Landing/Banners";
import BusinessCTA from "@/components/Landing/BusinessCTA";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import RecentMagazine from "@/components/Landing/RecentMagazine";
import RoleSelector from "@/components/Landing/RoleSelector";
import NavBar from "@/components/Navbar";
export default function Page() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    <Banners/>
    <RoleSelector/>
    <PopularCategories/>
    <br/>
    <EliteProfessionals/>
    <RecentMagazine/>
    <HowItWorks/>
    <BusinessCTA/>
    <Footer/>
    </>
  );
}
