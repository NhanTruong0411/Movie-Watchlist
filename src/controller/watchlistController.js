import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body || {};
  const userId = req.user.id;

  if (!movieId || !userId) {
    return res.status(400).json({ error: "Missing movieId or userId" });
  }

  // Verify movie exists
  const movie = await prisma.orm.public.Movie.where({ id: movieId }).first();
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if already in watchlist
  const existingWatchlist = await prisma.orm.public.WatchlistItem.where({
    userId,
    movieId,
  }).first();
  if (existingWatchlist) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  // Create watchlist
  const watchlist = await prisma.orm.public.WatchlistItem.create({
    userId,
    movieId,
    status: status || "PLANNED",
    rating: rating ?? null,
    notes: notes ?? null,
  });

  res.status(201).json({
    status: "success",
    message: "Movie added to watchlist",
    watchlist,
  });
};

const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.body || {};
  const userId = req.user.id;

  if (!movieId) {
    return res.status(401).json({ error: "Missing movieId" });
  } else if (!userId) {
    return res.status(401).json({ error: "Unauthorized, user not found" });
  }

  // Verify movie exists
  const movie = await prisma.orm.public.Movie.where({ id: movieId }).first();
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if in watchlist
  const existingWatchlist = await prisma.orm.public.WatchlistItem.where({
    userId,
    movieId,
  }).first();
  if (!existingWatchlist) {
    return res.status(400).json({ error: "Movie not in watchlist" });
  }

  // Remove from watchlist
  await prisma.orm.public.WatchlistItem.where({
    id: existingWatchlist.id,
    userId,
  }).delete();

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body || {};
  const userId = req.user.id;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.orm.public.WatchlistItem.where({
    userId,
    movieId,
  }).first();
  if (!watchlistItem) {
    return res.status(400).json({ error: "Watchlist item not found" });
  }

  // Ensure only the owner can update the watchlist item
  if (watchlistItem.userId !== userId) {
    return res.status(403).json({
      error: "Unauthorized, you are not the owner of this watchlist item",
    });
  }

  // Update watchlist item
  const updateData = {};
  if (status !== undefined) {
    updateData.status = status.toUpperCase();
  }
  if (rating !== undefined) {
    updateData.rating = rating;
  }
  if (notes !== undefined) {
    updateData.notes = notes;
  }

  // Update watchlist item
  const updatedWatchlistItem = await prisma.orm.public.WatchlistItem.update({
    where: { id: watchlistItem.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    message: "Watchlist item updated",
    data: updateData,
  });
};

export default { addToWatchlist, removeFromWatchlist, updateWatchlistItem };
