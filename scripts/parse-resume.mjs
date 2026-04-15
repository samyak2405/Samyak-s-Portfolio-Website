import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

const workspaceRoot = path.resolve(process.cwd());
const pdfPath = path.join(workspaceRoot, 'src/assets/RESUME_Samyak_8551929114.pdf');
const outputDir = path.join(workspaceRoot, 'src/data');
const outputFile = path.join(outputDir, 'generated.js');

function normalizeLines(text) {
  return text
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

function isSectionHeader(line) {
  const headers = [
    'SKILLS',
    'TECHNICAL SKILLS',
    'EXPERIENCE',
    'WORK EXPERIENCE',
    'PROFESSIONAL EXPERIENCE',
    'EDUCATION',
    'PROJECTS',
    'CERTIFICATIONS',
    'ACHIEVEMENTS',
  ];
  const upper = line.toUpperCase();
  return headers.some((h) => upper.startsWith(h));
}

function parseSections(lines) {
  const sections = {};
  let current = 'INTRO';
  for (const line of lines) {
    if (isSectionHeader(line)) {
      current = line.toUpperCase();
      sections[current] = sections[current] || [];
      continue;
    }
    sections[current] = sections[current] || [];
    sections[current].push(line);
  }
  return sections;
}

function extractSkills(sectionLines = []) {
  if (!sectionLines.length) return [];
  const content = sectionLines.join(' ');
  // Split by common separators
  const items = content
    .split(/[,|•;]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
  // Deduplicate and keep concise labels
  const unique = Array.from(new Set(items)).map((s) => s.replace(/\s{2,}/g, ' '));
  return unique.slice(0, 50);
}

function chunkByRole(lines = []) {
  // Group experience entries by detecting date patterns or company/role separators
  const chunks = [];
  let current = [];
  const dateRegex = /(20\d{2}|19\d{2}).{0,10}(Present|present|20\d{2}|19\d{2})/;
  for (const line of lines) {
    const isDivider = dateRegex.test(line) || /^[A-Z][A-Za-z0-9&\-. ]{2,}$/.test(line);
    if (isDivider && current.length) {
      chunks.push(current);
      current = [];
    }
    current.push(line);
  }
  if (current.length) chunks.push(current);
  return chunks.map((chunk) => {
    const header = chunk[0] || '';
    const titleMatch = header.match(/^([A-Za-z0-9&\-.,() ]+?)\s*[-|@]\s*([A-Za-z0-9&\-.,() ]+)?/);
    const role = titleMatch ? titleMatch[1].trim() : header;
    const company = titleMatch && titleMatch[2] ? titleMatch[2].trim() : '';
    const periodLine = chunk.find((l) => /(Present|present|20\d{2}|19\d{2})/.test(l)) || '';
    const bullets = chunk.slice(1).filter((l) => /^[-•]/.test(l) || l.length > 0).slice(0, 8);
    return {
      role,
      company,
      period: periodLine,
      bullets,
    };
  });
}

function parseEducation(lines = []) {
  const entries = [];
  let buf = [];
  for (const line of lines) {
    const isStart = /^[A-Z][A-Za-z0-9&\-.,() ]{3,}$/.test(line) && /University|College|Institute|B\.|M\.|Bachelor|Master/i.test(line);
    if (isStart && buf.length) {
      entries.push(buf);
      buf = [];
    }
    buf.push(line);
  }
  if (buf.length) entries.push(buf);
  return entries.map((e) => {
    const header = e[0] || '';
    const degreeMatch = header.match(/(Bachelor|Master|B\.Tech|BTech|B\.E\.|BE|M\.Tech|MSc|BSc)[^,)]*/i);
    const institutionMatch = header.replace(degreeMatch?.[0] || '', '').trim();
    const period = (e.find((l) => /(20\d{2}|19\d{2})/.test(l)) || '').trim();
    const details = e.slice(1).slice(0, 4);
    return {
      degree: degreeMatch ? degreeMatch[0].trim() : header,
      institution: institutionMatch || header,
      period,
      details,
    };
  });
}

async function main() {
  if (!fs.existsSync(pdfPath)) {
    console.error('Resume PDF not found at:', pdfPath);
    process.exit(1);
  }
  const dataBuffer = fs.readFileSync(pdfPath);
  const parsed = await pdf(dataBuffer);
  const lines = normalizeLines(parsed.text);
  const sections = parseSections(lines);

  const skillSection =
    sections['SKILLS'] ||
    sections['TECHNICAL SKILLS'] ||
    sections['INTRO'] ||
    [];
  const skills = extractSkills(skillSection);

  const expLines =
    sections['EXPERIENCE'] ||
    sections['WORK EXPERIENCE'] ||
    sections['PROFESSIONAL EXPERIENCE'] ||
    [];
  const experience = chunkByRole(expLines).slice(0, 8);

  const eduLines = sections['EDUCATION'] || [];
  const education = parseEducation(eduLines).slice(0, 5);

  const out = `// Auto-generated from resume. Do not edit manually.\n` +
    `export const skills = ${JSON.stringify(skills, null, 2)};\n` +
    `export const experience = ${JSON.stringify(experience, null, 2)};\n` +
    `export const education = ${JSON.stringify(education, null, 2)};\n` +
    `export default { skills, experience, education };\n`;

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, out, 'utf8');
  console.log('Generated data at', path.relative(workspaceRoot, outputFile));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


