import React, { useMemo } from 'react';
import { useGetStagedProjectsQuery } from '@/api';
import { DiffViewer } from '@/components';

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

  if (isLoading || !changeRecord) {
    return null;
  }

  return <div className="h-screen">{isLoading ? <p>loading...</p> : <DiffViewer data={changeRecord} />}</div>;
};

export { StagingDiff };
