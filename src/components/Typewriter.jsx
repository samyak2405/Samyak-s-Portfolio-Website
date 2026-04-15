import { useEffect, useRef, useState } from 'react';

/**
 * Cycles through an array of phrases with a typewriter + delete effect.
 * Accepts either `text` (single string, backwards-compatible) or `phrases` array.
 */
function Typewriter({ text, phrases, speed = 60, pause = 2200 }) {
  const list = phrases ?? (text ? [text] : ['Developer']);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [output, setOutput]       = useState('');
  const [deleting, setDeleting]   = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const current = list[phraseIdx];

    // Full phrase typed — pause, then delete
    if (!deleting && output === current) {
      if (list.length === 1) return; // single phrase: no delete cycle
      timer.current = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer.current);
    }

    // Fully deleted — advance to next phrase
    if (deleting && output === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % list.length);
      return;
    }

    const delay = deleting ? speed * 0.45 : speed;
    timer.current = setTimeout(() => {
      setOutput(deleting
        ? (o) => o.slice(0, -1)
        : current.slice(0, output.length + 1)
      );
    }, delay);

    return () => clearTimeout(timer.current);
  }, [output, deleting, phraseIdx, list, speed, pause]);

  return (
    <span className="typewriter">
      {output}
      <span className="typewriter__caret" aria-hidden="true">|</span>
    </span>
  );
}

export default Typewriter;
