import React from 'react';
import { Modal, Tabs } from '@/components';
import { FormattedMessage } from 'react-intl';

interface ProjectModalProps {
  warehouseProjectId: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ warehouseProjectId, onClose }: ProjectModalProps) => {
  return (
    <Modal onClose={onClose} show={true} size={'8xl'}>
      <Modal.Header>
        <FormattedMessage id={'detailed-project-view'} />
      </Modal.Header>
      <Modal.Body>
        <Tabs>
          <Tabs.Item title={<FormattedMessage id={'project'} />}>
            this is the project tab for warehouse project {warehouseProjectId}
          </Tabs.Item>
          <Tabs.Item title={<FormattedMessage id={'issuance'} />}>this is the issuance tab</Tabs.Item>
          <Tabs.Item title={<FormattedMessage id={'project-locations'} />}>this is the project locations tab</Tabs.Item>
          <Tabs.Item title={<FormattedMessage id={'estimations'} />}>this is the project estimations tab</Tabs.Item>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { ProjectModal };
