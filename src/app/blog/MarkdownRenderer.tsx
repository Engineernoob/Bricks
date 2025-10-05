interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string) => {
    return text
      .split("\n\n")
      .map((paragraph, index) => {
        const trimmed = paragraph.trim();

        // Headers
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={index} className="text-slate-900 mt-8 mb-4 first:mt-0">
              {trimmed.slice(3)}
            </h3>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={index} className="text-slate-900 mt-6 mb-3">
              {trimmed.slice(4)}
            </h4>
          );
        }

        // Blockquotes
        if (trimmed.startsWith("> ")) {
          const lines = trimmed.split("\n");
          const quote = lines[0].slice(2);
          const author = lines
            .find((line) => line.startsWith("> — "))
            ?.slice(4);

          return (
            <blockquote
              key={index}
              className="border-l-4 border-slate-300 pl-6 my-6"
            >
              <p className="italic text-slate-600 mb-2">{quote}</p>
              {author && (
                <footer className="text-sm text-slate-500">— {author}</footer>
              )}
            </blockquote>
          );
        }

        // Lists
        if (trimmed.includes("\n- ")) {
          const items = trimmed.split("\n- ").slice(1);
          return (
            <ul key={index} className="space-y-2 my-4">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span
                    className="text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: item.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-slate-900">$1</strong>',
                      ),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        }

        // Bold text patterns (like "Simple → Complex")
        if (trimmed.includes("**") && trimmed.includes("→")) {
          return (
            <div key={index} className="my-4 space-y-1">
              {trimmed.split("\n").map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className="text-slate-600"
                  dangerouslySetInnerHTML={{
                    __html: line.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-slate-900">$1</strong>',
                    ),
                  }}
                />
              ))}
            </div>
          );
        }

        // Regular paragraphs
        if (trimmed && !trimmed.startsWith("#")) {
          return (
            <p
              key={index}
              className="text-slate-600 leading-relaxed my-4"
              dangerouslySetInnerHTML={{
                __html: trimmed.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-slate-900">$1</strong>',
                ),
              }}
            />
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  return <div className="space-y-4">{parseMarkdown(content)}</div>;
}
