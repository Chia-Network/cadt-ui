import React, { memo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { FormikError } from '../form/FormikError';

import {
  InputVariantEnum,
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
  StandardInput,
  InputStateEnum,
  InputSizeEnum,
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
              {!pickLists?.cobenefits ? (
                <SelectCreatable
                  variant={
                    errors?.cobenefit && touched?.cobenefit
                      ? SimpleSelectVariantEnum.error
                      : undefined
                  }
                  options={pickLists?.cobenefits}
                  selected={value.cobenefit}
                  onChange={val =>
                    setFieldValue(getFieldName('cobenefit'), val)
                  }
                  onBlur={handleBlur}
                />
              ) : (
                <StandardInput
                  variant={
                    errors?.cobenefit && touched?.cobenefit
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({ id: 'co-benefit' })}
                  state={InputStateEnum.default}
                  value={value.cobenefit}
                  onChange={value =>
                    setFieldValue(getFieldName('cobenefit'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('cobenefit')}
                />
              )}
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
