import { omit } from 'lodash';
import React, { useMemo } from 'react';
import { Change, diffLines } from 'diff';

interface ChangeRecord {
  id: number;
  uuid: string;
  table: string;
  action: string;
  committed: boolean;
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

const sanitizeObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  return omit(obj, ['orgUid', 'createdAt', 'updatedAt', 'timeStaged', 'action']);
};

const camelCaseToHumanReadable = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const renderArrayDiff = (original: any[], updated: any[]): React.ReactNode[] => {
  const subDiffs: React.ReactNode[] = [];
  const maxLen = Math.max(original.length, updated.length);
  for (let i = 0; i < maxLen; i++) {
    const orig = original[i];
    const upd = updated[i];
    if (orig !== undefined || upd !== undefined) {
      subDiffs.push(
        <div key={`array-item-${i}`} className="ml-4 mb-4 bg-gray-50 p-3 rounded-md shadow-md">
          {renderFieldDiffs(orig, upd)}
        </div>,
      );
    }
  }
  return subDiffs;
};

const renderFieldDiffs = (original: any, updated: any): React.ReactNode[] => {
  const changes: React.ReactNode[] = [];
  const allKeys = new Set([...Object.keys(original || {}), ...Object.keys(updated || {})]);

  allKeys.forEach((key) => {
    const origValue = original ? original[key] : undefined;
    const updatedValue = updated ? updated[key] : undefined;

    const label = camelCaseToHumanReadable(key);

    if (Array.isArray(origValue) || Array.isArray(updatedValue)) {
      // Special handling for array of objects
      changes.push(
        <div key={`${key}-array-diff`} className="mt-4">
          <div className="font-bold mb-1 text-gray-700">{label}:</div>
          {renderArrayDiff(sanitizeObject(origValue || []), sanitizeObject(updatedValue || []))}
        </div>,
      );
    } else {
      const lineDiffs = diffLines(
        JSON.stringify(origValue || '', null, 2),
        JSON.stringify(updatedValue || '', null, 2),
      );
      const hasChanges = lineDiffs.some((change) => change.added || change.removed);
      if (hasChanges) {
        changes.push(
          <div key={`${key}-label`} className="font-bold mb-1 text-gray-700">
            {label}:
          </div>,
        );
        lineDiffs.forEach((change: Change, index: number) => {
          if (
            change.value.trim() === '' ||
            change.value === null ||
            change.value === undefined ||
            change.value.trim() === '""'
          ) {
            return;
          }
          const color = change.added ? 'bg-green-100' : change.removed ? 'bg-red-100' : 'bg-transparent';
          const prefix = change.added ? '+ ' : change.removed ? '- ' : '  ';
          changes.push(
            <div key={`${key}-${index}`} className={`${color} whitespace-pre-wrap rounded-md p-1 ml-4 mt-2`}>
              <div className="inline-block mr-1">{prefix}</div>
              <div className="inline-block">{change.value.replace(/"/g, '')}</div>
            </div>,
          );
        });
      } else {
        const value = updatedValue ? JSON.stringify(updatedValue, null, 2).replace(/"/g, '') : undefined;
        if (!value || value.trim() === '' || value === '""') {
          return;
        }
        changes.push(
          <div key={`${key}-label`} className="font-bold mb-1 text-gray-700">
            {label}: <span className="text-gray-500">{value}</span>
          </div>,
        );
      }
    }
  });

  return changes;
};

const DiffViewer: React.FC<DiffViewerProps> = ({ data }) => {
  const { original, change } = data.diff;
  const changeData = change.length > 1 ? change : change[0];

  const diffs = useMemo(
    () => renderFieldDiffs(sanitizeObject(original), sanitizeObject(changeData)),
    [original, changeData],
  );

  return (
    <div className="diff-container p-5 bg-gray-100 rounded-md shadow">
      <h3 className="font-bold text-lg text-left mb-3">
        Change for {data.table} - Action: {data.action}
      </h3>
      <div className="bg-white text-left p-3 rounded border font-mono">
        {diffs.length > 0 ? diffs : <div>No changes detected.</div>}
      </div>
    </div>
  );
};

export { DiffViewer };
