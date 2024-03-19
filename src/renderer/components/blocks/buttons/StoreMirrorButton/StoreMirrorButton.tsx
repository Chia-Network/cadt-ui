import {FauxLinkButton} from "@/components";
import {FormattedMessage} from "react-intl";
import {Button, Tooltip} from "flowbite-react";
import React, {useCallback, useState} from "react";
import _ from 'lodash';
import {AddMirrorModal} from "@/components";
import {useSelector} from "react-redux";
import {ConfirmDeleteMirrorModal} from "@/components/blocks/modals/ConfirmDeleteMirrorModal";

interface StoreMirrorProps {
  storeId: string
}

const StoreMirrorButton: React.FC<StoreMirrorProps> = ({storeId}) => {

  const mirrors = useSelector((state: any) => state.app.storeMirrors);
  const [showAddMirrorModal, setShowAddMirrorModal] = useState<boolean>(false);
  const [showDeleteMirrorModal, setShowDeleteMirrorModal] = useState<boolean>(false);

  const handleClickAddMirror = useCallback(() => {
    setShowAddMirrorModal(true);
  }, []);

  const handleCloseAddMirrorModal = useCallback(() => {
    setShowAddMirrorModal(false);
  }, []);

  const handleCloseDeleteMirrorModal = useCallback(() => {
    setShowDeleteMirrorModal(false);
  }, []);

  const handleDeleteMirror = useCallback(() => {
    setShowDeleteMirrorModal(true);
  }, []);

  return(
    <>
      {
        _.isNil(mirrors[storeId]) ?
        <FauxLinkButton onClick={handleClickAddMirror}>
          <FormattedMessage id={'mirror'}/>
        </FauxLinkButton>
        :
        <Tooltip
          arrow={false}
          style={'light'}
          animation="duration-500"
          content={
            <div className={'flex'}>
              <div style={{
                marginRight: '10px',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              >
                {mirrors[storeId]}
              </div>
              <Button onClick={handleDeleteMirror} size={'xs'}>
                <FormattedMessage id={"delete-mirror"}/>
              </Button>
            </div>
          }>
          <div className={'whitespace-nowrap'}>
            <p className={'font-medium text-gray-500'}>
              <FormattedMessage id={"mirrored"}/> &#10003;
            </p>
          </div>
        </Tooltip>
      }
      {
        showAddMirrorModal &&
        <AddMirrorModal
          storeId={storeId}
          onClose={handleCloseAddMirrorModal}
        />
      }
      {
        showDeleteMirrorModal &&
        <ConfirmDeleteMirrorModal
          storeId={storeId}
          onClose={handleCloseDeleteMirrorModal}
        />
      }
    </>
  );
}

export { StoreMirrorButton };
