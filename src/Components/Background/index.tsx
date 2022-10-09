import React from "react";
import './Background.css';

export default function(props: any){
    return (
        <div className="AppBackground">
            {props.children}
        </div>
    )
}