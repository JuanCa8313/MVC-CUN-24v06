import { BookingModel, Booking } from '@/models/BookingModel';

export const BookingController = {
  async getBookings() {
    try {
      return await BookingModel.getAllBookings();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  async getBooking(id: number) {
    try {
      return await BookingModel.getBookingById(id);
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  },

  async createBooking(bookingData: Omit<Booking, 'id' | 'booking_date'>) {
    try {
      return await BookingModel.createBooking(bookingData);
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  async updateBooking(id: number, bookingData: Partial<Booking>) {
    try {
      return await BookingModel.updateBooking(id, bookingData);
    } catch (error) {
      console.error(`Error updating booking ${id}:`, error);
      throw error;
    }
  },

  async deleteBooking(id: number) {
    try {
      return await BookingModel.deleteBooking(id);
    } catch (error) {
      console.error(`Error deleting booking ${id}:`, error);
      throw error;
    }
  }
};