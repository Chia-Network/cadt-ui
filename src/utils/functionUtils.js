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
  //all detail view data
  if (type === 'data') {
    return <Body>{detailData[dataType] ? detailData[dataType] : '---'}</Body>;
  }

  if (type === 'issuanceStagingData') {
    if (!_.isEmpty(detailData.changes)) {
      //show edited form data staging details
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData && detailData?.changes && detailData[detailData]}
        </Body>
      );
    } else if (
      _.some(detailData[dataType]?.changes) &&
      detailData[dataType]?.original
    ) {
      //show edited form data staging details
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
    } else if (
      detailData[dataType]?.changes[0] === null &&
      detailData[dataType]?.original
    ) {
      return (
        <>
          <Body color={changeColor(dataType, 'DELETE')}>
            <s>{detailData[dataType]?.original}</s>
          </Body>
        </>
      );
    } else {
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData && detailData[dataType].original}
        </Body>
      );
    }
  }

  if (type === 'stagingData') {
    if (
      (_.some(detailData[dataType]?.changes) &&
        detailData[dataType]?.original) ||
      (_.some(detailData[dataType]?.changes) && !detailData[dataType]?.original)
    ) {
      //show edited form data staging details
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
    } else if (
      _.isEmpty(detailData[dataType]?.changes) &&
      detailData[dataType]?.original
    ) {
      //show new form data to staging
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData && detailData[dataType] && detailData[dataType].original}
        </Body>
      );
    } else if (
      detailData[dataType]?.changes[0] === '' &&
      detailData[dataType]?.original
    ) {
      //show new form data not changed staging detail view
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData && detailData[dataType] && detailData[dataType].original}
        </Body>
      );
    } else {
      // show formdata that has no changes or original
      return <Body color={changeColor(dataType, 'INSERT')}>---</Body>;
    }
  }

  if (type === 'subformStagingData') {
    //show subform data that was deleted and not replaced in staging detail view
    if (
      detailData[dataType]?.changes[0] === null &&
      detailData[dataType]?.original
    ) {
      return (
        <>
          <Body color={changeColor(dataType, 'DELETE')}>
            <s>{detailData[dataType]?.original}</s>
          </Body>
        </>
      );
    } else if (detailData[dataType]?.changes[0] === '') {
      //show subform data that was kept and not deleted
      return (
        <>
          <Body color={changeColor(dataType, 'INSERT')}>
            {detailData[dataType]?.original}
          </Body>
        </>
      );
    } else if (
      detailData[dataType]?.original === null &&
      !_.isEmpty(detailData[dataType]?.changes)
    ) {
      //show new subform data in staging view
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData &&
            detailData[dataType] &&
            detailData[dataType].changes[0]}
        </Body>
      );
    } else if (
      !_.isEmpty(detailData[dataType]?.changes) &&
      !_.isEmpty(detailData[dataType]?.original)
    ) {
      //show subform changes in staging view

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
      //show subform original in staging view
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {detailData && detailData[dataType] && detailData[dataType].original}
        </Body>
      );
    }
  }

  if (type === 'link') {
    //show links for detail view
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
  if (type === 'subformStagingLink') {
    // show subform links changes
    if (
      !_.isEmpty(detailData[dataType]?.changes) &&
      detailData[dataType]?.changes[0] !== '' &&
      detailData[dataType]?.changes[0] !== null
    ) {
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
                : '---'}
              {(detailData[dataType].changes[0] && (
                <LinkIcon height="15" width="30" />
              )) ||
                (detailData[dataType].original && (
                  <LinkIcon height="15" width="30" />
                ))}
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
    } else if (
      detailData[dataType]?.changes[0] === '' &&
      detailData[dataType].original
    ) {
      //subform links that are not deleted
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(detailData[dataType]?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {detailData[dataType]?.original
              ? detailData[dataType].original
              : '---'}
            {detailData[dataType]?.original && (
              <LinkIcon height="15" width="30" />
            )}
          </a>
        </Body>
      );
    } else if (_.isEmpty(detailData[dataType]?.changes)) {
      //show new subforms links in staging detail view
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(detailData[dataType]?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {detailData[dataType]?.original
              ? detailData[dataType].original
              : '---'}
            {detailData[dataType]?.original && (
              <LinkIcon height="15" width="30" />
            )}
          </a>
        </Body>
      );
    } else if (detailData[dataType]?.changes[0] === null) {
      // show deleted subform links
      return (
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
      );
    }
  }

  if (type === 'stagingLink') {
    if (
      !_.isEmpty(detailData[dataType]?.changes) &&
      _.some(detailData[dataType]?.changes)
    ) {
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
              {(detailData[dataType].changes[0] && (
                <LinkIcon height="15" width="30" />
              )) ||
                (detailData[dataType].original && (
                  <LinkIcon height="15" width="30" />
                ))}
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
    } else if (
      detailData[dataType]?.changes[0] === '' &&
      detailData[dataType].original
    ) {
      //subform links that are not deleted
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(detailData[dataType]?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {detailData[dataType]?.original
              ? detailData[dataType].original
              : '---'}
            {detailData[dataType]?.original && (
              <LinkIcon height="15" width="30" />
            )}
          </a>
        </Body>
      );
    } else if (!_.some(detailData[dataType]?.changes)) {
      return <Body color={changeColor(dataType, 'INSERT')}>---</Body>;
    } else {
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(detailData[dataType]?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {detailData[dataType]?.original
              ? detailData[dataType].original
              : '---'}
            {detailData[dataType]?.original && (
              <LinkIcon height="15" width="30" />
            )}
          </a>
        </Body>
      );
    }
  }

  return null;
};
