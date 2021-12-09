import _ from 'lodash';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { AddIcon, CloseIcon } from '..';

const AddTag = withTheme(styled('div')`
  margin: 0.625rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 1.375rem;
  width: 2.3125rem;
  background-color: #fafafa;
  border-radius: 0.125rem;
  ${props =>
    props.body === null
      ? 'border: 0.0625rem dashed #D9D9D9 ; width:4.375rem;background-color: unset'
      : 'border: 0.0625rem solid #D9D9D9'};
  ${props => props.closeable && 'width:3.25rem'};
`);

const TagBody = withTheme(styled('p')`
  font-size: 0.75rem;
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
