import { Context } from "https://edge.netlify.com";
import { HTMLRewriter } from "https://raw.githubusercontent.com/worker-tools/html-rewriter/master/index.ts";

export default async (request: Request, context: Context) => {
  const next = await context.next();
  let config: Record<string, string> = {};
  let buffer = "";
  return new HTMLRewriter()
    .on("#edge-config", {
      text(scriptText) {
        buffer += scriptText.text;
        if (scriptText.lastInTextNode) {
          config = JSON.parse(buffer);
        }
      },
    })
    .on("body", {
      element(bodyEl) {
        bodyEl.setAttribute(
          "class",
          ["experiment-grey-bkg-bucket-a", config.bodyClass].join(" ")
        );
        console.log({ config });
      },
    })
    .transform(next);
};

export const config = { path: "/" };
