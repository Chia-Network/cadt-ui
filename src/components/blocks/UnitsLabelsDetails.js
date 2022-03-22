import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
  handleClickLink,
} from '.';
import { SpanTwoColumnsContainer, LinkIcon } from '..';

const UnitsLabelsDetails = ({ data, changeColor }) => {
 
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="label" />
            </Body>
            {!data.label?.original ? (
              <Body>{data.label ? data.label : '---'}</Body>
            ) : (
              <Body color={changeColor('label')}>{data.label?.original}</Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="label-type" />
            </Body>
            {!data.labelType?.original ? (
              <Body>{data.labelType ? data.labelType : '---'}</Body>
            ) : (
              <Body color={changeColor('labelType')}>
                {data.labelType?.original}
              </Body>
            )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="label-link" />
              </Body>
              {!data.labelLink?.original ? (
                <Body>
                  <a
                    href={handleClickLink(data.labelLink)}
                    target="_blank"
                    rel="noreferrer noopener">
                    {data.labelLink ? data.labelLink : '---'}
                    {data.labelLink && <LinkIcon height="15" width="30" />}
                  </a>
                </Body>
              ) : (
                <Body color={changeColor('labelLink')}>
                  <a
                    href={handleClickLink(data.labelLink?.original)}
                    target="_blank"
                    rel="noreferrer noopener">
                    {data.labelLink?.original
                      ? data.labelLink?.original
                      : '---'}
                    {data.labelLink?.original && (
                      <LinkIcon height="15" width="30" />
                    )}
                  </a>
                </Body>
              )}
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validity-period-start-date" />
            </Body>
            {!data.validityPeriodStartDate?.original ? (
              <Body>
                {data.validityPeriodStartDate
                  ? data.validityPeriodStartDate
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('validityPeriodStartDate')}>
                {data.validityPeriodStartDate?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validity-period-end-date" />
            </Body>
            {!data.validityPeriodEndDate?.original ? (
              <Body>
                {data.validityPeriodEndDate
                  ? data.validityPeriodEndDate
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('validityPeriodEndDate')}>
                {data.validityPeriodEndDate?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="crediting-period-start-date" />
            </Body>
            {!data.creditingPeriodStartDate?.original ? (
              <Body>
                {data.creditingPeriodStartDate
                  ? data.creditingPeriodStartDate
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('creditingPeriodStartDate')}>
                {data.creditingPeriodStartDate?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="crediting-period-end-date" />
            </Body>
            {!data.creditingPeriodEndDate?.original ? (
              <Body>
                {data.creditingPeriodEndDate
                  ? data.creditingPeriodEndDate
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('creditingPeriodEndDate')}>
                {data.creditingPeriodEndDate?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-quantity" />
            </Body>
            {Object.keys(data.unitQuantity)[0] !== 'original' ? (
              <Body>{data.unitQuantity && data.unitQuantity}</Body>
            ) : (
              <Body color={changeColor('unitQuantity')}>
                {data.unitQuantity?.original || 0}
              </Body>
            )}
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsLabelsDetails };
