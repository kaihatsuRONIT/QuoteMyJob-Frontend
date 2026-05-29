import Footer from "@/components/Footer";
import CTABanner from "@/components/Home/CTABanner";
import EliteProfessionals from "@/components/Home/EliteProfessionals";
import HomeAdvantage from "@/components/Home/HomeAdvantage";
import HomeHero from "@/components/Home/HomeHero";
import PopularCategories from "@/components/Home/PopularCategories";
import RecentTransformations from "@/components/Home/RecentTransformations";
import NavBar from "@/components/Navbar";

export default function HomePage(){
    return (
        <>
        <NavBar/>
        <HomeHero/>
        <PopularCategories/>
        <HomeAdvantage/>
        <RecentTransformations/>
        <EliteProfessionals/>
        <CTABanner/>
        <Footer/>
        </>
    );
}