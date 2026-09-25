import express from "express";
import watchlistController from "../controller/watchlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/add-to-watchlist", watchlistController.addToWatchlist);
router.delete(
  "/remove-from-watchlist",
  watchlistController.removeFromWatchlist
);

export default router;
