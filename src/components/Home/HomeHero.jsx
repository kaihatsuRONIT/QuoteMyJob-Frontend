import { FiSearch, FiArrowRight } from 'react-icons/fi';

const tags = ['Plumbing', 'Electrical', 'Carpentry', 'Landscaping'];

export default function HomeHero() {
  return (
    <>
      <style>{`
        .hero-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at top right, #fde8d0 0%, #f5f0ff 40%, #eef1f8 100%);
          padding: 48px 24px;
          font-family: 'Work Sans', sans-serif;
        }

        .hero-inner {
          text-align: center;
          max-width: 720px;
          width: 100%;
        }

        .hero-heading {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.1;
          color: #0f1623;
          margin: 0 0 20px;
          letter-spacing: -1.5px;
        }

        .hero-heading .accent {
          color: #f5820a;
        }

        .hero-sub {
          font-family: 'Work Sans', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          color: #6b7280;
          line-height: 1.6;
          max-width: 480px;
          margin: 0 auto 36px;
          font-weight: 400;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          padding: 8px 8px 8px 20px;
          gap: 12px;
          max-width: 600px;
          margin: 0 auto 20px;
        }

        .search-icon {
          color: #f5820a;
          flex-shrink: 0;
          font-size: 20px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: 'Work Sans', sans-serif;
          font-size: 16px;
          color: #0f1623;
          background: transparent;
        }

        .search-input::placeholder {
          color: #b0b7c3;
          font-weight: 400;
        }

        .search-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #0f1623;
          color: #fff;
          font-family: 'Work Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border: none;
          border-radius: 10px;
          padding: 14px 24px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }

        .search-btn:hover {
          background: #1e293b;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 4px;
        }

        .tag {
          font-family: 'Work Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 999px;
          padding: 6px 16px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .tag:hover {
          background: #fff;
          border-color: rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="hero-wrapper">
        <div className="hero-inner">
          <h1 className="hero-heading">
            Professional Help,<br />
            <span className="accent">Engineered</span> for You.
          </h1>
          <p className="hero-sub">
            The premium marketplace for homeowners who value precision, quality, and professional accountability.
          </p>
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="What do you need help with?"
            />
            <button className="search-btn">
              Continue <FiArrowRight />
            </button>
          </div>
          <div className="tags">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}