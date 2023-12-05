const TypeScriptCoursePage = () => {
  return (
    <div>
      <div className="mb-4 bg-rose-400 border border-rose-500 rounded p-4">
        I decided to write up a course about TypeScript. This page is currently
        under active development.
      </div>
      <ul className="list-disc ml-4">
        <li className="ml-4">Prerequisites</li>
        <li className="ml-4">
          Why TypeScript exists
          <ul className="list-disc ml-4">
            <li className="ml-4">
              Failing JavaScript example
              <ul className="list-disc ml-4">
                <li className="ml-4">TODO: Write out some code</li>
                <li className="ml-4">
                  <code>
                    Uncaught TypeError: Cannot read properties of undefined
                    (reading &#39;length&#39;)
                  </code>
                </li>
              </ul>
            </li>
            <li className="ml-4">
              How TypeScript solves this
              <ul className="list-disc ml-4">
                <li className="ml-4">
                  Basic types, maybe just for function arguments
                </li>
              </ul>
            </li>
            <li className="ml-4">
              <a href="https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html">
                https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
              </a>
            </li>
          </ul>
        </li>
        <li className="ml-4">
          What is TypeScript
          <ul className="list-disc ml-4">
            <li className="ml-4">How much info here?</li>
            <li className="ml-4">
              Difference/Similarities of TypeScript &amp; JavaScript
            </li>
            <li className="ml-4">
              &quot;
              <strong>
                TypeScript is JavaScript’s runtime with a compile-time type
                checker
              </strong>
              .&quot;
            </li>
            <li className="ml-4">Built by Microsoft</li>
            <li className="ml-4">Open Source</li>
            <li className="ml-4">RFCs</li>
          </ul>
        </li>
        <li className="ml-4">
          How to run TypeScript
          <ul className="list-disc ml-4">
            <li className="ml-4">TSPlayground</li>
            <li className="ml-4">Local Example</li>
          </ul>
        </li>
        <li className="ml-4">Why this course exists</li>
      </ul>
    </div>
  )
}

export default TypeScriptCoursePage
