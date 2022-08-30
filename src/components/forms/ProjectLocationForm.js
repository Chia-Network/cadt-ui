import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputVariantEnum,
  InputStateEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  ToolTipContainer,
  DescriptionIcon,
  LabelContainer,
  SimpleSelectVariantEnum,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SelectCreatable,
  FormikError,
} from '..';
import { getFileList } from '../../store/actions/climateWarehouseActions';

// eslint-disable-next-line react/display-name
const ProjectLocationForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const intl = useIntl();
    const getFieldName = useCallback(
      fieldName => `${name}[${index}].${fieldName}`,
      [index, name],
    );
    const { pickLists, fileList } = useSelector(
      store => store.climateWarehouse,
    );
    const dispatch = useDispatch();

    const fileListPickList = useMemo(
      () =>
        fileList?.map(item => ({ label: item.fileName, value: item.SHA256 })) ??
        [],
      [fileList],
    );

    const sha256ToFileName = useMemo(
      () =>
        fileList?.reduce(
          (acc, cur) => ({ ...acc, [cur.SHA256]: cur.fileName }),
          {},
        ) ?? [],
      [fileList],
    );

    useEffect(() => dispatch(getFileList()), []);

    return (
      <ModalFormContainerStyle>
        <FormContainerStyle>
          <BodyContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="host-country" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'locations-country-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <SelectCreatable
                  variant={
                    errors?.country &&
                    touched?.country &&
                    SimpleSelectVariantEnum.error
                  }
                  options={pickLists.countries}
                  selected={value.country}
                  onChange={val => setFieldValue(getFieldName('country'), val)}
                  onBlur={handleBlur}
                />
                <FormikError name={getFieldName('country')} />
              </InputContainer>
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    <FormattedMessage id="in-country-region" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'locations-in-country-region-description',
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
                    id: 'in-country-region',
                  })}
                  state={InputStateEnum.default}
                  value={value.inCountryRegion}
                  onChange={value =>
                    setFieldValue(getFieldName('inCountryRegion'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('inCountryRegion')}
                />
                <FormikError name={getFieldName('inCountryRegion')} />
              </InputContainer>
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="geographic-identifier" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'locations-geographic-identifier-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  variant={
                    errors?.geographicIdentifier &&
                    touched?.geographicIdentifier
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'geographic-identifier',
                  })}
                  state={InputStateEnum.default}
                  value={value.geographicIdentifier}
                  onChange={value =>
                    setFieldValue(getFieldName('geographicIdentifier'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('geographicIdentifier')}
                />
                <FormikError name={getFieldName('geographicIdentifier')} />
              </InputContainer>
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    <FormattedMessage id="gis-file" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'gis-file-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <SelectCreatable
                  variant={
                    errors?.country &&
                    touched?.country &&
                    SimpleSelectVariantEnum.error
                  }
                  options={fileListPickList}
                  selected={
                    value.fileId
                      ? {
                          value: value.fileId,
                          label: sha256ToFileName[value.fileId],
                        }
                      : null
                  }
                  onChange={selected =>
                    setFieldValue(getFieldName('fileId'), selected.value)
                  }
                  onBlur={handleBlur}
                  isCreatable={false}
                  isOfValueLabelType={true}
                />
                <FormikError name={getFieldName('fileId')} />
              </InputContainer>
            </StyledFieldContainer>
          </BodyContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectLocationForm };
