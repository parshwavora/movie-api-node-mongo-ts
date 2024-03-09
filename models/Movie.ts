import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: Number,
  streamingLink: String,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;