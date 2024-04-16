import React from 'react';
import { Diff, Hunk, parseDiff } from 'react-diff-view';
import 'react-diff-view/style/index.css';
import * as diff from 'diff'; // Ensure 'diff' is installed (npm install diff)

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
  data: ChangeRecord[];
}

const computeDiff = (original: object, changes: object[]): string => {
  const oldText = JSON.stringify(original, null, 2);
  const newText = JSON.stringify(changes[0], null, 2); // Assuming single change for simplicity
  return diff.createPatch('changes', oldText, newText, '', '', { context: 3 });
};

const DiffViewer: React.FC<DiffViewerProps> = ({ data }) => {
  return (
    <div className="diff-container">
      {data.map((record, index) => {
        const unifiedDiff = computeDiff(record.diff.original, record.diff.change);
        const parsedDiff = parseDiff(unifiedDiff);

        return parsedDiff.map((diff, diffIndex) => (
          <Diff key={`${index}-${diffIndex}`} viewType="split" diffType="modify" hunks={diff.hunks}>
            {diff.hunks.map((hunk, hunkIndex) => (
              <Hunk key={hunkIndex} hunk={hunk} />
            ))}
          </Diff>
        ));
      })}
    </div>
  );
};

export { DiffViewer };
