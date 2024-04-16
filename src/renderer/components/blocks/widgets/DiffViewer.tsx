import React from 'react';
import JSONDiffReact from 'react-json-view-compare';

interface ChangeRecord {
  id: number;
  uuid: string;
  table: string;
  action: string;
  commited: boolean;
  failedCommit: boolean;
  isTransfer: boolean;
  createdAt: string;
  updatedAt: string;
  diff: {
    original: any;
    change: any[];
  };
}

interface DiffViewerProps {
  data: ChangeRecord;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ data }) => {
  return (
    <div className="diff-container" style={{ margin: '20px' }}>
      <h3>
        Change for {data.table} - Action: {data.action}
      </h3>
      <JSONDiffReact
        oldData={data.diff.original}
        newData={data.diff.change.length > 1 ? data.diff.change : data.diff.change[0]}
        collapsed={false}
        compareArraysInOrder={true}
        leftTitle="Original"
        rightTitle="Modified"
      />
    </div>
  );
};

export { DiffViewer };
