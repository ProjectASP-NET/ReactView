import type { PropsWithChildren} from "react";
import { Header } from "../comonents/Header";
export default function Layout({children}:
PropsWithChildren<unknown>){
    return <div>
        <Header />
        {children}
        </div>
}