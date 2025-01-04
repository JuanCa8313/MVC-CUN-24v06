import { NextResponse } from 'next/server';
import { BookingController } from '@/controllers/BookingController';

export async function GET() {
  try {
    const bookings = await BookingController.getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las reservas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await BookingController.createBooking(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    );
  }
}
