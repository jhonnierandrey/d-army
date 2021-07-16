--write a SQL query to list the names of all people who have directed a movie that received a rating of at least 9.0.
SELECT name FROM people
JOIN directors ON directors.person_id = people.id
JOIN ratings ON directors.movie_id = ratings.movie_id
WHERE rating >= 9.0;