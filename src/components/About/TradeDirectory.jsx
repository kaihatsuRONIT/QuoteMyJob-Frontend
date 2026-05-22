import { BsShieldFillCheck } from "react-icons/bs";
import { GiOpenBook } from "react-icons/gi";

export default function TradeDirectory() {
    return (
        <>
            <style>{`
        .td-wrapper { display: flex; align-items: center; gap: 100px; max-width: 1216px; margin: 0 auto; padding: 80px 40px; font-family: 'DM Sans', sans-serif; }
        .td-images { display: flex; gap: 16px; flex-shrink: 0; }
        .td-col1 { display: flex; flex-direction: column; justify-content: center; gap: 16px; }
        .td-col2 { display: flex; flex-direction: column; justify-content: flex-start; padding-top: 0; }
        @media (max-width: 1024px) { .td-wrapper { gap: 48px; padding: 60px 32px; } }
        @media (max-width: 768px) { .td-wrapper { flex-direction: column; padding: 48px 24px; } .td-images { width: 100%; } }
      `}</style>
            <div className=" w-full bg-[#F0F3FF]" style={{fontFamily:"Work Sans"}}>
                <div className="td-wrapper mx-auto">

                    {/* Left — images */}
                    <div className="td-images">
                        {/* Col 1 — two stacked images, vertically centered */}
                        <div className="td-col1">
                            <img src="/plan-2.png" alt="Tools" style={{ width: "210px", height: "210px", borderRadius: "8px", objectFit: "cover" }} />
                            <img src="/plan-3.png" alt="Worker" style={{ width: "210px", height: "210px", borderRadius: "8px", objectFit: "cover" }} />
                        </div>
                        {/* Col 2 — single taller image, offset upward */}
                        <div className="td-col2" style={{ marginTop: "-48px" }}>
                            <img src="/plan-1.png" alt="Planning" style={{ width: "210px", height: "290px", borderRadius: "8px", objectFit: "cover" }} />
                        </div>
                    </div>

                    {/* Right — text */}
                    <div style={{ maxWidth: "576px" }}>
                        <h2 style={{fontFamily:"Manrope", fontSize: "30px", fontWeight: "700", color: "#0f172a", lineHeight:"36px", margin: "0 0 20px" }}>
                            The Trade Directory & Digital Magazine
                        </h2>
                        <p style={{fontWeight:"400", fontSize: "18px", color: "#475569", lineHeight: "29px", margin: "0 0 36px" }}>
                            We bridge the gap between technical expertise and editorial inspiration. Quotemyjob serves as both a high-authority trade directory and a cutting-edge digital magazine for industry professionals.
                        </p>

                        {/* Feature items */}
                        {[
                            {
                                icon: <BsShieldFillCheck size={20} color="#f97316" />,
                                title: "Verified Professionals",
                                desc: "Every trade member is strictly vetted for quality and standards.",
                            },
                            {
                                icon: <GiOpenBook size={20} color="#f97316" />,
                                title: "Digital Authority",
                                desc: "Our magazine covers the latest in construction tech, design trends, and business growth.",
                            },
                        ].map((item) => (
                            <div key={item.title} style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
                                <div style={{
                                    width: "44px", height: "44px", borderRadius: "10px",
                                    background: "#fff3e8", display: "flex", alignItems: "center",
                                    justifyContent: "center", flexShrink: 0,
                                }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>{item.title}</p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#475569", lineHeight: 1.65 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}