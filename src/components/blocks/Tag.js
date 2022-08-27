import _ from 'lodash';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { AddIcon, CloseIcon } from '..';

const AddTag = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 1.375rem;
  width: 2.3125rem;
  background-color: #fafafa;
  border-radius: 0.125rem;
  ${props =>
    props.body === null
      ? `border: 0.0625rem dashed ${props.theme.colors.default.onBorder} ; width:4.375rem;background-color: unset`
      : `border: 0.0625rem solid ${props.theme.colors.default.onBorder}`};
  ${props => props.closeable && 'width:4.25rem'};
`;

const TagBody = styled('p')`
  margin: 0;
  font-size: 0.75rem;
`;

const TagButton = styled('div')`
  cursor: pointer;
`;

const Tag = withTheme(
  ({ closeable, body = null, addNew = _.noop, onClose = _.noop, theme }) => {
    return (
      <>
        <AddTag body={body} closeable={closeable}>
          {addNew && (
            <TagButton onClick={addNew}>
              <AddIcon
                width="8.06"
                height="8.44"
                fill={theme.colors.default.onText}
              />
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
