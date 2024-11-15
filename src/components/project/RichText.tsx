import React from "react";
import Markdoc from "@markdoc/markdoc";

const RichText = ({ source }: { source: string }) => {
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast /* config */);

  const html = Markdoc.renderers.react(content, React);

  return (
    <div className="prose prose-headings:h-fit prose-headings:my-3  prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-headings:manrope m-0">
      {html}
    </div>
  );
};

export default RichText;
