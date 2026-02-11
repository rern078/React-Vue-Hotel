-- Seed rooms (run once after schema)
INSERT INTO rooms (name, type, price, capacity, amenities, image, available)
VALUES
  ('Ocean View Suite', 'suite', 299, 4, '["balcony", "minibar", "sea view"]', '/rooms/1.jpg', 1),
  ('Standard Double', 'double', 129, 2, '["wifi", "tv"]', '/rooms/2.jpg', 1),
  ('Family Room', 'family', 189, 5, '["wifi", "tv", "extra bed"]', '/rooms/3.jpg', 1),
  ('Deluxe King', 'deluxe', 219, 3, '["wifi", "tv", "minibar", "bathtub"]', '/rooms/4.jpg', 1),
  ('Economy Single', 'single', 79, 1, '["wifi"]', '/rooms/5.jpg', 1);
