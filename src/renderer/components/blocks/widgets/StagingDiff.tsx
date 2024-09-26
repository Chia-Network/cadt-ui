import React, { useMemo } from 'react';
import { useGetStagedProjectsQuery } from '@/api';
import { DiffViewer, Spinner } from '@/components';
import { FormattedMessage } from 'react-intl';

interface ProjectModalProps {
  stagingUuid: string;
}

const StagingDiff: React.FC<ProjectModalProps> = ({ stagingUuid }: ProjectModalProps) => {
  const { data: stagingData, isLoading } = useGetStagedProjectsQuery();

  const changeRecord: any = useMemo(() => {
    if (isLoading || !stagingData) {
      return undefined;
    }
    return stagingData.find((record: any) => record.uuid === stagingUuid);
  }, [stagingData, isLoading, stagingUuid]);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (!stagingData) {
    return (
      <div className="h-36 w-36">
        <FormattedMessage id="unable-to-load-staging-data" />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <DiffViewer data={changeRecord} />
    </div>
  );
};

export { StagingDiff };
