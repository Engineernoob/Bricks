export default function CommunityPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-[Amiri] text-slate-900 mb-4">
        Join Our Community
      </h1>
      <p className="text-slate-600 max-w-md mb-6">
        Collaborate with other builders, share feedback, and get support from
        the Bricks team.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://discord.gg/yourinvite"
          target="_blank"
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        >
          Join Discord
        </a>
        <a
          href="https://github.com/your-org"
          target="_blank"
          className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
        >
          View GitHub
        </a>
      </div>
    </section>
  );
}
