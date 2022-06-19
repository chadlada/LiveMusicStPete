-- Ensure we truncate the table and restart the identity so our Id column starts at 1 each time
TRUNCATE TABLE "Venues", "Reviews", "Users" RESTART IDENTITY;

-- Ensure we have a user to associate to the reviews below
INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Sarah', 'sarah@suncoast.io', 'xxxxx');
INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Mary', 'mary@suncoast.io', 'xxxxx');

INSERT INTO "Venues" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Rubys Elixir', 'Vintage-style bar with nightly live jazz, blues & soul, plus classic cocktails & outdoor seating.', ' 15 3rd St N, St. Petersburg, FL 33701', '(727) 898-7829', 1);
INSERT INTO "Venues" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Janus Live', 'Jannus Live is an outdoor music venue in St. Petersburg, Florida. Located in the Downtown St. Petersburg Historic District, the courtyard venue has hosted numerous concerts for local and mainstream artists.', '200 1st Ave N STE 206, St. Petersburg, FL 33701', '(727) 565-0550', 1);
INSERT INTO "Venues" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('Floridian Social Club', 'Live music, cabaret & cocktails draw the crowds at this glam late-night bar that features VIP areas.', '687 Central Ave N, St. Petersburg, FL 33701', '(727) 322-4600', 1);
INSERT INTO "Venues" ("Name", "Description", "Address", "Telephone", "UserId") VALUES ('The Ale and the Witch', 'Dozens of domestic craft brews plus live original music nightly & local artists', '111 2nd Ave NE, St. Petersburg, FL 33701', '(727) 821-2533', 1);

INSERT INTO "Reviews" ("VenueId", "CreatedAt", "Summary", "Body", "UserId") VALUES (1, '2020-01-01 14:23:55', 'Best music', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 1);
INSERT INTO "Reviews" ("VenueId", "CreatedAt", "Summary", "Body", "UserId") VALUES (1, '2020-01-01 18:23:55', 'That music slaps hard!', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima modi impedit quisquam sit, saepe enim placeat a vero voluptas asperiores atque laudantium in, nobis sunt blanditiis dignissimos. Deleniti, esse optio!', 1);

-- psql --file=Models/exampledata.sql LiveMusicStPeteDatabase