import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { projects } from "./schema";
import { allProjects } from "./data";

config({ path: ".env.local" })

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(projects);
  console.log("✅ Cleared existing data");

  // Insert projects from data.ts
  for (const project of allProjects) {
    await db.insert(projects).values({
      name: project.name,
      slug: project.slug,
      tagline: project.tagline,
      description: project.description,
      websiteUrl: project.websiteUrl,
      tags: project.tags,
      voteCount: project.voteCount || 0,
      createdAt: project.createdAt,
      approvedAt: project.approvedAt,
      status: project.status,
      submittedBy: project.submittedBy,
    });

    console.log(
      `✅ Added project: ${project.name} (${project.voteCount || 0} votes)`
    );
  }

  // Verify inserted projects
  const insertedProjects = await db.select().from(projects);
  console.log(`\n🎉 Successfully seeded ${insertedProjects.length} projects!`);

  console.log("\n📦 Projects in database:");
  insertedProjects.forEach((project) => {
    console.log(
      `  - ${project.name} (${project.slug}) - ${project.voteCount} votes`
    );
  });
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("\n✨ Seeding complete!");
    process.exit(0);
  });