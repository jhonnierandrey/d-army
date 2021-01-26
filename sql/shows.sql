SELECT * FROM Shows;
SELECT * From shows WHERE title = 'Black Mirror';
SELECT title, year FROM shows WHERE title = 'The Office';
SELECT * FROM shows WHERE year > 2020;
SELECT COUNT(*) FROM shows WHERE year > 2020;
SELECT * FROM shows WHERE title LIKE '%Titanic%';
SELECT id FROM shows WHERE title = 'Stranger Things' AND year = 2016;
SELECT genre FROM genres WHERE show_id = 4574334;
SELECT genre FROM genres WHERE show_id =
    (SELECT id FROM shows WHERE title = 'Stranger Things' AND year = 2016);
SELECT * FROM shows WHERE title = 'The Office' ORDER BY episodes;
SELECT * FROM shows WHERE title = 'The Office' ORDER BY episodes DESC;
SELECT * FROM shows WHERE title = 'The Office' ORDER BY episodes DESC LIMIT 1;

-- Activity

SELECT * FROM people WHERE name = 'Jerry Seinfeld'
SELECT COUNT(*) FROM ratings WHERE rating = 10;
SELECT * FROM genres WHERE show_id = (SELECT id FROM shows WHERE title = 'The Crown');
-- SELECT name FROM people WHERE id IN  ...> (SELECT person_id FROM writers WHERE show_id = ...> (SELECT id FROM shows WHERE title = 'Arrested Development'));
-- SELECT title FROM shows WHERE id IN (SELECT show_id FROM stars WHERE person_id = (SELECT id FROM people WHERE name = 'Allison Janney'));

-- Activity 2

SELECT * FROM crime_scene_reports WHERE month = 7 AND day = 28;