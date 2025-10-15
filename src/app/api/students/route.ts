import { getStudentDb } from '@/db/studentsDb';
import { createStudentDb } from '@/db/studentDb';
import type { NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const students = await getStudentDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const studentData = await request.json();
    const newStudent = await createStudentDb(studentData);
    
    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка при создании студента' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}