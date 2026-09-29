import React, {useState, FormEvent} from 'react'
import Router from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import BookingForm from './book-form';

const BookAppointment = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const [error, setError] = useState<String | null>("");
  const [loading, setLoading] = useState<Boolean>(false)

  return (
    <div>BookAppointment</div>
  )
}

export default BookAppointment