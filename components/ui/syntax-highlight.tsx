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
              const { key: _lk, style: lineStyle, ...lineProps } = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps} style={{ ...lineStyle, display: "flex", background: "transparent" }}>
                  {line.map((token, key) => {
                    const { key: _tk, ...tokenProps } = getTokenProps({ token, key });
                    return <span key={key} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
