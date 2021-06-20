-- write a SQL query that returns the average energy of all the songs.
SELECT SUM(energy) / COUNT(energy) FROM songs;