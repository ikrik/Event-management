import { useEffect } from 'react';
import { EventSchema, EventFormData } from './eventSchema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useEventForm = (initialData?: EventFormData) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    trigger,
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: initialData || ({} as EventFormData),
    mode: 'all',
  });

  // Ensure default values are properly set if initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    trigger,
  };
};
