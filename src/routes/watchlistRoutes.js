import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../controller/watchlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  addToWatchlistSchema,
  removeFromWatchlistSchema,
  updateWatchlistItemSchema,
} from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/add-to-watchlist",
  validateRequest(addToWatchlistSchema),
  addToWatchlist
);

router.put(
  "/update-to-watchlist",
  validateRequest(updateWatchlistItemSchema),
  updateWatchlistItem
);

router.delete(
  "/remove-from-watchlist",
  validateRequest(removeFromWatchlistSchema),
  removeFromWatchlist
);

export default router;
