import { useMemo, useState } from 'react'

function App() {
  const [seed, setSeed] = useState(0)

  const clauses = useMemo(() => {
    // A pool of lighthearted, generic T&C style clauses
    const pool = [
      {
        title: 'Acceptance of Terms',
        body:
          'By accessing or using this website, you agree to be bound by these Terms and any additional guidelines, policies, or rules that we post. If you do not agree, do not use the service.'
      },
      {
        title: 'Eligibility',
        body:
          'You must be at least 13 years old to use this service. If you are under the age of majority in your jurisdiction, you must have your parent or legal guardian’s permission.'
      },
      {
        title: 'Account Responsibilities',
        body:
          'You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account, whether or not authorized by you.'
      },
      {
        title: 'Acceptable Use',
        body:
          'Do not use the service for any unlawful purpose, to violate the rights of others, or to interfere with the normal operation of the platform.'
      },
      {
        title: 'Content Ownership',
        body:
          'Except for content you submit, all materials, trademarks, and intellectual property on the site belong to us or our licensors and are protected by applicable laws.'
      },
      {
        title: 'User Submissions',
        body:
          'By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display that content in connection with operating the service.'
      },
      {
        title: 'Privacy',
        body:
          'We care about your privacy. Please review our Privacy Notice to understand how we collect, use, and share your information.'
      },
      {
        title: 'Third-Party Links',
        body:
          'Links to third-party sites are provided for convenience only. We do not endorse and are not responsible for the content or practices of those sites.'
      },
      {
        title: 'Disclaimer of Warranties',
        body:
          'The service is provided “as is” and “as available” without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.'
      },
      {
        title: 'Limitation of Liability',
        body:
          'To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.'
      },
      {
        title: 'Indemnification',
        body:
          'You agree to indemnify and hold us harmless from any claims, damages, liabilities, and expenses arising from your use of the service or violation of these Terms.'
      },
      {
        title: 'Changes to the Service',
        body:
          'We may modify, suspend, or discontinue the service (in whole or in part) at any time without notice. We are not liable for any resulting unavailability.'
      },
      {
        title: 'Changes to Terms',
        body:
          'We may update these Terms from time to time. Continued use of the service after changes become effective constitutes acceptance of the revised Terms.'
      },
      {
        title: 'Termination',
        body:
          'We may suspend or terminate your access at any time, with or without cause, including for any violation of these Terms.'
      },
      {
        title: 'Governing Law',
        body:
          'These Terms are governed by the laws of the jurisdiction in which the service provider is established, without regard to conflict of law provisions.'
      },
      {
        title: 'Severability',
        body:
          'If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and effect.'
      },
      {
        title: 'Entire Agreement',
        body:
          'These Terms constitute the entire agreement between you and us regarding the service and supersede prior agreements on the same subject.'
      }
    ]

    // Fisher-Yates shuffle with a stable seed tweak
    const arr = [...pool]
    let x = seed || 1
    for (let i = arr.length - 1; i > 0; i--) {
      x = (x * 9301 + 49297) % 233280
      const rnd = x / 233280
      const j = Math.floor(rnd * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, 10)
  }, [seed])

  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const [accepted, setAccepted] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Terms & Conditions
          </h1>
          <button
            className="text-xs sm:text-sm px-3 py-2 rounded-md border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700 transition"
            onClick={() => setSeed((s) => s + 1)}
            aria-label="Generate new random clauses"
          >
            Shuffle Clauses
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <section className="mb-8">
          <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/60 p-6">
            <p className="text-sm text-slate-300">Last updated: {today}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold">Agreement Overview</h2>
            <p className="mt-3 text-slate-300">
              These Terms govern your access to and use of this website and any related
              services. Please read them carefully. By continuing to browse or use the
              service, you acknowledge you have read, understood, and agree to be bound by
              them.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          {clauses.map((c, idx) => (
            <article
              key={c.title}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-xs text-blue-400/80 font-mono">{String(idx + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-slate-300 leading-relaxed">{c.body}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span className="text-slate-300">
                I have read and agree to these Terms & Conditions.
              </span>
            </label>
            <div className="mt-4 flex gap-3">
              <button
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-400 transition"
                disabled={!accepted}
                onClick={() => alert('Thanks! Your acceptance has been noted (locally).')}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 rounded-md border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700 transition"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-12 pb-10 text-center text-sm text-slate-500">
          This is a generic, non-legal sample provided for demonstration purposes only.
        </footer>
      </main>
    </div>
  )
}

export default App
