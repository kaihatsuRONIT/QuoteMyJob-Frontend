import { useEffect, useState } from "react";
import { FiPlusCircle, FiTrash2, FiEdit2 } from "react-icons/fi";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function SchemaBuilder() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categories/admin');
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    try {
      setSaving(true);
      await api.post('/categories', newCategory);
      toast.success('Category created');
      setNewCategory({ name: "", description: "" });
      setShowForm(false);
      await fetchCategories();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create category');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      setSaving(true);
      await api.patch(`/categories/${id}`, updates);
      toast.success('Category updated');
      setEditingId(null);
      await fetchCategories();
    } catch (err) {
      toast.error('Failed to update category');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (cat) => {
    await handleUpdate(cat.id, { isActive: !cat.isActive });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 36px", borderRadius: 12, background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
        <div style={{ maxWidth: 420 }}>
          {/* <div style={{ fontSize: 11, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Architecture Phase</div> */}
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "48px", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", lineHeight: "48px", letterSpacing: "0.5px", minWidth: "335px" }}>Trade <span style={{ color: "#f97316" }}>Categories</span></h2>
          <p style={{ fontSize: "16px", color: "#9ca3af", lineHeight: 1.6, margin: 0, minWidth: "600px" }}>
            Manage the trade categories tradespeople can register under and customers can select when posting jobs.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FiPlusCircle /> New Category
        </button>
      </div>

      <div className="px-5 pb-5">
        {/* New category form */}
        {showForm && (
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: 24, margin: "20px 0", fontFamily: "'Work Sans', sans-serif" }}>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>New Category</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#FF7E00", textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: 6 }}>Category Name</div>
                <input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g. Plumbing"
                  style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none" }}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#FF7E00", textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: 6 }}>Description</div>
                <input
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Brief description"
                  style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none" }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={handleCreate}
                disabled={saving}
                style={{ background: "#FF7E00", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: saving ? 0.6 : 1 }}
              >
                {saving ? 'Saving...' : 'Save Category'}
              </button>
              <button
                onClick={() => { setShowForm(false); setNewCategory({ name: "", description: "" }); }}
                style={{ background: "#fff", color: "#374151", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Categories list */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden", marginTop: 20, fontFamily: "'Work Sans', sans-serif" }}>
          {loading ? <SkeletonRows /> : categories.length === 0 ? (
            <p style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>No categories yet. Create your first one.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {['NAME', 'DESCRIPTION', 'STATUS', 'ACTIONS'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', padding: '14px 20px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid #f8f9fb' }}>
                    <td style={{ padding: '16px 20px' }}>
                      {editingId === cat.id ? (
                        <input
                          defaultValue={cat.name}
                          onBlur={(e) => handleUpdate(cat.id, { name: e.target.value })}
                          style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "6px 10px", fontSize: 13 }}
                          autoFocus
                        />
                      ) : (
                        <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{cat.name}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {editingId === cat.id ? (
                        <input
                          defaultValue={cat.description || ''}
                          onBlur={(e) => handleUpdate(cat.id, { description: e.target.value })}
                          placeholder="Add a description"
                          style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "6px 10px", fontSize: 13, width: '100%' }}
                        />
                      ) : (
                        <span style={{ fontSize: 13, color: '#6b7280' }}>{cat.description || '—'}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        color: cat.isActive ? '#22c55e' : '#9ca3af',
                        display: 'flex', alignItems: 'center', gap: '5px'
                      }}>
                        {cat.isActive ? <MdCheckCircle /> : <MdCancel />}
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', display: 'flex', gap: 12 }}>
                      <button onClick={() => setEditingId(cat.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                        <FiEdit2 size={15} />
                      </button>
                      <button onClick={() => handleToggleActive(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: cat.isActive ? '#ef4444' : '#22c55e', fontSize: 12, fontWeight: 700 }}>
                        {cat.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
function SkeletonRows() {
  return (
    <>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ display: 'flex', gap: '24px', padding: '16px 20px', borderBottom: '1px solid #f8f9fb' }}>
          <div style={{ width: '120px', height: '14px', background: '#e5e7eb', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
          <div style={{ width: '200px', height: '14px', background: '#e5e7eb', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
          <div style={{ width: '80px', height: '14px', background: '#e5e7eb', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
        </div>
      ))}
    </>
  );
}