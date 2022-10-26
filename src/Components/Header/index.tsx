import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  logo?: boolean;
  title?: string;
  goBackArrow?: boolean;
  settingsPage?: string;
}

export default function Header({
  logo,
  title,
  goBackArrow,
  settingsPage,
}: HeaderProps) {
  const navigateTo = useNavigate();

  return (
    <div className="HeaderDiv">
      <div className="HeaderArrowAndTitle">
        <div
          className="HeaderGoBackArrow"
          style={goBackArrow ? {} : { display: 'none' }}>
          <ArrowLeft
            width="30px"
            height="30px"
            onClick={() => navigateTo(-1)}
          />
        </div>

        <div className="HeaderTitle" style={title ? {} : { display: 'none' }}>
          <p>{title}</p>
        </div>
      </div>

      <div className="HeaderSettingsAndLogo">
        <div
          className="HeaderSettings"
          style={settingsPage ? {} : { display: 'none' }}>
          <Settings
            width="22px"
            height="22px"
            onClick={() => navigateTo(settingsPage)}
          />
        </div>
        <div
          className="HeaderLogoSpace"
          style={logo ? {} : { display: 'none' }}>
          <Link to="/">
            <div className="HeaderLogo" />
          </Link>
        </div>
      </div>
    </div>
  );
}
