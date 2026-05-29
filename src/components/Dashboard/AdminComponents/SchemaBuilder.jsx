import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";

const inputTypes = ["Single Select", "Multi-Select", "Numerical", "Text", "Date", "Boolean"];

const iconMap = {
  0: "⚡",
  1: "📐",
  2: "🔧",
};
export default function SchemaBuilder() {
  return (
    <div className="p-5">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 36px", borderRadius: 12, background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

        <div style={{ maxWidth: 420 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Architecture Phase</div>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "48px", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", lineHeight: "48px", letterSpacing: "0.5px", minWidth: "335px" }}>Schema Builder</h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0, minWidth: "600px" }}>
            Define the technical requirements and validation logic for new trade categories. This schema will drive the quoting engine and professional vetting process.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "48px", flexShrink: 0, marginTop: "50px" }}>
          <button style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>
            Discard
          </button>
          <button style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", lineHeight: 1.3, textAlign: "center" }}>
            Publish<br />Schema
          </button>
        </div>

      </div>
      <SchemaBuilderBody/>
    </div>
  );
}
function ParameterCard({ param, index, onChange, onDelete }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 10, padding: "16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ borderLeft: "3px solid #f97316", paddingLeft: 12, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 16, flex: 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontFamily: "'Work Sans', sans-serif" }}>Field Label</div>
              <input
                value={param.label}
                onChange={(e) => onChange(index, "label", e.target.value)}
                style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 6, padding: "8px 10px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", outline: "none", color: "#111" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontFamily: "'Work Sans', sans-serif" }}>Input Type</div>
              <select
                value={param.inputType}
                onChange={(e) => onChange(index, "inputType", e.target.value)}
                style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 6, padding: "8px 10px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", outline: "none", color: "#111", background: "#fff" }}
              >
                {inputTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => onDelete(index)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f97316", fontSize: 16, marginLeft: 12, marginTop: 18, padding: 0 }}>🗑</button>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontFamily: "'Work Sans', sans-serif" }}>Description Hint</div>
          <input
            value={param.hint}
            onChange={(e) => onChange(index, "hint", e.target.value)}
            placeholder="e.g. Describe this field..."
            style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 6, padding: "8px 10px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", outline: "none", color: "#111", fontStyle: param.hint ? "normal" : "italic" }}
          />
        </div>
        {(param.inputType === "Single Select" || param.inputType === "Multi-Select") && (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            {param.options.map((opt, i) => (
              <span key={i} style={{ background: "#fff3e0", color: "#f97316", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, fontFamily: "'Work Sans', sans-serif" }}>{opt}</span>
            ))}
            <button
              onClick={() => {
                const val = prompt("New option:");
                if (val) onChange(index, "options", [...param.options, val]);
              }}
              style={{ background: "none", border: "none", color: "#f97316", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}
            >+ ADD OPTION</button>
          </div>
        )}
      </div>
    </div>
  );
}
function SchemaBuilderBody() {
  const [categoryName, setCategoryName] = useState("Industrial Electrical");
  const [parentClassification, setParentClassification] = useState("Infrastructure & Utilities");
  const [requirements, setRequirements] = useState(["State Contractor License", "Liability Insurance ($2M+)"]);
  const [parameters, setParameters] = useState([
    { label: "System Voltage", inputType: "Single Select", hint: "e.g. Specify the main electrical input voltage", options: [] },
    { label: "Floor Area (SQ)", inputType: "Numerical", hint: "Total square footage of the work zone", options: [] },
    { label: "Conduit Material", inputType: "Multi-Select", hint: "", options: ["EMT", "Rigid Steel", "PVC"] },
  ]);

  const parentOptions = ["Infrastructure & Utilities", "Construction", "HVAC", "Plumbing", "Mechanical"];

  const handleParamChange = (index, field, value) => {
    setParameters((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const handleDeleteParam = (index) => {
    setParameters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddParam = () => {
    setParameters((prev) => [...prev, { label: "", inputType: "Text", hint: "", options: [] }]);
  };

  const handleAddRequirement = () => {
    const val = prompt("New requirement:");
    if (val) setRequirements((prev) => [...prev, val]);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, padding: "24px", fontFamily: "'Work Sans', sans-serif", background: "#f7f8fa", minHeight: "80vh" }}>

      {/* Left Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Primary Identity */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: 20, lineHeight:"28px" }}>Primary Identity</h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#FF7E00", textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: 6, lineHeight:"16.5px" }}>Category Name</div>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", outline: "none", color: "#111", background: "#f5f6ff" }}
            />
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#FF7E00", textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: 6, lineHeight:"16.5px" }}>Parent Classification</div>
            <select
              value={parentClassification}
              onChange={(e) => setParentClassification(e.target.value)}
              style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", outline: "none", color: "#111", background: "#fff" }}
            >
              {parentOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Vetting Rules */}
        <div style={{ background: "#0f172a", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Vetting Rules</h3>
          <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16, lineHeight: 1.5 }}>Apply specific licensing requirements for this schema level.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {requirements.map((req, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#e2e8f0", fontFamily: "'Work Sans', sans-serif" }}>{req}</span>
                <span style={{ color: "#f97316", fontSize: 16 }}><MdCheckCircle /></span>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddRequirement}
            style={{ width: "100%", background: "transparent", border: "1px solid #f97316", borderRadius: 8, padding: "10px", color: "#f97316", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}
          >
            Add Requirement
          </button>
        </div>

      </div>

      {/* Right Panel */}
      <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "24px", fontWeight: 700, color: "#111", marginBottom: 4, lineHeight:"32px" }}>Dynamic Parameters</h2>
            <p style={{fontWeight:"400", fontSize: "14px", color: "#64748b", margin: 0, lineHeight:"20px" }}>Fields defined here will be required from clients during job posting.</p>
          </div>
          <button
            onClick={handleAddParam}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 700, color: "#111", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}
          >
            <FiPlusCircle /> Add Parameter
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {parameters.map((param, i) => (
            <ParameterCard key={i} param={param} index={i} onChange={handleParamChange} onDelete={handleDeleteParam} />
          ))}

          {/* Inject field */}
          <div
            onClick={handleAddParam}
            style={{ border: "2px dashed #e0e0e0", borderRadius: 10, padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", color: "#aaa" }}
          >
            <span style={{ fontSize: 24 }}>⊞</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Work Sans', sans-serif" }}>Inject New Validation Field</span>
          </div>
        </div>
      </div>

      {/* Floating Eye Button */}
      <div style={{ position: "fixed", bottom: 28, right: 28, width: 48, height: 48, background: "#f97316", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.4)", fontSize: 18 }}>
        👁
      </div>

    </div>
  );
}