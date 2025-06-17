export default function renderTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const trimmed = key.trim();
    return data[trimmed] || '';
  });
}
