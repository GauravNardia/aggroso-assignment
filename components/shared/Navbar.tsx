"use client"
import Image from 'next/image'
import Link from 'next/link'
import SheetPage from './Sheet'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
  return (
    <section className='z-10 w-full flex border border-b justify-between items-center'>
        <div className='py-4 px-3'>
            <Link href="/" className='text-xl font-bold'>
             🚀 SmartTracker
            </Link> 
        </div>

        <div className={`${pathname === "/" ? "hidden" : "py-4 px-2 flex gap-3 justify-center items-center"}  `}>
            <Link href="/extract" className='text-xl font-bold'>
            <Image
            src="/assets/icons/add.svg"
            width={25}
            height={25}
            alt='add'
            />
            </Link>
            <SheetPage/>
        </div>
    </section>
  )
}

export default Navbar