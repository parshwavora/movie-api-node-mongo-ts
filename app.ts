import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getAsync, setAsync } from './cache';
import movieRoutes from './routes/movies';
import Movie from './models/Movie'; 

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/movies', movieRoutes);

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const cacheKey = `search:${query}`;

  // Check if the search results are in the cache
  const cachedResults = await getAsync(cacheKey);
  if (cachedResults) {
    res.json(JSON.parse(cachedResults));
    return;
  }

  // Otherwise, fetch the search results from the API
  const movies = await Movie.find({ $or: [{ title: query }, { genre: query }] });

  // Cache the search results for 5 minutes
  await setAsync(cacheKey, JSON.stringify(movies), 'EX', 5 * 60);

  res.json(movies);
});
const connectUrl = process.env.MONGO_URI || " ";
mongoose.connect(connectUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });