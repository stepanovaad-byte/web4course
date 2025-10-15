'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent from './AddStudent/AddStudent';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, createStudentMutate } = useStudents();

  const onDeleteHandler = (studentId: number): void => {
    if(confirm('Удалить студента?')){
      deleteStudentMutate(studentId)
    }
  }

const onAddStudentHandler = async (student: Omit<StudentInterface, 'id'>): Promise<void> => {
    await createStudentMutate(student);
  };

  return (
    <div className={styles.Students}>
      <AddStudent onAddStudent={onAddStudentHandler} />
      
      <h3>Список студентов</h3>
      
      {!students ? (
        <p>Загрузка...</p>
      ) : students.length === 0 ? (
        <p>Студентов нет</p>
      ) : (
        students.map((student: StudentInterface) => (
          <Student
            key={student.id}
            student={student}
            onDelete={onDeleteHandler}
          />
        ))
      )}
    </div>
  );
};

export default Students;
