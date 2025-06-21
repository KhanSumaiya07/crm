'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '../view.module.css';

export default function CounsellorViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [counsellor, setCounsellor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', whatsapp: '' });

  useEffect(() => {
    if (id) {
      fetch(`/api/counsellor/${id}`)
        .then(res => res.json())
        .then(data => {
          setCounsellor(data);
          setForm(data); // Pre-fill form
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/counsellor/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const updated = await res.json();
    setCounsellor(updated);
    setIsEditing(false);
  };

  if (!counsellor) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.viewContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Counsellor Details</h2>

        {isEditing ? (
          <>
            <input
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />
            <input
              className={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
            <input
              className={styles.input}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              className={styles.input}
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="WhatsApp"
            />
            <div className={styles.actions}>
              <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleUpdate} className={styles.editBtn}>
                Update
              </button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {counsellor.name}</p>
            <p><strong>Email:</strong> {counsellor.email}</p>
            <p><strong>Phone:</strong> {counsellor.phone || '—'}</p>
            <p><strong>WhatsApp:</strong> {counsellor.whatsapp || '—'}</p>

            <div className={styles.actions}>
              <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                ✏️ Edit
              </button>
              <button onClick={() => router.back()} className={styles.backBtn}>
                ← Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
