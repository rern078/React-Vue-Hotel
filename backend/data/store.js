// In-memory store (replace with DB in production)
export const store = {
  rooms: [
    { id: '1', name: 'Ocean View Suite', type: 'suite', price: 299, capacity: 4, amenities: ['balcony', 'minibar', 'sea view'], image: '/rooms/1.jpg', available: true },
    { id: '2', name: 'Standard Double', type: 'double', price: 129, capacity: 2, amenities: ['wifi', 'tv'], image: '/rooms/2.jpg', available: true },
    { id: '3', name: 'Family Room', type: 'family', price: 189, capacity: 5, amenities: ['wifi', 'tv', 'extra bed'], image: '/rooms/3.jpg', available: true },
    { id: '4', name: 'Deluxe King', type: 'deluxe', price: 219, capacity: 3, amenities: ['wifi', 'tv', 'minibar', 'bathtub'], image: '/rooms/4.jpg', available: true },
    { id: '5', name: 'Economy Single', type: 'single', price: 79, capacity: 1, amenities: ['wifi'], image: '/rooms/5.jpg', available: true },
  ],
  bookings: [
    { id: 'b1', roomId: '1', guestName: 'John Doe', guestEmail: 'john@example.com', checkIn: '2025-02-15', checkOut: '2025-02-18', guests: 2, status: 'confirmed' },
    { id: 'b2', roomId: '2', guestName: 'Jane Smith', guestEmail: 'jane@example.com', checkIn: '2025-02-12', checkOut: '2025-02-14', guests: 2, status: 'confirmed' },
    { id: 'b3', roomId: '3', guestName: 'Bob Wilson', guestEmail: 'bob@example.com', checkIn: '2025-02-20', checkOut: '2025-02-22', guests: 4, status: 'pending' },
  ],
};

let nextBookingId = 4;

export function generateBookingId() {
  return `b${nextBookingId++}`;
}
