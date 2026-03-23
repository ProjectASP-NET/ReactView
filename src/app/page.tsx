import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Декоративный градиент на фоне */}
      <div className="absolute top-0 -z-10 h-full w-full ">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(37,99,235,0.15)] opacity-50 blur-[80px]"></div>
      </div>

      <div className="text-center px-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          HELLO FROM<br />
          <span className="text-blue-600 italic">D&DLiquid</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl mb-10">
          WebSite was made just for fun 
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center font-bold">
          <Link href="/catalog" className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition shadow-xl">
            Catalog
          </Link>
        </div>
      </div>
    </main>
  )
}