import React, { memo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { FormikError } from '../form/FormikError';

import {
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  Body,
  ToolTipContainer,
  DescriptionIcon,
  LabelContainer,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SelectCreatable,
  SimpleSelectVariantEnum,
} from '..';

// eslint-disable-next-line react/display-name
const ProjectCoBenefitForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const { pickLists } = useSelector(state => state.climateWarehouse);
    const intl = useIntl();
    const getFieldName = fieldName => `${name}[${index}].${fieldName}`;

    return (
      <ModalFormContainerStyle>
        <FormContainerStyle>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="co-benefit" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'cobenefits-cobenefit-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SelectCreatable
                variant={
                  errors?.cobenefit && touched?.cobenefit
                    ? SimpleSelectVariantEnum.error
                    : undefined
                }
                options={pickLists?.coBenefits}
                selected={value.cobenefit}
                onChange={val => setFieldValue(getFieldName('cobenefit'), val)}
                onBlur={handleBlur}
              />
              <FormikError name={getFieldName('cobenefit')} />
            </InputContainer>
          </StyledFieldContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectCoBenefitForm };
