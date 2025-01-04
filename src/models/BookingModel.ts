import pool from '@/lib/mysql';

export interface Booking {
  id: number;
  document_number: string;
  document_type: string;
  full_name: string;
  phone: string;
  email: string;
  service_id: number;
  booking_date: string;
  service_name?: string;
}

export const BookingModel = {
  async getAllBookings() {
    const [rows] = await pool.query(`
      SELECT bookings.*, services.name as service_name 
      FROM bookings 
      LEFT JOIN services ON bookings.service_id = services.id
    `);
    return rows;
  },

  async getBookingById(id: number) {
    const [rows] = await pool.query(
      'SELECT * FROM bookings WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async createBooking(booking: Omit<Booking, 'id' | 'booking_date'>) {
    const [result] = await pool.query(
      'INSERT INTO bookings (document_number, document_type, full_name, phone, email, service_id) VALUES (?, ?, ?, ?, ?, ?)',
      [booking.document_number, booking.document_type, booking.full_name, booking.phone, booking.email, booking.service_id]
    );
    return result;
  },

  async updateBooking(id: number, booking: Partial<Booking>) {
    const [result] = await pool.query(
      'UPDATE bookings SET document_number = ?, document_type = ?, full_name = ?, phone = ?, email = ? WHERE id = ?',
      [booking.document_number, booking.document_type, booking.full_name, booking.phone, booking.email, id]
    );
    return result;
  },

  async deleteBooking(id: number) {
    const [result] = await pool.query(
      'DELETE FROM bookings WHERE id = ?',
      [id]
    );
    return result;
  }
};