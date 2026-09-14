import {redirect} from "next/navigation";export function generateStaticParams(){return [{slug:"bai-mau"}]}export default function Page(){redirect("/kien-thuc")}
