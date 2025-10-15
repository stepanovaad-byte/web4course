'use client';

import { useState } from 'react';
import type StudentInterface from '@/types/StudentInterface';
import styles from './AddStudent.module.scss';

interface Props {
  onAddStudent: (student: Omit<StudentInterface, 'id'>) => void;
}

const AddStudent = ({ onAddStudent }: Props): React.ReactElement => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    groupId: 1 // значение по умолчанию
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert('Пожалуйста, заполните обязательные поля (Имя и Фамилия)');
      return;
    }

    setIsLoading(true);
    
    try {
      await onAddStudent({
        ...formData,
        groupId: Number(formData.groupId) // убеждаемся, что это число
      });
      
      // Сброс формы после успешного добавления
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        groupId: 1
      });
    } catch (error) {
      console.error('Ошибка при добавлении студента:', error);
      alert('Произошла ошибка при добавлении студента');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    if (name === 'groupId') {
      // Для числового поля преобразуем значение в число
      const numericValue = value === '' ? 1 : parseInt(value, 10);
      setFormData(prev => ({
        ...prev,
        [name]: isNaN(numericValue) ? 1 : numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.AddStudent}>
      <h3>Добавить нового студента</h3>
      
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Фамилия *</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="firstName">Имя *</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="middleName">Отчество</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="groupId">ID группы</label>
        <input
          type="number"
          id="groupId"
          name="groupId"
          value={formData.groupId.toString()} // преобразуем в строку для input
          onChange={handleChange}
          min="1"
          disabled={isLoading}
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Добавление...' : 'Добавить студента'}
      </button>
    </form>
  );
};

export default AddStudent;