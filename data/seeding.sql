
BEGIN;

TRUNCATE TABLE "list", "card", "tag", "card_has_tag" RESTART IDENTITY CASCADE;

INSERT INTO "list" ("name", "position") VALUES
('liste 1', 0),
('liste 2', 1);

INSERT INTO "card" ("title", "position", "color", "list_id") VALUES
('Carte 1', 0, '#f17950', 1),
('Carte 2', 1,'#ffcade', 1),
('Carte 3', 0,'#d2c04b', 2),
('Carte 4', 1,'#ddf3c2', 2);

INSERT INTO "tag" ("name", "color") VALUES
('urgent', '#ff3e6f'),
('reminder', '#00f4ff'),
('done', '#dcff00');

INSERT INTO "card_has_tag" ("card_id", "tag_id") VALUES
(1,1),
(1,2),
(2,3),
(3,2),
(4,1);

COMMIT;