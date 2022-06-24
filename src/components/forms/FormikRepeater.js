import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FieldArray, useFormikContext } from 'formik';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  AddIcon,
  CloseIcon,
  Body,
  DescriptionIcon,
  ToolTipContainer,
} from '..';
import { getLabels } from '../../store/actions/climateWarehouseActions';

const StyledRepeatedComponentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  ${props => !props.disabled && `cursor: pointer;`};
`;

const FormikRepeater = ({
  empty,
  min = 1,
  max = 10,
  name,
  Component,
  tooltip,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const entriesArray = values[name] ? values[name] : [];
  const entriesNumber = entriesArray.length;
  const dispatch = useDispatch();

  // add necessary empty objects till min is reached
  useEffect(() => {
    if (entriesNumber < min) {
      const additionalEntries = [];
      while (additionalEntries.length < min - entriesNumber) {
        additionalEntries.push(_.cloneDeep(empty));
      }
      setFieldValue(name, [...entriesArray, ...additionalEntries]);
    }
  }, [values]);

  useEffect(() => {
    dispatch(getLabels());
  }, []);

  if (entriesNumber < min) {
    return null;
  }

  return (
    <div>
      <FieldArray
        name={name}
        render={arrayHelpers => (
          <div>
            {entriesNumber < max ? (
              <>
                <StyledRepeatedComponentContainer
                  onClick={() => arrayHelpers.push(_.cloneDeep(empty))}
                >
                  <AddIcon height={14} width={14} fill={'#1890FF'} />
                  <Body color="#1890ff">
                    <FormattedMessage id="click-to-add" />
                    {tooltip && (
                      <ToolTipContainer tooltip={tooltip}>
                        <DescriptionIcon height="14" width="20" />
                      </ToolTipContainer>
                    )}
                  </Body>
                </StyledRepeatedComponentContainer>
              </>
            ) : (
              <StyledRepeatedComponentContainer disabled>
                <AddIcon height={14} width={14} fill={'#d9d9d9'} />
                <Body color="#d9d9d9">
                  <FormattedMessage id="max-number-added" />
                </Body>
              </StyledRepeatedComponentContainer>
            )}
            {entriesArray?.length > 0 &&
              entriesArray.map((entry, index) => (
                <StyledRepeatedComponentContainer key={index}>
                  <Component name={name} index={index} key={index} />
                  <div onClick={() => arrayHelpers.remove(index)}>
                    <CloseIcon height={12} width={12} fill={'#1890FF'} />
                  </div>
                </StyledRepeatedComponentContainer>
              ))}
          </div>
        )}
      />
    </div>
  );
};

export { FormikRepeater };
