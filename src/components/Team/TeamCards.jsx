import { CiMail, CiShare2 } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { MdAlternateEmail, MdLink, MdTerminal } from "react-icons/md";

// const team = [
//   {
//     name: "Martyn Boyd",
//     role: "Partner, UB Media & Publisher of Modern Builder Magazine",
//     bio: "With decades of experience in construction media, Martyn oversees the strategic direction of Blueprint Forge. His vision for Modern Builder Magazine set the standard for trade excellence that now drives our digital ecosystem.",
//     img: "/team-1.jpg",
//     icons: [<Mail size={16} />, <Link size={16} />],
//     large: true,
//   },
//   {
//     name: "Jasen Upritchard",
//     role: "Partner, UB Media Business Development",
//     bio: "Jasen drives the growth engines of the platform, fostering partnerships that connect high-tier contractors with the projects that matter most.",
//     img: "/team-2.jpg",
//     icons: [<Mail size={16} />, <Share2 size={16} />],
//     large: false,
//   },
//   {
//     name: "Craig Kennedy",
//     role: "IT & Software Development",
//     bio: "The architect of our digital infrastructure. Craig ensures the platform remains robust, secure, and intuitive for both homeowners and professionals.",
//     img: "/team-3.jpg",
//     icons: [<Mail size={16} />, <User size={16} />],
//     large: false,
//   },
// ];

const IconBtn = ({ children }) => (
    <div style={{
        width: "36px", height: "36px", borderRadius: "8px",
        background: "#f0f3ff", display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer", color: "#475569",
    }}>
        {children}
    </div>
);

export default function TeamCards() {
    return (
        <div style={{ maxWidth: "1216px", margin: "0 auto", padding: "60px 40px", fontFamily: "'Work Sans', sans-serif" }}>

            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "24px", marginBottom: "24px" }}>

                {/* Martyn — large card */}
                <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0px 8px 10px -6px #0D1C320D, 0px 20px 25px -5px #0D1C320D", maxWidth:"669px" }}>
                    <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                        <div style={{ position: "relative", flexShrink: 0, width: "130px", height: "140px" }}>
                            <img src="/martin.jpg" alt="Martyn Boyd" style={{ width: "130px", height: "140px", borderRadius: "12px", objectFit: "cover", display: "block" }} />
                            <div style={{ position: "absolute", bottom: "-8px", right: "-8px", width: "28px", height: "28px", borderRadius: "7px", background: "#0D1C32", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <HiCheckBadge color="#D06600" size={20} />
                            </div>
                        </div>
                        <div>
                            <h3 style={{fontFamily:"Manrope", fontSize: "30px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px", lineHeight:"36px" }}>Martyn Boyd</h3>
                            <p style={{ fontSize: "16px", fontWeight: "600", color: "#D06600", margin: "0 0 16px", lineHeight:"24px" }}>Partner, UB Media & Publisher of Modern Builder Magazine</p>
                            <p style={{ fontSize: "18px",maxWidth:"341px", color: "#515F78", lineHeight: "29px", margin: 0,fontWeight:"400" }}>
                                With decades of experience in construction media, Martyn oversees the strategic direction of Blueprint Forge. His vision for Modern Builder Magazine set the standard for trade excellence that now drives our digital ecosystem.
                            </p>
                            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                                <IconBtn><MdAlternateEmail size={16} /></IconBtn>
                                <IconBtn><MdLink size={16} /></IconBtn>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jasen — smaller card */}
                <div style={{borderRadius: "20px", padding: "28px", boxShadow: "0px 8px 10px -6px #0D1C320D, 0px 20px 25px -5px #0D1C320D", }} className="bg-gray-200/45">
                    <img src="/jasen.jpg" alt="Jasen Upritchard" style={{ width: "72px", height: "72px", borderRadius: "12px", objectFit: "cover", display: "block", marginBottom: "16px" }} />
                    <h3 style={{fontFamily:"Manrope", fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px", lineHeight:"32px" }}>Jasen Upritchard</h3>
                    <p style={{ fontSize: "16px", fontWeight: "500", color: "#f97316", margin: "0 0 14px", lineHeight:"24px" }}>Partner, UB Media Business Development</p>
                    <p style={{ fontWeight:"400", fontSize: "16px", color: "#515F78", lineHeight: "26px", margin: "0 0 20px" }}>
                        Jasen drives the growth engines of the platform, fostering partnerships that connect high-tier contractors with the projects that matter most.
                    </p>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <IconBtn><CiMail size={16} /></IconBtn>
                        <IconBtn><CiShare2 size={16} /></IconBtn>
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "24px" }}>

                {/* Craig — card with code icon */}
                <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", boxShadow: "0px 8px 10px -6px #0D1C320D, 0px 20px 25px -5px #0D1C320D", }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                        <img src="/craig.png" alt="Craig Kennedy" style={{ width: "72px", height: "72px", borderRadius: "12px", objectFit: "cover", display: "block" }} className="my-2" />
                        <div style={{
                            width: "136px", height: "120px", borderRadius: "10px",
                            display: "flex", alignItems: "center", justifyContent: "center", color: "#f97316",
                        }}>
                            <MdTerminal className="h-full w-full opacity-10" />
                        </div>
                    </div>
                    <h3 style={{fontFamily:"Manrope", fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px", lineHeight:"32px" }}>Craig Kennedy</h3>
                    <p style={{ fontSize: "16px", fontWeight: "500", color: "#f97316", margin: "0 0 14px",lineHeight:"24px" }}>IT & Software Development</p>
                    <p style={{fontWeight:"400", fontSize: "16px", color: "#515F78", lineHeight: "26px", margin: "0 0 20px" }}>
                        The architect of our digital infrastructure. Craig ensures the platform remains robust, secure, and intuitive for both homeowners and professionals.
                    </p>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <IconBtn><CiMail size={16} /></IconBtn>
                        <IconBtn><FaRegUserCircle size={16} /></IconBtn>
                    </div>
                </div>

                {/* Philosophy */}
                <div style={{ borderRadius: "20px", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h2 style={{fontFamily:"Manrope", fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0 0 20px", lineHeight:"40px" }}>Our Philosophy</h2>
                    <p style={{ fontSize: "15px", color: "#515F78", lineHeight: 1.8, margin: 0 }}>
                        We believe in the power of professional visibility. By combining heritage publishing with modern software, we create a ecosystem where quality craftsmanship is celebrated and rewarded.
                    </p>
                </div>

            </div>
        </div>
    );
}