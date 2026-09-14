import { ChevronDown } from "lucide-react";

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="uiFaqList">{items.map(({question, answer}) => (
    <details key={question}>
      <summary><span>{question}</span><ChevronDown aria-hidden="true" size={20}/></summary>
      <p>{answer}</p>
    </details>
  ))}</div>;
}
