const { createClient } = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
const fs = require("fs");

async function run() {
  const configPath = "C:\\Users\\USER\\.config\\sanity\\config.json";
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const token = config.authToken;

  const client = createClient({
    projectId: "4y6hfnze",
    dataset: "production",
    apiVersion: "2026-07-03",
    token,
    useCdn: false
  });

  const builder = imageUrlBuilder(client);

  const page = await client.fetch(`*[_type == "page" && (slug.current == "homepage" || _id == "home")][0]`);
  const hero = page.sections.find(s => s._type === "heroSection");
  console.log("bgImage object:", JSON.stringify(hero.bgImage, null, 2));
  try {
    const resolvedUrl = builder.image(hero.bgImage).url();
    console.log("bgImageUrl resolved:", resolvedUrl);
  } catch (err) {
    console.error("Resolution failed:", err.message);
  }
}

run().catch(console.error);
