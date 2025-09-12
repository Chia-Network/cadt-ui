import { isEmpty } from 'lodash';
import React, { useRef, useState } from 'react';
import { Button, ComponentCenteredSpinner, Modal, Spacer, SplitUnitForm, SplitUnitFormRef } from '@/components';
import { useUrlHash, useWildCardUrlHash } from '@/hooks';
import { useGetPickListsQuery, useStageSplitUnitMutation } from '@/api';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'flowbite-react';

interface SplitModalProps {
  onClose: () => void;
}

const SplitUnitModal: React.FC<SplitModalProps> = ({ onClose }: SplitModalProps) => {
  const splitUnitFormRef = useRef<SplitUnitFormRef>(null);

  const [unitSplitUpsertFragment] = useWildCardUrlHash('split-unit');
  const warehouseUnitId = unitSplitUpsertFragment.replace('split-unit-', '');
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

  const [triggerStageSplitUnit, { isLoading: splitUnitLoading }] = useStageSplitUnitMutation();
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const [formValidationError, setFormValidationError] = useState<boolean>(true);
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
          console.log({ warehouseUnitId, records: values });
          const response: any = await triggerStageSplitUnit({ warehouseUnitId, records: [...values.units] });

          if (response.data) {
            setUnitStagedSuccessModal(true);
          } else {
            let errorMessage = `Error processing Unit: ${response.error.data.message}`;
            if (response?.error?.data?.errors && Array.isArray(response.error.data.errors)) {
              errorMessage = `${errorMessage} - ${response.error.data.errors.join(', ')}`;
            } else if (response?.error?.data?.error) {
              errorMessage = `${errorMessage} - ${response.error.data.error}`;
            }

            setFormSubmitError(errorMessage);
          }
        }
      })
      .catch((error) => {
        console.error('Form submission error:', error);
      });
  };

  if (isPickListLoading) {
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
        {formSubmitError && (
          <>
            <Alert color="red">{formSubmitError}</Alert>
            <Spacer size={15} />
          </>
        )}
        <SplitUnitForm
          ref={splitUnitFormRef}
          picklistOptions={pickListData}
          setFormValidationError={setFormValidationError}
        />
        <Spacer size={15} />
        <Button color="blue" onClick={handleSubmit} disabled={formValidationError} isProcessing={splitUnitLoading}>
          <FormattedMessage id="submit" />
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export { SplitUnitModal };
