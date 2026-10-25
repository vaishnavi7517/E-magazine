import { useEffect, useState } from 'react'
import './App.css'

const TOTAL_PAGES = 17

const fourAs = [
  { letter: 'A', title: 'Avoid', text: 'Avoid the trigger when you can. A gentle “no” can protect your time and energy.' },
  { letter: 'A', title: 'Alter', text: 'Change what you can. Ask for help, make a plan, or take one thing off your plate.' },
  { letter: 'A', title: 'Adapt', text: 'Try a kinder perspective. You can change the way you meet a difficult moment.' },
  { letter: 'A', title: 'Accept', text: 'Let go of what is outside your control, and bring your attention back to now.' },
]

function App() {
  const [page, setPage] = useState(0)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState('Ready when you are')
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem('mind-over-stress-theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    window.localStorage.setItem('mind-over-stress-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (!isBreathing) return undefined

    const stages = [
      { label: 'Breathe in', duration: 4000 },
      { label: 'Hold gently', duration: 4000 },
      { label: 'Breathe out', duration: 6000 },
    ]
    let stageIndex = 0
    let rounds = 0
    let timer

    function advance() {
      stageIndex += 1
      if (stageIndex === stages.length) {
        stageIndex = 0
        rounds += 1
        if (rounds === 3) {
          setIsBreathing(false)
          setBreathPhase('Lovely work. Notice how you feel.')
          return
        }
      }
      setBreathPhase(stages[stageIndex].label)
      timer = window.setTimeout(advance, stages[stageIndex].duration)
    }

    timer = window.setTimeout(advance, stages[0].duration)
    return () => window.clearTimeout(timer)
  }, [isBreathing])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return
      if (event.key === 'ArrowRight') setPage((current) => Math.min(current + 1, TOTAL_PAGES - 1))
      if (event.key === 'ArrowLeft') setPage((current) => Math.max(current - 1, 0))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const totalPages = TOTAL_PAGES
  const goToPage = (nextPage) => setPage(Math.max(0, Math.min(nextPage, totalPages - 1)))

  const pages = [
    <section className="cover-page" aria-label="Magazine cover">
      <div className="cover-art" aria-hidden="true">
        <span className="cover-sun" />
        <span className="cover-orbit orbit-one" />
        <span className="cover-orbit orbit-two" />
        <img className="cover-photo" src="/images/quiet-moment.jpg" alt="" fetchPriority="high" decoding="async" />
        <span className="cover-leaf leaf-one">✳</span>
        <span className="cover-leaf leaf-two">✳</span>
        <span className="cover-note">a little room<br />to breathe</span>
      </div>
      <div className="cover-copy">
        <p className="eyebrow">THE STUDENT WELLBEING EDIT · VOL. 01</p>
        <h1>Mind over<br /><span>stress.</span></h1>
        <p className="cover-deck">Small, kind ways to feel steadier in a busy world.</p>
        <div className="cover-bottom">
          <span>UNDERSTAND · RESET · GROW</span>
          <button className="text-button" onClick={() => goToPage(1)}>Open the magazine <span aria-hidden="true">↗</span></button>
        </div>
      </div>
      <div className="cover-stamp">A CALMER<br />MIND STARTS<br />WITH ONE<br /><i>BREATH</i></div>
    </section>,
    <section className="editorial-page contents-page">
      <p className="eyebrow">THIS ISSUE · 17 PAGES FOR A FULLER PICTURE</p>
      <div className="contents-heading">
        <div><h2>A field guide<br />for <em>real days.</em></h2><p className="lead">Short reads, small experiments, and reminders worth keeping.</p></div>
        <span className="contents-edition">ISSUE<br />001<br /><b>2026</b></span>
      </div>
      <div className="contents-list">
        {[
          ['03', 'A softer look at stress', 'The editor’s note'],
          ['04', 'Read your own signals', 'Body · thoughts · habits'],
          ['05', 'When everything feels urgent', 'A campus pressure map'],
          ['06', 'The body keeps a note', 'Stress, without the jargon'],
          ['07', 'The four A’s', 'A toolkit for tough days'],
          ['08', 'One thing at a time', 'A tiny focus reset'],
          ['09', 'The comparison trap', 'A kinder social feed'],
          ['10', 'Come back to this moment', 'A guided breathing pause'],
          ['11–14', 'Make room for recovery', 'Boundaries · study · sleep · habits'],
          ['15–17', 'Keep the useful bits', 'Poster · support · acknowledgements'],
        ].map(([number, title, detail]) => (
          <div className="contents-row" key={number}><span>{number}</span><strong>{title}</strong><small>{detail}</small></div>
        ))}
      </div>
      <p className="contents-foot">No perfect routine required. Start anywhere.</p>
    </section>,
    <section className="editorial-page intro-page">
      <p className="eyebrow">01 — A SOFTER LOOK AT STRESS</p>
      <div className="intro-grid">
        <div>
          <h2>First, a little<br /><em>perspective.</em></h2>
          <p className="lead">Stress is not a character flaw. It is your mind and body asking for a little attention.</p>
          <p>Deadlines, expectations, comparison, and too little rest can make everything feel louder. You do not need to fix your whole life today. Start by noticing what is happening, without judging yourself for it.</p>
        </div>
        <figure className="quote-card">
          <img src="/images/morning-light.jpg" alt="Golden morning light over a quiet mountain landscape" loading="lazy" decoding="async" />
          <figcaption>
            <span className="quote-mark">“</span>
            <blockquote>Stress isn’t a sign of weakness, it’s a signal.</blockquote>
            <span className="quote-caption">A reminder to pause, listen, and care for yourself.</span>
          </figcaption>
        </figure>
      </div>
      <div className="signal-strip">
        <span className="signal-icon">✳</span>
        <div><strong>Your signals are personal.</strong><p>A busy mind, tight shoulders, or a short temper can all be ways your body says, “I need a moment.”</p></div>
      </div>
      <p className="small-note">You don’t have to earn rest. You’re allowed to take it.</p>
    </section>,
    <section className="editorial-page signals-page">
      <p className="eyebrow">02 — CHECK IN WITH YOURSELF</p>
      <h2>Stress has a way<br />of <em>showing up.</em></h2>
      <p className="lead narrow">Before you can care for yourself, you have to notice what you need.</p>
      <div className="signal-grid">
        <article className="signal-card"><span>01</span><h3>In your body</h3><p>Tight shoulders, a restless stomach, headaches, or feeling tired even after a long day.</p></article>
        <article className="signal-card"><span>02</span><h3>In your thoughts</h3><p>Overthinking, trouble focusing, expecting the worst, or feeling like everything is urgent.</p></article>
        <article className="signal-card"><span>03</span><h3>In your habits</h3><p>Putting things off, withdrawing from people, or forgetting the little things that usually help.</p></article>
      </div>
      <aside className="quote-line">
        <span>“</span>
        <p>The greatest weapon against stress is our ability to choose one thought over another.</p>
        <small>— William James</small>
        <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=480&q=75" alt="A quiet mountain landscape at sunrise" loading="lazy" decoding="async" />
      </aside>
    </section>,
    <section className="editorial-page pressure-page">
      <p className="eyebrow">03 — THE CAMPUS PRESSURE MAP</p>
      <div className="pressure-layout">
        <div className="pressure-copy">
          <span className="page-kicker">A FIELD NOTE · 02 MIN READ</span>
          <h2>When everything<br />feels <em>urgent.</em></h2>
          <p className="lead">A busy season can turn five separate worries into one big, blurry cloud.</p>
          <p>Try naming the actual pressure. Is it a deadline, a conversation, money, or not knowing where to begin? A specific problem is easier to meet than the feeling that “everything is wrong.”</p>
        </div>
        <figure className="pressure-photo">
          <img src="/images/calm-nature.jpg" alt="A tranquil natural landscape beneath a wide sky" loading="lazy" decoding="async" />
          <figcaption>FIELD NOTE 01 · Step away from the noise for two minutes.</figcaption>
        </figure>
      </div>
      <div className="pressure-tags"><span>EXAMS</span><span>EXPECTATIONS</span><span>COMPARISON</span><span>NOT ENOUGH REST</span></div>
      <div className="margin-note"><b>TRY THIS</b><span>Write the worry as one plain sentence. What is the next small, useful action?</span></div>
    </section>,
    <section className="editorial-page body-page">
      <p className="eyebrow">04 — THE BODY KEEPS A NOTE</p>
      <div className="body-heading"><h2>Before the mind<br />finds the <em>words.</em></h2><span>01 / NOTICE</span></div>
      <div className="body-columns">
        <figure className="body-photo"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=75" alt="Sunlit landscape stretching toward the horizon" loading="lazy" decoding="async" /><figcaption>Let your eyes rest on something far away.</figcaption></figure>
        <div className="body-copy">
          <p className="lead">Stress can feel physical before you have a name for what is wrong.</p>
          <div className="body-check"><span>01</span><p><b>Unclench your jaw.</b> Let your tongue rest and drop your shoulders.</p></div>
          <div className="body-check"><span>02</span><p><b>Feel your feet.</b> Notice the floor holding you up.</p></div>
          <div className="body-check"><span>03</span><p><b>Look outward.</b> Find three ordinary things in the room.</p></div>
          <p className="body-footnote">These are observations, not a diagnosis. If a symptom worries you, talk to a healthcare professional.</p>
        </div>
      </div>
    </section>,
    <section className="editorial-page four-page">
      <p className="eyebrow">03 — A TOOLKIT FOR TOUGH DAYS</p>
      <div className="four-heading"><div><h2>Meet the<br /><em>four A’s.</em></h2></div><p className="lead">Not every stressor is yours to carry. Try the approach that fits the moment.</p></div>
      <div className="four-grid">
        {fourAs.map((item, index) => (
          <article className={`four-card four-card-${index + 1}`} key={item.title}>
            <span className="four-letter">{item.letter}</span>
            <div><span className="four-count">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>
          </article>
        ))}
      </div>
      <p className="small-note">You don’t need all four. One small shift is still a shift.</p>
    </section>,
    <section className="editorial-page focus-page">
      <p className="eyebrow">06 — A SMALLER WAY TO START</p>
      <div className="focus-top"><span className="focus-number">01</span><div><h2>Make the next<br />step <em>smaller.</em></h2><p className="lead">When your list feels endless, choose a step you can finish before your tea gets cold.</p></div></div>
      <div className="focus-receipt">
        <div className="receipt-head"><span>THE 10-MINUTE PLAN</span><span>FIELD TEST 01</span></div>
        <div className="receipt-row"><span>01</span><p>Write down everything competing for your attention.</p><i>2 MIN</i></div>
        <div className="receipt-row"><span>02</span><p>Circle the task that would make tomorrow easier.</p><i>1 MIN</i></div>
        <div className="receipt-row"><span>03</span><p>Work on only its first visible step. Then pause.</p><i>7 MIN</i></div>
        <div className="receipt-total"><span>DONE IS A PLACE TO BEGIN AGAIN.</span><b>10:00</b></div>
      </div>
      <p className="focus-note">A timer is an invitation, not a test. Stop when you need to.</p>
    </section>,
    <section className="editorial-page comparison-page">
      <p className="eyebrow">07 — THE COMPARISON TRAP</p>
      <div className="comparison-grid">
        <div><span className="page-kicker">A NOTE ABOUT SCROLLING</span><h2>A feed is a<br /><em>window, not<br />the whole room.</em></h2><p className="lead">You’re seeing a moment someone chose to share—not the whole shape of their day.</p></div>
        <figure className="comparison-photo"><img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=75" alt="Open ocean horizon beneath a soft sky" loading="lazy" decoding="async" /><figcaption>Widen the frame. Your life is happening outside the screen, too.</figcaption></figure>
      </div>
      <div className="feed-reset">
        <span>THE 3-QUESTION RESET</span>
        <p>Does this make me feel connected?</p>
        <p>Would I want a friend to judge their life by this?</p>
        <p>What would feel good to do offline for five minutes?</p>
      </div>
      <p className="small-note">Unfollow, mute, or take a break when a feed stops being kind to you.</p>
    </section>,
    <section className="editorial-page reset-page">
      <p className="eyebrow">04 — YOUR POCKET-SIZED PAUSE</p>
      <div className="reset-grid">
        <div className="breath-panel">
          <p className="eyebrow">A 42-SECOND RESET</p>
          <h2>Come back<br />to <em>this moment.</em></h2>
          <p>Follow three gentle rounds: breathe in for four, hold for four, and breathe out for six. No need to force a deep breath—just find a pace that feels comfortable.</p>
          <button
            className="primary-button"
            onClick={() => {
              if (isBreathing) {
                setIsBreathing(false)
                setBreathPhase('Paused. Take your time.')
              } else {
                setBreathPhase('Breathe in')
                setIsBreathing(true)
              }
            }}
          >
            {isBreathing ? 'Pause this reset' : breathPhase.startsWith('Lovely') ? 'Begin again' : 'Start a gentle reset'}
            <span aria-hidden="true">↗</span>
          </button>
          <p className="breath-status" aria-live="polite">{breathPhase}</p>
        </div>
        <div className={`breath-visual${isBreathing ? ` breathing ${breathPhase.toLowerCase().replaceAll(' ', '-')}` : ''}`} aria-hidden="true"><span /><i /><b>IN · HOLD · OUT</b></div>
      </div>
      <div className="habit-row"><strong>Little habits, softer days.</strong><span>01&nbsp; Breathe</span><span>02&nbsp; Be present</span><span>03&nbsp; Let go</span><span>04&nbsp; Keep going</span></div>
    </section>,
    <section className="editorial-page boundaries-page">
      <p className="eyebrow">09 — YOUR TIME IS A REAL THING</p>
      <div className="boundary-heading"><span>FIELD GUIDE / 03</span><h2>A boundary can<br />be <em>kind.</em></h2><p className="lead">Protecting your energy does not mean you care less. It means you’re being honest about what you can offer.</p></div>
      <div className="scripts-grid">
        <article><span>WHEN YOU NEED TIME</span><p>“Let me check what I can manage, and I’ll get back to you.”</p></article>
        <article><span>WHEN YOU’RE AT CAPACITY</span><p>“I can’t take that on right now. Could we look at another option?”</p></article>
        <article><span>WHEN YOU NEED A PAUSE</span><p>“I want to give this my attention. Can we talk after class?”</p></article>
      </div>
      <p className="boundary-foot">You can be warm and still mean what you say.</p>
    </section>,
    <section className="editorial-page study-page">
      <p className="eyebrow">10 — A LESS FRANTIC STUDY SESSION</p>
      <div className="study-banner"><span>THE DESK, RESET</span><span>20 + 5 · REPEAT IF USEFUL</span></div>
      <div className="study-layout">
        <div><h2>Set up for<br /><em>one good hour.</em></h2><p className="lead">Not a perfect desk. Just fewer decisions between you and the first page.</p></div>
        <figure className="study-photo"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=75" alt="A calm, sunlit workspace ready for focused study" loading="lazy" decoding="async" /><figcaption>Let daylight in if you can. Change rooms if you can’t.</figcaption></figure>
      </div>
      <div className="study-steps"><span><b>01</b> Pick one topic</span><span><b>02</b> Put your phone out of reach</span><span><b>03</b> Set a 20-minute timer</span><span><b>04</b> Take a real five-minute break</span></div>
      <p className="small-note">A break is part of the plan, not a reward for finishing everything.</p>
    </section>,
    <section className="editorial-page sleep-page">
      <p className="eyebrow">11 — REST IS PART OF THE WORK</p>
      <div className="sleep-scene"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=75" alt="Mountain peaks beneath a clear, star-filled night sky" loading="lazy" decoding="async" /><div className="sleep-title"><span>AFTER HOURS / 11:08 PM</span><h2>You can put<br />today <em>down.</em></h2><p>Tomorrow is allowed to wait until tomorrow.</p></div></div>
      <div className="sleep-grid">
        <p><b>Make a landing.</b><br />Choose one gentle cue that tells your day it’s winding down.</p>
        <p><b>Write the open loops.</b><br />A short note for the morning can let your mind stop rehearsing.</p>
        <p><b>Keep it realistic.</b><br />A regular wind-down helps, but one imperfect night is not a failure.</p>
      </div>
    </section>,
    <section className="editorial-page habit-page">
      <p className="eyebrow">12 — SMALL HABITS, NO GRAND REVEAL</p>
      <div className="habit-heading"><h2>Better is often<br /><em>quiet.</em></h2><p className="lead">A habit doesn’t need to transform you. It can simply make the next hour a bit easier.</p></div>
      <div className="habit-mosaic">
        <figure className="habit-image"><img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=75" alt="A quiet green trail winding through a sunlit landscape" loading="lazy" decoding="async" /><figcaption>Make space for one thing that feels like yours.</figcaption></figure>
        <div className="habit-ticket"><span>THE BORING-BUT-USEFUL LIST</span><p>Drink a glass of water.</p><p>Step outside between classes.</p><p>Text the person you’ve been thinking about.</p><p>Let one non-urgent thing wait.</p><b>REPEAT ONLY IF IT HELPS.</b></div>
      </div>
      <p className="small-note">Tiny counts. Ordinary counts. You count.</p>
    </section>,
    <section className="editorial-page poster-page">
      <p className="eyebrow">05 — THE ART THAT STARTED IT</p>
      <div className="poster-heading"><div><h2>A reminder<br />to <em>choose calm.</em></h2><p className="lead">Our original “Mind Over Stress” poster, full of thoughtful ideas for finding a little more space.</p></div><span className="poster-index">THE<br />ORIGINAL<br />POSTER</span></div>
      <figure className="poster-figure">
        <img src="/mind-over-stress-poster.jpeg" alt="Handmade Mind Over Stress poster with a pencil-drawn face, stress triggers, calming habits and the four A’s to beat stress." />
        <figcaption>Made with care, for the days when you need a reminder: you can choose your next thought.</figcaption>
      </figure>
      <div className="poster-quote">“A healthy mind is the greatest asset.”</div>
    </section>,
    <section className="editorial-page support-page">
      <p className="eyebrow">14 — YOU DON’T HAVE TO FIGURE IT OUT ALONE</p>
      <div className="support-layout"><div><span className="page-kicker">A PRACTICAL NOTE</span><h2>Reaching out<br />is a <em>real step.</em></h2><p className="lead">You don’t need the perfect words or a complete explanation to start a conversation.</p></div><figure className="support-photo"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=75" alt="A small group sharing a supportive conversation" loading="lazy" decoding="async" /><figcaption>Start with someone who makes it easier to be honest.</figcaption></figure></div>
      <div className="support-options">
        <div><span>01</span><p><b>A person you trust</b><br />A friend, family member, teacher, or mentor.</p></div>
        <div><span>02</span><p><b>Campus support</b><br />Ask your school about a counsellor or student wellbeing service.</p></div>
        <div><span>03</span><p><b>Health professional</b><br />A doctor can help you understand what support is right for you.</p></div>
      </div>
      <p className="support-foot">If you feel unsafe or need urgent help, contact local emergency services or a crisis support service in your area.</p>
    </section>,
    <section className="editorial-page credits-page">
      <p className="eyebrow">06 — MADE WITH CARE</p>
      <div className="credits-top"><div><h2>A calmer world<br />starts <em>together.</em></h2><p className="lead">This little magazine is a reminder that every person deserves kindness—including you.</p></div><span className="credits-flower" aria-hidden="true">✳</span></div>
      <div className="team-list">
        <div className="team-member"><span className="team-number">01</span><div><h3>Vaishnavi Patil</h3><p>Roll no. 71</p></div><span className="team-mark">✳</span></div>
        <div className="team-member"><span className="team-number">02</span><div><h3>Samiksha Patil</h3><p>Roll no. 75</p></div><span className="team-mark">✳</span></div>
      </div>
      <div className="thanks-card"><span>WITH GRATITUDE</span><p>Special thanks to</p><h3>Mrs. Trupti Gune Ma’am</h3><div className="thanks-rule" /><p className="thanks-note">For your encouragement, guidance, and the care you bring to helping us grow.</p></div>
      <p className="closing-line">Take what helps. Leave what doesn’t.<br /><em>Be gentle with yourself.</em></p>
    </section>,
  ]

  const displayPage = pages[page]
  const spreadNumber = page === 0 ? 'COVER' : `${String(page).padStart(2, '0')} / ${String(totalPages - 1).padStart(2, '0')}`

  return (
    <main className="magazine-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => goToPage(0)} aria-label="Mind Over Stress home">
          <span className="brand-mark">m.</span><span>mindful<span className="brand-light">pages</span></span>
        </a>
        <span className="issue-label">A STUDENT WELLBEING MAGAZINE</span>
        <div className="utility-actions">
          <button
            className="theme-button"
            type="button"
            onClick={() => setDarkMode((current) => !current)}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            aria-pressed={darkMode}
          >
            <span aria-hidden="true">{darkMode ? '☼' : '◐'}</span>
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            className="print-button"
            type="button"
            onClick={() => window.print()}
            title="Choose Save as PDF in the print dialog to download a PDF."
          >
            <span aria-hidden="true">↗</span> Print / Save PDF
          </button>
        </div>
      </header>

      <section className="reader" id="top" aria-label="Mind Over Stress digital magazine">
        <div className="reader-meta"><span>ISSUE NO. 01 <i>✳</i> A GENTLER WAY FORWARD</span><span>{spreadNumber}</span></div>
        <div
          className={`page-frame${page === 0 ? ' page-frame-cover' : ''}`}
          key={page}
          aria-live="polite"
        >
          {displayPage}
        </div>
        <div className="reader-controls">
          <button className="page-arrow" onClick={() => goToPage(page - 1)} disabled={page === 0} aria-label="Previous page">← <span>PREV</span></button>
          <div className="page-dots" role="group" aria-label="Choose a magazine page">
            {pages.map((_, index) => (
              <button
                className={`page-dot${index === page ? ' active' : ''}`}
                key={index}
                onClick={() => goToPage(index)}
                aria-label={index === 0 ? 'Go to cover' : `Go to page ${index}`}
                aria-current={index === page ? 'page' : undefined}
              />
            ))}
          </div>
          <span className="page-count">{page + 1} <i>/</i> {totalPages}</span>
          <button className="page-arrow next-arrow" onClick={() => goToPage(page + 1)} disabled={page === totalPages - 1} aria-label="Next page"><span>NEXT</span> →</button>
        </div>
        <div className="reader-footer">
          <span>USE YOUR <kbd>←</kbd> <kbd>→</kbd> KEYS TO TURN PAGES</span>
          {page === 0
            ? <button className="contents-button" onClick={() => goToPage(1)}>START READING <span aria-hidden="true">↗</span></button>
            : <button className="contents-button" onClick={() => goToPage(totalPages - 1)}>MEET THE TEAM <span aria-hidden="true">↗</span></button>}
        </div>
      </section>

      <div className="print-edition" aria-hidden="true">
        {pages.map((content, index) => (
          <article className="page-frame" key={`print-page-${index}`}>
            {content}
          </article>
        ))}
      </div>

      <footer className="site-footer">
        <span>MADE WITH CARE, FOR REAL LIFE.</span>
        <span>ONE PAGE. ONE BREATH. ONE DAY AT A TIME.</span>
        <a href="https://unsplash.com" target="_blank" rel="noreferrer">PHOTOGRAPHY: UNSPLASH</a>
      </footer>
    </main>
  )
}

export default App
