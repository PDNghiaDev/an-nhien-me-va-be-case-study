import {redirect} from "next/navigation";export function generateStaticParams(){return [{slug:"pha-che-truc-tiep"},{slug:"pha-che-online"}]}export default function Page(){redirect("/dich-vu")}
