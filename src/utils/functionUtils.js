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

const stagingDetailsViewInfo = (info, dataType, changeColor) => {
  if (
    (_.isNumber(info?.original) ||
      _.isNumber(info?.changes[0]) ||
      _.includes(dataType, 'unitQuantity') ||
      _.includes(dataType, 'unitCount')) &&
    !_.includes(dataType, 'vintageYear')
  ) {
    if (
      _.isEmpty(info?.changes) &&
      (info?.original || _.isNull(info?.original))
    ) {
      //New Staging Detail View Form (Number)
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {info?.original || 0}
        </Body>
      );
    } else if (_.isEmpty(info?.changes[0]) && info?.original) {
      //Staging Detail View No Changes (Number)
      return <Body>{info?.original || 0}</Body>;
    } else if (
      (!_.isEmpty(info?.changes) && info?.original) ||
      (info?.changes[0] && _.isNull(info?.original)) ||
      (_.isNull(info?.changes[0]) && info?.original)
    ) {
      //Staging Detail View Changes (Number)
      return (
        <>
          <Body color={changeColor(dataType, 'INSERT')}>
            {info?.changes[0] || 0}
          </Body>
          <Body color={changeColor(dataType, 'DELETE')}>{info?.original}</Body>
        </>
      );
    } else if (_.isNull(info?.changes[0]) && _.isNull(info?.original)) {
      //Staging Detail View Changes (Number)
      return (
        <Body color={changeColor(dataType, 'DELETE')}>
          {info?.original || 0}
        </Body>
      );
    } else {
      return <Body>{0}</Body>;
    }
  } else if (
    (_.isString(info?.original) ||
      _.isString(info?.changes[0]) ||
      _.isUndefined(info)) &&
    (!_.includes(dataType, 'unitQuantity') ||
      !_.includes(dataType, 'unitCount'))
  ) {
    if ((_.isEmpty(info?.changes) && info?.original) || _.isUndefined(info)) {
      //New Staging Detail View Form
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {info?.original || '---'}
        </Body>
      );
    } else if (_.isNull(info?.changes[0]) && info?.original) {
      return (
        <Body color={changeColor(dataType, 'DELETE')}>{info?.original}</Body>
      );
    } else if (_.isEmpty(info?.changes[0]) && info?.original) {
      //Staging Detail View No Changes
      return <Body>{info?.original}</Body>;
    } else if (!_.isEmpty(info?.changes) && info?.original) {
      //Staging Detail View Changes
      return (
        <>
          <Body color={changeColor(dataType, 'INSERT')}>
            {info?.changes[0] || '---'}
          </Body>
          <Body color={changeColor(dataType, 'DELETE')}>
            {info?.original || '---'}
          </Body>
        </>
      );
    } else if (_.isNull(info?.original) && !_.isEmpty(info?.changes)) {
      return (
        <Body color={changeColor(dataType, 'INSERT')}>{info?.changes[0]}</Body>
      );
    }
  } else if (_.isNull(info?.original) && _.isNull(info?.changes[0])) {
    return <Body>---</Body>;
  } else if (
    info?.changes &&
    info?.changes[0] &&
    info?.changes[0][dataType] &&
    _.isNull(info?.original) 
  ) {
    return (
      <Body color={changeColor(dataType, 'INSERT')}>
        {info?.changes[0][dataType] || info?.original[0][dataType]}
      </Body>
    );
  } else if (
    info?.changes &&
    info?.changes[0] &&
    info?.changes[0][dataType] &&
    info?.original &&
    info?.original[0] &&
    info?.original[0][dataType]
  ) {
    return (
      <>
        <Body color={changeColor(dataType, 'INSERT')}>
          {info?.changes[0][dataType]}
        </Body>
        <Body color={changeColor(dataType, 'DELETE')}>
          {info?.original[0][dataType]}
        </Body>
      </>
    );
  }
};

const stagingDetailsViewLinkInfo = (info, dataType, changeColor) => {
  // show subform links changes
  if (
    _.isString(info?.original) ||
    _.isString(info?.changes[0]) ||
    _.isUndefined(info)
  ) {
    if ((_.isEmpty(info?.changes) && info?.original) || _.isUndefined(info)) {
      //New Staging Detail View Form
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(info?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {info?.original}
            {info?.original && <LinkIcon height="15" width="30" />}
          </a>
        </Body>
      );
    } else if (_.isNull(info?.changes[0]) && info?.original) {
      //Staging Detail View No Changes
      return (
        <Body>
          <a
            style={{ color: 'red' }}
            href={handleClickLink(info?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {info?.original}
            {info?.original && <LinkIcon height="15" width="30" />}
          </a>
        </Body>
      );
    } else if (_.isEmpty(info?.changes[0]) && info?.original) {
      //Staging Detail View No Changes
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          <a
            href={handleClickLink(info?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {info?.original}
            {info?.original && <LinkIcon height="15" width="30" />}
          </a>
        </Body>
      );
    } else if (!_.isEmpty(info?.changes) && info?.original) {
      //Staging Detail View Changes
      return (
        <>
          <Body color={changeColor(dataType, 'INSERT')}>
            <a
              href={handleClickLink(info?.changes[0] || info?.original)}
              target="_blank"
              rel="noreferrer noopener">
              {info.changes[0] ? info.changes[0] : '---'}
              {(info.changes[0] && <LinkIcon height="15" width="30" />) ||
                (info.original && <LinkIcon height="15" width="30" />)}
            </a>
          </Body>
          {info?.changes[0] && info?.original && (
            <Body>
              <a
                style={{ color: 'red' }}
                href={handleClickLink(info?.original)}
                target="_blank"
                rel="noreferrer noopener">
                {info?.original}
                {info?.original && <LinkIcon height="15" width="30" />}
              </a>
            </Body>
          )}
        </>
      );
    } else if (!_.isEmpty(info?.original) && !_.isNull(info?.changes)) {
      return (
        <Body>
          <a
            style={{ color: 'red' }}
            href={handleClickLink(info?.changes[0] || info?.original)}
            target="_blank"
            rel="noreferrer noopener">
            {info?.changes[0]}
            {info?.changes[0] && <LinkIcon height="15" width="30" />}
          </a>
        </Body>
      );
    } else if (!_.isEmpty(info?.changes[0]) && _.isNull(info?.original)) {
      return (
        <>
          <Body>
            <a
              href={handleClickLink(info?.changes[0])}
              target="_blank"
              rel="noreferrer noopener">
              {info?.changes[0]}
              {info?.changes[0] && <LinkIcon height="15" width="30" />}
            </a>
          </Body>
        </>
      );
    }
  }
};

export const detailsViewData = (type, detailData, dataType, changeColor) => {
  //all detail view data
  if (type === 'data') {
    return (
      <Body>
        {detailData[dataType]
          ? detailData[dataType]
          : dataType === 'unitCount' || dataType === 'unitQuantity'
          ? 0
          : '---'}
      </Body>
    );
  }

  if (type === 'issuanceStagingData') {
    return stagingDetailsViewInfo(detailData, dataType, changeColor);
  }

  if (type === 'stagingData') {
    return stagingDetailsViewInfo(detailData[dataType], dataType, changeColor);
  }

  if (type === 'subformStagingData') {
    return stagingDetailsViewInfo(detailData[dataType], dataType, changeColor);
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
    return stagingDetailsViewLinkInfo(
      detailData[dataType],
      dataType,
      changeColor,
    );
  }

  if (type === 'stagingLink') {
    return stagingDetailsViewLinkInfo(
      detailData[dataType],
      dataType,
      changeColor,
    );
  }

  return null;
};
