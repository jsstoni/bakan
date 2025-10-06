import { user } from '@/server/models/user';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const subscription = pgTable('subscription', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  customerId: text('customer_id').notNull(),
  priceId: text('price_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .notNull(),
});

export const usersRelations = relations(subscription, ({ one }) => ({
  subscriber: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}));
