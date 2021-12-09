import _ from 'lodash';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { AddIcon, CloseIcon } from '..';

const AddTag = withTheme(styled('div')`
  margin: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 22px;
  width: 37px;
  background-color: #fafafa;
  border-radius: 2px;
  ${props =>
    props.body === null
      ? 'border: 1px dashed #D9D9D9 ; width:70px;background-color: unset'
      : 'border 1px solid #D9D9D9'};
  ${props => props.closeable && 'width:52px'};
`);

const TagBody = withTheme(styled('p')`
  font-size: 12px;
`);

const TagButton = withTheme(styled('div')`
  cursor: pointer;
  height: 100%;
`);

const Tag = withTheme(
  ({ closeable, body = null, addNew, onClose = _.noop }) => {
    return (
      <>
        <AddTag body={body} closeable={closeable}>
          {addNew && (
            <TagButton onClick={addNew}>
              <AddIcon width="8.06" height="8.44" />
            </TagButton>
          )}
          <TagBody>{body === null ? 'New Tag' : body}</TagBody>
          {closeable && (
            <TagButton onClick={onClose}>
              <CloseIcon width="7.42" height="7.64" />
            </TagButton>
          )}
        </AddTag>
      </>
    );
  },
);

export { Tag };
