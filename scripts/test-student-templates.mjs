import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

test('Các tài liệu đầu vào tồn tại và chưa giả lập kết quả của học viên', () => {
  for (const file of ['01-ban-do-website-mau', '02-website-brief', '03-brand-kit', '04-quyet-dinh-giao-dien', '04-design-system', '05-content-blueprint', '06-hop-dong-du-lieu', '07-danh-muc-component', '12-nghiem-thu', 'handoff', '12-van-hanh-rollback', '21-beta-user-test-kit', '13-go-live']) {
    const body = readFileSync(`tai-lieu/${file}.md`, 'utf8');
    assert.ok(body.includes('[CHƯA ĐIỀN]'), file);
  }
  assert.ok(existsSync('tai-lieu/05-demo-content'));
});

test('Bộ kiểm tra cấu trúc chấp nhận gói khởi đầu', () => {
  const result = spawnSync(process.execPath, ['scripts/kiem-tra-workspace.mjs'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});

test('Bàn giao chặn mẫu trống nhưng không báo thiếu file hoặc tiêu đề', () => {
  const result = spawnSync(process.execPath, ['scripts/kiem-tra-ban-giao.mjs'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /CHƯA ĐIỀN/);
  assert.doesNotMatch(result.stderr, /thiếu mục|Thiếu tài liệu/);
});

test('Go-live không chấp nhận gói học viên chưa thực hành', () => {
  const result = spawnSync(process.execPath, ['scripts/kiem-tra-go-live.mjs'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /CHƯA ĐIỀN/);
  assert.match(result.stderr, /siteMode chưa là production/);
  assert.doesNotMatch(result.stderr, /Thiếu mục/);
});
