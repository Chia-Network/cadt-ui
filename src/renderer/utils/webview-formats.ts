export const formatDocType = (currentWebview) => {
  formatNonHtmlContent(currentWebview);
  maybeFormatJsonContent(currentWebview);
  maybeFormatMarkdown(currentWebview);
  maybeFormatXml(currentWebview);
};

const formatNonHtmlContent = (currentWebview) => {
 const script = `
    if (document.contentType && !['text/html', 'application/xml'].includes(document.contentType)) {
      try {
        const css = \`
          html {
            background-color: #f0f0f0;
            color: #333;
            padding: 5px;
          }

          body {
            color: #333;
            padding: 10px;
          }
        \`;

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);
      } catch (e) {
        alert(e);
      }
    }
  `;
 currentWebview?.executeJavaScript(script);
}

const maybeFormatMarkdown = (currentWebview) => {
  const script = `
    if (document.contentType && document.contentType === 'text/markdown') {
      try {
        // Dynamically load the 'marked' library
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = () => {
          setTimeout(() => {
            fetch(location.href)
            .then(response => response.text())
            .then(markdown => {
              // Use 'marked' to render Markdown
              const html = marked.marked(markdown);
              document.body.innerHTML = html;
            })
            .catch(error => alert(error));
          }, 1000);
        
        };

        document.head.appendChild(script);
      } catch (e) {
        alert('Error parsing JSON:', e);
      }
    }
  `;
  currentWebview?.executeJavaScript(script);
};

const maybeFormatJsonContent = (currentWebview) => {
  const script = `
    if (document.contentType && document.contentType === 'application/json') {
      try {
        const json = JSON.parse(document.body.textContent);

        function syntaxHighlight(json) {
          json = JSON.stringify(json, undefined, 2);
          json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          });
        }

        const css = \`
          
          pre {
            font-family: 'Courier New', Courier, monospace;
          }

          .key {
            color: green;
          }

          .string {
            color: black;
          }

          .number {
            color: darkorange;
          }

          .boolean {
            color: red;
          }

          .null {
            color: magenta;
          }
        \`;

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);

        document.body.innerHTML = '<pre style="padding: 10px;">' + syntaxHighlight(json) + '</pre>';
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }
  `;

  currentWebview?.executeJavaScript(script);
};

const maybeFormatXml = (currentWebview) => {
  const style = `
    body { background-color: #f0f0f0; color: #333; }
    pre { white-space: pre-wrap; }
  `;

  currentWebview.insertCSS(style);
};
