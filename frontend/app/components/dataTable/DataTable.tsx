/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import EditableRow from './components/editableRow/EditableRow';
import { EventFormData } from './components/editableRow/hooks/eventSchema.types';
import { EventItem, Mode } from 'types/events.types';
import Modal from '@components/modal/Modal';
import { FieldErrors } from 'react-hook-form';
import useFetch from '@hooks/useFetch';
import { INITIAL_FORM } from '@constants/helpers';
import ErrorModal from './components/errorModal/ErrorModal';
import { formattedStingToDateString } from '@utils/helpers';
import { useEventContext } from '@components/home/context/hook/useEventContext';
import useSnackBar from '@hooks/useSnackbar';

interface DataTableProps<T> {
  data: T[];
  extraStyles?: Record<string, string>;
  iconsPerKey?: Record<string, string>;
  loading: boolean;
  onAddEditEvent: (type: Mode) => void;
}

function DataTable<T extends EventFormData>({
  data = [],
  extraStyles = {} as Record<string, string>,
  iconsPerKey = {} as Record<string, string>,
  loading,
  onAddEditEvent,
}: DataTableProps<T>) {
  // INNER STATE
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<FieldErrors<EventFormData>>({});
  const [editModeId, setEditModeId] = useState<string | undefined>();

  // HOOKS
  const { newRow, setNewRow } = useEventContext();
  const { sendRequest } = useFetch<EventItem>('events');
  const { showSnackBar } = useSnackBar();

  const keys = data.length > 0 ? (Object.keys(data[0]).filter((key) => key !== 'id') as string[]) : [];

  const handleCreateEvent = async (saveData: EventFormData) => {
    try {
      await sendRequest('POST', saveData);
      onAddEditEvent(Mode.Add);
      setNewRow(false);
      showSnackBar('New event created successfully!', 'success');
    } catch (e) {
      showSnackBar('Ops! New event creation failed!', 'error');
    }
  };

  const handleUpdateEvent = async (saveData: EventFormData) => {
    try {
      await sendRequest('PUT', saveData);
      onAddEditEvent(Mode.Edit);
      handleEditRow();
      showSnackBar('The event updated successfully!', 'success');
    } catch (e) {
      showSnackBar('Ops! Updating the event failed!', 'error');
    }
  };

  const handleModalToggle = (toggle: boolean, errors: FieldErrors<EventFormData>) => {
    setModalErrors((_) => errors);
    setShowModal(toggle);
  };

  const handleCloseModal = (removeEdit?: boolean) => () => {
    setShowModal(false);
    if (removeEdit) {
      setNewRow(false);
    }
  };

  const handleEditRow = (id?: string) => {
    if (!id) {
      setEditModeId(undefined);
      setNewRow(false);
      return;
    }
    setEditModeId(id);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-white">
        <tbody>
          {loading && (
            <tr>
              <td className="text-3xl text-center italic text-zinc-700">Loading List...</td>
            </tr>
          )}
          {newRow && (
            <EditableRow
              data={INITIAL_FORM}
              onSave={handleCreateEvent}
              onRemoveRow={handleEditRow}
              onModalToggle={handleModalToggle}
            />
          )}
          {!loading &&
            data?.map((item) => {
              return editModeId === item.id ? (
                <EditableRow
                  key={`edit-${item.id}`}
                  data={{ ...item, date: formattedStingToDateString(item.date) }}
                  onSave={handleUpdateEvent}
                  onRemoveRow={handleEditRow}
                  onModalToggle={handleModalToggle}
                />
              ) : (
                <tr key={item.id} className="border-b border-t border-neutral-700">
                  <td className="px-2 py-2"></td>
                  {keys.map((key) => (
                    <td className={`px-6 py-4 max-w-30 text-lg ${extraStyles[key] || ''}`} key={key}>
                      <div className="flex">
                        {iconsPerKey[key] && (
                          <Image
                            className="mr-2"
                            src={`/images/${iconsPerKey[key]}.svg`}
                            alt={`${iconsPerKey[key]} icon`}
                            width={24}
                            height={24}
                          />
                        )}
                        {item[key as keyof EventFormData]}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      onClick={() => handleEditRow(item.id)}
                      className="font-medium text-lime-200 hover:underline">
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showModal && (
        <Modal
          title="Validation Failed!"
          cancelText="Cancel"
          submitText="Continue Edit"
          onSubmit={handleCloseModal()}
          onCancel={handleCloseModal(true)}>
          <ErrorModal modalErrors={modalErrors} />
        </Modal>
      )}
    </div>
  );
}

export default DataTable;
