import {
  integer,
  json,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(2),
});
export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar(),
  createdBy: varchar().references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
});

export const frameTable = pgTable("frames", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  frameId: varchar(),
  projectId: varchar().references(() => projectsTable.projectId),
  createdOn: timestamp().defaultNow(),
});

export const chatTable = pgTable("chats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chatMessage: json(),
  createdBy: varchar().references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
});
