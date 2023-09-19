import { Context } from "https://edge.netlify.com";
import { HTMLRewriter } from "https://raw.githubusercontent.com/worker-tools/html-rewriter/master/index.ts";

type Experiment = {
  slug: string;
};

type CampaignsConfig = {
  campaigns: { id: string; trafficAmount: number; experiments: Experiment[] }[];
};
export default async (request: Request, context: Context) => {
  const next = await context.next();
  let config: CampaignsConfig = { campaigns: [] };
  let buffer = "";

  Array(10)
    .fill()
    .map((_, index) => {
      const name = `edge-campaign-${index}`;
      console.log({ name });
      const isSet = context.cookies.get(name);

      console.log({ index, isSet });

      if (!isSet) {
        context.cookies.set({
          name,
          value: Math.random(),
        });
      }
    });

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
        try {
          const experimentSlugs = config?.campaigns
            ?.filter(({ id, trafficAmount }, index) => {
              const name = `edge-campaign-${index}`;
              const probability = parseFloat(context.cookies.get(name));

              console.log({ probability });

              const isOn = probability > trafficAmount / 100;

              console.log("BUCKET", isOn);

              return isOn;
            })
            .map((campaign) => {
              return campaign.experiments.map(
                ({ slug }) => `edge-experiment-${slug}`
              );
            })
            .flat()
            .join(" ");

          console.log({ experimentSlugs });

          bodyEl.setAttribute("class", experimentSlugs);

          console.log("EDGE CONFIG", JSON.stringify(config, null, 2));
        } catch (error) {
          console.log("ERROR");
          console.log(error);
        }
      },
    })
    .transform(next);
};

export const config = { path: "/" };
