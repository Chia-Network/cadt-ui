import u from 'updeep';
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { relatedProjectSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  ToolTipContainer,
  DescriptionIcon,
  LabelContainer,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
} from '..';

const CreateRelatedProjectsForm = ({ value, onChange }) => {
  const [errorRelatedProjectMessage, setErrorRelatedProjectMessage] = useState(
    {},
  );
  const intl = useIntl();

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    setValidationErrors(
      relatedProjectSchema,
      value,
      setErrorRelatedProjectMessage,
    );
  }, [value]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="related-project-id" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'related-project-id',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'related-project-id',
                })}
                state={InputStateEnum.default}
                value={value.relatedProjectId}
                onChange={changeValue =>
                  onInputChange('relatedProjectId', changeValue)
                }
              />
              {errorRelatedProjectMessage?.relatedProjectId && (
                <Body size="Small" color="red">
                  {errorRelatedProjectMessage.relatedProjectId}
                </Body>
              )}
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
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'relationship-type',
                })}
                state={InputStateEnum.default}
                value={value.relationshipType}
                onChange={changeValue =>
                  onInputChange('relationshipType', changeValue)
                }
              />
              {errorRelatedProjectMessage?.relationshipType && (
                <Body size="Small" color="red">
                  {errorRelatedProjectMessage.relationshipType}
                </Body>
              )}
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
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({ id: 'registry' })}
                state={InputStateEnum.default}
                value={value.registry}
                onChange={changeValue => onInputChange('registry', changeValue)}
              />
              {errorRelatedProjectMessage?.registry && (
                <Body size="Small" color="red">
                  {errorRelatedProjectMessage.registry}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateRelatedProjectsForm };
