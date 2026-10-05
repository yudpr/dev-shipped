import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  json,
  uniqueIndex,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

// ============= PROJECTS =============
export const statusEnum = pgEnum("approval_status", ["pending", "approved", "rejected"]);

export const projects = pgTable(
  "projects",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    // Core project info
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull(),
    tagline: varchar("tagline", { length: 200 }),
    description: text("description"),

    // Links & media
    websiteUrl: text("website_url"),
    tags: json("tags").$type<string[]>(), // e.g. ["AI", "Productivity"]

    // Voting
    voteCount: integer("vote_count").notNull().default(0),

    // Metadata
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    status: statusEnum("status").default("pending").notNull(), 
    submittedBy: varchar("submitted_by", { length: 120 }).default("anonymous"),
    userId: varchar("user_id", { length: 255 }), // Clerk user ID

    // Organization reference (for backend queries only)
    organizationId: varchar("organization_id", { length: 255 }), // Clerk org ID
  },
  (table) => [
    uniqueIndex("projects_slug_idx").on(table.slug),
    index("projects_status_idx").on(table.status),
    index("projects_organization_idx").on(table.organizationId),
  ]
);

// ============= VOTES =============
export const voteTypeEnum = pgEnum('vote_type', ['up', 'down']);

export const votes = pgTable('votes', {
  id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
  
  // Connects the vote to your projects table
  projectId: integer('project_id')
    .references(() => projects.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id').notNull(),
  voteType: voteTypeEnum('vote_type').notNull(), 
}, 
  (table) => [
    // This unique constraint makes it physically impossible for a single user 
    // to have more than one active vote row on a specific project.
    uniqueIndex('user_project_unique_idx').on(table.userId, table.projectId)
  ]
);
