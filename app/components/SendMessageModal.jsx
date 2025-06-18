'use client';

import { useState, useEffect, useRef } from 'react';

export default function SendMessageModal({ selectedLeads, onClose, onSend }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await fetch('/templates/emailTemplates.json');
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates", error);
      }
    };
    loadTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplateId && templates.length > 0) {
      const selected = templates.find((t) => t.id === selectedTemplateId);
      if (selected) {
        setSubject(selected.subject);
        setMessage(selected.message);
      }
    }
  }, [selectedTemplateId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      alert('Subject and Message required');
      return;
    }

    onSend({ subject, message });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: 9999,
    }}>
      <div
        ref={modalRef}
        style={{
          width: '450px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #ccc',
          boxShadow: '0 0 12px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>New Message</h2>
          <button onClick={onClose} style={{ fontSize: '20px', color: '#666', border: 'none', background: 'none' }}>
            &times;
          </button>
        </div>

        <div style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          <strong>To:</strong> {selectedLeads.map((l) => l.email).join(', ')}
        </div>

        <select
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        >
          <option value="">Select a Template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', padding: '8px', height: '100px', marginBottom: '8px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666' }}>
            Cancel
          </button>
          <button onClick={handleSend} style={{
            background: '#2563eb',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
          }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
