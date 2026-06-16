"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const role = (user?.user?.role)?.toLowerCase() || (user?.role)?.toLowerCase()
  console.log(role)
  const links = [
    { tag: "Home", link: "/home" },
    { tag: "About Us", link: "/about-us" },
    // { tag: "Team", link: "/team" },
    { tag: "Directory", link: "/directory" },
    { tag: "Magazine", link: "/magazine" },
    { tag: "Blog", link: "/blog" },
    { tag: "Contact Us", link: "/contact-us" },
  ];
  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{ backgroundColor: "#01192F", fontFamily: "Work sans" }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-25 pr-15">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <img
                className="h-20 w-auto object-cover pl-10"
                src="/websiteLogo.png"
                alt="QuoteMyJob"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {links.map((link, index) => (
              <a
                key={index}
                href={`${link.link}`}
                className={`font-[var(--font-work-sans)] text-md font-bold tracking-wide transition-colors duration-200 whitespace-nowrap ${pathname === link.link ? "text-orange-400" : "text-white hover:text-orange-400"
                  }`}
              >
                {link.tag}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block flex-shrink-0">
            {loading ? (
              <div style={{ width: '140px', height: '46px', borderRadius: '12px', background: 'linear-gradient(90deg, #ffffff20 25%, #ffffff40 50%, #ffffff20 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.2s infinite' }} />
            ) : user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {role === "customer" ? (
                  <a href={`${role}/dashboard/jobs-posted`}>
                    <button style={{ backgroundColor: "#FF7E00" }} className="transition-colors duration-200 text-white font-bold text-sm px-9 py-5 rounded-xl cursor-pointer">
                      Open Dashboard
                    </button>
                  </a>
                ) : (
                  <a href={`${role}/dashboard/overview`}>
                    <button style={{ backgroundColor: "#FF7E00" }} className="transition-colors duration-200 text-white font-bold text-sm px-9 py-5 rounded-xl cursor-pointer">
                      Open Dashboard
                    </button>
                  </a>
                )}
                {user?.avatar ? (
                  <a href="/profile"><img src={user.avatar} alt={user.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} /></a>
                ) : (
                  <a href="/profile"><FaRegUserCircle color="white" size={40} /></a>
                )}
              </div>
            ) : (
              <a href="/login">
                <button style={{ backgroundColor: "#FF7E00" }} className="transition-colors duration-200 text-white font-bold text-sm px-9 py-5 rounded-xl cursor-pointer">
                  Login / Signup
                </button>
              </a>
            )}
          </div>

          <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white focus:outline-none p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        style={{ backgroundColor: "#01192F" }}
      >
        <div className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-white/10">
          {links.map((link, index) => (
            <a
              key={index}
              href={`${link.link}`}
              className={`font-[var(--font-work-sans)] text-md font-bold tracking-wide transition-colors duration-200 whitespace-nowrap ${pathname === link.link ? "text-orange-400" : "text-white hover:text-orange-400"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.tag}
            </a>
          ))}
          <a href="/login">
            <button className="mt-3 bg-orange-400 hover:bg-orange-500 transition-colors duration-200 text-white font-bold text-sm px-5 py-2.5 rounded-xl w-full cursor-pointer">
              Login / Signup
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;