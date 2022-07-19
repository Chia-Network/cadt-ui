import React, { memo, useCallback } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { FormikError } from '../form/FormikError';

import {
  StandardInput,
  InputSizeEnum,
  InputVariantEnum,
  InputStateEnum,
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
} from '..';

// eslint-disable-next-line react/display-name
const ProjectRelatedProjectForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const intl = useIntl();
    const getFieldName = useCallback(
      fieldName => `${name}[${index}].${fieldName}`,
      [name, index],
    );

    return (
      <ModalFormContainerStyle>
        <FormContainerStyle>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="related-project-id" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'related-projects-related-project-id-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors?.relatedProjectId && touched?.relatedProjectId
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'related-project-id',
                })}
                state={InputStateEnum.default}
                value={value.relatedProjectId}
                onChange={value =>
                  setFieldValue(getFieldName('relatedProjectId'), value)
                }
                onBlur={handleBlur}
                name={getFieldName('relatedProjectId')}
              />
              <FormikError name={getFieldName('relatedProjectId')} />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="relationship-type" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'related-projects-relationship-type-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors?.relationshipType && touched?.relationshipType
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'relationship-type',
                })}
                state={InputStateEnum.default}
                value={value.relationshipType}
                onChange={value =>
                  setFieldValue(getFieldName('relationshipType'), value)
                }
                onBlur={handleBlur}
                name={getFieldName('relationshipType')}
              />
              <FormikError name={getFieldName('relationshipType')} />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="registry" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'related-projects-registry-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors?.registry && touched?.registry
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({ id: 'registry' })}
                state={InputStateEnum.default}
                value={value.registry}
                onChange={value =>
                  setFieldValue(getFieldName('registry'), value)
                }
                onBlur={handleBlur}
                name={getFieldName('registry')}
              />
              <FormikError name={getFieldName('registry')} />
            </InputContainer>
          </StyledFieldContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectRelatedProjectForm };
