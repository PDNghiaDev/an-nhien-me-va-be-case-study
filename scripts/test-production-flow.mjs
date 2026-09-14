// Fixture chỉ kiểm tra chương trình, không phải biên bản xác minh doanh nghiệp.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('Cổng production: chấp nhận fixture hợp lệ và chặn từng lỗi an toàn', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'student-v2-policy-test-'));
  const write = (file, data) => fs.writeFileSync(path.join(root, file), JSON.stringify(data));
  const run = () => spawnSync(process.execPath, ['scripts/kiem-tra-go-live.mjs'], { cwd: root, encoding: 'utf8' });
  try {
    for (const dir of ['scripts', 'content', 'components', 'app']) fs.cpSync(dir, path.join(root, dir), {recursive:true});
    fs.mkdirSync(path.join(root, 'tai-lieu'));
    fs.writeFileSync(path.join(root, 'tai-lieu/13-go-live.md'), `# FIXTURE TỰ ĐỘNG — KHÔNG PHẢI NGHIỆM THU THẬT
## 1. Mốc đầu vào
## 2. Danh sách phải thay
## 3. Cổng Go-live
DEMO còn lại: 0
CẦN THAY còn lại: 0
Placeholder còn lại: 0
P0 còn mở: 0
## 4. Biên bản Go-live
Trạng thái cuối: SẴN SÀNG KINH DOANH
## 5. Vận hành và rollback
`);
    // Chỉ chuẩn bị dữ liệu tổng hợp trong thư mục tạm, không sửa source học viên.
    const simulation = new Set(['contact.json:form', 'home-conversion.json:consult.form', 'site.json:footer.newsletter', 'news.json:newsletter']);
    for (const file of fs.readdirSync(path.join(root, 'content')).filter(f=>f.endsWith('.json'))) {
      const data = JSON.parse(fs.readFileSync(path.join(root,'content',file),'utf8'));
      function prepare(value, parts=[]) {
        if (!value || typeof value !== 'object') return;
        if ('status' in value && !simulation.has(`${file}:${parts.join('.')}`)) value.status='ĐÃ XÁC MINH';
        for(const [key, child] of Object.entries(value)) prepare(child,[...parts,key]);
      }
      prepare(data);
      if(file==='site.json') data.siteMode='production';
      write(`content/${file}`,data);
    }
    let result=run();
    assert.equal(result.status,0,result.stderr);
    const siteFile=path.join(root,'content/site.json');
    const preflightSite=JSON.parse(fs.readFileSync(siteFile,'utf8'));
    preflightSite.siteMode='demo';write('content/site.json',preflightSite);
    const bookFile=path.join(root,'tai-lieu/13-go-live.md');
    const completedBook=fs.readFileSync(bookFile,'utf8');
    fs.writeFileSync(bookFile,completedBook.replace('Trạng thái cuối: SẴN SÀNG KINH DOANH','Trạng thái cuối: CHƯA TRIỂN KHAI\n[CHƯA ĐIỀN]'));
    const preflight=spawnSync(process.execPath,['scripts/kiem-tra-go-live.mjs','--preflight'],{cwd:root,encoding:'utf8'});
    assert.equal(preflight.status,0,preflight.stderr);
    assert.equal(run().status,1,'Nghiệm thu cuối vẫn phải chặn demo/chưa có biên bản');
    preflightSite.siteMode='production';write('content/site.json',preflightSite);
    fs.writeFileSync(bookFile,completedBook);
    const contact=JSON.parse(fs.readFileSync(path.join(root,'content/contact.json'),'utf8'));
    contact.submissionEnabled=true; write('content/contact.json',contact);
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/submissionEnabled/);
    contact.submissionEnabled=false;
    const savedForm=contact.form;
    delete contact.form; write('content/contact.json',contact);
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/Thiếu cấu hình form/);
    contact.form=savedForm;
    contact.form.demoNote=''; write('content/contact.json',contact);
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/DEMO|demo/);
    contact.form.demoNote='Form demo, không gửi hoặc lưu dữ liệu.';
    contact.channels.items[0].status='CẦN THAY'; write('content/contact.json',contact);
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/CẦN THAY/);
    contact.channels.items[0].status='ĐÃ XÁC MINH'; write('content/contact.json',contact);
    const direct={title:'Liên hệ',description:'Kênh thử tổng hợp',label:'Gửi email',href:'mailto:qa@invalid.test',status:'ĐÃ XÁC MINH'};
    for (const [file, keys] of [['contact.json',['form']],['home-conversion.json',['consult','form']],['site.json',['footer','newsletter']],['news.json',['newsletter']]]) {
      const data=JSON.parse(fs.readFileSync(path.join(root,'content',file),'utf8'));
      const config=keys.reduce((value,key)=>value[key],data);
      config.mode='direct'; config.status='ĐÃ XÁC MINH'; config.directContact={...direct};
      write(`content/${file}`,data);
    }
    result=run(); assert.equal(result.status,0,result.stderr);
    const directData=JSON.parse(fs.readFileSync(path.join(root,'content/contact.json'),'utf8'));
    directData.form.directContact.href='javascript:alert(1)'; write('content/contact.json',directData);
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/không an toàn/);
    directData.form.directContact.href=direct.href;
    directData.form.directContact.status='CẦN THAY'; write('content/contact.json',directData);
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/chưa xác minh|CẦN THAY/);
    directData.form.directContact.status='ĐÃ XÁC MINH'; write('content/contact.json',directData);
    const formPath=path.join(root,'components/home/ConsultForm.tsx');
    fs.appendFileSync(formPath,'\n// test fixture: fetch("https://invalid.test")');
    result=run(); assert.equal(result.status,1); assert.match(result.stderr,/truyền dữ liệu/);
  } finally {
    // root do mkdtemp tạo trực tiếp; chỉ xoá fixture của lượt test này.
    assert.ok(path.dirname(root)===os.tmpdir() && path.basename(root).startsWith('student-v2-policy-test-'));
    fs.rmSync(root,{recursive:true,force:true});
  }
});
