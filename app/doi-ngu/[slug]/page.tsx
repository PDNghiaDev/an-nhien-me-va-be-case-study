import {redirect} from "next/navigation";export function generateStaticParams(){return [{slug:"ho-so-demo"}]}export default function Page(){redirect("/doi-ngu")}
