import _ from 'lodash';
import React from 'react';
import { Body, LinkIcon } from '../components';
import { getISODate } from './dateUtils';

export const handleClickLink = link => {
  if (link) {
    if (link.slice(0, 4) === 'http') {
      return link;
    } else {
      return 'http://' + link;
    }
  }
};

const stagingIssuanceViewInfo = (info, dataType, changeColor) => {
  const isDate = dataType.toLowerCase().includes('date');
  const changedValue = !isDate
    ? info[dataType]?.changes[0]
    : getISODate(info[dataType]?.changes[0]);
  const initialValue = !isDate
    ? info[dataType]?.original
    : getISODate(info[dataType]?.original);

  if (_.isEmpty(info[dataType]?.changes) && initialValue) {
    return <Body color={changeColor(dataType, 'INSERT')}>{initialValue}</Body>;
  } else if (changedValue && initialValue) {
    return (
      <>
        <Body color={changeColor(dataType, 'INSERT')}>{changedValue}</Body>
        <Body color={changeColor(dataType, 'DELETE')}>{initialValue}</Body>
      </>
    );
  } else if (changedValue === '' && initialValue) {
    return <Body>{initialValue}</Body>;
  }
};

const stagingDetailsViewInfo = (info, dataType, changeColor) => {
  const isDate = dataType.toLowerCase().includes('date');
  const changedValue = !isDate
    ? info?.changes[0]
    : getISODate(info?.changes[0]);
  const initialValue = !isDate ? info?.original : getISODate(info?.original);

  const changedValuesArray = info?.changes;
  const getChangedValue = value => (!isDate ? value : getISODate(value));

  if (dataType === 'creditingPeriodStart') {
    if (!_.isNull(changedValue)) {
      localStorage.setItem('addUnitCount', true);
    }
  } else if (dataType === 'label') {
    if (_.isNull(changedValue)) {
      localStorage.setItem('removeUnitQuantity', true);
    } else if (changedValue) {
      localStorage.setItem('addUnitQuantity', true);
    }
  }

  if (
    dataType === 'unitCount' &&
    localStorage.getItem('addUnitCount') &&
    _.isNull(changedValue) &&
    _.isNull(initialValue)
  ) {
    localStorage.removeItem('addUnitCount');
    return <Body color={changeColor(dataType, 'INSERT')}>{0}</Body>;
  } else if (
    dataType === 'unitQuantity' &&
    localStorage.getItem('removeUnitQuantity')
  ) {
    localStorage.removeItem('removeUnitQuantity');
    return (
      <Body color={changeColor(dataType, 'DELETE')}>{initialValue || 0}</Body>
    );
  } else if (
    localStorage.getItem('addUnitQuantity') &&
    dataType === 'unitQuantity' &&
    _.isEmpty(info?.changes)
  ) {
    localStorage.removeItem('addUnitQuantity');
    return <Body color={changeColor(dataType, 'INSERT')}>{0}</Body>;
  }

  if (
    _.isNumber(initialValue) ||
    _.isNumber(changedValue) ||
    _.includes(dataType, 'unitQuantity') ||
    _.includes(dataType, 'unitCount')
  ) {
    if (_.isEmpty(info?.changes) && (initialValue || _.isNull(initialValue))) {
      //New Staging Detail View Form (Number)
      return (
        <Body color={changeColor(dataType, 'INSERT')}>{initialValue || 0}</Body>
      );
    } else if (changedValue === '' && !_.isNull(changedValue) && initialValue) {
      //Staging Detail View No Changes (Number)
      return <Body>{initialValue || 0}</Body>;
    } else if (
      (changedValue && initialValue) ||
      (changedValue && _.isNull(initialValue))
    ) {
      //Staging Detail View Changes (Number)
      return (
        <>
          {changedValuesArray?.length &&
            changedValuesArray.map((x, index) => (
              <Body color={changeColor(dataType, 'INSERT')} key={index}>
                {getChangedValue(x) || 0}
              </Body>
            ))}
          <Body color={changeColor(dataType, 'DELETE')}>{initialValue}</Body>
        </>
      );
    } else if (
      _.isNull(changedValue && _.isNull(initialValue)) ||
      initialValue
    ) {
      //Staging Detail View Changes (Number)
      return (
        <Body color={changeColor(dataType, 'DELETE')}>{initialValue || 0}</Body>
      );
    } else {
      return <Body>{0}</Body>;
    }
  } else if (
    (_.isString(initialValue) ||
      _.isString(changedValue) ||
      _.isUndefined(info)) &&
    (!_.includes(dataType, 'unitQuantity') ||
      !_.includes(dataType, 'unitCount'))
  ) {
    if ((_.isEmpty(info?.changes) && initialValue) || _.isUndefined(info)) {
      //New Staging Detail View Form
      return (
        <Body color={changeColor(dataType, 'INSERT')}>
          {initialValue || '---'}
        </Body>
      );
    } else if (dataType === 'unitOwner' && changedValuesArray?.length > 2) {
      return (
        <>
          {changedValuesArray?.length &&
            changedValuesArray.map((x, index) => (
              <Body color={changeColor(dataType, 'INSERT')} key={index}>
                {getChangedValue(x) || initialValue}
              </Body>
            ))}
          <Body color={changeColor(dataType, 'DELETE')}>
            {initialValue || '---'}
          </Body>
        </>
      );
    } else if (_.isNull(changedValue) && initialValue) {
      return (
        <Body color={changeColor(dataType, 'DELETE')}>{initialValue}</Body>
      );
    } else if (
      (_.isEmpty(changedValue) && initialValue) ||
      (changedValue && info?.changes[1]) === ''
    ) {
      //Staging Detail View No Changes
      return <Body>{initialValue || '---'}</Body>;
    } else if (!_.isEmpty(info?.changes) && initialValue) {
      //Staging Detail View Changes
      return (
        <>
          {changedValuesArray?.length &&
            changedValuesArray.map((x, index) => (
              <Body color={changeColor(dataType, 'INSERT')} key={index}>
                {getChangedValue(x) || '---'}
              </Body>
            ))}
          <Body color={changeColor(dataType, 'DELETE')}>
            {initialValue || '---'}
          </Body>
        </>
      );
    } else if (_.isNull(initialValue) && !_.isEmpty(info?.changes)) {
      return (
        <>
          {changedValuesArray?.length &&
            changedValuesArray.map((x, index) => (
              <Body color={changeColor(dataType, 'INSERT')} key={index}>
                {getChangedValue(x) || '---'}
              </Body>
            ))}
        </>
      );
    }
  } else if (_.isNull(initialValue) && _.isNull(changedValue)) {
    return <Body>---</Body>;
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
          {info?.original ? (
            <a
              href={handleClickLink(info?.original)}
              target="_blank"
              rel="noreferrer noopener"
            >
              {info?.original}
              {info?.original && <LinkIcon height="15" width="30" />}
            </a>
          ) : (
            '---'
          )}
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
            rel="noreferrer noopener"
          >
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
            rel="noreferrer noopener"
          >
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
              rel="noreferrer noopener"
            >
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
                rel="noreferrer noopener"
              >
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
            rel="noreferrer noopener"
          >
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
              rel="noreferrer noopener"
            >
              {info?.changes[0]}
              {info?.changes[0] && <LinkIcon height="15" width="30" />}
            </a>
          </Body>
        </>
      );
    } else {
      return <Body>---</Body>;
    }
  }
};

export const detailsViewData = (type, detailData, dataType, changeColor) => {
  //all detail view data corresponding to dates
  if (type === 'data' && dataType.toLowerCase().includes('date')) {
    return (
      <Body>
        {detailData[dataType] ? getISODate(detailData[dataType]) : '---'}
      </Body>
    );
  }

  //all other detail view data
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
    return stagingIssuanceViewInfo(detailData, dataType, changeColor);
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
          rel="noreferrer noopener"
        >
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
