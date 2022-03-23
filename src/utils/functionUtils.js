import _ from 'lodash';
import React from 'react';
import { Body, LinkIcon } from '../components';

export const handleClickLink = link => {
  if (link) {
    if (link.slice(0, 4) === 'http') {
      return link;
    } else {
      return 'http://' + link;
    }
  }
};

export const detailsViewData = (type, detailData, dataType, changeColor) => {
  if (detailData.changes) {
    if (!detailData?.changes[0]) {
      return null;
    }
    return (
      <Body color={changeColor(dataType, 'INSERT')}>
        {!detailData?.changes[0] ? detailData.changes[0][dataType] : '---'}
      </Body>
    );
  } else if (type === 'data' || !detailData[dataType]) {
    return <Body>{detailData[dataType] ? detailData[dataType] : '---'}</Body>;
  }

  if (type === 'stagingData') {
    if (
      !_.isEmpty(detailData[dataType]?.changes) &&
      detailData[dataType]?.changes[0]
    ) {
      return (
        <>
          <Body color={changeColor(dataType, 'INSERT')}>
            {detailData[dataType]?.changes[0]}
          </Body>
          <Body color={changeColor(dataType, 'DELETE')}>
            <s>{detailData[dataType]?.original}</s>
          </Body>
        </>
      );
    } else {
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData && detailData[dataType] && detailData[dataType].original}
        </Body>
      );
    }
  }

  if (type === 'link') {
    return (
      <Body>
        <a
          href={handleClickLink(detailData[dataType])}
          target="_blank"
          rel="noreferrer noopener">
          {detailData[dataType] ? detailData[dataType] : '---'}
          {detailData[dataType] && <LinkIcon height="15" width="30" />}
        </a>
      </Body>
    );
  }

  if (type === 'stagingLink') {
    if (!_.isEmpty(detailData[dataType]?.changes)) {
      return (
        <>
          <Body color={changeColor(dataType, 'INSERT')}>
            <a
              href={handleClickLink(
                detailData[dataType]?.changes[0] ||
                  detailData[dataType]?.original,
              )}
              target="_blank"
              rel="noreferrer noopener">
              {detailData[dataType].changes[0]
                ? detailData[dataType].changes[0]
                : '---' && detailData[dataType].original}
              {detailData[dataType].changes[0] && (
                  <LinkIcon height="15" width="30" />
                ) ||
                detailData[dataType].original && (
                  <LinkIcon height="15" width="30" />
                )}
            </a>
          </Body>
          {detailData[dataType]?.changes[0] && detailData[dataType]?.original && (
            <Body color={changeColor(dataType, 'DELETE')}>
              <s>
                <a
                  href={handleClickLink(detailData[dataType]?.original)}
                  target="_blank"
                  rel="noreferrer noopener">
                  {detailData[dataType].original
                    ? detailData[dataType].original
                    : '---'}
                  {detailData[dataType].original && (
                    <LinkIcon height="15" width="30" />
                  )}
                </a>
              </s>
            </Body>
          )}
        </>
      );
    } else {
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(detailData[dataType]?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {detailData[dataType].original
              ? detailData[dataType].original
              : '---'}
            {detailData[dataType].original && (
              <LinkIcon height="15" width="30" />
            )}
          </a>
        </Body>
      );
    }
  }

  return null;
};
