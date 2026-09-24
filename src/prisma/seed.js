import { prisma, connectDB, disconnectDB } from "../config/db.js";

const creatorId = "a40de765-1a9a-4be3-8bcf-21d08447989d";

const movie = (title, overview, releaseYear, runtime) => ({
  title,
  overview,
  releaseYear,
  genre: ["Science Fiction"],
  runtime,
  posterUrl:
    "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGc@._V1_SX300.jpg",
  createBy: creatorId,
});

const movies = [
  movie(
    "The Matrix",
    "A computer hacker learns about the true nature of his reality and is drawn into a rebellion against powerful artificial intelligence.",
    1999,
    136,
  ),
  movie(
    "The Matrix Reloaded",
    "The Matrix Reloaded is a 2003 science fiction action film that is the second installment in The Matrix franchise. It is a sequel to The Matrix and was directed by Larry and Andy Wachowski.",
    2003,
    129,
  ),
  movie(
    "The Matrix Revolutions",
    "The Matrix Revolutions is a 2003 science fiction action film that is the third installment in The Matrix franchise. It is a sequel to The Matrix Reloaded and was directed by Larry and Andy Wachowski.",
    2003,
    129,
  ),
  movie(
    "The Matrix Resurrections",
    "The Matrix Resurrections is a 2021 science fiction action film that is the fourth installment in The Matrix franchise. It is a sequel to The Matrix Revolutions and was directed by Larry and Andy Wachowski.",
    2021,
    129,
  ),
  movie(
    "The Matrix Resurrections",
    "The Matrix Resurrections is a 2021 science fiction action film that is the fourth installment in The Matrix franchise. It is a sequel to The Matrix Revolutions and was directed by Larry and Andy Wachowski.",
    2021,
    129,
  ),
  movie(
    "The Matrix Resurrections",
    "The Matrix Resurrections is a 2021 science fiction action film that is the fourth installment in The Matrix franchise. It is a sequel to The Matrix Revolutions and was directed by Larry and Andy Wachowski.",
    2021,
    129,
  ),
  movie(
    "The Matrix Resurrections",
    "The Matrix Resurrections is a 2021 science fiction action film that is the fourth installment in The Matrix franchise. It is a sequel to The Matrix Revolutions and was directed by Larry and Andy Wachowski.",
    2021,
    129,
  ),
  movie(
    "The Matrix Resurrections",
    "The Matrix Resurrections is a 2021 science fiction action film that is the fourth installment in The Matrix franchise. It is a sequel to The Matrix Revolutions and was directed by Larry and Andy Wachowski.",
    2021,
    129,
  ),
  movie(
    "The Matrix Resurrections",
    "The Matrix Resurrections is a 2021 science fiction action film that is the fourth installment in The Matrix franchise. It is a sequel to The Matrix Revolutions and was directed by Larry and Andy Wachowski.",
    2021,
    129,
  ),
];

const main = async () => {
  await connectDB();

  const created = await prisma.orm.public.Movie.createAll(movies);

  console.log(`Seeded ${created.length} movies`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDB();
  });
