-- Keep a log of any SQL queries you execute as you solve the mystery.

-- check the crime_scene_reports table
SELECT * FROM crime_scene_reports;

-- Check interviews 
SELECT * FROM interviews LIMIT;

-- Start cleaning the suspects
SELECT * FROM interviews WHERE month = 7 AND day = 28 AND transcript LIKE '%courthouse%';

-- Get license_plate withing the time frames.
SELECT license_plate FROM courthouse_security_logs WHERE year = 2020 AND month = 7 AND day = 28 AND hour = 10 and minute >= 15 AND minute <= 25 AND activity = 'exit';

-- Get owners from the licence_plates
SELECT name FROM people WHERE license_plate IN
    (SELECT license_plate FROM courthouse_security_logs
    WHERE year = 2020 AND month = 7 AND day = 28
    AND hour = 10 AND minute >= 15 AND minute <= 25 AND activity = 'exit');
-- Patrick
-- Amber
-- Elizabeth
-- Roger
-- Danielle
-- Russell
-- Evelyn
-- Ernest

-- Get passports numbers
SELECT passport_number FROM people WHERE license_plate IN
    (SELECT license_plate FROM courthouse_security_logs
    WHERE year = 2020 AND month = 7 AND day = 28
    AND hour = 10 and minute >= 15 AND minute <= 25 AND activity = 'exit');
