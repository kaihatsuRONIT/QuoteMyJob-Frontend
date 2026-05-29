import { FiFileText, FiShuffle } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

const steps = [
  {
    Icon: FiFileText,
    title: '1. Define Your Scope',
    desc: 'Tell us what you need. Our intelligent job posting tool helps you provide the exact details pros need to quote accurately.',
  },
  {
    Icon: FiShuffle,
    title: '2. Compare & Vet',
    desc: 'Receive verified quotes from top-rated professionals. Review credentials, past project history, and real customer feedback.',
  },
  {
    Icon: MdVerified,
    title: '3. Work Secured',
    desc: 'Hire with confidence. Our platform manages milestones and payments, keeping your project and budget on schedule.',
  },
];

export default function HomeAdvantage() {
  return (
    <section className="bg-white px-8 py-14">

      <h2 className="text-[#0d1b2a] text-4xl font-bold mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>
        The Digital Foreman Advantage
      </h2>
      <p className="mb-12 max-w-md leading-relaxed" style={{fontSize:"18px", fontWeight:"400", lineHeight:"28px", color:"#515F78"}}>
        We streamline the process from blueprint to completion, ensuring every project meets professional standards.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {steps.map(({ Icon, title, desc }, i) => (
          <div
            key={title}
            className="relative pl-6 pr-8"
            style={{
              borderRadius:"10px",
              borderLeft: i === 1 ? '4px solid #000000' : '4px solid #f5820a',
              borderRight: i < steps.length - 1 ? '1px solid #e5e7eb' : 'none',
            }}
          >
            <div className={`${i === 1 ? "bg-[#0B1A301A]":"bg-orange-50"} rounded-xl p-3 w-fit mb-6`}>
              <Icon className={`${i === 1 ? "text-black":"text-orange-400"} text-xl`} />
            </div>
            <h3 className="text-[#0d1b2a] font-semibold text-xl mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {title}
            </h3>
            <p className="text-gray-500 text-md leading-relaxed min-h-[104px] max-w-[321px]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}