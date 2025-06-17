export default async function sendWhatsApp(phone, message) {
  try {
    const res = await fetch('https://app.wati.io/api/v1/sendTemplateMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WATI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phone,
        message,
      })
    });
    const data = await res.json();
    console.log('WhatsApp Sent:', data);
  } catch (err) {
    console.error('WhatsApp Error:', err.message);
  }
}
