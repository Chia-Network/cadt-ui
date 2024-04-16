import React, { useMemo } from 'react';
import { DiffViewer, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetStagedProjectsQuery } from '@/api/cadt/v1/staging/staging.api';

interface ProjectModalProps {
  stagingUuid: string;
  onClose: () => void;
}

const StagingDiffModal: React.FC<ProjectModalProps> = ({ stagingUuid, onClose }: ProjectModalProps) => {
  const { data: stagingData, isLoading } = useGetStagedProjectsQuery();

  const changeRecord: any = useMemo(() => {
    if (isLoading || !stagingData) {
      return undefined;
    }
    return stagingData.find(() => stagingData.uuid === stagingUuid);
  }, [stagingData, isLoading, stagingUuid]);

  console.log(stagingData);

  if (isLoading) {
    return null;
  }

  const oldRevision: any = changeRecord?.diff?.original;
  const newRevisions: any[] = changeRecord?.diff?.change;

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'staging-diff'} />
      </Modal.Header>
      <Modal.Body>
        {isLoading ? <p>loading...</p> : <DiffViewer oldText={oldRevision} newText={newRevisions?.[0]} />}
      </Modal.Body>
    </Modal>
  );
};

export { StagingDiffModal };
