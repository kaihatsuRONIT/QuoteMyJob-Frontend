import Footer from "@/components/Footer";
import Banners from "@/components/Home/Banners";
import BusinessCTA from "@/components/Home/BusinessCTA";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import RecentMagazine from "@/components/Home/RecentMagazine";
import RoleSelector from "@/components/Home/RoleSelector";
import NavBar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
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
