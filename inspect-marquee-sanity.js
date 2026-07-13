const { createClient } = require("@sanity/client");
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

  console.log("Querying brandMarqueeSection documents...");
  const sections = await client.fetch(`*[_type == "brandMarqueeSection"] {
    _id,
    title,
    brands[]-> { _id, title, slug }
  }`);
  console.log("Marquee Sections:");
  console.log(JSON.stringify(sections, null, 2));

  console.log("\nQuerying homepage pageBuilder sections...");
  const homepage = await client.fetch(`*[_type == "page" && (slug.current == "home" || slug.current == "index" || _id == "home")][0] {
    _id,
    title,
    pageBuilder[] {
      _type,
      _key,
      brands[]-> { _id, title }
    }
  }`);
  console.log("Homepage Structure:");
  console.log(JSON.stringify(homepage, null, 2));
}

run().catch(console.error);
