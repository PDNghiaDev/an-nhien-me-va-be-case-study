import type { ContentStatus } from "@/lib/types";
export function StatusBadge({status}:{status:ContentStatus}) { return <span className={`statusBadge statusBadge--${status==="CẦN THAY"?"locked":"demo"}`}>{status}</span>; }
