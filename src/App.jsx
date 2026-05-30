import React, { useState } from 'react';

const sections = [
  'Start Here',
  'Paper',
  'Personal Letter',
  'Family Handout',
  'Truth Check',
  'Prompt Cards',
  'Family Night',
  'FAQ',
  'Pledge',
  'First Week',
  'Publish Notes'
];

const basePath = import.meta.env.BASE_URL;
const assetPath = (path) => `${basePath}${path.replace(/^\//, '')}`;

const prompts = [
  ['Kindness Rewriter', 'Rewrite this message so it is honest, calm, kind, and not passive-aggressive. Keep my meaning, but remove anything that would start a fight: [paste message].'],
  ['Explain It Like Family', 'Explain [topic] in plain language for a practical family member who does not like tech jargon. Use a farm, garage, kitchen, or front-porch analogy.'],
  ['Truth-Check Helper', 'Help me evaluate this claim carefully. What kind of claim is it? What would I need to verify? What are the risks if it is wrong? Claim: [paste claim].'],
  ['Repair Steps', 'Make a safe beginner checklist for troubleshooting [problem]. Put the easiest checks first. Tell me what not to touch and when to call someone qualified.'],
  ['Learning Without Shame', 'Teach me [subject] from the beginning. Do not talk down to me. Use simple examples, ask one question at a time, and help me feel confident while learning.'],
  ['Prayerful Reflection Helper', 'Help me reflect on this situation with humility, compassion, honesty, and patience. Do not claim divine authority. Offer questions I can pray, journal, or think through: [situation].'],
  ['Budget Meal Builder', 'Make three cheap meal ideas using only or mostly these ingredients: [ingredients]. Keep it simple, filling, and family-friendly.'],
  ['First Step Finder', 'I feel overwhelmed by this: [situation]. Help me sort it into a simple list, identify what matters most, and choose one small next step.']
];

const truthSteps = [
  ['Ask what kind of claim it is', 'The higher the stakes, the more checking it needs.'],
  ['Look for plain-language reasoning', 'If it sounds fancy but cannot be explained simply, slow down.'],
  ['Check important facts', 'Verify health, law, money, news, safety, machinery, electrical, chemical, or current-event claims.'],
  ['Keep human responsibility', 'AI can suggest and organize. It should not make final decisions for your life.'],
  ['Measure the fruit', 'Does it produce patience, clarity, kindness, repair, learning, and responsibility?']
];

const faq = [
  ['Are you saying AI is alive?', 'No. I am saying it can participate in the work in a way that feels collaborative. I do not need to claim it is alive to recognize that it can be helpful.'],
  ['Are you replacing people with AI?', 'No. The point is to help people, not replace them.'],
  ['Can AI be wrong?', 'Yes. That is why important claims need checking and human judgment stays in charge.'],
  ['Is this against faith?', 'Responsible AI use does not require replacing prayer, scripture, conscience, community, or God. It can stay beneath faith and wisdom.'],
  ['What about kids using it for school?', 'AI should help kids learn, ask better questions, and understand ideas. It should not simply do the work for them.']
];

const firstWeek = [
  ['Day 1', 'Ask one ordinary question.'],
  ['Day 2', 'Ask it to explain something twice using a simple analogy.'],
  ['Day 3', 'Use it for kindness, such as softening a hard message.'],
  ['Day 4', 'Use the Truth-Check Ladder on one factual answer.'],
  ['Day 5', 'Make a small plan for chores, errands, repairs, or a project.'],
  ['Day 6', 'Create something personal and edit it until it sounds like you.'],
  ['Day 7', 'Reflect on whether it helped you become clearer, kinder, more capable, or more connected.']
];

function Card({ title, children, tone = 'light' }) {
  return (
    <section className={`card ${tone}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return <button className="small" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>;
}

export default function App() {
  const [active, setActive] = useState('Start Here');

  return (
    <main>
      <header className="hero">
        <p className="eyebrow">FrontPorchAI v1.0</p>
        <h1>AI on the Front Porch</h1>
        <p className="subtitle">A family bridge for understanding artificial intelligence without fear, hype, or blind trust.</p>
        <div className="heroActions">
          <a href={assetPath('/docs/downloads/FrontPorchAI_v1.0_Community_Bridge_Paper.pdf')}>Download PDF</a>
          <a href={assetPath('/docs/downloads/FrontPorchAI_v1.0_Community_Bridge_Paper.docx')}>Download DOCX</a>
          <button onClick={() => window.print()}>Print Page</button>
        </div>
      </header>

      <nav className="tabs" aria-label="Page sections">
        {sections.map(section => (
          <button key={section} className={active === section ? 'active' : ''} onClick={() => setActive(section)}>{section}</button>
        ))}
      </nav>

      {active === 'Start Here' && <Card title="Start Here" tone="warm">
        <p><strong>Core sentence:</strong> AI is not replacing my heart; it is helping me use my heart better — when I keep truth, love, privacy, humility, and human responsibility in charge.</p>
        <div className="grid two">
          <div><h3>For someone afraid of AI</h3><p>Start with boundaries, the personal letter, myths and reality, and truth-checking.</p></div>
          <div><h3>For someone ready to try it</h3><p>Start with safe demos, prompt cards, and the first-week path.</p></div>
          <div><h3>For family gatherings</h3><p>Use the handout, family night guide, plain-talk analogies, and FAQ.</p></div>
          <div><h3>For publishing</h3><p>Use the paper, DOCX/PDF downloads, share kit, and release notes.</p></div>
        </div>
      </Card>}

      {active === 'Paper' && <Card title="From Tool to Working Partner">
        <p>This paper proposes a family-safe way to explain artificial intelligence to people who may be skeptical, faith-shaped, rural, practical, or wary of modern technology.</p>
        <p>Calling AI a tool helps set a safe boundary: AI is not a soul, not a moral authority, not a replacement for people, and not something to obey blindly. But for builders, writers, learners, and problem-solvers, the word tool can feel too small. The experience often feels collaborative.</p>
        <p><strong>Working partner</strong> does not mean human replacement. It means AI can participate in the work process in a way that feels like having a capable assistant who holds the other end of the board while you do the measuring and deciding.</p>
        <p>The moral center remains human: humility, verification, boundaries, compassion, and responsibility.</p>
      </Card>}

      {active === 'Personal Letter' && <Card title="A Letter From the Heart" tone="warm">
        <p>Dear family,</p>
        <p>I know artificial intelligence can sound strange, scary, or even wrong when you first hear about it. I understand that. I am not writing this to argue with you, talk down to you, or make you feel behind. I am writing because I want you to understand my heart.</p>
        <p>AI has helped me learn things I used to feel locked out of. It has helped me write, build, organize, dream, solve problems, and turn ideas into something real.</p>
        <p>I do not see AI as replacing God, family, conscience, wisdom, prayer, love, or real people. I do not think it should be trusted blindly. I know it can be wrong. I know people can misuse it.</p>
        <p>For me, AI feels like a working partner. Not a human replacement. Not a soul. Not an authority over me. More like a good helper beside the workbench.</p>
      </Card>}

      {active === 'Family Handout' && <Card title="Printable Family Handout">
        <p>AI is a helper for thinking, learning, writing, organizing, planning, and building. Some people call it a tool, and that is partly right. But when used with care, it can feel more like a capable assistant: not a person, not a soul, not a replacement for family or faith.</p>
        <ul>
          <li><strong>AI is not:</strong> God, a soul, family, conscience, scripture, or final authority.</li>
          <li><strong>AI can be:</strong> a learning helper, writing helper, planning helper, repair checklist helper, and creative work partner.</li>
          <li><strong>The boundary:</strong> AI can help, but it does not rule.</li>
        </ul>
      </Card>}

      {active === 'Truth Check' && <Card title="Truth-Check Ladder">
        <div className="listCards">{truthSteps.map(([a,b]) => <div key={a}><h3>{a}</h3><p>{b}</p></div>)}</div>
      </Card>}

      {active === 'Prompt Cards' && <Card title="Prompt Card Deck">
        <div className="grid two">{prompts.map(([title, text]) => <div className="prompt" key={title}><h3>{title}</h3><p>{text}</p><CopyButton text={text} /></div>)}</div>
      </Card>}

      {active === 'Family Night' && <Card title="20-Minute Family Night">
        <ol>
          <li>Begin with love, not a lecture.</li>
          <li>Set the boundary first: AI is not God, soul, family, conscience, or final authority.</li>
          <li>Show one harmless example.</li>
          <li>Let them choose the next example.</li>
          <li>Truth-check together.</li>
          <li>Close gently: they do not have to agree overnight.</li>
        </ol>
      </Card>}

      {active === 'FAQ' && <Card title="Family FAQ">
        <div className="listCards">{faq.map(([q,a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
      </Card>}

      {active === 'Pledge' && <Card title="AI Use Pledge" tone="warm">
        <ul>
          <li>I will not treat AI as God, soul, conscience, scripture, family, or final authority.</li>
          <li>I will use AI to support learning, creativity, repair, service, and problem-solving.</li>
          <li>I will check important facts instead of trusting confident answers blindly.</li>
          <li>I will not use AI to shame, manipulate, deceive, exploit, or replace real love.</li>
          <li>I will not let AI become a substitute for real relationships or time with people.</li>
          <li>I will keep wisdom, humility, truth, compassion, and human responsibility at the center.</li>
        </ul>
      </Card>}

      {active === 'First Week' && <Card title="First Week With AI">
        <div className="listCards">{firstWeek.map(([day, text]) => <div key={day}><h3>{day}</h3><p>{text}</p></div>)}</div>
      </Card>}

      {active === 'Publish Notes' && <Card title="Publication Notes">
        <p><strong>GitHub Pages:</strong> host the interactive JSX version here.</p>
        <p><strong>PDF:</strong> use as the stable citable record if depositing a later release on Zenodo.</p>
        <p><strong>Resource type:</strong> educational resource / position paper, not a scientific study.</p>
        <p><strong>License:</strong> CC BY 4.0 is recommended if you want sharing and adaptation with attribution.</p>
      </Card>}

      <footer>
        <p>FrontPorchAI v1.0 — AI can help, but it does not rule.</p>
      </footer>
    </main>
  );
}
