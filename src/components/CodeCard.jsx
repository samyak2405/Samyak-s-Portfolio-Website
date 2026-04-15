/**
 * Decorative floating code snippet card — visible on wide screens only.
 * Positioned absolutely in the hero, gently bobs up/down via CSS animation.
 */
function CodeCard() {
  return (
    <div className="code-card" aria-hidden="true">
      <div className="code-card__bar">
        <span className="terminal__dot terminal__dot--red"    />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green"  />
        <span className="code-card__filename">samyak.config.js</span>
      </div>
      <pre className="code-card__body">
        <code>
          <span className="cc-comment">{'// portfolio config'}</span>{'\n'}
          <span className="cc-kw">export default</span>{' {\n'}
          {'  '}<span className="cc-key">name</span>
          <span className="cc-punc">: </span>
          <span className="cc-str">&quot;Samyak Moon&quot;</span>
          <span className="cc-punc">,</span>{'\n'}
          {'  '}<span className="cc-key">role</span>
          <span className="cc-punc">: </span>
          <span className="cc-str">&quot;Software Engineer&quot;</span>
          <span className="cc-punc">,</span>{'\n'}
          {'  '}<span className="cc-key">company</span>
          <span className="cc-punc">: </span>
          <span className="cc-str">&quot;PayU&quot;</span>
          <span className="cc-punc">,</span>{'\n'}
          {'  '}<span className="cc-key">stack</span>
          <span className="cc-punc">: [</span>
          <span className="cc-str">&quot;Java&quot;</span>
          <span className="cc-punc">, </span>
          <span className="cc-str">&quot;React&quot;</span>
          <span className="cc-punc">, </span>
          <span className="cc-str">&quot;AWS&quot;</span>
          <span className="cc-punc">],</span>{'\n'}
          {'  '}<span className="cc-key">status</span>
          <span className="cc-punc">: </span>
          <span className="cc-str">&quot;available ✓&quot;</span>
          <span className="cc-punc">,</span>{'\n'}
          {'};'}
        </code>
      </pre>
    </div>
  );
}

export default CodeCard;
