describe('searchMoviesByTitle', () => {
    it('should return movies with matching title', async () => {
       const movies = [{title:""}] ;//await searchMoviesByTitle('Movie Title');
      expect(movies.length).toBeGreaterThan(0);
      expect(movies[0]?.title).toContain('Movie Title');
    });
  });