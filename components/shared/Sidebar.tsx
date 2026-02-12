import { NAV_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
  return (
      <aside className="w-60 bg-white border-r flex flex-col justify-start items-start px-3">
        <div className="py-4 text-left">
          <h1 className="text-lg font-bold">
            🚀 SmartTracker
          </h1>
        </div>

        <div className="text-left flexflex-col justify-start items-start mt-5">
           {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className='flex justify-start items-start gap-3 py-4'>
                 <Image
                 src={link.icon}
                 width={25}
                 height={25}
                 alt='add'
                 /> {link.title}
              </Link>
           ))
           }

          <h2 className="text-xs font-semibold text-gray-500 uppercase my-2">
            Recent Transcripts
          </h2>

          <div className="space-y-1 text-sm text-gray-700">
            <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              Feb 12 - 3 tasks
            </div>
            <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              Feb 11 - 5 tasks
            </div>
          </div>
        </div>


      </aside>
        )
}

export default Sidebar