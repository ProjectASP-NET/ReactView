import Image from "next/image";
import Link from "next/link";
export function Header(){
    return(
    <header className="item-center justify-between">
        <Link
        href="/"
        className="flex item-center gap-5">
            <Image className="w-fit h-fit "
            src="/logo1.png"
            alt="D&DLiquid"
            width={10}
            height={10}
            priority
            />
        </Link>
        <nav className="flex gap-6 text-align:center text-white/90">
        <Link href="/">Home</Link>
        <Link href="/">Catalog</Link>
        <Link href="/">Profile</Link>
        </nav>
    </header>
    )
}