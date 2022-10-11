import React from "react";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import './Header.css'

interface HeaderProps {
    title?: string;
    goBackArrow?: boolean;
}


export default function Header({title, goBackArrow} : HeaderProps){

    const navigateTo = useNavigate();

    return (
        <div className="HeaderDiv">
            <div className="HeaderArrowAndTitle">
                <div className="HeaderGoBackArrow" style={goBackArrow? {}:{display:"none"}}>
                    <ArrowLeft
                    width="30px"
                    height="30px"
                    onClick={() => navigateTo(-1)}
                    />
                </div>

                <div className="HeaderTitle" style={title? {}:{display:"none"}}>
                    <p>{title}</p>
                </div>
            </div>

            <div className="HeaderLogoSpace">
                <Link to="/">
                    <div className="HeaderLogo" />
                </Link>
            </div>
        </div>
    )
}
