'use client';

import { FC, useEffect, useRef } from 'react';
import { EventFormData } from './hooks/eventSchema.types';
import { useEventForm } from './hooks/useEventForm';
import { EventTypeEnumOptions } from '@constants/helpers';
import { FieldErrors, SubmitHandler } from 'react-hook-form';

interface EditableRow {
  data: EventFormData;
  onSave: SubmitHandler<EventFormData>;
  onRemoveRow: () => void;
  onModalToggle: (toggle: boolean, errors: FieldErrors<EventFormData>) => void;
}

const EditableRow: FC<EditableRow> = ({ data, onSave, onRemoveRow, onModalToggle }) => {
  const editRowRef = useRef<HTMLTableRowElement>(null);

  const { errors, isValid, isDirty, trigger, register, handleSubmit } = useEventForm(data);

  useEffect(() => {
    if (Object.keys(errors).length > 0 && !isValid) {
      onModalToggle(true, errors);
    }
  }, [errors, isValid]);

  const handleClickOutside = async (event: MouseEvent) => {
    const modal = document.getElementById('modal');
    const snackbar = document.getElementsByClassName('Toastify')?.[0];

    if (
      editRowRef.current &&
      !editRowRef.current.contains(event.target as Node) &&
      (!modal || (modal && !modal.contains(event.target as Node))) &&
      (!snackbar || (snackbar && !snackbar.contains(event.target as Node)))
    ) {
      await trigger();

      if (isValid && isDirty) {
        handleSubmit(onSave)();
      }
      if (!isDirty) {
        onRemoveRow();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDirty, isValid]);

  return (
    <tr ref={editRowRef} className="border-b border-t border-neutral-700">
      <td className="px-2 py-2"></td>
      <td className="px-6 py-4 max-w-30 text-lg">
        <label className="text-sm pr-2">Event Type</label>
        <div className="flex">
          <select className="border-neutral-400 rounded border-1 px-3 py-2" {...register('eventType')}>
            {EventTypeEnumOptions.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="px-6 py-4 max-w-30 text-lg">
        <label className="text-sm pr-2">Venue</label>
        <div className="flex">
          <input
            placeholder="e.g. Lollapalooza"
            type="text"
            {...register('venue')}
            className="border-neutral-400 rounded border-1 px-3 py-2"
          />
        </div>
      </td>
      <td className="px-6 py-4 max-w-30 text-lg">
        <label className="text-sm pr-2">Location</label>
        <div className="flex">
          <input
            placeholder="e.g. Los Angeles"
            type="text"
            {...register('location')}
            className="border-neutral-400 rounded border-1 px-3 py-2"
          />
        </div>
      </td>
      <td className="px-6 py-4 max-w-30 text-lg">
        <label className="text-sm pr-2">Location</label>
        <div className="flex">
          <input
            type="date"
            {...register('date')}
            className="border-neutral-400 rounded border-1 px-3 py-2 min-w-[220px]"
          />
        </div>
      </td>
      <td className="px-6 py-4 max-w-30 text-lg">
        <label className="text-sm pr-2">Capacity</label>
        <div className="flex">
          <input
            placeholder="e.g. 18000"
            {...register('capacity', { valueAsNumber: true })}
            className="border-neutral-400 rounded border-1 px-3 py-2"
          />
        </div>
      </td>
      <td className="px-6 py-4 text-right"></td>
    </tr>
  );
};

export default EditableRow;
