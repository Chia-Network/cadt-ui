import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Body } from '../typography';
import { FormattedMessage } from 'react-intl';

const StyledRepeatedComponentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const ComponentRepeater = ({
  component,
  values,
  updateValues,
  initialValue,
  addIcon,
  removeIcon,
  maxRepetitions = 2,
}) => {
  const addNewInstance = useCallback(() => {
    if (values.length < maxRepetitions) {
      updateValues(prevValues =>
        prevValues && prevValues.length
          ? [...prevValues, _.cloneDeep(initialValue)]
          : [_.cloneDeep(initialValue)],
      );
    }
  }, [values]);

  const allInstances = useMemo(() => {
    return values.map((value, index) => {
      const onChange = value => {
        updateValues(prevValues => {
          const newValues = [...prevValues];
          newValues[index] = _.cloneDeep(value);
          return newValues;
        });
      };
      const onRemove = () => {
        updateValues(prevValues => {
          const newValues = [...prevValues];
          newValues.splice(index, 1);
          return newValues;
        });
      };
      const key = index;
      return (
        <StyledRepeatedComponentContainer key={key}>
          {component && React.cloneElement(component, { value, onChange })}
          {removeIcon && <div onClick={onRemove}>{removeIcon}</div>}
        </StyledRepeatedComponentContainer>
      );
    });
  }, [values]);

  return (
    <div>
      {addIcon && values.length < maxRepetitions && (
        <StyledRepeatedComponentContainer onClick={addNewInstance}>
          {addIcon}
          <Body color="#1890ff">
            <FormattedMessage id="click-to-add" />
          </Body>
        </StyledRepeatedComponentContainer>
      )}
      {addIcon && values.length >= maxRepetitions && (
        <StyledRepeatedComponentContainer disabled>
          {React.cloneElement(addIcon, { fill: '#d9d9d9' })}
          <Body color="#d9d9d9">
            <FormattedMessage id="max-number-added" />
          </Body>
        </StyledRepeatedComponentContainer>
      )}
      {allInstances}
    </div>
  );
};

export { ComponentRepeater };
