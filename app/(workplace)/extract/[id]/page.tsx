import DataTable from '@/components/tables/DataTable';
import React from 'react'

declare interface Params {
  params: Promise<Record<string, string>>;
}


const page = async({ params }: Params) => {
     const id = (await params).id;

  return (
    <section className="w-full max-w-4xl border mx-auto flex flex-col justify-center items-center">
        <DataTable/>
    </section>
  )
}

export default page