import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface HistoryItem {
  id: string;
  createdAt: Date | null;
  taskCount: number;
}

interface Props {
  history: HistoryItem[];
}

const Sidebar = ({ history }: Props) => {
  return (
    <aside className="w-60 bg-white border-r flex flex-col px-3">
      <div className="py-4">
        <Link href="/" className="text-lg font-bold">
          🚀 SmartTracker
        </Link>
      </div>

      <Link
        href="/extract"
        className="flex gap-3 py-4 text-sm font-medium"
      >
        + New Extraction
      </Link>

      <h2 className="text-xs font-semibold text-gray-500 uppercase mt-6 mb-2">
        Recent Transcripts
      </h2>

      <div className="space-y-2 text-sm">
        {history.length === 0 && (
          <p className="text-gray-400 text-xs">
            No history yet
          </p>
        )}

        {history.map((item) => (
          <Link
            key={item.id}
            href={`/extract/${item.id}`}
            className="block p-2 rounded-md hover:bg-gray-100"
          >
            {formatDate(item.createdAt)} – {item.taskCount} tasks
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
