"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SheetPage = () => {
    const pathname = usePathname();
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <Image
            src="/assets/icons/menu.svg"
            width={25}
            height={25}
            alt="menu"
          />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <Link href="/extract" className="flex items-center gap-1">
                <p>🚀 SmartTracker</p>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div>
          {NAV_LINKS.map((link) => (
            <SheetClose key={link.href} asChild>
              <Link
                href={link.href}
                className="flex items-center gap-2 py-4 text-md px-3"
              >
                <Image
                  src={link.icon}
                  width={20}
                  height={20}
                  alt={link.title}
                />
                {link.title}
              </Link>
            </SheetClose>
          ))}
        </div>

        <div className="px-3">
            <div>
                <p className="font-bold text-neutral-500 text-sm">RECENT TRANSCRIPTS</p>
            </div>
          <div className="space-y-1 text-sm text-gray-700 mt-5">
            <SheetClose asChild>
            <div className="rounded-md hover:bg-gray-100 cursor-pointer">
              Feb 12 - 3 tasks
            </div>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SheetPage
