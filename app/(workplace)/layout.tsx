import React from "react";
import Link from "next/link";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";

export default function WorkplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden sm:flex">
        <Sidebar/>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3">
        {children}
      </main>
    </div>
  );
}
