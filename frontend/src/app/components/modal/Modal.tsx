/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@components/button/Button';
import CloseIcon from '@images/close';
import { FC, ReactNode } from 'react';

interface ModalProps {
  id?: string;
  title: string;
  children: ReactNode;
  cancelText: string;
  onCancel: (...args: any[]) => void;
  submitText: string;
  onSubmit: (...args: any[]) => void;
}

const Modal: FC<ModalProps> = ({ id = 'modal', title, children, cancelText, onCancel, submitText, onSubmit }) => {
  return (
    <div id={id} className="fixed inset-0 flex items-center justify-center z-50 bg-black/[.75]">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow-sm bg-neutral-700">
          <div className="flex items-center justify-between px-4 py-3 border-b rounded-t border-neutral-600">
            <h3 className="text-2xl font-medium text-white">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              data-modal-hide="modal"
              onClick={onCancel}>
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-4 py-3 space-y-4">{children}</div>
          <div className="flex items-center px-4 py-3">
            <Button
              data-modal-hide="small-modal"
              onClick={onSubmit}
              classes="bg-lime-300 text-black font-bold hover:bg-lime-400 hover:cursor-pointer">
              {submitText}
            </Button>
            <Button
              data-modal-hide="small-modal"
              onClick={onCancel}
              classes="bg-white text-black font-bold hover:bg-neutral-200 ml-2 hover:cursor-pointer">
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
