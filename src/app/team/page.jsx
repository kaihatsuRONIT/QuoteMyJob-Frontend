import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import MagazinePage from "@/components/Magazine/MagazinesPage";
import StatsAndCTA from "@/components/Team/StatsAndCta";
import TeamCards from "@/components/Team/TeamCards";
import TeamHero from "@/components/Team/TeamHero";

export default function TeamPage(){
    return (
        <>
        <NavBar/>
        <TeamHero/>
        <TeamCards/>
        <StatsAndCTA/>
        <Footer/>
        </>
    );
}