import { EventType } from 'types/events.types';
import { z } from 'zod';

export const capacityLimits: Record<EventType, { min?: number; max?: number }> = {
  [EventType.reef]: { max: 300 },
  [EventType.grandOpenParty]: { max: 1500 },
  [EventType.festival]: { min: 20000, max: 200000 },
  [EventType.concert]: { max: 80000 },
};

export const EventSchema = z
  .object({
    id: z.string().optional(), // if we are on create mod, no need of id
    eventType: z.nativeEnum(EventType),
    venue: z.string().min(1, 'Venue is required').default(''),
    location: z.string().min(1, 'Location is required').default(''),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format yyyy-mm-dd')
      .default(''),
    capacity: z.number().min(1, 'Capacity must be more than 0'),
  })
  .refine(
    (data) => {
      if (!data.eventType || !data.capacity) return true;

      const limits = capacityLimits[data.eventType];

      if (limits.min !== undefined && data.capacity < limits.min) return false;
      if (limits.max !== undefined && data.capacity > limits.max) return false;

      return true;
    },
    (data) => {
      const limits = capacityLimits[data.eventType];
      let errorMsg = `Invalid capacity for the selected event type.`;

      if (limits.min !== undefined && limits.max !== undefined) {
        errorMsg += ` Allowed range: ${limits.min} - ${limits.max}.`;
      } else if (limits.min !== undefined) {
        errorMsg += ` Minimum capacity: ${limits.min}.`;
      } else if (limits.max !== undefined) {
        errorMsg += ` Maximum capacity: ${limits.max}.`;
      }

      return {
        message: errorMsg,
        path: ['capacity'],
      };
    },
  );

export type EventFormData = z.infer<typeof EventSchema>;
