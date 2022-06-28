import _ from 'lodash';
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
  SimpleSelect,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  StandardInput,
  InputStateEnum,
  InputSizeEnum,
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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              {!_.isEmpty(pickLists?.cobenefits) ? (
                <SimpleSelect
                  width="100%"
                  addInput={intl.formatMessage({ id: 'co-benefit' })}
                  variant={
                    errors?.cobenefit && touched?.cobenefit
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={SimpleSelectSizeEnum.large}
                  type={SimpleSelectTypeEnum.basic}
                  options={pickLists?.cobenefits}
                  state={SimpleSelectStateEnum.default}
                  selected={value.cobenefit ? [value.cobenefit] : undefined}
                  onChange={selectedOptions =>
                    setFieldValue(getFieldName('cobenefit'), selectedOptions[0])
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
