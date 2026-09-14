import test from 'node:test';
import assert from 'node:assert/strict';
import { auditContentStatus } from './go-live-content-policy.mjs';

const form = {status:'DEMO', demoNote:'Form mô phỏng, không gửi hoặc lưu dữ liệu.'};
test('Cho phép đúng form mô phỏng có cảnh báo', () => {
  assert.deepEqual(auditContentStatus('contact.json', {form}), []);
});
test('Không cho phép DEMO ở nội dung kinh doanh hoặc đường dẫn giả', () => {
  assert.equal(auditContentStatus('contact.json', {channels:{status:'DEMO'}}).length, 1);
  assert.equal(auditContentStatus('other.json', {form}).length, 1);
});
test('Form thiếu cảnh báo hoặc đổi nhãn CẦN THAY vẫn bị chặn', () => {
  assert.equal(auditContentStatus('contact.json', {form:{status:'DEMO'}}).length, 1);
  assert.equal(auditContentStatus('contact.json', {form:{...form,status:'CẦN THAY'}}).length, 1);
});
test('Miễn trừ form không che dữ liệu chưa xác minh bên trong', () => {
  assert.equal(auditContentStatus('contact.json', {form:{...form, claim:{status:'DEMO'}}}).length, 1);
});
