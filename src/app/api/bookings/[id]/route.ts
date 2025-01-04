import { NextResponse } from 'next/server';
import { BookingController } from '@/controllers/BookingController';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await BookingController.getBooking(parseInt(params.id));
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la reserva' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const result = await BookingController.updateBooking(parseInt(params.id), data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la reserva' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await BookingController.deleteBooking(parseInt(params.id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la reserva' },
      { status: 500 }
    );
  }
}