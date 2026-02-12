-- Seed data (run once after schema when rooms table is empty)

-- Hotels (10 items)
INSERT INTO hotels (hotel_code, hotel_name, address, postcode, city, country, num_rooms, phone_no, star_rating) VALUES
('HLT01', 'Grand Plaza Hotel', '1 Central Avenue', 'SW1A 1AA', 'London', 'United Kingdom', 50, '+44 20 7946 0958', 4.5),
('HLT02', 'Riverside Inn', '25 Thames Quay', 'EC4R 3AB', 'London', 'United Kingdom', 80, '+44 20 7123 4567', 4.0),
('HLT03', 'Paris Étoile', '12 Avenue des Champs-Élysées', '75008', 'Paris', 'France', 120, '+33 1 47 23 45 67', 5.0),
('HLT04', 'Harbour View Suites', '88 Circular Quay', '2000', 'Sydney', 'Australia', 65, '+61 2 9251 2345', 4.5),
('HLT05', 'Manhattan Central', '350 Fifth Avenue', '10118', 'New York', 'USA', 200, '+1 212 555 0100', 4.0),
('HLT06', 'Shibuya Grand', '2-24-12 Dogenzaka', '150-0043', 'Tokyo', 'Japan', 95, '+81 3 3463 1111', 4.5),
('HLT07', 'Berlin Mitte Hotel', 'Unter den Linden 77', '10117', 'Berlin', 'Germany', 110, '+49 30 238 9000', 4.0),
('HLT08', 'Dubai Sky Resort', 'Sheikh Zayed Road', '00000', 'Dubai', 'UAE', 180, '+971 4 501 1111', 5.0),
('HLT09', 'Singapore Orchid', '1 Orchard Road', '238824', 'Singapore', 'Singapore', 75, '+65 6733 8888', 4.5),
('HLT10', 'Barcelona Sea Front', 'Passeig de Gràcia 92', '08008', 'Barcelona', 'Spain', 88, '+34 93 492 2222', 4.0);

-- Room types
INSERT INTO room_types (type_name, description, price, max_person) VALUES
('Suite', 'Spacious suite with premium amenities', 299.00, 4),
('Double', 'Standard double room', 129.00, 2),
('Family', 'Family room with extra beds', 189.00, 5),
('Deluxe', 'Deluxe room with minibar', 219.00, 3),
('Single', 'Economy single room', 79.00, 1);

-- Rooms (hotel_id = 1)
INSERT INTO rooms (name, room_type_id, price, capacity, amenities, image, available, hotel_id) VALUES
('Ocean View Suite', 1, 299, 4, '["balcony", "minibar", "sea view"]', '/rooms/1.jpg', 1, 1),
('Standard Double', 2, 129, 2, '["wifi", "tv"]', '/rooms/2.jpg', 1, 1),
('Family Room', 3, 189, 5, '["wifi", "tv", "extra bed"]', '/rooms/3.jpg', 1, 1),
('Deluxe King', 4, 219, 3, '["wifi", "tv", "minibar", "bathtub"]', '/rooms/4.jpg', 1, 1),
('Economy Single', 5, 79, 1, '["wifi"]', '/rooms/5.jpg', 1, 1);

-- Bookings (15 items, all fields: room_id, hotel_id, guest_name, guest_email, check_in, check_out, guests, status,
--   booking_date, booking_time, arrival_date, departure_date, est_arrival_time, est_departure_time, num_adults, num_children, special_req)
INSERT INTO bookings (room_id, hotel_id, guest_name, guest_email, check_in, check_out, guests, status, booking_date, booking_time, arrival_date, departure_date, est_arrival_time, est_departure_time, num_adults, num_children, special_req) VALUES
(1, 1, 'James Wilson', 'james.wilson@email.com', '2025-03-01', '2025-03-05', 2, 'confirmed', '2025-02-15', '10:30:00', '2025-03-01', '2025-03-05', '14:00:00', '11:00:00', 2, 0, 'Late checkout if possible'),
(2, 1, 'Emma Davis', 'emma.davis@email.com', '2025-03-10', '2025-03-12', 1, 'confirmed', '2025-02-20', '14:15:00', '2025-03-10', '2025-03-12', '15:00:00', '10:00:00', 1, 0, 'High floor preferred'),
(3, 1, 'Michael Brown', 'michael.b@email.com', '2025-03-15', '2025-03-20', 4, 'pending', '2025-03-01', '09:00:00', '2025-03-15', '2025-03-20', '16:00:00', '11:30:00', 4, 0, 'Family with 2 kids, need extra towels'),
(1, 1, 'Sarah Miller', 'sarah.m@email.com', '2025-03-22', '2025-03-25', 2, 'confirmed', '2025-03-10', '11:45:00', '2025-03-22', '2025-03-25', '14:30:00', '10:30:00', 2, 0, 'Anniversary stay'),
(4, 1, 'David Lee', 'david.lee@email.com', '2025-04-01', '2025-04-03', 2, 'confirmed', '2025-03-18', '16:20:00', '2025-04-01', '2025-04-03', '13:00:00', '11:00:00', 2, 0, NULL),
(5, 1, 'Lisa Anderson', 'lisa.a@email.com', '2025-04-05', '2025-04-07', 1, 'pending', '2025-03-22', '08:00:00', '2025-04-05', '2025-04-07', '15:30:00', '10:00:00', 1, 0, 'Quiet room'),
(2, 1, 'Robert Taylor', 'robert.t@email.com', '2025-04-10', '2025-04-15', 2, 'confirmed', '2025-03-25', '12:00:00', '2025-04-10', '2025-04-15', '14:00:00', '11:00:00', 2, 0, 'Early check-in requested'),
(3, 1, 'Jennifer White', 'jennifer.w@email.com', '2025-04-18', '2025-04-22', 3, 'confirmed', '2025-04-01', '14:30:00', '2025-04-18', '2025-04-22', '16:00:00', '11:30:00', 2, 1, 'Traveling with infant'),
(1, 1, 'Christopher Harris', 'chris.h@email.com', '2025-04-25', '2025-04-28', 2, 'pending', '2025-04-10', '10:00:00', '2025-04-25', '2025-04-28', '15:00:00', '10:30:00', 2, 0, 'Business trip'),
(4, 1, 'Amanda Clark', 'amanda.c@email.com', '2025-05-01', '2025-05-05', 2, 'confirmed', '2025-04-15', '17:45:00', '2025-05-01', '2025-05-05', '14:30:00', '11:00:00', 2, 0, 'Honeymoon suite preferred'),
(5, 1, 'Daniel Kim', 'daniel.kim@email.com', '2025-05-08', '2025-05-10', 1, 'confirmed', '2025-04-20', '09:30:00', '2025-05-08', '2025-05-10', '13:00:00', '10:00:00', 1, 0, 'Vegetarian breakfast'),
(2, 1, 'Sophie Martin', 'sophie.m@email.com', '2025-05-12', '2025-05-17', 2, 'pending', '2025-04-25', '11:00:00', '2025-05-12', '2025-05-17', '15:30:00', '11:00:00', 2, 0, 'Room with city view'),
(3, 1, 'Thomas Wright', 'thomas.w@email.com', '2025-05-20', '2025-05-23', 4, 'confirmed', '2025-05-01', '13:15:00', '2025-05-20', '2025-05-23', '14:00:00', '10:30:00', 3, 1, 'Extra bed for child'),
(1, 1, 'Olivia Garcia', 'olivia.g@email.com', '2025-05-25', '2025-05-28', 2, 'confirmed', '2025-05-05', '15:00:00', '2025-05-25', '2025-05-28', '16:00:00', '11:00:00', 2, 0, 'Allergy to feathers - synthetic pillows'),
(4, 1, 'William Chen', 'william.chen@email.com', '2025-06-01', '2025-06-05', 2, 'pending', '2025-05-12', '10:45:00', '2025-06-01', '2025-06-05', '15:00:00', '11:30:00', 2, 0, 'Airport transfer needed');

-- Guests (15 records linked to bookings 1–15)
INSERT INTO guests (booking_id, guest_title, first_name, last_name, dob, gender, phone_no, email, passport_no, address, postcode, city, country) VALUES
(1, 'Mr', 'James', 'Wilson', '1985-06-12', 'Male', '+44 7700 900123', 'james.wilson@email.com', 'GB123456789', '42 Park Lane', 'W1K 7TN', 'London', 'United Kingdom'),
(2, 'Ms', 'Emma', 'Davis', '1992-03-25', 'Female', '+1 555 234 5678', 'emma.davis@email.com', 'US987654321', '100 Main Street', '10001', 'New York', 'USA'),
(3, 'Mr', 'Michael', 'Brown', '1978-11-08', 'Male', '+61 2 9123 4567', 'michael.b@email.com', 'AU456789012', '15 Harbour Bridge Rd', '2000', 'Sydney', 'Australia'),
(4, 'Mrs', 'Sarah', 'Miller', '1990-07-19', 'Female', '+33 1 23 45 67 89', 'sarah.m@email.com', 'FR789012345', '8 Rue de Rivoli', '75001', 'Paris', 'France'),
(5, 'Mr', 'David', 'Lee', '1982-01-30', 'Male', '+81 3 1234 5678', 'david.lee@email.com', 'JP321654987', '2-1 Shibuya', '150-0002', 'Tokyo', 'Japan'),
(6, 'Ms', 'Lisa', 'Anderson', '1995-09-14', 'Female', '+49 30 12345678', 'lisa.a@email.com', 'DE147258369', 'Friedrichstrasse 100', '10117', 'Berlin', 'Germany'),
(7, 'Mr', 'Robert', 'Taylor', '1965-04-22', 'Male', '+34 91 234 5678', 'robert.t@email.com', 'ES963852741', 'Calle Mayor 5', '28013', 'Madrid', 'Spain'),
(8, 'Mrs', 'Jennifer', 'White', '1988-12-03', 'Female', '+39 02 12345678', 'jennifer.w@email.com', 'IT852963741', 'Via Roma 12', '20121', 'Milan', 'Italy'),
(9, 'Mr', 'Christopher', 'Harris', '1972-08-17', 'Male', '+31 20 123 4567', 'chris.h@email.com', 'NL159357486', 'Damrak 50', '1012 LL', 'Amsterdam', 'Netherlands'),
(10, 'Ms', 'Amanda', 'Clark', '1998-02-28', 'Female', '+351 21 123 4567', 'amanda.c@email.com', 'PT753159486', 'Rua Augusta 200', '1100-053', 'Lisbon', 'Portugal'),
(11, 'Mr', 'Daniel', 'Kim', '1991-05-14', 'Male', '+82 2 1234 5678', 'daniel.kim@email.com', 'KR112233445', 'Gangnam-gu 123', '06134', 'Seoul', 'South Korea'),
(12, 'Ms', 'Sophie', 'Martin', '1987-11-03', 'Female', '+33 1 98 76 54 32', 'sophie.m@email.com', 'FR554433221', '15 Avenue des Champs', '75008', 'Paris', 'France'),
(13, 'Mr', 'Thomas', 'Wright', '1975-08-20', 'Male', '+44 7700 112233', 'thomas.w@email.com', 'GB998877665', '10 Baker Street', 'NW1 6XE', 'London', 'United Kingdom'),
(14, 'Ms', 'Olivia', 'Garcia', '1993-01-12', 'Female', '+34 91 555 1234', 'olivia.g@email.com', 'ES443322110', 'Plaza Mayor 3', '28012', 'Madrid', 'Spain'),
(15, 'Mr', 'William', 'Chen', '1988-09-25', 'Male', '+86 10 8765 4321', 'william.chen@email.com', 'CN667788990', 'Chaoyang District', '100020', 'Beijing', 'China');
