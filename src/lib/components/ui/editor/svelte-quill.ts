import Quill from "quill";

export function quill(node, options = {}) {
  const quill = new Quill(node, {
    modules: {
      toolbar: [
        ["bold", { 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],
      ]
    },
    formats: ['bold', 'list'],
    syntax: true,
    placeholder: "Type something...",
    theme: "snow",
    ...options
  });
  const container = node.getElementsByClassName("ql-editor")[0];

  quill.on("text-change", function(delta, oldDelta, source) {
    node.dispatchEvent(
      new CustomEvent("text-change", {
        detail: {
          html: container.innerHTML,
          text: quill.getText()
        }
      })
    );
  });
}
