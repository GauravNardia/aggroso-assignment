import DataTable from '@/components/tables/DataTable';
import { db } from '@/database/drizzle';
import { tasks } from '@/database/schema';
import { eq } from 'drizzle-orm';


declare interface Params {
  params: Promise<Record<string, string>>;
}


const page = async({ params }: Params) => {
     const id = (await params).id;
    const taskList = await db
    .select()
    .from(tasks)
    .where(eq(tasks.transcriptId, id));

    if(!taskList) return 



  return (
    <section className="w-full max-w-4xl border mx-auto flex flex-col justify-center items-center">
        <DataTable initialTasks={taskList} />
    </section>
  )
}

export default page