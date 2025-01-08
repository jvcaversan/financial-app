import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  balance: integer("balance").notNull(),
});

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: integer("amount").notNull(),
  type: text("type", { enum: ["incomes", "expenses"] }).notNull(),
  description: text("description").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const schema = {
  users,
  transactions,
};
