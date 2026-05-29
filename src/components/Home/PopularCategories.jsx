import { BsLightningChargeFill } from 'react-icons/bs';
import { PiTreeEvergreenFill } from 'react-icons/pi';
import { MdCarpenter, MdConstruction, MdOutlinePlumbing, MdRoofing } from 'react-icons/md';
import { FaHammer, FaPaintRoller } from 'react-icons/fa';
import { GiGardeningShears } from 'react-icons/gi';

const categories = [
  { label: 'Plumbing & Heating',     Icon: MdOutlinePlumbing },
  { label: 'Building & Construction',   Icon: MdConstruction },
  { label: 'Electrical',  Icon: BsLightningChargeFill },
  { label: 'Joinery & Carpentry',      Icon: MdCarpenter },
  { label: 'Landscaping & Gardening',    Icon: GiGardeningShears },
];

export default function PopularCategories() {
  return (
    <section className="bg-[#0d1b2a] px-8 py-12 font-['Work_Sans',sans-serif]">
      <h2 className="text-white text-3xl font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
        Popular Categories
      </h2>
      <p className="text-gray-200 text-sm mb-8">Find the right specialist for your specific home needs.</p>

      <div className="flex flex-row justify-between gap-4">
        {categories.map(({ label, Icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl flex flex-col items-center justify-center gap-4 py-8 px-4 cursor-pointer hover:scale-105 transition-transform duration-200 w-200"
          >
            <div className="bg-orange-50 rounded-xl p-3">
              <Icon className="text-orange-400 text-2xl" />
            </div>
            <span className="text-[#0d1b2a] text-sm font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}