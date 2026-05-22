import AboutHero from "@/components/About/AboutHero";
import Advantage from "@/components/About/Advantage";
import MagazineCTA from "@/components/About/MagazineCTA";
import ReadyToBuild from "@/components/About/ReadyToBuild";
import TradeDirectory from "@/components/About/TradeDirectory";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";

export default function AboutPage(){
    return (
        <>
        <NavBar/>
        <AboutHero/>
        <TradeDirectory/>
        <Advantage/>
        <MagazineCTA/>
        <ReadyToBuild/>
        <Footer/>
        </>
    );
}