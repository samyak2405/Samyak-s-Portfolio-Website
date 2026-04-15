import { useEffect, useRef, useState } from 'react';

const SEQ = [
  { t: 'cmd', s: 'whoami' },
  { t: 'out', s: 'samyak@moon — Backend Software Engineer' },
  { t: 'gap' },
  { t: 'cmd', s: 'cat current-role.json' },
  { t: 'out', s: '{ "company": "PayU Digital Labs", "role": "SWE" }' },
  { t: 'gap' },
  { t: 'cmd', s: 'git log --oneline -4' },
  { t: 'out', s: 'a3b2f1  feat: SecureAuthPro — 10+ enterprise clients' },
  { t: 'out', s: 'd7e9c4  perf: -85% card gen time (10K+ cards/batch)' },
  { t: 'out', s: 'b4f2a8  feat: W2A API with idempotency & concurrency' },
  { t: 'out', s: 'c91e33  fix: -80% security vulns (CSP/CORS/TLS/HSTS)' },
  { t: 'gap' },
  { t: 'cmd', s: 'cat awards.json' },
  { t: 'out', s: '🏆 Extra Mile Award — Card Order Flow @ PayU' },
  { t: 'gap' },
  { t: 'cmd', s: 'printenv TECH_STACK' },
  { t: 'out', s: 'Java · Spring Boot · Redis · Kafka · AWS' },
  { t: 'gap' },
  { t: 'cmd', s: 'echo $STATUS' },
  { t: 'out', s: '✓  Available for new opportunities' },
];

const CMD_SPD   = 60;
const POST_CMD  = 340;
const POST_OUT  = 65;
const LOOP_WAIT = 4000;

function Terminal() {
  const [lines,   setLines]   = useState([]);
  const [idx,     setIdx]     = useState(0);
  const [typed,   setTyped]   = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, typed]);

  useEffect(() => {
    if (idx >= SEQ.length) {
      const t = setTimeout(() => {
        setLines([]);
        setTyped('');
        setIdx(0);
        setCharIdx(0);
      }, LOOP_WAIT);
      return () => clearTimeout(t);
    }

    const line = SEQ[idx];

    if (line.t === 'gap') {
      setLines((l) => [...l, line]);
      setIdx((i) => i + 1);
      return;
    }

    if (line.t === 'out') {
      const t = setTimeout(() => {
        setLines((l) => [...l, line]);
        setIdx((i) => i + 1);
        setCharIdx(0);
      }, POST_OUT);
      return () => clearTimeout(t);
    }

    if (charIdx < line.s.length) {
      const t = setTimeout(() => {
        setTyped(line.s.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, CMD_SPD);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLines((l) => [...l, line]);
      setTyped('');
      setCharIdx(0);
      setIdx((i) => i + 1);
    }, POST_CMD);
    return () => clearTimeout(t);
  }, [idx, charIdx]);

  const cur = idx < SEQ.length ? SEQ[idx] : null;

  return (
    <div className="terminal" role="region" aria-label="Animated developer terminal">
      <div className="terminal__bar" aria-hidden="true">
        <span className="terminal__dot terminal__dot--red"    />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green"  />
        <span className="terminal__title">zsh — samyak@moon</span>
      </div>

      <div className="terminal__body" ref={bodyRef}>
        {lines.map((line, i) =>
          line.t === 'gap' ? (
            <div key={i} className="terminal__gap" />
          ) : line.t === 'cmd' ? (
            <div key={i} className="terminal__line">
              <span className="terminal__prompt">~&nbsp;$&nbsp;</span>
              <span className="terminal__cmd-text">{line.s}</span>
            </div>
          ) : (
            <div key={i} className="terminal__line terminal__line--out">
              <span className="terminal__out-text">{line.s}</span>
            </div>
          )
        )}

        <div className="terminal__line">
          <span className="terminal__prompt">~&nbsp;$&nbsp;</span>
          {cur?.t === 'cmd' && (
            <span className="terminal__cmd-text">{typed}</span>
          )}
          <span className="terminal__cursor" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
