import { Link } from 'next-view-transitions';
import { PAGES } from "@/config/pages.config";
import { Home } from "lucide-react";
interface HomeLinkProps {
    className?: string;
}
export function HomeLink({ className = "" }: HomeLinkProps) {
    return (
                   <Link 
          href={PAGES.CATALOG} 
          className={`z-50 flex items-center gap-2 px-3 py-2 border border-white/50 rounded-lg text-white/80 hover:text-white hover:border-white transition-colors ${className}`}
        >
          <Home size={20} /> 
         <span>На главную</span> 
        </Link>
    );
        }