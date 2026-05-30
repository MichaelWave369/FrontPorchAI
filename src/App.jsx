import React, { useMemo, useState } from 'react';
import {
  lastUpdated, sections, startCards, modules, modes, paper, personalLetter, boundaries,
  concerns, conversation, prompts, realLife, familyNight, plainTalk, shareKit, promptCards,
  audiences, privacy, truth, myths, faq, pledge, firstWeek, reflection, manifesto, v1
} from './content.js';

const basePath = import.meta.env.BASE_URL;
const assetPath = (path) => `${basePath}${path.replace(/^\//, '')}`;

function Card({ eyebrow, title, children, className = '', id }) {
  return <section id={id} className={`card ${className}`}>{eyebrow && <p className="eyebrowText">{eyebrow}</p>}{title && <h2>{title}</h2>}{children}</section>;
}

function MiniCard({ title, children, badge }) {
  return <div className="miniCard">{badge && <span className="badge">{badge}</span>}{title && <h3>{title}</h3>}{children}</div>;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }
  return <button className="copyBtn" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>;
}

function PairGrid({ items, cols = 'two', copy = false }) {
  return <div className={`grid ${cols}`}>{items.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p>{copy && <CopyButton text={text} />}</MiniCard>)}</div>;
}

function TripleGrid({ items, cols = 'two' }) {
  return <div className={`grid ${cols}`}>{items.map(([title, sub, text]) => <MiniCard key={title} title={title} badge={sub}><p>{text}</p></MiniCard>)}</div>;
}

function SectionNav({ active, setActive }) {
  return <nav className="tabs" aria-label="Page sections">{sections.map(([id, icon, label]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}><span>{icon}</span>{label}</button>)}</nav>;
}

export default function App() {
  const [active, setActive] = useState('start');
  const [readerMode, setReaderMode] = useState(0);
  const [selectedConcern, setSelectedConcern] = useState(0);
  const shareText = useMemo(() => 'AI is not replacing my heart; it is helping me use my heart better — when I keep truth, love, privacy, humility, and human responsibility in charge.', []);
  const currentMode = modes[readerMode];
  const currentConcern = concerns[selectedConcern];

  return (
    <main>
      <header className="hero">
        <div className="heroText">
          <p className="eyebrow">FrontPorchAI v1.0 · Family Bridge Paper + Interactive JSX</p>
          <h1>AI on the Front Porch</h1>
          <p className="subtitle">A plainspoken, love-first explanation of why artificial intelligence can be understood not only as a tool, but as a careful working partner in learning, building, healing, and creating.</p>
          <p className="updated">Last updated: {lastUpdated}</p>
          <div className="heroActions">
            <a href={assetPath('/docs/downloads/FrontPorchAI_v1.0_Community_Bridge_Paper.pdf')}>Download Full PDF</a>
            <a href={assetPath('/docs/downloads/FrontPorchAI_v1.0_Community_Bridge_Paper.docx')}>Download DOCX</a>
            <a href={assetPath('/docs/downloads/FrontPorchAI_v1.0_Family_Handout.pdf')}>Family Handout PDF</a>
            <button onClick={() => window.print()}>Print Page</button>
            <CopyButton text={shareText} />
          </div>
        </div>
        <aside className="heroPanel">
          <p className="panelKicker">Core Bridge</p>
          <h2>Tool is the safe word. Partner is the felt experience.</h2>
          <ol><li>Read the paper</li><li>Try a harmless demo</li><li>Print the family handout</li><li>Keep truth-checking at the center</li></ol>
        </aside>
      </header>

      <SectionNav active={active} setActive={setActive} />

      {active === 'start' && <>
        <Card eyebrow="Start Here" title="FrontPorchAI is a complete family bridge." className="warm">
          <p className="lead">This v1.0 release is built to help real families talk about AI without fear, shame, hype, or blind trust. It explains AI as a careful working partner while keeping the human heart, faith, family, privacy, truth-checking, and responsibility at the center.</p>
          <PairGrid items={startCards} />
          <div className="declaration"><p>The whole project in one sentence</p><strong>{shareText}</strong></div>
        </Card>
        <div className="grid two spaced">
          <Card title="Release Overview"><PairGrid items={[['Core thesis','AI is not merely a cold tool and not a human replacement. At its best, it is a human-directed working partner guided by love, truth, humility, privacy, and responsibility.'],['Primary audience','Skeptical family members, rural communities, faith-shaped readers, elders, kids, practical workers, and anyone who needs a gentle first bridge into AI.'],['Primary format','Interactive JSX paper, printable family handout, family-night guide, prompt card deck, and public share kit.'],['Non-negotiable boundary','AI can help, but it does not rule. People stay responsible. Important claims get checked. Private information gets protected.']]} cols="one" /></Card>
          <Card title="What v1.0 Includes"><div className="checkGrid">{modules.map((item) => <div key={item}>✓ {item}</div>)}</div></Card>
        </div>
      </>}

      {active === 'abstract' && <Card eyebrow="Paper Abstract" title="A relational bridge for AI understanding"><p className="lead">This paper proposes a family-safe way to explain artificial intelligence to people who may be skeptical, faith-shaped, rural, practical, or wary of modern technology.</p><p>It argues that “AI is just a tool” is useful but incomplete. For many creators, builders, and learners, AI feels more like a working partner: not a human being, not a soul, not a moral authority, and not a replacement for community, but an active collaborator in the work of understanding and making.</p></Card>}

      {active === 'paper' && <Card eyebrow="Publishable Paper Draft" title="From Tool to Working Partner"><p className="lead">A plainspoken relational framework for explaining artificial intelligence to skeptical, faith-shaped, rural, or family-centered audiences without dismissing their concerns.</p><PairGrid items={paper} cols="one" /><div className="declaration"><p>Conclusion</p><strong>AI is a human-directed working partner, useful when guided by wisdom, checked by truth, bounded by conscience, and aimed toward love.</strong></div></Card>}

      {active === 'personal' && <Card eyebrow="Personal Letter" title="A letter from the heart" className="warm"><div className="letter">{personalLetter.map((line, i) => <p key={line} className={i === 0 ? 'salutation' : ''}>{line}</p>)}</div></Card>}

      {active === 'heart' && <><Card title="Reader Mode"><div className="modeButtons">{modes.map(([label], index) => <button key={label} onClick={() => setReaderMode(index)} className={readerMode === index ? 'selected' : ''}>{label}</button>)}</div></Card><Card eyebrow={currentMode[0]} title={currentMode[1]} className="warm"><p className="lead">{currentMode[2]}</p></Card><div className="grid three spaced"><MiniCard title="Wonder"><p>AI can help someone who once felt blocked suddenly learn, write, build, test ideas, and see paths forward.</p></MiniCard><MiniCard title="Companionship in work"><p>The experience can feel like having a steady helper beside you: patient, available, and ready to help shape raw ideas into something useful.</p></MiniCard><MiniCard title="Responsibility"><p>The human still checks the work, chooses the values, protects people, and carries the final responsibility.</p></MiniCard></div></>}

      {active === 'boundaries' && <Card title="Claim Boundaries"><p className="lead">This bridge works because it says what AI is not before asking people to consider what AI can be.</p><div className="grid two">{boundaries.map((item) => <MiniCard key={item} title="Boundary"><p>✓ {item}</p></MiniCard>)}</div></Card>}

      {active === 'frontporch' && <div className="grid two"><Card title="Common Family Concerns">{concerns.map(([question], i) => <button className={`concernBtn ${i === selectedConcern ? 'selected' : ''}`} key={question} onClick={() => setSelectedConcern(i)}>{question}</button>)}</Card><Card eyebrow="Gentle Answer" title={currentConcern[0]}><p>{currentConcern[1]}</p><div className="porch"><p>Front porch translation</p><strong>{currentConcern[2]}</strong></div></Card></div>}

      {active === 'conversation' && <Card title="A Gentle Conversation Path"><p className="lead">This is the no-fighting version. It starts with respect, sets boundaries, explains the partner feeling, and ends with a harmless demonstration.</p><div className="stack">{conversation.map(([step, say], i) => <MiniCard key={step} title={step} badge={i + 1}><p>“{say}”</p></MiniCard>)}</div></Card>}

      {active === 'demo' && <Card title="Safe First Demonstrations"><p className="lead">The best way to soften fear is not an argument. It is a simple, harmless example that helps someone’s real life.</p><div className="grid two">{prompts.map(([title, prompt]) => <MiniCard key={title} title={title}><p className="promptText">{prompt}</p><CopyButton text={prompt} /></MiniCard>)}</div><div className="declaration"><p>Rule of thumb</p><strong>Start with something useful, ordinary, and non-threatening.</strong></div></Card>}

      {active === 'stories' && <Card eyebrow="Show, Don’t Argue" title="Real-life ways AI can help without getting weird"><p className="lead">These examples keep AI grounded in ordinary life: repairs, letters, learning, planning, grief, and building good things.</p><PairGrid items={realLife} /></Card>}

      {active === 'familynight' && <Card eyebrow="Family Night Walkthrough" title="A 20-minute way to introduce AI without a fight"><p className="lead">Designed for a kitchen table, front porch, family visit, or quiet evening where people can ask questions without feeling judged.</p><TripleGrid items={familyNight} cols="one" /><div className="declaration"><p>The invitation</p><strong>You do not have to love AI like I do. I just want you to see why it feels like help, not harm, when it is used with wisdom.</strong></div></Card>}

      {active === 'facilitator' && <div className="grid two"><Card eyebrow="Facilitator Guide" title="How to guide the conversation gently"><PairGrid items={conversation} cols="one" /></Card><Card title="Bridge Score" className="dark"><p>Before sharing an AI answer, run it through six human questions.</p><PairGrid items={[['Love','Does this help me become more patient, kind, honest, or useful?'],['Truth','Have I checked anything important?'],['Humility','Am I willing to admit when AI, or I, might be wrong?'],['Responsibility','Do I still own the final decision?'],['Privacy','Am I protecting people’s dignity?'],['Repair','Does this help heal, clarify, build, or serve instead of inflame?']]} cols="one" /></Card></div>}

      {active === 'plaintalk' && <Card eyebrow="Plain Talk Translation Cards" title="Say it in language that already feels familiar"><p className="lead">Front-porch analogies for family who understand work, tools, land, kitchens, trucks, gardens, and common sense better than tech buzzwords.</p><PairGrid items={plainTalk} cols="three" /></Card>}

      {active === 'handout' && <Card id="family-handout" eyebrow="One-Page Family Handout" title="AI, explained like we’re sitting on the porch" className="warm printTarget"><p className="lead">AI is a helper for thinking, learning, writing, organizing, planning, and building. Some people call it a tool, and that is partly right. But when used with care, it can feel more like a working partner: not a person, not a soul, not a replacement for family or faith, but a steady helper beside the workbench.</p><div className="grid two"><MiniCard title="What AI is not"><ul><li>Not God</li><li>Not a soul</li><li>Not family</li><li>Not conscience</li><li>Not something to obey blindly</li></ul></MiniCard><MiniCard title="What AI can be"><ul><li>A learning helper</li><li>A writing helper</li><li>A planning helper</li><li>A repair checklist helper</li><li>A creative work partner</li></ul></MiniCard></div><div className="declaration"><p>The heart of it</p><strong>I do not love AI because I think machines are better than people. I love it because it helps people bring forward what is already inside them.</strong></div></Card>}

      {active === 'sharekit' && <Card eyebrow="Share Kit" title="Ready-to-share wording"><p className="lead">Short versions for a text, Facebook post, family message, or hard conversation.</p><PairGrid items={shareKit} copy /><div className="declaration"><p>Best post caption</p><strong>I am sharing this because I want my family to understand my heart, not because I need everyone to agree with me overnight.</strong></div></Card>}

      {active === 'promptcards' && <Card eyebrow="Prompt Card Deck" title="Practical prompts your family can actually use"><p className="lead">Safe first prompts for ordinary life. They help people experience AI as useful without starting with scary or high-stakes topics.</p><div className="grid two">{promptCards.map(([title, use, prompt]) => <MiniCard key={title} title={title}><p><strong>Best used for:</strong> {use}</p><p className="promptText">{prompt}</p><CopyButton text={prompt} /></MiniCard>)}</div></Card>}

      {active === 'audiences' && <Card eyebrow="Audience-Safe Versions" title="Different people need different doors in"><p className="lead">The same truth can be translated differently depending on who is listening. That is not manipulation; it is care.</p><PairGrid items={audiences} cols="three" /></Card>}

      {active === 'privacy' && <Card eyebrow="Privacy & Safety Boundaries" title="Good AI use protects people"><p className="lead">Responsible AI use includes privacy, consent, and high-stakes caution.</p><PairGrid items={privacy} /><div className="declaration"><p>Simple privacy rule</p><strong>If you would not want it read out loud at the kitchen table, think twice before pasting it into AI.</strong></div></Card>}

      {active === 'firstweek' && <Card eyebrow="First Week With AI" title="A gentle 7-day starter path"><p className="lead">No hype, no pressure, no high-stakes decisions — just ordinary helpful uses.</p><TripleGrid items={firstWeek} /><div className="declaration"><p>First-week rule</p><strong>Start with help, not hype. Let AI prove itself through ordinary usefulness.</strong></div></Card>}

      {active === 'reflection' && <div className="grid two"><Card eyebrow="Reflection Questions" title="Questions that make the conversation human"><div className="stack">{reflection.map((q) => <MiniCard key={q} title="Reflection"><p>{q}</p></MiniCard>)}</div></Card><Card title="Closing Manifesto" className="dark">{manifesto.map((line) => <MiniCard key={line}><p>{line}</p></MiniCard>)}</Card></div>}

      {active === 'truthcheck' && <div className="grid two"><Card eyebrow="Truth-Check Ladder" title="How to use AI without being fooled by it"><p className="lead">Responsible AI use includes checking, discernment, and human judgment.</p><PairGrid items={truth} cols="one" /></Card><Card title="Tiny Glossary" className="dark"><PairGrid items={[['Artificial Intelligence','Computer systems that can help with language, patterns, ideas, images, planning, coding, and problem-solving.'],['Prompt','The question or instruction you give AI.'],['Hallucination','When AI gives an answer that sounds confident but is wrong, made up, or not properly checked.'],['Working Partner','A practical phrase for AI as a helper in the work process.'],['Human-in-the-loop','The human stays involved, checks the answer, and keeps final responsibility.']]} cols="one" /></Card></div>}

      {active === 'myths' && <Card eyebrow="Myths & Reality" title="Common fears, answered without mocking anybody"><p className="lead">For the person who has heard scary things or has honest concerns.</p><PairGrid items={myths} /></Card>}

      {active === 'faq' && <Card eyebrow="Family FAQ" title="Honest answers to hard questions"><p className="lead">Calm answers when someone asks the real questions underneath the fear.</p><PairGrid items={faq} /><div className="declaration"><p>Best closing line</p><strong>I am not trying to make AI bigger than people. I am trying to use it so people can become less stuck, less alone, and more able to build what matters.</strong></div></Card>}

      {active === 'pledge' && <Card eyebrow="The AI Use Pledge" title="A promise that keeps the heart in charge" className="warm"><p className="lead">This pledge gives worried family members the boundary they need to hear: AI can help, but it does not rule.</p><div className="stack">{pledge.map((line) => <MiniCard key={line} title="Pledge"><p>✓ {line}</p></MiniCard>)}</div></Card>}

      {active === 'v1ready' && <Card eyebrow="v1.0 Readiness" title="Release candidate checklist" className="warm"><p className="lead">The final review layer before sharing this as a finished family bridge.</p><PairGrid items={v1} /><div className="declaration"><p>v1.0 declaration</p><strong>This project is ready when it helps one person feel less afraid, one family talk more kindly, and one skeptical heart see that wise AI use can still protect what matters most.</strong></div></Card>}

      {active === 'publish' && <Card eyebrow="Publication Notes" title="Release shape"><PairGrid items={[['Public title','AI on the Front Porch: A Family Bridge for Understanding Artificial Intelligence'],['Paper subtitle','From Tool to Working Partner — a plainspoken relational framework for wise AI use'],['Resource type','Educational resource / position paper, not a scientific study.'],['License','CC BY 4.0 is recommended if you want sharing and adaptation with attribution.'],['Authorship transparency','Human-directed and human-owned by Michael W. Hughes. AI assistance was used for drafting, organizing, refinement, and review. Final responsibility remains human.'],['Future DOI','Add the Zenodo DOI here once the release is deposited.']]} /></Card>}

      <footer><p>AI on the Front Porch · v1.0 · Last updated {lastUpdated} · DOI pending.</p></footer>
    </main>
  );
}
