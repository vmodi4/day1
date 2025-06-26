
import { pgTable, serial, text, timestamp, date, varchar } from "drizzle-orm/pg-core";
import { title } from "process";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const eventTable = pgTable("events", {
  id: serial("id").primaryKey(),
  name:  varchar("name", {length: 100}).notNull(),
  description: text("description").notNull(),
  subtitle: text("subtitle").notNull(),
  event_date: date("event_date").notNull(),
  start_datetime: date("start_datetime").notNull(),
  end_datetime: date("end_datetime").notNull(),
  price: text("price").notNull(),
  image_url_2: text("image_url_2").notNull(),


}); 

// import eventTable from the"../data/db.ts" 

