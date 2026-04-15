import { useEffect, useRef, useState } from 'react';

const SEQ = [
  { t: 'cmd', s: 'whoami' },
  { t: 'out', s: 'samyak@moon — Software Engineer' },
  { t: 'gap' },
  { t: 'cmd', s: 'cat current-role.json' },
  { t: 'out', s: '{ "company": "PayU", "team": "Prepaid" }' },
  { t: 'gap' },
  { t: 'cmd', s: 'git log --oneline -3' },
  { t: 'out', s: 'a3b2f1  feat: card ordering — 10K+ cards/batch' },
  { t: 'out', s: 'd7e9c4  perf: +25% throughput via multithreading' },
  { t: 'out', s: 'b4f2a8  feat: customer segmentation microservice' },
  { t: 'gap' },
  { t: 'cmd', s: 'printenv TECH_STACK' },
  { t: 'out', s: 'Java · Spring Boot · React · Kafka · AWS' },
  { t: 'gap' },
  { t: 'cmd', s: 'echo $STATUS' },
  { t: 'out', s: '✓  Available for new opportunities' },
];

const CMD_SPD   = 62;   // ms per character (cmd typing)
const POST_CMD  = 360;  // pause after command fully typed
const POST_OUT  = 70;   // pause between output lines
const LOOP_WAIT = 3600; // pause before loop restart

/**
 * Animated macOS-style terminal cycling through Samyak's real experience.
 */
function Terminal() {
  const [lines,   setLines]   = useState([]);
  const [idx,     setIdx]     = useState(0);
  const [typed,   setTyped]   = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const bodyRef = useRef(null);

  // Auto-scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, typed]);

  useEffect(() => {
    // All lines done — reset after pause
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

    // Gap: commit immediately
    if (line.t === 'gap') {
      setLines((l) => [...l, line]);
      setIdx((i) => i + 1);
      return;
    }

    // Output line: short delay then commit
    if (line.t === 'out') {
      const t = setTimeout(() => {
        setLines((l) => [...l, line]);
        setIdx((i) => i + 1);
        setCharIdx(0);
      }, POST_OUT);
      return () => clearTimeout(t);
    }

    // Command: type character by character
    if (charIdx < line.s.length) {
      const t = setTimeout(() => {
        setTyped(line.s.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, CMD_SPD);
      return () => clearTimeout(t);
    }

    // Command fully typed — pause, then commit
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
      {/* macOS title bar */}
      <div className="terminal__bar" aria-hidden="true">
        <span className="terminal__dot terminal__dot--red"    />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green"  />
        <span className="terminal__title">zsh — samyak@moon</span>
      </div>

      {/* Body */}
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

        {/* Currently typing line */}
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
