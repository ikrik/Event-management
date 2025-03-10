import { FieldErrors } from 'react-hook-form';
import { EventFormData } from '../editableRow/hooks/eventSchema.types';
import { FC } from 'react';

interface ErrorModalProps {
  modalErrors: FieldErrors<EventFormData>;
}
const ErrorModal: FC<ErrorModalProps> = ({ modalErrors }) => {
  const ErrorKeys: string[] = Object.keys(modalErrors);

  return (
    <div>
      <ul className="pl-4">
        {ErrorKeys.length > 0 &&
          ErrorKeys.map((key) => {
            const error = modalErrors[key as keyof FieldErrors<EventFormData>];
            return (
              <li className="list-disc px-2 py-1" key={key}>
                {error?.message}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ErrorModal;
