"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import { TranscriptHistory } from "@/types";

const SheetPage = () => {
  const [history, setHistory] = useState<TranscriptHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("/api/transcripts/recent");
      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, []);

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
                🚀 SmartTracker
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        {/* NAV LINKS */}
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

        {/* HISTORY */}
        <div className="px-3 mt-6">
          <p className="font-bold text-neutral-500 text-sm">
            RECENT TRANSCRIPTS
          </p>

          <div className="space-y-2 text-sm text-gray-700 mt-4">
            {history.length === 0 && (
              <p className="text-gray-400">No transcripts yet</p>
            )}

            {history.map((item) => (
              <SheetClose key={item.id} asChild>
                <Link
                  href={`/extract/${item.id}`}
                  className="block rounded-md hover:bg-gray-100 p-2"
                >
                  {new Date(item.createdAt).toLocaleDateString()} –{" "}
                  {item.taskCount} tasks
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetPage;
