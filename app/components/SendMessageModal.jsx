'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export default function SendMessageModal({ selectedLeads, onClose, onSend }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await fetch('/templates/emailTemplates.json');
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to load templates', error);
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
      alert('Subject and message are required!');
      return;
    }
    onSend({ subject, message, file });
    onClose();
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        width: '450px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #e0e0e0',
      }}
      ref={modalRef}
    >
      <div style={{ background: '#f2f2f2', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
        <span style={{ fontWeight: 'bold' }}>New Message</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '12px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>
          <strong>To:</strong> <span style={{ color: '#555' }}>{selectedLeads.map((l) => l.email).join(', ')}</span>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">📑 Choose Template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>{template.title}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', height: '120px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
        ></textarea>

        {file && <div style={{ fontSize: '12px', color: '#444', marginTop: '6px' }}>📎 Attached: {file.name}</div>}

        {showEmojiPicker && (
          <div style={{ marginTop: '10px' }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} height={300} width={300} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #eee', padding: '8px 12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label className="iconButton" title="Attach File">
            📎
            <input type="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <button title="Insert Emoji" className="iconButton" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
          <button title="Insert Link" className="iconButton">🔗</button>
          <button title="Formatting" className="iconButton">🅰️</button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} className="iconButton">🧹</button>
          <button
            onClick={handleSend}
            style={{ backgroundColor: '#1a73e8', color: 'white', padding: '6px 16px', border: 'none', borderRadius: '4px', fontWeight: '500' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
