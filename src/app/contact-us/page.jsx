import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";
import MasterplaceCTA from "@/components/Contact/MasterplaceCTA";
import NationwideReach from "@/components/Contact/NationwideReach";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";

export default function ContactPage() {
    return (
        <>
            <NavBar />
            <div className="w-full px-10 my-10">
                <ContactHero />
            </div>
            <ContactForm/>
            <div className="w-full px-10 my-10">
                <NationwideReach/>
            </div>
            <MasterplaceCTA/>
            <Footer />
        </>
    );
}