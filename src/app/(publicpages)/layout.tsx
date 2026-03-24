import type { PropsWithChildren} from "react";
import { Header } from "../../components/Header";
import AgeModal from "@/components/AgeModal";
import { Metadata } from "next";
export default function Layout({children}:
PropsWithChildren<unknown>){
    return <div>
        <AgeModal />
        <Header />
        {children}
        </div>
}
export const metadata: Metadata = {
 title : {
  template : '%s - D&DLiquid',
  default : ''
 }, 
 description : 'D&DLiquid'
};
