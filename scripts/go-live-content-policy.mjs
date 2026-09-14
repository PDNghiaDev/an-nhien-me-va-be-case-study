// Chỉ miễn trừ nhãn DEMO tại đúng bốn cấu hình form, không miễn trừ nội dung con.
const simulationPaths = new Set([
  'contact.json:form', 'home-conversion.json:consult.form',
  'site.json:footer.newsletter', 'news.json:newsletter',
]);

export function auditContentStatus(file, data) {
  const errors = [];
  function visit(value, parts = []) {
    if (!value || typeof value !== 'object') return;
    const location = `${file}:${parts.join('.')}`;
    if (value.status === 'CẦN THAY') errors.push(`${location} còn CẦN THAY`);
    if (value.status === 'DEMO') {
      const notice = `${value.demoNote ?? ''} ${value.note ?? ''}`;
      const safeSimulation = simulationPaths.has(location)
        && /demo|mô phỏng/i.test(notice)
        && /không.+(?:gửi|lưu)/i.test(notice);
      if (!safeSimulation) errors.push(`${location} còn DEMO chưa được phép`);
    }
    for (const [key, child] of Object.entries(value)) visit(child, [...parts, key]);
  }
  visit(data);
  return errors;
}
