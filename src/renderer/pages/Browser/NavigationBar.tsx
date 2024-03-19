import { noop } from 'lodash';
import React, { useCallback } from 'react';
import {
  Button,
  ButtonGroup,
  TextInput,
} from 'flowbite-react';
import styled from 'styled-components';
import {
  HiHome,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiRefresh,
  HiSearch,
} from 'react-icons/hi';
import { OwnedStoresDropDown } from '@/components';

const navButtonColor: string = 'light';
const navButtonIconSize: string = '15pt';

const NavigationBarDiv = styled('div')`
  display: flex;
  justify-content: left;
`;

const NavButtonGroup = styled(ButtonGroup)`
  gap: 5px;
  margin: 10px;
  width: 500px;
`;

const StyledTextInput = styled(TextInput)`
  padding: 10px;
  width: 100%;
  justify-content: center;
`;

const StyledNavButton = styled(Button)`
  border: none;
`;

interface NavButton {
  onClick: () => void;
}

const BackButton: React.FC<NavButton> = ({ onClick }) => {
  return (
    <StyledNavButton onClick={onClick} color={navButtonColor}>
      <HiChevronDoubleLeft fontSize={navButtonIconSize} />
    </StyledNavButton>
  );
};

const ForwardButton: React.FC<NavButton> = ({ onClick }) => {
  return (
    <StyledNavButton onClick={onClick} color={navButtonColor}>
      <HiChevronDoubleRight fontSize={navButtonIconSize} />
    </StyledNavButton>
  );
};

const HomeButton: React.FC<NavButton> = ({ onClick }) => {
  return (
    <StyledNavButton onClick={onClick} color={navButtonColor}>
      <HiHome fontSize={navButtonIconSize} />
    </StyledNavButton>
  );
};

const RefreshButton: React.FC<NavButton> = ({ onClick }) => {
  return (
    <StyledNavButton onClick={onClick} color={navButtonColor}>
      <HiRefresh fontSize={navButtonIconSize} />
    </StyledNavButton>
  );
};

interface NavigationBarProps {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  onEnterDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    url?: string,
  ) => void;
  onRefresh: () => void;
  onBack: () => void;
  onForward: () => void;
  onHome: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  value,
  onChange,
  onRefresh,
  onBack,
  onForward,
  onHome,
  onEnterDown = noop
}) => {
  const handleOnEnterKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnterDown();
      }
    },
    [onEnterDown],
  );

  return (
    <>
      <NavigationBarDiv>
        <NavButtonGroup>
          <BackButton onClick={onBack} />
          <ForwardButton onClick={onForward} />
          <RefreshButton onClick={onRefresh} />
          <HomeButton onClick={onHome} />
        </NavButtonGroup>
        <StyledTextInput
          value={value}
          onChange={onChange}
          onKeyDown={handleOnEnterKeyDown}
          icon={HiSearch}
        />
        <OwnedStoresDropDown onSelected={onEnterDown} />
      </NavigationBarDiv>
    </>
  );
};

export { NavigationBar };
