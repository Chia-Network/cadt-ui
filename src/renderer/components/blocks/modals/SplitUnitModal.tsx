import { isEmpty } from 'lodash';
import React, { useRef, useState } from 'react';
import {
  ComponentCenteredSpinner,
  Modal,
  Spacer,
  SplitUnitForm,
  SplitUnitFormRef,
  Button
} from '@/components';
import { useWildCardUrlHash, useUrlHash } from '@/hooks';
import { useGetPickListsQuery, useStageSplitUnitMutation } from '@/api';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'flowbite-react'


interface SplitModalProps {
  onClose: () => void;
}

const SplitUnitModal: React.FC<SplitModalProps> = ({ onClose }: SplitModalProps) => {
  const splitUnitFormRef = useRef<SplitUnitFormRef>(null);

  const [unitSplitUpsertFragment] = useWildCardUrlHash('split-unit')
  const warehouseUnitId = unitSplitUpsertFragment.replace('split-unit-', '');
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

  const [triggerStageSplitUnit, { isLoading: isSplitStaging }] = useStageSplitUnitMutation();
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const [, setUnitStagedSuccessModal] = useUrlHash('success-stage-unit');

  const handleSubmit = () => {
    setFormSubmitError(null);
    splitUnitFormRef.current
      ?.submitForm()
      .then(async ([errors, values]) => {
        console.log(errors, values);
        if (!isEmpty(errors)) {
          console.error('Form submission error:', errors);
          return;
        }

        if (values) {
          console.log({warehouseUnitId, records: values})
          const response: any = await triggerStageSplitUnit({warehouseUnitId, records:[...values.units]});

          if (response.data) {
             setUnitStagedSuccessModal(true);
          } else {
            let errorMessage = `Error processing Unit: ${response.error.data.message}`;
            if (response.error.data.errors && Array.isArray(response.error.data.errors)) {
              errorMessage = `${errorMessage} - ${response.error.data.errors.join(', ')}`;
            }

            setFormSubmitError(errorMessage);
          }
        }
      })
      .catch((error) => {
        console.error('Form submission error:', error);
      });
  };


  if (isPickListLoading || isSplitStaging) {
    return (
      <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
        <Modal.Header>
          <FormattedMessage id="split-unit" />
        </Modal.Header>
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} show={true} size="8xl" position="top-center">
      <Modal.Header>
        <FormattedMessage id="split-unit" />
      </Modal.Header>
      <Modal.Body>
        {formSubmitError && <><Alert color="failure">{formSubmitError}</Alert><Spacer size={15} /></>}
        <SplitUnitForm ref={splitUnitFormRef} picklistOptions={pickListData} />
        <Spacer size={15} />
        <Button onClick={handleSubmit}>
          <FormattedMessage id="submit" />
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export { SplitUnitModal };
