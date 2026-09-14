import { Button } from './Button';
import type { DirectContactContent } from '@/lib/types';

export function DirectContact({ data, compact = false }: { data?: DirectContactContent; compact?: boolean }) {
  if (!data || data.status !== 'ĐÃ XÁC MINH' || !/^(https:\/\/[^\s]+|tel:\+?[\d ()-]+|mailto:[^\s@]+@[^\s@]+)$/.test(data.href)) {
    return <div className={compact ? 'footerNewsletter' : 'consultForm'}><p>Kênh liên hệ chưa được cấu hình. Vui lòng xem thông tin liên hệ trên website.</p></div>;
  }
  return <div data-contact-panel className={`${compact ? 'footerNewsletter' : 'consultForm'} directContact`}>
    <h3>{data.title}</h3><p>{data.description}</p>
    <Button href={data.href}>{data.label}</Button>
  </div>;
}
