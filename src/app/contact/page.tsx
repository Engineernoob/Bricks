export default function ContactPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-[Amiri] text-slate-900 mb-4">
        Contact Support
      </h1>
      <p className="text-slate-600 max-w-md mb-8">
        Need help or have questions? Send us a message — our team usually
        responds within 24 hours.
      </p>
      <form className="max-w-md w-full space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full border rounded-lg p-3"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full border rounded-lg p-3"
        />
        <textarea
          placeholder="Your message"
          rows={5}
          className="w-full border rounded-lg p-3"
        />
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
