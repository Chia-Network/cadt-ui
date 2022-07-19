import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { validateUrl } from '../../utils/urlUtils';

const StyledImg = styled('img')`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const StyledSvgContainer = styled('div')`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 100px;
    height: 100px;
  }
`;

const LogoTypeEnum = {
  svg: 'svg',
  url: 'url',
  pngObject: 'pngObject',
  pngBase64: 'pngBase64',
};

const OrganizationLogo = ({ logo }) => {
  const createMarkup = icon => {
    return { __html: icon };
  };

  const getLogoType = useCallback(logo => {
    if (logo && typeof logo === 'object') {
      return LogoTypeEnum.pngObject;
    } else if (logo?.includes('data:image/png;base64')) {
      return LogoTypeEnum.pngBase64;
    } else if (logo?.includes('<svg')) {
      return LogoTypeEnum.svg;
    } else if (logo && validateUrl(logo)) {
      return LogoTypeEnum.url;
    }
    return undefined;
  }, []);

  const logoType = useMemo(() => getLogoType(logo), [logo]);

  if (logoType === LogoTypeEnum.pngObject)
    return <StyledImg src={URL.createObjectURL(logo)} />;

  if (logoType === LogoTypeEnum.pngBase64 || logoType === LogoTypeEnum.url)
    return <StyledImg src={logo} />;

  if (logoType === LogoTypeEnum.svg)
    return <StyledSvgContainer dangerouslySetInnerHTML={createMarkup(logo)} />;

  return null;
};

export { OrganizationLogo };
