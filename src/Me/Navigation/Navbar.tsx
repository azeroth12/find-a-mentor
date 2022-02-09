import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/Link';
import classNames from 'classnames';
import styled from 'styled-components/macro';

import { mobile, desktop } from '../styles/shared/devices';
import messages from '../../messages';
import IconHome from '../../assets/me/home.svg';
import Mentorships from '../../assets/me/icon-survey.svg';
import IconMentors from '../../assets/me/mentors.svg';
import IconLogout from '../../assets/me/icon-door-exit.svg';
import { useUser } from '../../context/userContext/UserContext';

const MenuItem = ({
  icon: Icon,
  label,
  to,
}: {
  icon: React.FunctionComponent;
  label: string;
  to: string;
}) => {
  const router = useRouter();
  return (
    <Link href={to}>
      <NavItemDecoration className={classNames({ active: router.pathname === to })}>
        <Icon />
        <Label>{label}</Label>
      </NavItemDecoration>
    </Link>
  );
};

const Navbar = () => {
  const { isAdmin, logout } = useUser();
  const router = useRouter();
  return (
    <>
      <Menu>
        <Logo
          src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}/codingcoach-logo-192.png`}
          alt="Logo"
        />
        <MenuItem to="/me" icon={IconHome} label="Home" />
        <MenuItem to="/me/requests" icon={Mentorships} label="Mentorships" />
        <MenuItem to="/" icon={IconMentors} label="Mentors" />
        {isAdmin && (
          <MenuItem to="/me/admin" icon={IconMentors} label="Admin" />
        )}
        <Link href={
            router.pathname.includes('/me')
            ? '/'
            : router.pathname
          }>
        <Logout
          
          onClick={logout}
          >
          <IconLogout />
          <Label>{messages.LOGOUT}</Label>
        </Logout>
          </Link>
      </Menu>
    </>
  );
};

export default Navbar;
export const mobileNavHeight = 74;

const Menu = styled.nav`
  position: fixed;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

  @media ${desktop} {
    height: 100%;
    width: 85px;
    top: 0;
  }

  @media ${mobile} {
    height: ${mobileNavHeight}px;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 1;

    > * {
      flex: 1;
    }
  }
`;

const NavItemDecoration = styled.a`
  display: block;
  text-align: center;
  text-decoration: none;

  @media ${desktop} {
    margin-bottom: 38px;
  }

  > svg {
    width: 44px;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 100%;
  margin-bottom: 70px;

  @media ${mobile} {
    display: none;
  }
`;

const Label = styled.div`
  color: #4a4a4a;
`;

const Logout = styled(NavItemDecoration)`
  @media ${desktop} {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 10px;
  }
`;
