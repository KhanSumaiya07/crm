'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';
import { Pencil, Trash2, Eye } from 'lucide-react';

const CounsellorTable = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', whatsapp: '' });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/counsellor/list')
      .then(res => res.json())
      .then(data => setCounsellors(data));
  }, []);

  const handleEditClick = (c) => {
    setForm(c);
    setEditing(c._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete?')) return;
    await fetch(`/api/counsellor/${id}`, { method: 'DELETE' });
    setCounsellors(prev => prev.filter(c => c._id !== id));
  };

  const handleUpdate = async () => {
    await fetch(`/api/counsellor/${editing}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditing(null);
    setCounsellors(prev => prev.map(c => (c._id === editing ? form : c)));
  };

  const handleViewClick = (id) => {
router.push(`/dashboard/counsellor/view/${id}`);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>WhatsApp</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {counsellors.map(c => (
            <tr key={c._id} className={styles.row}>
              <td className={styles.td}>{c.name}</td>
              <td className={styles.td}>{c.email}</td>
              <td className={styles.td}>{c.phone || '—'}</td>
              <td className={styles.td}>{c.whatsapp || '—'}</td>
              <td className={`${styles.td} ${styles.actionBtns}`}>
                <button className={styles.iconBtn} onClick={() => handleViewClick(c._id)}><Eye size={18} /></button>
                <button className={styles.iconBtn} onClick={() => handleEditClick(c)}><Pencil size={18} /></button>
                <button className={styles.iconBtn} onClick={() => handleDelete(c._id)}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Counsellor</h2>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
            <input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="WhatsApp" />
            <div className={styles.modalActions}>
              <button onClick={() => setEditing(null)}>Cancel</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CounsellorTable;
