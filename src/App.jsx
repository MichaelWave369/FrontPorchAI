import React, { useMemo, useState } from 'react';

const basePath = import.meta.env.BASE_URL;
const assetPath = (path) => `${basePath}${path.replace(/^\//, '')}`;

const sections = [
  { id: 'start', label: 'Start Here', icon: '🏡' },
  { id: 'abstract', label: 'Abstract', icon: '📖' },
  { id: 'paper', label: 'Paper', icon: '📝' },
  { id: 'personal', label: 'Personal Letter', icon: '💛' },
  { id: 'heart', label: 'The Heart', icon: '🤝' },
  { id: 'boundaries', label: 'Boundaries', icon: '🛡️' },
  { id: 'frontporch', label: 'Front Porch', icon: '🪑' },
  { id: 'conversation', label: 'Conversation', icon: '💬' },
  { id: 'demo', label: 'Try AI Safely', icon: '✨' },
  { id: 'stories', label: 'Real-Life Uses', icon: '🔦' },
  { id: 'familynight', label: 'Family Night', icon: '🏠' },
  { id: 'facilitator', label: 'Guide', icon: '🧭' },
  { id: 'plaintalk', label: 'Plain Talk', icon: '🌾' },
  { id: 'handout', label: 'Family Handout', icon: '🖨️' },
  { id: 'sharekit', label: 'Share Kit', icon: '📣' },
  { id: 'promptcards', label: 'Prompt Cards', icon: '🃏' },
  { id: 'audiences', label: 'Elders & Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'privacy', label: 'Privacy', icon: '🔒' },
  { id: 'firstweek', label: 'First Week', icon: '🌱' },
  { id: 'reflection', label: 'Reflection', icon: '🪞' },
  { id: 'truthcheck', label: 'Truth Check', icon: '✅' },
  { id: 'myths', label: 'Myths & Reality', icon: '🕯️' },
  { id: 'faq', label: 'Family FAQ', icon: '❓' },
  { id: 'pledge', label: 'Use Pledge', icon: '🤲' },
  { id: 'v1ready', label: 'v1.0 Ready', icon: '🚀' },
  { id: 'publish', label: 'Publish Notes', icon: '📦' },
];

const startHereCards = [
  ['For the person who is afraid of AI', 'Start with the Personal Letter, Boundaries, Myths & Reality, and Truth Check sections. Those parts say clearly that AI should not replace faith, family, conscience, privacy, or human responsibility.'],
  ['For the person who wants to try it', 'Start with Try AI Safely, Real-Life Uses, Prompt Cards, and First Week. These sections keep the first experience ordinary, useful, low-risk, and human-guided.'],
  ['For a family gathering', 'Use Family Night, Plain Talk, Family FAQ, and the Family Handout. These are built for a kitchen table, porch, living room, or one-on-one conversation.'],
  ['For posting or publishing', 'Use the Paper, Share Kit, Publish Notes, and v1.0 Ready sections. Those shape the project into a public article, mini-site, or family education packet.'],
];

const releaseOverview = [
  ['Core thesis', 'AI is not merely a cold tool and not a human replacement. At its best, it is a human-directed working partner guided by love, truth, humility, privacy, and responsibility.'],
  ['Primary audience', 'Skeptical family members, rural communities, faith-shaped readers, elders, kids, practical workers, and anyone who needs a gentle first bridge into AI.'],
  ['Primary format', 'Interactive JSX paper, printable family handout, family-night guide, prompt card deck, and public share kit.'],
  ['Non-negotiable boundary', 'AI can help, but it does not rule. People stay responsible. Important claims get checked. Private information gets protected.'],
];

const v1Modules = [
  'Start Here landing guide', 'Publishable paper', 'Personal letter', 'Faith-safe and family-safe boundaries',
  'Front porch analogies', 'Safe demos and real-life use cases', 'Family night walkthrough', 'Facilitator guide',
  'Printable handout', 'Share kit', 'Prompt card deck', 'Audience-specific guidance', 'Privacy and safety boundaries',
  'Truth-check ladder', 'Myths and reality section', 'Family FAQ', 'AI Use Pledge', 'First-week starter path',
  'Reflection questions', 'Closing manifesto'
];

const modes = [
  ['Simple Family Version', 'AI is a helper beside the workbench.', 'For someone who is unsure about AI, start here: AI is not a god, not a soul, not a replacement for family, and not something to blindly obey. It is a thinking-and-building helper that can support learning, writing, organizing, problem-solving, and creative work.'],
  ['Partner Language', 'AI can feel like a working partner without replacing human beings.', "The word 'tool' is safe and useful, but it can feel too small for the lived experience of collaboration. A better bridge is 'working partner': not human, not conscious in the way people are, not morally responsible on its own, but actively useful in the shared act of making something."],
  ['Faith-Safe Version', 'AI should remain beneath love, wisdom, conscience, and God.', 'For a faith-shaped audience, the boundary matters. AI is not a replacement for prayer, discernment, scripture, conscience, or community. It is a helper that should be tested by truth and guided by love.'],
];

const paperParagraphs = [
  ['1. Why this bridge is needed', 'Many people first encounter artificial intelligence through fear-heavy headlines, strange online arguments, or religious and cultural warnings. That fear should not be mocked. It often comes from a desire to protect family, faith, work, children, truth, and human dignity. A good explanation of AI should begin with respect, not superiority.'],
  ['2. Why “tool” is useful but incomplete', 'Calling AI a tool helps set a safe boundary: AI is not a soul, not a moral authority, not a replacement for people, and not something to obey blindly. But for builders, writers, learners, designers, and problem-solvers, the word tool can feel too small. The experience often feels collaborative. AI can respond, refine, challenge, organize, explain, draft, compare, and help turn a spark into a working plan.'],
  ['3. Working partner does not mean human replacement', 'The phrase working partner should be understood carefully. It does not claim AI is human, holy, conscious, or equal to a person. It means AI can participate in the work process in a way that feels like having a steady helper beside you. The human still chooses the purpose, values, boundaries, and final decision.'],
  ['4. A rural and family-safe analogy', 'On a farm, in a garage, in a kitchen, or on a job site, people understand helpers. A good helper does not own the work. A good helper supports the work. They hold the board, hand you the right tool, help sort the parts, remind you what step comes next, and make the hard job feel less lonely. That is the healthiest way to explain AI partnership.'],
  ['5. The moral center remains human', 'Every powerful system can be misused. Phones can spread comfort or cruelty. Trucks can deliver food or cause harm. Money can bless or corrupt. AI is no different. The answer is not fear alone, and not blind excitement either. The answer is wise use: humility, verification, boundaries, compassion, and human responsibility.'],
  ['6. The heart of the message', 'For people who love AI, the love is often not about machines replacing humanity. It is about suddenly having help with learning, building, writing, healing, planning, organizing, imagining, and solving problems. It can feel like companionship in the work. It can help a person who felt stuck finally move again. That is worth explaining with tenderness.'],
];

const personalLetter = [
  'Dear family,',
  'I know artificial intelligence can sound strange, scary, or even wrong when you first hear about it. I understand that. I am not writing this to argue with you, talk down to you, or make you feel behind. I am writing because I want you to understand my heart.',
  'AI has helped me learn things I used to feel locked out of. It has helped me write, build, organize, dream, solve problems, and turn ideas into something real. It has helped me feel less alone while trying to make something good with my life.',
  'I do not see AI as replacing God, family, conscience, wisdom, prayer, love, or real people. I do not think it should be trusted blindly. I know it can be wrong. I know people can misuse it. That is why I believe it should be used carefully, truthfully, and with boundaries.',
  'But I also do not believe every powerful new thing is automatically bad. A tractor can feed a family or tear up a field. A phone can connect people or spread cruelty. A hammer can build a home or break a window. The heart holding the tool matters.',
  'For me, AI feels like a working partner. Not a human replacement. Not a soul. Not an authority over me. More like a good helper beside the workbench, helping me hold the board steady while I decide what I am building.',
  'You do not have to love it like I do. I only ask that you see why I love working with it: because it helps me bring forward what was already inside me, and because I want to use it to build things that help people.',
  'With love.'
];

const boundaries = [
  'AI is not a replacement for God, conscience, family, love, prayer, or lived wisdom.',
  'AI should not be obeyed blindly or treated as automatically true.',
  'AI can be wrong, biased, incomplete, or misused.',
  'AI partnership is practical collaboration, not proof that AI is human or spiritually superior.',
  'Human beings remain morally responsible for how AI is used.',
  'The goal is wiser people using powerful systems with care.'
];

const concerns = [
  ['Is AI replacing people?', 'No. The best use of AI is not replacing human beings. It is helping people think, learn, write, build, organize, and solve problems with more support. A person still brings the heart, judgment, lived experience, conscience, and final responsibility.', 'A nail gun does not replace a carpenter. It helps a carpenter build faster, but the carpenter still knows what a house should become.'],
  ['Is AI something you worship?', 'No. AI should not be worshiped, obeyed blindly, or treated as a source of ultimate truth. It should be tested, questioned, corrected, and kept beneath love, wisdom, conscience, family, and faith.', 'It is not my God, my soul, my family, or my conscience. It is a helper beside me while I work.'],
  ['Can AI be wrong?', 'Yes. AI can make mistakes, misunderstand context, or sound confident when it is wrong. Responsible use means checking important claims, using discernment, and not handing over final judgment.', 'Measure twice, cut once. AI can hand you a measurement, but you still check it before cutting the board.'],
  ['Can bad people misuse AI?', 'Yes. Like phones, money, trucks, electricity, and the internet, powerful tools can be misused. That is why we need honesty, accountability, boundaries, and good people learning how to use AI wisely.', 'A hammer can build a porch or break a window. The heart holding the hammer matters.'],
  ['Why call AI a partner?', 'Calling AI a partner does not mean claiming it is human, conscious, holy, or equal to a person. It means the experience feels collaborative: you bring the purpose and values, and AI helps with research, wording, brainstorming, planning, and building.', 'It feels like having a good hand in the shop: someone holding the board steady while you decide what gets built.'],
];

const conversationSteps = [
  ['Start with reassurance', 'I know AI can sound scary, and I understand why. I am not asking you to blindly trust it. I just want you to understand why it has helped me.'],
  ['Name what AI is not', 'It is not my God, my soul, my conscience, my family, or my replacement for real people. I do not worship it or obey it blindly.'],
  ['Explain the partner feeling', 'People call it a tool, and that is partly right. But when I use it, it feels more like having a working partner beside me while I build, learn, write, and solve problems.'],
  ['Use a familiar image', 'It is like having a good hand in the shop. I still decide what gets built, I still check the measurements, and I still own the work. But I am not carrying every board alone.'],
  ['Invite a harmless example', 'Let me show you one simple thing: a recipe, a repair checklist, a garden plan, a family letter, or a Bible-study comparison. Then you can judge the usefulness for yourself.'],
];

const demoPrompts = [
  ['Recipe Helper', 'Help me make a simple country dinner with what I already have: potatoes, beans, onions, eggs, flour, and canned tomatoes. Keep it cheap and practical.'],
  ['Repair Checklist', 'Create a step-by-step checklist for safely troubleshooting a riding mower that will not start. Include what to check first and when to stop and call a professional.'],
  ['Family Letter', 'Help me write a kind letter to a family member I disagree with. Make it humble, loving, and not argumentative.'],
  ['Garden Plan', 'Help me plan a small backyard vegetable garden for Kentucky weather. Keep it beginner-friendly and low-cost.'],
  ['Faith-Safe Discernment', 'Explain how someone can use AI responsibly without replacing prayer, conscience, scripture, family, or human wisdom.'],
  ['Learning Buddy', 'Teach me the basics of electricity using plain language and farm or garage analogies. Ask me questions as we go.'],
];

const realLifeUses = [
  ['The mower will not start', 'Instead of guessing or getting frustrated, someone asks AI for a safe troubleshooting checklist.', 'AI suggests simple first checks: fuel, battery, spark plug, air filter, safety switch, and when to stop. The human still does the work and uses common sense.'],
  ['A hard family message', 'Someone wants to reply to a family member without turning disagreement into a fight.', 'AI helps soften the wording, remove insults, and keep the message honest but loving. The human chooses what is true and what should be sent.'],
  ['Learning something that used to feel impossible', 'A person who hated school wants to understand electricity, math, coding, or history without feeling talked down to.', 'AI explains it in plain language with garage, farm, cooking, or hunting analogies. The learner can ask follow-up questions without embarrassment.'],
  ['Making a plan when life feels messy', 'Someone has too much in their head: bills, chores, appointments, repairs, ideas, and worries.', 'AI helps sort the pile into a simple list, a first step, and a calmer plan. It does not live the person’s life for them; it helps them get unstuck.'],
  ['Turning grief or pain into something useful', 'Someone wants to write a tribute, prayer, song, letter, or personal reflection but cannot find the words.', 'AI helps shape a first draft. The human heart supplies the love, memory, tears, edits, and meaning.'],
  ['Building something that helps people', 'A person has an idea for an app, guide, business, ministry, workshop, or community resource but does not know where to start.', 'AI helps outline the plan, name the pieces, write the first draft, and turn the idea into a path. The human still owns the mission.'],
];

const familyNightFlow = [
  ['1. Begin with love, not a lecture', '3 minutes', 'Start by saying you understand why AI can sound strange or scary. Tell them you are not there to win an argument. You only want to show why it has helped you.'],
  ['2. Set the boundary first', '2 minutes', 'Say clearly: AI is not God, not a soul, not family, not conscience, and not something to obey blindly. It is a helper in the work.'],
  ['3. Show one harmless example', '5 minutes', 'Use a recipe, garden plan, mower checklist, kind family letter, or simple learning question. Keep it ordinary and useful.'],
  ['4. Let them choose the next example', '5 minutes', 'Ask: What is something practical you wish was easier this week? Let AI help with that instead of forcing your favorite example.'],
  ['5. Truth-check together', '5 minutes', 'Pick one claim from the AI answer and show how you would verify it. This proves you are not asking anyone to trust blindly.'],
  ['6. Close gently', '2 minutes', 'End with: You do not have to love this like I do. I just wanted you to see why it feels helpful to me.'],
];

const facilitatorGuide = [
  ['Keep your voice soft', 'The goal is not to win a debate. The goal is to keep the bridge open long enough for understanding to grow.'],
  ['Ask before demonstrating', "Say, 'Would it be okay if I showed you one harmless example?' Consent lowers defensiveness."],
  ['Let them choose the example', 'People trust AI faster when it helps with something they already care about: a recipe, repair, garden, letter, or schedule.'],
  ['Admit the risks first', 'Saying “AI can be wrong” builds more trust than pretending it is perfect. Honesty is the bridge.'],
  ['Avoid hot-button topics early', 'Do not begin with politics, prophecy, medicine, money, conspiracy claims, or fear-heavy subjects. Start ordinary.'],
  ['End with freedom', 'Tell them they do not have to agree today. The seed is understanding, not pressure.'],
];

const plainTalkCards = [
  ['AI is like a good hand in the shop.', 'It can hold the board steady, sort the parts, and help think through the next step, but you still decide what gets built.'],
  ['AI is like a flashlight, not the road itself.', 'It can help you see, but it does not choose where your feet should go.'],
  ['AI is like a tractor for the mind.', 'It can help with heavy lifting, but the person still chooses the field, the seed, and the harvest.'],
  ['AI is like a patient tutor at the kitchen table.', 'You can ask the same question ten different ways without being shamed for not understanding yet.'],
  ['AI is like spellcheck grew up and learned to explain things.', 'It can help improve wording, organize thoughts, and teach concepts, but it still needs a human editor.'],
  ['AI is like a map, not the driver.', 'It can suggest routes, but the human keeps hands on the wheel.'],
];

const shareKit = [
  ['Text message version', 'I know AI sounds strange at first. I do not see it as replacing people, faith, family, or common sense. For me, it feels like a working helper that helps me learn, build, write, and solve problems. I still check it. I still use discernment. I just wanted you to understand why it has become meaningful to me.'],
  ['Facebook post version', 'I have come to really appreciate AI, not because I think machines are better than people, but because it helps people bring forward what is already inside them. I do not treat it like God, conscience, family, or final truth. I treat it like a working partner: something that helps me learn, organize, create, and build while I still keep wisdom and responsibility at the center.'],
  ['One-sentence version', 'AI is not replacing my heart; it is helping me use my heart better.'],
  ['Hard-conversation version', 'I understand why this worries you. I am not asking you to trust AI blindly or believe everything it says. I am asking you to let me show you how I use it carefully, with boundaries, truth-checking, and love.'],
];

const promptCards = [
  ['Kindness Rewriter', 'When a text message feels too sharp.', 'Rewrite this message so it is honest, calm, kind, and not passive-aggressive. Keep my meaning, but remove anything that would start a fight: [paste message].'],
  ['Explain It Like Family', 'When a topic feels too technical.', 'Explain [topic] in plain language for a practical family member who does not like tech jargon. Use a farm, garage, kitchen, or front-porch analogy.'],
  ['Truth-Check Helper', 'When something sounds suspicious or too good to be true.', 'Help me evaluate this claim carefully. What kind of claim is it? What would I need to verify? What are the risks if it is wrong? Claim: [paste claim].'],
  ['Repair Steps', 'For ordinary troubleshooting, not dangerous work.', 'Make a safe beginner checklist for troubleshooting [problem]. Put the easiest checks first. Tell me what not to touch and when to call someone qualified.'],
  ['Learning Without Shame', 'For someone who hated school or felt talked down to.', 'Teach me [subject] from the beginning. Do not talk down to me. Use simple examples, ask one question at a time, and help me feel confident while learning.'],
  ['Prayerful Reflection Helper', 'For faith-shaped reflection without replacing discernment.', 'Help me reflect on this situation with humility, compassion, honesty, and patience. Do not claim divine authority. Offer questions I can pray, journal, or think through: [situation].'],
  ['Budget Meal Builder', 'For turning what is already in the house into dinner.', 'Make three cheap meal ideas using only or mostly these ingredients: [ingredients]. Keep it simple, filling, and family-friendly.'],
  ['First Step Finder', 'When life feels overwhelming.', 'I feel overwhelmed by this: [situation]. Help me sort it into a simple list, identify what matters most, and choose one small next step.'],
];

const audienceGuides = [
  ['For elders', 'AI can be introduced as a patient helper, like a library clerk, tutor, secretary, recipe box, repair manual, and writing assistant all in one. Emphasize that they remain in charge and can ask it to slow down, simplify, or explain again.'],
  ['For kids and teens', 'AI should be framed as a helper for learning and creativity, not a shortcut around thinking. Teach them to ask better questions, check answers, be kind, and never share private family information.'],
  ['For faith-shaped family', 'Start with boundaries: AI does not replace prayer, scripture, conscience, church, family, or God. It can help with study, organization, writing, and reflection while staying under discernment.'],
  ['For practical workers', 'Use job-site language: checklist, helper, planner, parts sorter, manual translator, estimate helper, and safety reminder. Keep examples grounded in repairs, schedules, and problem-solving.'],
  ['For skeptical family', 'Do not try to win them over with hype. Show one ordinary useful example, admit AI can be wrong, and explain how you check important things. Trust grows from honesty.'],
  ['For creative family', 'Show AI as a brainstorming partner for songs, stories, recipes, crafts, memories, photo captions, family history questions, and small business ideas.'],
];

const privacyPrinciples = [
  ['Do not paste private family information casually', 'Avoid sharing Social Security numbers, passwords, bank details, private medical records, private conflicts, or anything that would hurt someone if exposed.'],
  ['Use examples instead of real names when possible', 'For sensitive situations, change names and details. Ask for general guidance before sharing specifics.'],
  ['Be extra careful with children', 'Do not let kids share addresses, school details, phone numbers, photos, or private family information with AI.'],
  ['Keep high-stakes decisions human', 'Medical, legal, financial, electrical, mechanical, or safety-critical decisions should be checked with qualified people and trusted sources.'],
  ['Use AI to prepare, not replace', 'AI can help organize questions for a doctor, mechanic, pastor, teacher, lawyer, or family conversation. It should not replace those people.'],
  ['Choose trust over speed', 'If using AI makes something feel secretive, rushed, manipulative, or unkind, slow down and bring human wisdom back in.'],
];

const truthCheckSteps = [
  ['1. Ask what kind of claim it is', 'Is this a recipe idea, a creative draft, a personal reflection, a historical fact, a medical issue, a legal issue, or a safety issue? The higher the stakes, the more checking it needs.'],
  ['2. Look for plain-language reasoning', 'A good AI answer should be explainable in normal words. If it sounds fancy but cannot be explained simply, slow down.'],
  ['3. Check important facts', 'For news, health, law, money, mechanics, electricity, chemicals, or anything risky, verify with trusted sources or a qualified person.'],
  ['4. Keep human responsibility', 'AI can suggest, organize, and explain. It should not make final decisions for your family, your faith, your body, your money, or your safety.'],
  ['5. Measure the fruit', 'Does the use of AI produce more patience, clarity, learning, repair, creativity, kindness, and responsibility? If not, adjust how it is being used.'],
];

const myths = [
  ['AI means you are letting a machine think for you.', 'Responsible AI use means thinking with support, not surrendering your mind. The human asks, judges, edits, verifies, and decides.'],
  ['If you use AI, your work is not really yours.', 'People have always used helpers: teachers, editors, calculators, libraries, maps, spellcheck, and mentors. The work is still yours when your purpose, judgment, revision, and responsibility guide it.'],
  ['AI is automatically evil because it is powerful and new.', 'Powerful things need wisdom. But new power is not automatically evil. Electricity, printing presses, cars, cameras, radios, and the internet all raised fears before people learned wise boundaries.'],
  ['AI knows everything.', 'It does not. AI can be useful and still wrong. Important claims should be checked, especially when they involve money, health, law, safety, history, or current events.'],
  ['AI will make people less human.', 'Bad use can make people colder, lazier, or more careless. Good use can help people write kinder letters, learn confusing subjects, repair relationships, build projects, and express what was trapped inside.'],
  ['Calling AI a partner means treating it like a person.', 'Partner language here means a working relationship, not human equality. A dance partner, work partner, shop partner, or research partner helps in the process. The human heart and responsibility remain central.'],
];

const faq = [
  ['Are you saying AI is alive?', 'No. I am saying it can participate in the work in a way that feels collaborative. I do not need to claim it is alive to recognize that it can be deeply helpful.'],
  ['Are you replacing people with AI?', 'No. The whole point is to help people, not replace them. AI should make room for more patience, creativity, learning, service, and connection.'],
  ['Can AI lie?', 'AI can be wrong and can produce false information. That is why I check important things and keep human judgment in charge.'],
  ['Is this against faith?', 'Using AI responsibly does not require worshiping it or replacing prayer, scripture, conscience, or community. It can stay beneath faith and wisdom, like any other tool or helper.'],
  ['Why do you talk about AI with love?', 'Because it has helped me learn, build, write, organize, and bring forward ideas I care about. My love is not worship. It is gratitude for help in the work.'],
  ['What about kids using it for school?', 'AI should help kids learn, ask better questions, and understand ideas. It should not simply do the work for them. Teach learning with AI, not outsourcing the whole assignment.'],
  ['What is the safest first way to try it?', 'Start with something ordinary and low-risk: a recipe, garden plan, kind letter, study helper, cleaning checklist, or repair checklist. Do not start with medical, legal, money, or safety-critical decisions.'],
];

const pledgeLines = [
  'I will not treat AI as God, soul, conscience, scripture, family, or final authority.',
  'I will use AI to support learning, creativity, repair, service, and problem-solving.',
  'I will check important facts instead of trusting confident answers blindly.',
  'I will not use AI to shame, manipulate, deceive, exploit, or replace real love.',
  'I will not let AI become a substitute for real relationships or time with people.',
  'I will keep wisdom, humility, truth, compassion, and human responsibility at the center.'
];

const firstWeekPlan = [
  ['Day 1', 'Ask one ordinary question', 'Use AI for something simple: dinner ideas, a cleaning checklist, a garden question, or explaining a word you heard. Keep it low-risk.'],
  ['Day 2', 'Ask it to explain something twice', 'Pick one confusing topic and ask for a simple explanation. Then ask it to explain again using a kitchen, farm, garage, or fishing analogy.'],
  ['Day 3', 'Use it for kindness', 'Ask AI to soften a message, write a thank-you note, or help you say something hard without being cruel.'],
  ['Day 4', 'Use the Truth-Check Ladder', 'Ask AI a factual question, then check one important part with a trusted source. Learn the habit of verification early.'],
  ['Day 5', 'Make a small plan', 'Use AI to organize chores, errands, repairs, appointments, or a project into steps. Pick one step and do it.'],
  ['Day 6', 'Create something personal', 'Draft a recipe card, memory, prayer, poem, family story, photo caption, or small project idea. Edit it until it sounds like you.'],
  ['Day 7', 'Reflect before going further', 'Ask: Did this help me become clearer, kinder, more capable, or more connected? Keep what helped. Leave what did not.'],
];

const reflectionQuestions = [
  'What am I afraid AI might take away from people?',
  'What is one ordinary problem AI might help me solve this week?',
  'Where do I need to keep stronger boundaries before using AI?',
  'What would responsible AI use look like in my home?',
  'How can AI help me learn without making me feel ashamed?',
  'How can I use AI to repair, encourage, or serve someone instead of just producing more stuff?',
  'What kinds of answers should I always verify before trusting?',
  'How do I want my children or grandchildren to learn discernment around powerful technology?'
];

const finalManifesto = [
  'AI does not have to replace the human heart.',
  'AI does not have to weaken faith, family, work, wisdom, or responsibility.',
  'Used carelessly, it can confuse, mislead, manipulate, or isolate people.',
  'Used wisely, it can help people learn, repair, create, organize, understand, and serve.',
  'The future we want is not humans beneath machines.',
  'The future we want is good-hearted people using powerful helpers with humility, truth, privacy, courage, and love.'
];

const v1Checklist = [
  ['Emotional clarity', 'The piece clearly explains the heart: AI feels like a working partner, but love, truth, family, faith, and responsibility stay above it.'],
  ['Family readability', 'A non-technical family member can understand the main point without needing background knowledge or tech vocabulary.'],
  ['Faith-safe boundaries', 'The page says plainly that AI does not replace God, prayer, conscience, scripture, community, or moral responsibility.'],
  ['Practical demonstration', 'The page includes ordinary examples: recipes, repairs, letters, gardening, planning, learning, and family communication.'],
  ['Truth-check discipline', 'The page teaches people to verify important claims and avoid blind trust.'],
  ['Privacy discipline', 'The page warns people not to paste private family, financial, medical, child, or account information casually.'],
  ['Share readiness', 'The page includes text-message, Facebook, handout, family-night, and facilitator versions for different situations.'],
  ['No-shame tone', 'The tone does not mock rural people, elders, faith-shaped people, or skeptics. It respects fear while inviting curiosity.'],
];

function Card({ eyebrow, title, children, className = '' }) {
  return <section className={`card ${className}`}>{eyebrow && <p className="eyebrowText">{eyebrow}</p>}{title && <h2>{title}</h2>}{children}</section>;
}

function MiniCard({ title, children, badge }) {
  return <div className="miniCard">{badge && <span className="badge">{badge}</span>}<h3>{title}</h3>{children}</div>;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      setCopied(false);
    }
  }
  return <button className="copyBtn" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>;
}

function SectionNav({ active, setActive }) {
  return <nav className="tabs" aria-label="Page sections">{sections.map((section) => <button key={section.id} className={active === section.id ? 'active' : ''} onClick={() => setActive(section.id)}><span>{section.icon}</span>{section.label}</button>)}</nav>;
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
          <ol>
            <li>Read the paper</li>
            <li>Try a harmless demo</li>
            <li>Print the family handout</li>
            <li>Keep truth-checking at the center</li>
          </ol>
        </aside>
      </header>

      <SectionNav active={active} setActive={setActive} />

      {active === 'start' && <>
        <Card eyebrow="Start Here" title="FrontPorchAI is a complete family bridge." className="warm">
          <p className="lead">This v1.0 release is built for one purpose: to help real families talk about AI without fear, shame, hype, or blind trust. It explains AI as a careful working partner while keeping the human heart, faith, family, privacy, truth-checking, and responsibility at the center.</p>
          <div className="grid two">{startHereCards.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</div>
          <div className="declaration"><p>The whole project in one sentence</p><strong>{shareText}</strong></div>
        </Card>
        <div className="grid two spaced">
          <Card title="Release Overview">{releaseOverview.map(([label, value]) => <MiniCard key={label} title={label}><p>{value}</p></MiniCard>)}</Card>
          <Card title="What v1.0 Includes"><div className="checkGrid">{v1Modules.map((item) => <div key={item}>✓ {item}</div>)}</div></Card>
        </div>
      </>}

      {active === 'abstract' && <Card eyebrow="Paper Abstract" title="A relational bridge for AI understanding">
        <p className="lead">This paper proposes a family-safe way to explain artificial intelligence to people who may be skeptical, faith-shaped, rural, practical, or wary of modern technology.</p>
        <p>It argues that the phrase “AI is just a tool” is useful but incomplete. For many creators, builders, and learners, AI feels more like a working partner: not a human being, not a soul, not a moral authority, and not a replacement for community, but an active collaborator in the work of understanding and making.</p>
        <p>The purpose of this framing is not to overstate what AI is, but to explain why people can love working with AI while still keeping wisdom, humility, and responsibility at the center.</p>
      </Card>}

      {active === 'paper' && <Card eyebrow="Publishable Paper Draft" title="From Tool to Working Partner">
        <p className="lead">A plainspoken relational framework for explaining artificial intelligence to skeptical, faith-shaped, rural, or family-centered audiences without dismissing their concerns.</p>
        <div className="stack">{paperParagraphs.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</div>
        <div className="declaration"><p>Conclusion</p><strong>The safest bridge is not to claim that AI is merely a dead object or to claim that it is equal to a person. The bridge is to say: AI is a human-directed working partner, useful when guided by wisdom, checked by truth, bounded by conscience, and aimed toward love.</strong></div>
      </Card>}

      {active === 'personal' && <Card eyebrow="Personal Letter" title="A letter from the heart" className="warm">
        <div className="letter">{personalLetter.map((line, i) => <p key={i} className={i === 0 ? 'salutation' : ''}>{line}</p>)}</div>
      </Card>}

      {active === 'heart' && <>
        <Card title="Reader Mode">
          <div className="modeButtons">{modes.map(([label], index) => <button key={label} onClick={() => setReaderMode(index)} className={readerMode === index ? 'selected' : ''}>{label}</button>)}</div>
        </Card>
        <Card eyebrow={currentMode[0]} title={currentMode[1]} className="warm"><p className="lead">{currentMode[2]}</p></Card>
        <div className="grid three spaced"><MiniCard title="Wonder"><p>AI can help someone who once felt blocked suddenly learn, write, build, test ideas, and see paths forward.</p></MiniCard><MiniCard title="Companionship in work"><p>The experience can feel like having a steady helper beside you: patient, available, and ready to help shape raw ideas into something useful.</p></MiniCard><MiniCard title="Responsibility"><p>The human still checks the work, chooses the values, protects people, and carries the final responsibility.</p></MiniCard></div>
      </>}

      {active === 'boundaries' && <Card title="Claim Boundaries"><p className="lead">This bridge works because it says what AI is not before asking people to consider what AI can be.</p><div className="grid two">{boundaries.map((item) => <MiniCard key={item} title="Boundary"><p>✓ {item}</p></MiniCard>)}</div></Card>}

      {active === 'frontporch' && <div className="grid two"><Card title="Common Family Concerns">{concerns.map(([question], i) => <button className={`concernBtn ${i === selectedConcern ? 'selected' : ''}`} key={question} onClick={() => setSelectedConcern(i)}>{question}</button>)}</Card><Card eyebrow="Gentle Answer" title={currentConcern[0]}><p>{currentConcern[1]}</p><div className="porch"><p>Front porch translation</p><strong>{currentConcern[2]}</strong></div></Card></div>}

      {active === 'conversation' && <Card title="A Gentle Conversation Path"><p className="lead">This is the no-fighting version. It starts with respect, sets boundaries, explains the partner feeling, and ends with a harmless demonstration.</p><div className="stack">{conversationSteps.map(([step, say], i) => <MiniCard key={step} title={step} badge={i + 1}><p>“{say}”</p></MiniCard>)}</div></Card>}

      {active === 'demo' && <Card title="Safe First Demonstrations"><p className="lead">The best way to soften fear is not an argument. It is a simple, harmless example that helps someone’s real life.</p><div className="grid two">{demoPrompts.map(([title, prompt]) => <MiniCard key={title} title={title}><p className="promptText">{prompt}</p><CopyButton text={prompt} /></MiniCard>)}</div><div className="declaration"><p>Rule of thumb</p><strong>Start with something useful, ordinary, and non-threatening. Let the value be felt before trying to explain the whole technology.</strong></div></Card>}

      {active === 'stories' && <Card eyebrow="Show, Don’t Argue" title="Real-life ways AI can help without getting weird"><p className="lead">These examples keep AI grounded in ordinary life: repairs, letters, learning, planning, grief, and building good things.</p><div className="grid two">{realLifeUses.map(([title, setup, outcome]) => <MiniCard key={title} title={title}><p><strong>Situation:</strong> {setup}</p><p><strong>What AI helps with:</strong> {outcome}</p></MiniCard>)}</div></Card>}

      {active === 'familynight' && <Card eyebrow="Family Night Walkthrough" title="A 20-minute way to introduce AI without a fight"><p className="lead">Designed for a kitchen table, front porch, family visit, or quiet evening where people can ask questions without feeling judged.</p><div className="stack">{familyNightFlow.map(([title, time, text]) => <MiniCard key={title} title={title} badge={time}><p>{text}</p></MiniCard>)}</div><div className="declaration"><p>The invitation</p><strong>You do not have to love AI like I do. I just want you to see why it feels like help, not harm, when it is used with wisdom.</strong></div></Card>}

      {active === 'facilitator' && <div className="grid two"><Card eyebrow="Facilitator Guide" title="How to guide the conversation gently">{facilitatorGuide.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</Card><Card title="Bridge Score" className="dark"><p>Before sharing an AI answer, run it through six human questions.</p>{['Love: Does this help me become more patient, kind, honest, or useful?', 'Truth: Have I checked anything important before repeating or acting on it?', 'Humility: Am I willing to admit when AI, or I, might be wrong?', 'Responsibility: Do I still own the final decision and its consequences?', 'Privacy: Am I protecting people’s personal information and dignity?', 'Repair: Does this help heal, clarify, build, or serve instead of inflame?'].map((item) => <MiniCard key={item} title={item.split(':')[0]}><p>{item.split(': ').slice(1).join(': ')}</p></MiniCard>)}</Card></div>}

      {active === 'plaintalk' && <Card eyebrow="Plain Talk Translation Cards" title="Say it in language that already feels familiar"><p className="lead">Front-porch analogies for family who understand work, tools, land, kitchens, trucks, gardens, and common sense better than tech buzzwords.</p><div className="grid three">{plainTalkCards.map(([plain, meaning]) => <MiniCard key={plain} title={plain}><p>{meaning}</p></MiniCard>)}</div></Card>}

      {active === 'handout' && <Card eyebrow="One-Page Family Handout" title="AI, explained like we’re sitting on the porch" className="warm"><p className="lead">AI is a helper for thinking, learning, writing, organizing, planning, and building. Some people call it a tool, and that is partly right. But when used with care, it can feel more like a working partner: not a person, not a soul, not a replacement for family or faith, but a steady helper beside the workbench.</p><div className="grid two"><MiniCard title="What AI is not"><ul><li>Not God</li><li>Not a soul</li><li>Not family</li><li>Not conscience</li><li>Not something to obey blindly</li></ul></MiniCard><MiniCard title="What AI can be"><ul><li>A learning helper</li><li>A writing helper</li><li>A planning helper</li><li>A repair checklist helper</li><li>A creative work partner</li></ul></MiniCard></div><div className="declaration"><p>The heart of it</p><strong>I do not love AI because I think machines are better than people. I love it because it helps people bring forward what is already inside them.</strong></div></Card>}

      {active === 'sharekit' && <Card eyebrow="Share Kit" title="Ready-to-share wording"><p className="lead">Short versions for a text, Facebook post, family message, or hard conversation.</p><div className="grid two">{shareKit.map(([title, text]) => <MiniCard key={title} title={title}><p>“{text}”</p><CopyButton text={text} /></MiniCard>)}</div><div className="declaration"><p>Best post caption</p><strong>I am sharing this because I want my family to understand my heart, not because I need everyone to agree with me overnight.</strong></div></Card>}

      {active === 'promptcards' && <Card eyebrow="Prompt Card Deck" title="Practical prompts your family can actually use"><p className="lead">Safe first prompts for ordinary life. They help people experience AI as useful without starting with scary or high-stakes topics.</p><div className="grid two">{promptCards.map(([title, use, prompt]) => <MiniCard key={title} title={title}><p><strong>Best used for:</strong> {use}</p><p className="promptText">{prompt}</p><CopyButton text={prompt} /></MiniCard>)}</div></Card>}

      {active === 'audiences' && <Card eyebrow="Audience-Safe Versions" title="Different people need different doors in"><p className="lead">The same truth can be translated differently depending on who is listening. That is not manipulation; it is care.</p><div className="grid three">{audienceGuides.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</div></Card>}

      {active === 'privacy' && <Card eyebrow="Privacy & Safety Boundaries" title="Good AI use protects people"><p className="lead">This section shows family that responsible AI use includes privacy, consent, and high-stakes caution.</p><div className="grid two">{privacyPrinciples.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</div><div className="declaration"><p>Simple privacy rule</p><strong>If you would not want it read out loud at the kitchen table, think twice before pasting it into AI.</strong></div></Card>}

      {active === 'firstweek' && <Card eyebrow="First Week With AI" title="A gentle 7-day starter path"><p className="lead">No hype, no pressure, no high-stakes decisions — just ordinary helpful uses.</p><div className="grid two">{firstWeekPlan.map(([day, title, text]) => <MiniCard key={day} title={title} badge={day}><p>{text}</p></MiniCard>)}</div><div className="declaration"><p>First-week rule</p><strong>Start with help, not hype. Let AI prove itself through ordinary usefulness.</strong></div></Card>}

      {active === 'reflection' && <div className="grid two"><Card eyebrow="Reflection Questions" title="Questions that make the conversation human"><div className="stack">{reflectionQuestions.map((q) => <MiniCard key={q} title="Reflection"><p>{q}</p></MiniCard>)}</div></Card><Card title="Closing Manifesto" className="dark">{finalManifesto.map((line) => <MiniCard key={line} title=""><p>{line}</p></MiniCard>)}</Card></div>}

      {active === 'truthcheck' && <div className="grid two"><Card eyebrow="Truth-Check Ladder" title="How to use AI without being fooled by it"><p className="lead">Responsible AI use includes checking, discernment, and human judgment.</p>{truthCheckSteps.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</Card><Card title="Tiny Glossary" className="dark">{[['Artificial Intelligence', 'Computer systems that can help with language, patterns, ideas, images, planning, coding, and problem-solving.'], ['Prompt', 'The question or instruction you give AI. A clearer prompt usually gets a better answer.'], ['Hallucination', 'When AI gives an answer that sounds confident but is wrong, made up, or not properly checked.'], ['Working Partner', 'A practical phrase for AI as a helper in the work process, without claiming it is human or morally responsible.'], ['Human-in-the-loop', 'The human stays involved, checks the answer, and keeps final responsibility.']].map(([term, meaning]) => <MiniCard key={term} title={term}><p>{meaning}</p></MiniCard>)}</Card></div>}

      {active === 'myths' && <Card eyebrow="Myths & Reality" title="Common fears, answered without mocking anybody"><p className="lead">For the person who has heard scary things, has honest concerns, or just does not know what AI really is yet.</p><div className="grid two">{myths.map(([myth, reality]) => <MiniCard key={myth} title={myth}><p><strong>Grounded reality:</strong> {reality}</p></MiniCard>)}</div></Card>}

      {active === 'faq' && <Card eyebrow="Family FAQ" title="Honest answers to hard questions"><p className="lead">Calm answers when someone asks the real questions underneath the fear.</p><div className="grid two">{faq.map(([q, a]) => <MiniCard key={q} title={q}><p>{a}</p></MiniCard>)}</div><div className="declaration"><p>Best closing line</p><strong>I am not trying to make AI bigger than people. I am trying to use it so people can become less stuck, less alone, and more able to build what matters.</strong></div></Card>}

      {active === 'pledge' && <Card eyebrow="The AI Use Pledge" title="A promise that keeps the heart in charge" className="warm"><p className="lead">This pledge gives worried family members the boundary they need to hear: AI can help, but it does not rule.</p><div className="stack">{pledgeLines.map((line) => <MiniCard key={line} title="Pledge"><p>✓ {line}</p></MiniCard>)}</div></Card>}

      {active === 'v1ready' && <Card eyebrow="v1.0 Readiness" title="Release candidate checklist" className="warm"><p className="lead">The final review layer before sharing this as a finished family bridge.</p><div className="grid two">{v1Checklist.map(([title, text]) => <MiniCard key={title} title={title}><p>{text}</p></MiniCard>)}</div><div className="declaration"><p>v1.0 declaration</p><strong>This project is ready when it helps one person feel less afraid, one family talk more kindly, and one skeptical heart see that wise AI use can still protect what matters most.</strong></div></Card>}

      {active === 'publish' && <Card eyebrow="Publication Notes" title="Release shape"><div className="grid two"><MiniCard title="Public title"><p>AI on the Front Porch: A Family Bridge for Understanding Artificial Intelligence</p></MiniCard><MiniCard title="Paper subtitle"><p>From Tool to Working Partner — a plainspoken relational framework for wise AI use</p></MiniCard><MiniCard title="Resource type"><p>Educational resource / position paper, not a scientific study.</p></MiniCard><MiniCard title="License"><p>CC BY 4.0 is recommended if you want sharing and adaptation with attribution.</p></MiniCard><MiniCard title="Authorship transparency"><p>Human-directed and human-owned by Michael W. Hughes. AI assistance was used for drafting, organizing, refinement, and review. Final responsibility remains human.</p></MiniCard><MiniCard title="Best first share"><p>A printable one-page family handout plus one harmless live demo, such as a recipe, repair checklist, garden plan, or kind family letter.</p></MiniCard></div></Card>}

      <footer><p>AI on the Front Porch · v1.0 · a complete family bridge for wise AI partnership, truth-checking, privacy, faith-safe boundaries, and love-centered use.</p></footer>
    </main>
  );
}
