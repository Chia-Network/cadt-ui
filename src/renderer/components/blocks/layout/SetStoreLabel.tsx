import React from 'react';
import { useMemo } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { setStoreLabel } from '@/store/slices/userOptions';

interface SelectedStoreIdCardProps {
  storeId: string;
}

const SetStoreLabel: React.FC<SelectedStoreIdCardProps> = ({
  storeId,
}: SelectedStoreIdCardProps) => {
  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const label = useMemo(() => {
    return userOptionsStore.storeLabels?.[storeId];
  }, [storeId, userOptionsStore.storeLabels]);

  const handleStoreLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStoreLabel({ storeId, label: event.target.value }));
  };

  return (
    <div className={'space-y-6 flex-col'}>
      <div className={'flex'}>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <FormattedMessage id="store-id"/>: {storeId}
        </p>
      </div>
      <div className={"flex"}>
        <div style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          inlineSize: 'min-content',
          whiteSpace: 'nowrap'
        }}>
          <Label htmlFor="store-id">
            <FormattedMessage id={"store-label"}/>
          </Label>
        </div>
        <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
          <TextInput onChange={handleStoreLabelChange} value={label || ''}/>
        </div>
      </div>
    </div>
  );
};

export {SetStoreLabel};
