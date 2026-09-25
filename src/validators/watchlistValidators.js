import { z } from "zod";

export const addToWatchlistSchema = z.object({
  movieId: z.string().min(1),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      message:
        "Status is required and must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
    })
    .optional(),
  rating: z
    .number({ message: "Rating must be a number" })
    .min(0, { message: "Rating must be between 0 and 10" })
    .max(10, { message: "Rating must be between 0 and 10" })
    .optional(),
  notes: z.string({ message: "Notes must be a string" }).optional(),
});

export const removeFromWatchlistSchema = z.object({
  movieId: z.string().min(1),
});

export const updateWatchlistItemSchema = z.object({
  movieId: z.string().min(1),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      message:
        "Status is required and must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
    })
    .optional(),
  rating: z
    .number({ message: "Rating must be a number" })
    .min(0, { message: "Rating must be between 0 and 10" })
    .max(10, { message: "Rating must be between 0 and 10" })
    .optional(),
  notes: z.string().optional(),
});

