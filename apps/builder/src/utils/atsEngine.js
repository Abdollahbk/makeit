/**
 * atsEngine.js
 * Comprehensive enterprise-grade ATS (Applicant Tracking System) Scanner & Optimization Engine.
 * Multi-dimensional parsing: Contact entity extraction, experience chronology & tenure calculation,
 * seniority trajectory analysis, education credentials classification, semantic skill & synonym clustering,
 * impact & metric density evaluation, and multi-candidate batch ranking.
 * 100% private, zero-server processing.
 */

// Common stop words to exclude from keyword extraction
export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'will', 'also', 'etc', 'including', 'well', 'must',
  'able', 'work', 'working', 'experience', 'years', 'team', 'role', 'company', 'candidate', 'responsibilities',
  'requirements', 'preferred', 'qualification', 'qualifications', 'job', 'position', 'duties'
]);

// Strong Action Verbs recognized by top ATS parsers
export const ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'advised', 'analyzed', 'architected', 'automated',
  'built', 'championed', 'collaborated', 'conceptualized', 'conducted', 'configured', 'constructed',
  'coordinated', 'created', 'customized', 'decreased', 'delivered', 'deployed', 'designed', 'developed',
  'devised', 'directed', 'documented', 'engineered', 'enhanced', 'established', 'evaluated', 'executed',
  'expanded', 'facilitated', 'formulated', 'generated', 'guided', 'headed', 'identified', 'implemented',
  'improved', 'increased', 'initiated', 'innovated', 'inspected', 'instituted', 'integrated', 'launched',
  'led', 'maintained', 'managed', 'maximized', 'mentored', 'minimized', 'modernized', 'negotiated',
  'optimized', 'orchestrated', 'organized', 'originated', 'oversaw', 'performed', 'pioneered', 'planned',
  'produced', 'programmed', 'promoted', 'published', 're-engineered', 'reduced', 'refined', 'resolved',
  'restructured', 'revamped', 'scaled', 'scheduled', 'secured', 'simplified', 'spearheaded', 'standardized',
  'streamlined', 'strengthened', 'supervised', 'surpassed', 'trained', 'transformed', 'upgraded'
];

// Curated dictionary of Tech & Domain skills
export const TECH_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'react', 'react.js', 'react native', 'angular', 'vue', 'vue.js', 'next.js', 'nuxt', 'node', 'node.js', 'express',
  'express.js', 'django', 'fastapi', 'flask', 'spring boot', 'graphql', 'rest', 'restful api', 'sql', 'mysql',
  'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'sqlite', 'cassandra', 'docker',
  'kubernetes', 'k8s', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'ci/cd', 'github actions',
  'jenkins', 'terraform', 'ansible', 'linux', 'git', 'github', 'gitlab', 'jira', 'confluence', 'agile', 'scrum',
  'kanban', 'unit testing', 'jest', 'cypress', 'selenium', 'mocha', 'html', 'html5', 'css', 'css3', 'sass', 'scss',
  'tailwind', 'tailwind css', 'bootstrap', 'styled-components', 'redux', 'mobx', 'zustand', 'microservices',
  'serverless', 'system design', 'distributed systems', 'data structures', 'algorithms', 'machine learning',
  'deep learning', 'nlp', 'computer vision', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch',
  'power bi', 'tableau', 'excel', 'figma', 'ui/ux', 'photoshop', 'illustrator', 'seo', 'cybersecurity', 'penetration testing'
];

// Curated dictionary of Soft Skills
export const SOFT_SKILLS = [
  'leadership', 'communication', 'collaboration', 'problem solving', 'critical thinking', 'teamwork',
  'time management', 'adaptability', 'flexibility', 'emotional intelligence', 'negotiation', 'mentoring',
  'coaching', 'conflict resolution', 'presentation', 'public speaking', 'decision making', 'creativity',
  'strategic thinking', 'organization', 'interpersonal skills', 'attention to detail', 'client relations',
  'project management', 'cross-functional', 'stakeholder management'
];

/**
 * Canonical Skill Synonyms & Equivalencies Dictionary
 * Real ATS systems map variations to a single standardized skill entity.
 */
export const SKILL_SYNONYMS = {
  'kubernetes': ['kubernetes', 'k8s', 'container orchestration'],
  'aws': ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'aws cloud'],
  'gcp': ['gcp', 'google cloud', 'google cloud platform'],
  'azure': ['azure', 'microsoft azure'],
  'javascript': ['javascript', 'js', 'es6', 'ecmascript'],
  'typescript': ['typescript', 'ts'],
  'react': ['react', 'react.js', 'reactjs', 'react native'],
  'node.js': ['node', 'node.js', 'nodejs', 'express', 'express.js'],
  'python': ['python', 'python3', 'py', 'django', 'fastapi', 'flask'],
  'postgresql': ['postgresql', 'postgres', 'psql'],
  'docker': ['docker', 'containers', 'containerization'],
  'ci/cd': ['ci/cd', 'continuous integration', 'continuous deployment', 'github actions', 'jenkins', 'gitlab ci'],
  'restful api': ['rest', 'restful', 'rest api', 'restful api', 'api design', 'restful services'],
  'graphql': ['graphql', 'apollo', 'relay'],
  'sql': ['sql', 'relational database', 'rdbms', 'mysql', 'postgresql'],
  'nosql': ['nosql', 'mongodb', 'redis', 'dynamodb', 'cassandra'],
  'next.js': ['next.js', 'nextjs', 'next'],
  'vue': ['vue', 'vue.js', 'vuejs', 'nuxt'],
  'angular': ['angular', 'angularjs', 'angular 2+'],
  'machine learning': ['machine learning', 'ml', 'deep learning', 'artificial intelligence', 'ai', 'data science'],
  'agile': ['agile', 'scrum', 'sprint planning', 'kanban', 'scrum master'],
  'microservices': ['microservices', 'microservice architecture', 'distributed systems', 'service oriented architecture'],
  'unit testing': ['unit testing', 'test driven development', 'tdd', 'jest', 'cypress', 'mocha', 'automated testing'],
  'git': ['git', 'github', 'gitlab', 'version control', 'bitbucket'],
  'linux': ['linux', 'unix', 'bash', 'shell scripting']
};

/**
 * Tokenize and normalize text into clean words and phrases
 */
export function extractKeywords(text = '') {
  if (!text || typeof text !== 'string') return [];

  const clean = text.toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = clean.split(' ').filter(w => w.length > 1 && !STOP_WORDS.has(w));
  const keywords = new Set(words);

  const allKnownMultiWord = [...TECH_SKILLS, ...SOFT_SKILLS].filter(s => s.includes(' ') || s.includes('/'));
  for (const phrase of allKnownMultiWord) {
    if (clean.includes(phrase)) {
      keywords.add(phrase);
    }
  }

  return Array.from(keywords);
}

/**
 * Extracts all searchable plain text from the structured cvData object
 */
export function extractCVText(cvData) {
  if (!cvData) return '';
  const parts = [];

  if (cvData.personal) {
    const p = cvData.personal;
    if (p.firstName) parts.push(p.firstName);
    if (p.lastName) parts.push(p.lastName);
    if (p.role) parts.push(p.role);
    if (p.email) parts.push(p.email);
    if (p.phone) parts.push(p.phone);
    if (p.location) parts.push(p.location);
    if (p.bio) parts.push(p.bio);
    if (p.customFields) {
      p.customFields.forEach(f => {
        if (f.label) parts.push(f.label);
        if (f.value) parts.push(f.value);
      });
    }
  }

  if (Array.isArray(cvData.experience)) {
    cvData.experience.forEach(exp => {
      if (exp.role) parts.push(exp.role);
      if (exp.company) parts.push(exp.company);
      if (exp.location) parts.push(exp.location);
      if (exp.description) parts.push(exp.description);
    });
  }

  if (Array.isArray(cvData.education)) {
    cvData.education.forEach(edu => {
      if (edu.degree) parts.push(edu.degree);
      if (edu.school) parts.push(edu.school);
      if (edu.location) parts.push(edu.location);
      if (edu.description) parts.push(edu.description);
    });
  }

  if (Array.isArray(cvData.skills)) {
    cvData.skills.forEach(s => {
      if (typeof s === 'string') parts.push(s);
      else if (s && s.name) parts.push(s.name);
    });
  }

  if (Array.isArray(cvData.certificates)) {
    cvData.certificates.forEach(c => {
      if (c.title) parts.push(c.title);
      if (c.issuer) parts.push(c.issuer);
    });
  }

  if (Array.isArray(cvData.languages)) {
    cvData.languages.forEach(l => {
      if (typeof l === 'string') parts.push(l);
      else if (l && l.name) parts.push(l.name);
    });
  }

  if (Array.isArray(cvData.projects)) {
    cvData.projects.forEach(proj => {
      if (proj.title) parts.push(proj.title);
      if (proj.description) parts.push(proj.description);
    });
  }

  return parts.join(' ');
}

/**
 * ─────────────────────────────────────────────────────────────
 * ENTITY EXTRACTION & NATURAL LANGUAGE PARSER
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Extracts candidate contact information and digital footprint
 */
export function extractContactEntities(text = '') {
  if (!text) return { name: 'Candidate', role: 'Applicant', email: null, phone: null, location: null, links: [] };

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // 1. Name heuristic: Scans top 4 lines, excludes headings, titles, emails, phones
  let name = 'Candidate';
  const headingWords = new Set(['resume', 'curriculum', 'vitae', 'cv', 'summary', 'profile', 'contact', 'experience']);
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const l = lines[i];
    const isContactLine = /@|\.com|\+?\d{3}|linkedin|github|phone|email/i.test(l);
    const isHeading = headingWords.has(l.toLowerCase().trim());
    if (!isContactLine && !isHeading && l.length > 2 && l.length < 50 && !l.includes(':')) {
      name = l.replace(/[^a-zA-Z\s.-]/g, '').trim();
      break;
    }
  }

  // 2. Role / Headline heuristic
  let role = 'Professional';
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const l = lines[i];
    if (l !== name && /(?:engineer|developer|manager|lead|architect|analyst|designer|consultant|specialist|officer|scientist)/i.test(l)) {
      if (l.length < 60 && !l.includes('@')) {
        role = l;
        break;
      }
    }
  }

  // 3. Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : null;

  // 4. Phone
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
  const phone = phoneMatch ? phoneMatch[0].trim() : null;

  // 5. Links
  const links = [];
  if (/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i.test(text)) {
    const m = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
    links.push({ type: 'LinkedIn', url: m[0] });
  }
  if (/github\.com\/[a-zA-Z0-9_-]+/i.test(text)) {
    const m = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);
    links.push({ type: 'GitHub', url: m[0] });
  }

  // 6. Location
  let location = null;
  const locMatch = text.match(/(?:Location|Address)?[:\s]*([A-Z][a-zA-Z\s]+,\s*[A-Z]{2,}|[A-Z][a-zA-Z\s]+,\s*[A-Z][a-zA-Z\s]+)/);
  if (locMatch && locMatch[1].length < 40) {
    location = locMatch[1].trim();
  }

  return { name, role, email, phone, location, links };
}

/**
 * Calculates work experience chronology, total tenure, and seniority trajectory
 */
export function parseExperienceChronology(text = '') {
  let totalMonths = 0;
  const dateRanges = [];

  // Regex matching date pairs e.g., "2019 - Present", "Jan 2020 - Dec 2022", "03/2018 to 11/2021"
  const dateRegex = /\b(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\.?\s*)?(\d{4})\s*(?:-|–|—|to)\s*(?:(Present|Current|Now)|(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\.?\s*)?(\d{4}))\b/gi;

  const currentYear = new Date().getFullYear();
  let match;

  while ((match = dateRegex.exec(text)) !== null) {
    const startYear = parseInt(match[2], 10);
    const isPresent = Boolean(match[3]);
    const endYear = isPresent ? currentYear : parseInt(match[5], 10);

    if (startYear >= 1970 && startYear <= currentYear + 1 && endYear >= startYear && endYear <= currentYear + 2) {
      const durationMonths = Math.max(6, (endYear - startYear) * 12);
      totalMonths += durationMonths;
      dateRanges.push({ startYear, endYear, isPresent, durationMonths });
    }
  }

  // Fallback explicit mentions e.g. "6+ years of experience"
  if (totalMonths === 0) {
    const expMention = text.match(/(\d+)\+?\s*years(?:\s+of)?\s+(?:experience|software|engineering|development|work)/i);
    if (expMention) {
      totalMonths = parseInt(expMention[1], 10) * 12;
    }
  }

  // Seniority Level Classification
  let seniorityLevel = 'Mid-Level';
  let seniorityScore = 3; // 1 to 6 scale
  const lower = text.toLowerCase();

  if (/executive|chief|cto|cio|vp|vice president|director/i.test(lower)) {
    seniorityLevel = 'Director / Executive';
    seniorityScore = 6;
  } else if (/principal|staff|lead|architect|head of/i.test(lower)) {
    seniorityLevel = 'Lead / Principal / Architect';
    seniorityScore = 5;
  } else if (/senior|sr\./i.test(lower)) {
    seniorityLevel = 'Senior';
    seniorityScore = 4;
  } else if (/mid-level|intermediate|specialist/i.test(lower)) {
    seniorityLevel = 'Mid-Level';
    seniorityScore = 3;
  } else if (/junior|jr\.|associate/i.test(lower)) {
    seniorityLevel = 'Junior / Associate';
    seniorityScore = 2;
  } else if (/intern|trainee|apprentice/i.test(lower)) {
    seniorityLevel = 'Intern / Entry';
    seniorityScore = 1;
  }

  const calculatedYears = Math.min(30, Math.round((totalMonths / 12) * 10) / 10);

  return {
    totalYears: calculatedYears || 1.5,
    seniorityLevel,
    seniorityScore,
    detectedPositionsCount: Math.max(1, dateRanges.length)
  };
}

/**
 * Extracts and classifies candidate education credentials
 */
export function parseEducationCredentials(text = '') {
  let highestDegree = 'Bachelor\'s Degree (or equivalent)';
  let degreeRank = 3; // 1 to 5 scale
  let major = 'Technical / Applied Science';

  const lower = text.toLowerCase();

  if (/ph\.?d|doctor of philosophy|doctorate/i.test(lower)) {
    highestDegree = 'Ph.D. / Doctorate';
    degreeRank = 5;
  } else if (/master(?:'s)?|m\.s\.|m\.a\.|msc|mba|m\.eng/i.test(lower)) {
    highestDegree = 'Master\'s Degree (M.S. / M.A. / MBA)';
    degreeRank = 4;
  } else if (/bachelor(?:'s)?|b\.s\.|b\.a\.|bsc|b\.tech|b\.e\./i.test(lower)) {
    highestDegree = 'Bachelor\'s Degree (B.S. / B.A. / B.Tech)';
    degreeRank = 3;
  } else if (/associate(?:'s)?|a\.s\.|a\.a\./i.test(lower)) {
    highestDegree = 'Associate Degree';
    degreeRank = 2;
  } else if (/bootcamp|certificate|certification/i.test(lower)) {
    highestDegree = 'Professional Certificate / Bootcamp';
    degreeRank = 1.5;
  }

  // Major detection
  if (/computer science|software engineering|computer engineering/i.test(lower)) {
    major = 'Computer Science / Software Engineering';
  } else if (/data science|artificial intelligence|machine learning|analytics/i.test(lower)) {
    major = 'Data Science & Machine Learning';
  } else if (/information technology|information systems|cybersecurity/i.test(lower)) {
    major = 'Information Technology / Cybersecurity';
  } else if (/electrical|mechanical|civil|biomedical/i.test(lower)) {
    major = 'Engineering (Specialized)';
  } else if (/business|finance|economics|management/i.test(lower)) {
    major = 'Business Administration / Economics';
  }

  return { highestDegree, degreeRank, major };
}

/**
 * Evaluates quantifiable impact metrics density
 */
export function calculateImpactMetrics(text = '') {
  const matches = [];

  // Percentages e.g., 35%, 12.5%
  const pct = text.match(/\b\d+(?:\.\d+)?%/g) || [];
  pct.forEach(p => matches.push({ type: 'percentage', value: p }));

  // Monetary figures e.g., $10M, $500K, €2M
  const money = text.match(/[\$€£]\s*\d+(?:\.\d+)?\s*(?:k|m|million|billion)?/gi) || [];
  money.forEach(m => matches.push({ type: 'revenue_cost', value: m }));

  // High scale e.g., 10M requests, 500k users, 99.9% uptime
  const scale = text.match(/\b\d+\s*(?:k|m|million|billion)\s*(?:users|requests|queries|downloads|records|visits)?/gi) || [];
  scale.forEach(s => matches.push({ type: 'scale_volume', value: s }));

  // Team leadership count e.g., mentored 5 engineers, led team of 12
  const team = text.match(/(?:mentored|led|managed|guided)\s+(\d+)\s+(?:engineers|developers|members|people)/gi) || [];
  team.forEach(t => matches.push({ type: 'leadership', value: t }));

  const count = matches.length;
  // Score: 0 to 100 based on quantifiable density
  const score = Math.min(100, Math.round(count * 18));

  return {
    count,
    score,
    matches: matches.slice(0, 8)
  };
}

/**
 * ─────────────────────────────────────────────────────────────
 * JOB DESCRIPTION REQUIREMENTS PARSER
 * ─────────────────────────────────────────────────────────────
 */

export function parseJobRequirements(jdText = '') {
  if (!jdText || !jdText.trim()) {
    return {
      title: 'Target Professional Role',
      minYears: 3,
      requiredSeniority: 'Mid-Level',
      requiredSkills: [],
      mandatorySkills: [],
      preferredSkills: []
    };
  }

  const lines = jdText.split('\n').map(l => l.trim()).filter(Boolean);
  let title = lines[0] ? lines[0].replace(/^(?:Job Title|Role|Position|About the Role):\s*/i, '').slice(0, 60) : 'Target Role';

  // Extract min years required e.g., "5+ years", "3-5 years", "minimum 4 years"
  let minYears = 3;
  const expMatch = jdText.match(/(\d+)\+?\s*years(?:\s+of)?(?:\s+(?:professional|relevant|hands-on|industry))?\s+experience/i);
  if (expMatch) {
    minYears = parseInt(expMatch[1], 10);
  }

  // Extract required seniority
  let requiredSeniority = 'Mid-Level';
  if (/lead|principal|staff|architect/i.test(title) || /lead|principal|staff/i.test(jdText.slice(0, 300))) {
    requiredSeniority = 'Lead / Principal';
  } else if (/senior|sr\./i.test(title)) {
    requiredSeniority = 'Senior';
  } else if (/junior|jr\.|entry/i.test(title)) {
    requiredSeniority = 'Junior / Entry';
  }

  // Canonical skill extraction with synonym resolution
  const jdKeywords = extractKeywords(jdText);
  const requiredSkills = [];
  const seenCanonical = new Set();

  for (const [canonical, synList] of Object.entries(SKILL_SYNONYMS)) {
    const isPresent = synList.some(syn => jdText.toLowerCase().includes(syn));
    if (isPresent && !seenCanonical.has(canonical)) {
      seenCanonical.add(canonical);
      requiredSkills.push({
        name: canonical,
        category: TECH_SKILLS.includes(canonical) ? 'technical' : 'domain',
        weight: canonical === 'react' || canonical === 'node.js' || canonical === 'python' || canonical === 'kubernetes' || canonical === 'aws' ? 2 : 1
      });
    }
  }

  // Add individual detected skills
  for (const skill of TECH_SKILLS) {
    if (!seenCanonical.has(skill) && jdText.toLowerCase().includes(skill)) {
      seenCanonical.add(skill);
      requiredSkills.push({ name: skill, category: 'technical', weight: 1.5 });
    }
  }

  for (const skill of SOFT_SKILLS) {
    if (!seenCanonical.has(skill) && jdText.toLowerCase().includes(skill)) {
      seenCanonical.add(skill);
      requiredSkills.push({ name: skill, category: 'soft', weight: 1 });
    }
  }

  return {
    title,
    minYears,
    requiredSeniority,
    requiredSkills: requiredSkills.slice(0, 25)
  };
}

/**
 * ─────────────────────────────────────────────────────────────
 * DEEP MULTI-DIMENSIONAL ATS MATCHING & EVALUATION ENGINE
 * ─────────────────────────────────────────────────────────────
 */

export function evaluateCandidateAgainstJob(resumeText = '', jobDescription = '') {
  if (!resumeText || !resumeText.trim()) {
    throw new Error('Resume text cannot be empty');
  }

  // 1. Natural Language Extraction
  const contact = extractContactEntities(resumeText);
  const chronology = parseExperienceChronology(resumeText);
  const education = parseEducationCredentials(resumeText);
  const impact = calculateImpactMetrics(resumeText);
  const structure = auditRawText(resumeText);

  // 2. Parse Job Requirements
  const jdReqs = parseJobRequirements(jobDescription);
  const hasJd = Boolean(jobDescription && jobDescription.trim());

  // 3. Semantic Skill Matching with Canonical Synonyms
  const resumeLower = resumeText.toLowerCase();
  const matchedSkills = [];
  const missingSkills = [];

  let totalSkillWeight = 0;
  let earnedSkillWeight = 0;

  for (const req of jdReqs.requiredSkills) {
    totalSkillWeight += req.weight;
    // Check if canonical or any synonym appears in resume
    const synonyms = SKILL_SYNONYMS[req.name] || [req.name];
    const isMatched = synonyms.some(syn => resumeLower.includes(syn));

    if (isMatched) {
      earnedSkillWeight += req.weight;
      matchedSkills.push({ name: req.name, category: req.category });
    } else {
      missingSkills.push({ name: req.name, category: req.category });
    }
  }

  const technicalFitScore = totalSkillWeight > 0
    ? Math.round((earnedSkillWeight / totalSkillWeight) * 100)
    : 85;

  // 4. Tenure & Chronology Fit
  let tenureFitScore = 100;
  if (hasJd && jdReqs.minYears > 0) {
    const ratio = chronology.totalYears / jdReqs.minYears;
    if (ratio >= 1.0) {
      tenureFitScore = 100;
    } else if (ratio >= 0.75) {
      tenureFitScore = 80;
    } else if (ratio >= 0.5) {
      tenureFitScore = 55;
    } else {
      tenureFitScore = Math.max(30, Math.round(ratio * 70));
    }
  }

  // 5. Seniority Alignment
  let seniorityFitScore = 85;
  if (hasJd) {
    if (jdReqs.requiredSeniority.includes('Lead') && chronology.seniorityScore < 4) {
      seniorityFitScore = 50;
    } else if (jdReqs.requiredSeniority.includes('Senior') && chronology.seniorityScore < 3) {
      seniorityFitScore = 60;
    } else if (chronology.seniorityScore >= 4) {
      seniorityFitScore = 95;
    }
  }

  // 6. Education Fit
  const educationFitScore = education.degreeRank >= 3 ? 100 : education.degreeRank >= 2 ? 80 : 70;

  // 7. Impact & Action Verb Score
  const impactScore = impact.score;
  const formattingScore = structure.score;

  // 8. Overall Weighted Enterprise ATS Composite Score
  // Weights: Skills (35%), Tenure (25%), Seniority (15%), Education (10%), Impact (10%), Formatting (5%)
  const overallScore = hasJd
    ? Math.round(
        (technicalFitScore * 0.35) +
        (tenureFitScore * 0.25) +
        (seniorityFitScore * 0.15) +
        (educationFitScore * 0.10) +
        (impactScore * 0.10) +
        (formattingScore * 0.05)
      )
    : formattingScore;

  // Tier classification
  let tier = 'Tier 1: Top Candidate (Direct Interview)';
  let tierBadge = 'strong';
  if (overallScore < 60) {
    tier = 'Tier 3: Low Match (Significant Gaps)';
    tierBadge = 'weak';
  } else if (overallScore < 78) {
    tier = 'Tier 2: Strong Contender (Verify Gaps)';
    tierBadge = 'moderate';
  }

  // Recruiter Strengths & Concerns
  const strengths = [];
  const concerns = [];
  const tailoredQuestions = [];

  if (chronology.totalYears >= jdReqs.minYears) {
    strengths.push(`Proven ${chronology.totalYears} years experience exceeds target tenure requirement of ${jdReqs.minYears}+ years.`);
  } else if (hasJd) {
    concerns.push(`Candidate tenure (${chronology.totalYears} yrs) is under the targeted ${jdReqs.minYears}+ years.`);
    tailoredQuestions.push(`The role targets ${jdReqs.minYears}+ years of experience; can you share examples where your accelerated learning covered complex enterprise domains quickly?`);
  }

  if (matchedSkills.length >= 4) {
    const topSkills = matchedSkills.slice(0, 4).map(s => s.name.toUpperCase()).join(', ');
    strengths.push(`Validated proficiency in core technology stack: ${topSkills}.`);
  }

  if (impact.count >= 2) {
    strengths.push(`Strong metrics-oriented resume (${impact.count} quantifiable business/performance results identified).`);
  } else {
    concerns.push('Resume relies heavily on task descriptions with limited quantifiable business impact (%/metrics).');
    tailoredQuestions.push('Can you walk us through the measurable outcome or performance gain from your most challenging recent project?');
  }

  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).map(s => s.name.toUpperCase());
    concerns.push(`Missing core requirements from posting: ${topMissing.join(', ')}.`);
    topMissing.forEach(skill => {
      tailoredQuestions.push(`What is your hands-on background working with ${skill} in production environments?`);
    });
  }

  if (tailoredQuestions.length === 0) {
    tailoredQuestions.push('Describe an architectural decision you made that significantly reduced system complexity.');
    tailoredQuestions.push('How do you mentor and elevate junior engineers on engineering best practices?');
  }

  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    tier,
    tierBadge,
    contact,
    chronology,
    education,
    impact,
    structure,
    jdReqs,
    subScores: {
      technicalFit: technicalFitScore,
      tenureFit: tenureFitScore,
      seniorityFit: seniorityFitScore,
      educationFit: educationFitScore,
      impactFit: impactScore,
      formattingFit: formattingScore
    },
    matchedSkills,
    missingSkills,
    strengths,
    concerns,
    tailoredQuestions
  };
}

/**
 * ─────────────────────────────────────────────────────────────
 * BATCH MULTI-CV PROCESSOR & RECRUITER RANKING
 * ─────────────────────────────────────────────────────────────
 */

export function batchProcessCandidates(candidatesList = [], jobDescription = '') {
  if (!Array.isArray(candidatesList) || candidatesList.length === 0) {
    return {
      rankedCandidates: [],
      stats: { total: 0, avgScore: 0, topScore: 0, shortlistCount: 0 }
    };
  }

  const results = candidatesList.map(cand => {
    const evalResult = evaluateCandidateAgainstJob(cand.rawText, jobDescription);
    return {
      id: cand.id,
      fileName: cand.fileName || 'Resume.pdf',
      candidateName: evalResult.contact.name || 'Candidate',
      candidateRole: evalResult.contact.role || 'Applicant',
      overallScore: evalResult.overallScore,
      tier: evalResult.tier,
      tierBadge: evalResult.tierBadge,
      totalYears: evalResult.chronology.totalYears,
      highestDegree: evalResult.education.highestDegree,
      matchedSkillsCount: evalResult.matchedSkills.length,
      missingSkillsCount: evalResult.missingSkills.length,
      evaluation: evalResult
    };
  });

  // Sort descending by overallScore
  results.sort((a, b) => b.overallScore - a.overallScore);

  // Assign leaderboard rank (#1, #2, ...)
  results.forEach((c, idx) => {
    c.rank = idx + 1;
  });

  const total = results.length;
  const topScore = results[0]?.overallScore || 0;
  const avgScore = Math.round(results.reduce((acc, c) => acc + c.overallScore, 0) / (total || 1));
  const shortlistCount = results.filter(c => c.overallScore >= 75).length;

  return {
    rankedCandidates: results,
    stats: {
      total,
      avgScore,
      topScore,
      shortlistCount,
      topCandidateName: results[0]?.candidateName || 'N/A'
    }
  };
}

/**
 * ─────────────────────────────────────────────────────────────
 * BACKWARDS-COMPATIBILITY EXPORTS FOR CV BUILDER & MODALS
 * ─────────────────────────────────────────────────────────────
 */

export function auditCVStructure(cvData) {
  const issues = [];
  const passes = [];
  let score = 100;

  const personal = cvData?.personal || {};
  const experience = Array.isArray(cvData?.experience) ? cvData.experience : [];
  const education = Array.isArray(cvData?.education) ? cvData.education : [];
  const skills = Array.isArray(cvData?.skills) ? cvData.skills : [];

  if (personal.email && personal.email.includes('@')) {
    passes.push('Valid email address present');
  } else {
    issues.push({ text: 'Missing or invalid email address', penalty: 15 });
    score -= 15;
  }

  if (personal.phone && personal.phone.trim().length >= 6) {
    passes.push('Phone number provided');
  } else {
    issues.push({ text: 'Missing phone number (standard ATS requirement)', penalty: 8 });
    score -= 8;
  }

  if (personal.location && personal.location.trim().length > 2) {
    passes.push('Location provided');
  } else {
    issues.push({ text: 'Location (city, country) not specified', penalty: 5 });
    score -= 5;
  }

  if (personal.role && personal.role.trim().length > 2) {
    passes.push('Target job title / headline defined');
  } else {
    issues.push({ text: 'No professional headline / target role specified', penalty: 8 });
    score -= 8;
  }

  if (personal.bio && personal.bio.trim().split(/\s+/).length >= 15) {
    passes.push('Professional summary contains substantial overview');
  } else if (personal.bio && personal.bio.trim().length > 0) {
    issues.push({ text: 'Professional summary is very brief (recommend 2-3 sentences)', penalty: 5 });
    score -= 5;
  } else {
    issues.push({ text: 'Missing professional summary / bio', penalty: 10 });
    score -= 10;
  }

  if (experience.length > 0) {
    passes.push(`${experience.length} work experience entr${experience.length > 1 ? 'ies' : 'y'} added`);
    let foundActionVerb = false;
    const allExpText = experience.map(e => e.description || '').join(' ').toLowerCase();

    if (/\b\d+([.,]\d+)?%|\$\d+|\b\d+\b/g.test(allExpText)) {
      passes.push('Experience includes quantifiable results and metrics (%, numbers, stats)');
    } else {
      issues.push({ text: 'Experience lacks quantifiable metrics (add numbers, %, or project scales)', penalty: 8 });
      score -= 8;
    }

    for (const verb of ACTION_VERBS) {
      if (allExpText.includes(verb)) {
        foundActionVerb = true;
        break;
      }
    }

    if (foundActionVerb) {
      passes.push('Experience uses strong, active action verbs');
    } else {
      issues.push({ text: 'Experience descriptions lack strong ATS action verbs (e.g., spearheaded, engineered, reduced)', penalty: 7 });
      score -= 7;
    }
  } else {
    issues.push({ text: 'No work experience entries recorded', penalty: 20 });
    score -= 20;
  }

  if (education.length > 0) {
    passes.push('Education history provided');
  } else {
    issues.push({ text: 'No education history listed', penalty: 10 });
    score -= 10;
  }

  if (skills.length >= 5) {
    passes.push(`Solid skills section (${skills.length} skills listed)`);
  } else if (skills.length > 0) {
    issues.push({ text: 'Skills section has fewer than 5 items (recommend 6-12 relevant skills)', penalty: 5 });
    score -= 5;
  } else {
    issues.push({ text: 'Missing skills section (crucial for ATS keyword ranking)', penalty: 15 });
    score -= 15;
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    passes,
    issues
  };
}

export function matchResumeWithJobDescription(resumeText = '', jobDescription = '') {
  if (!jobDescription || !jobDescription.trim()) {
    return {
      matchScore: null,
      matchedKeywords: [],
      missingKeywords: [],
      hardSkillsMatch: [],
      softSkillsMatch: [],
      totalJdKeywordsCount: 0
    };
  }

  const evalResult = evaluateCandidateAgainstJob(resumeText, jobDescription);

  return {
    matchScore: evalResult.subScores.technicalFit,
    matchedKeywords: evalResult.matchedSkills.map(s => s.name),
    missingKeywords: evalResult.missingSkills.map(s => ({ word: s.name, category: s.category })),
    hardSkillsMatch: evalResult.matchedSkills.filter(s => s.category === 'technical').map(s => s.name),
    softSkillsMatch: evalResult.matchedSkills.filter(s => s.category === 'soft').map(s => s.name),
    totalJdKeywordsCount: evalResult.jdReqs.requiredSkills.length
  };
}

export function generateRecruiterEvaluation(cvData, matchResult, structureResult) {
  const candidateName = `${cvData?.personal?.firstName || ''} ${cvData?.personal?.lastName || ''}`.trim() || 'Candidate';
  const role = cvData?.personal?.role || 'Professional';

  const strengths = [];
  const concerns = [];
  const suggestedQuestions = [];

  if (structureResult?.score >= 80) {
    strengths.push('Document structure follows standard ATS-compliant hierarchy and conventions.');
  }

  if (matchResult && matchResult.matchScore !== null) {
    if (matchResult.matchScore >= 75) {
      strengths.push(`High keyword alignment (${matchResult.matchScore}%) with the specified job requirements.`);
    } else if (matchResult.matchScore < 50) {
      concerns.push(`Low keyword similarity (${matchResult.matchScore}%) to target job posting.`);
    }

    if (matchResult.hardSkillsMatch && matchResult.hardSkillsMatch.length >= 3) {
      strengths.push(`Demonstrated proficiency in core technical requirements: ${matchResult.hardSkillsMatch.slice(0, 4).join(', ')}.`);
    }

    if (matchResult.missingKeywords && matchResult.missingKeywords.length > 0) {
      const topMissing = matchResult.missingKeywords.slice(0, 3).map(k => k.word || k);
      concerns.push(`Key job requirements not explicitly mentioned in the resume: ${topMissing.join(', ')}.`);
      topMissing.forEach(kw => {
        suggestedQuestions.push(`Can you describe your hands-on experience working with ${String(kw).toUpperCase()} in prior production environments?`);
      });
    }
  }

  if (structureResult?.issues && structureResult.issues.length > 0) {
    concerns.push(structureResult.issues[0].text);
  }

  if (suggestedQuestions.length === 0) {
    suggestedQuestions.push('Walk us through a major project where you solved a significant technical hurdle.');
    suggestedQuestions.push('How do you approach learning and integrating new tools into an established workflow?');
  }

  return {
    candidateName,
    role,
    strengths,
    concerns,
    suggestedQuestions
  };
}

export function auditRawText(rawText = '') {
  const issues = [];
  const passes = [];
  let score = 100;

  if (!rawText || !rawText.trim()) {
    return {
      score: 0,
      passes: [],
      issues: [{ text: 'Resume text is empty', penalty: 100 }],
      candidateName: 'Candidate',
      candidateRole: 'Applicant'
    };
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const lowerText = rawText.toLowerCase();

  const contact = extractContactEntities(rawText);

  if (contact.email) {
    passes.push(`Contact email detected (${contact.email})`);
  } else {
    issues.push({ text: 'No professional email address detected', penalty: 15 });
    score -= 15;
  }

  if (contact.phone) {
    passes.push(`Phone number detected (${contact.phone})`);
  } else {
    issues.push({ text: 'Missing phone number (required by most ATS parsers)', penalty: 8 });
    score -= 8;
  }

  if (contact.links.length > 0) {
    passes.push(`Professional profile link detected (${contact.links.map(l => l.type).join(', ')})`);
  } else {
    issues.push({ text: 'No professional profile link found (e.g. LinkedIn or GitHub)', penalty: 5 });
    score -= 5;
  }

  const sections = {
    experience: /(?:experience|employment|work history|career)/i.test(rawText),
    education: /(?:education|academic|university|degree|bachelor|master|phd)/i.test(rawText),
    skills: /(?:skills|technologies|proficiencies|competencies)/i.test(rawText),
    summary: /(?:summary|profile|about me|overview|objective)/i.test(rawText)
  };

  if (sections.experience) {
    passes.push('Standard Work Experience section identified');
  } else {
    issues.push({ text: 'Missing standard "Experience" section header', penalty: 20 });
    score -= 20;
  }

  if (sections.education) {
    passes.push('Education / Academic credentials section identified');
  } else {
    issues.push({ text: 'Missing "Education" section header', penalty: 10 });
    score -= 10;
  }

  if (sections.skills) {
    passes.push('Dedicated Skills section detected');
  } else {
    issues.push({ text: 'Missing dedicated "Skills" or "Technologies" section', penalty: 12 });
    score -= 12;
  }

  if (sections.summary) {
    passes.push('Professional Summary / Bio section detected');
  } else {
    issues.push({ text: 'No Professional Summary or Bio heading found', penalty: 6 });
    score -= 6;
  }

  // Metrics
  if (/\b\d+([.,]\d+)?%|\$\d+|\b\d+\s*(?:k|m|million|billion|users|clients|requests|projects|members|engineers)\b/i.test(rawText)) {
    passes.push('Quantifiable metrics and measurable results identified (%, $, scale)');
  } else {
    issues.push({ text: 'Resume lacks quantifiable impact metrics (e.g., percentages, scale, performance gains)', penalty: 8 });
    score -= 8;
  }

  // Action verbs
  let foundActionCount = 0;
  for (const verb of ACTION_VERBS) {
    if (lowerText.includes(verb)) foundActionCount++;
  }

  if (foundActionCount >= 4) {
    passes.push(`Strong active language used (${foundActionCount}+ ATS action verbs found)`);
  } else if (foundActionCount > 0) {
    issues.push({ text: 'Limited ATS action verbs used (recommend leading bullet points with verbs like spearheaded, engineered, optimized)', penalty: 6 });
    score -= 6;
  } else {
    issues.push({ text: 'No strong action verbs detected in descriptions', penalty: 10 });
    score -= 10;
  }

  const wordCount = rawText.trim().split(/\s+/).length;
  if (wordCount >= 250 && wordCount <= 1200) {
    passes.push(`Optimal resume length (${wordCount} words, roughly 1-2 pages)`);
  } else if (wordCount < 250) {
    issues.push({ text: `Resume is unusually brief (${wordCount} words; standard ATS expects 300-800 words)`, penalty: 10 });
    score -= 10;
  } else {
    issues.push({ text: `Resume is very long (${wordCount} words; consider condensing to 2 pages maximum)`, penalty: 5 });
    score -= 5;
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    passes,
    issues,
    candidateName: contact.name,
    candidateRole: contact.role,
    wordCount
  };
}
