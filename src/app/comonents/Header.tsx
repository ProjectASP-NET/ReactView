import Image from "next/image";
import Link from "next/link";
export function Header(){
    <header className="item-center justify-between">
        <Link
        href="/"
        className="flex item-center gap-5">
            <Image
            src="/logo1.png"
            alt="D&DLiquid"
            width={30}
            height={30}
            priority
            />
        </Link>
        <nav className="flex gap-6 text-sm text-white/50">
        <Link href="/">Home</Link>
        <Link href="/">Catalog</Link>
        <Link href="/">Profile</Link>
        </nav>
    </header>
}