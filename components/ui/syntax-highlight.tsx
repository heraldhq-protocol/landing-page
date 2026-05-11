"use client";

import { Highlight, themes } from "prism-react-renderer";

interface SyntaxHighlightProps {
  code: string;
  language?: string;
}

export function SyntaxHighlight({ code, language = "typescript" }: SyntaxHighlightProps) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trimEnd()} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="p-0 m-0 bg-transparent overflow-x-auto text-[13px] leading-relaxed font-mono">
          <code>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps} style={{ ...lineProps.style, display: "flex", background: "transparent" }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
