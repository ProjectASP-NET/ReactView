import type { PropsWithChildren} from "react";
import { Header } from "../../components/Header";
import AgeModal from "@/components/AgeModal";
export default function Layout({children}:
PropsWithChildren<unknown>){
    return <div>
        <AgeModal />
        <Header />
        {children}
        </div>
}