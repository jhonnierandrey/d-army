--write a SQL query to determine the number of movies with an IMDb rating of 10.0
SELECT COUNT(title) + 1 FROM movies WHERE id = ( SELECT movie_id FROM ratings WHERE rating = 10.0);
SELECT COUNT(*) FROM ratings WHERE rating = 10.0;