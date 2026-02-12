import Link from "next/link";

const Home = () => {
  return (
    <header className="relative min-h-[90vh] w-full flex items-center justify-center px-6 bg-white overflow-hidden">
      
      {/* Soft subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40" />
      </div>

      <main className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center">

        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs text-neutral-600 border border-neutral-200 rounded-full bg-white shadow-sm">
            🚀 Smart Meeting Action Tracker
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-3xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.05]">
          Turn messy meeting transcripts
          <br />
          <span className="text-neutral-500">
            into clean, actionable task lists.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
          Stop digging through long meeting notes. Paste your transcript and instantly get structured tasks with owners and due dates — ready to manage.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/extract"
            className="px-8 py-4 text-sm font-medium text-white bg-black rounded-md hover:bg-neutral-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Let's Go →
          </Link>

          <p className="text-xs text-neutral-400">
            No sign-up required · AI-powered · Built for fast execution
          </p>
        </div>

      </main>
    </header>
  );
};

export default Home;
