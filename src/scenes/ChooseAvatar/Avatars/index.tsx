import React from "react";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';

export default function Avatars(){

    const avatar = createAvatar(style, {
        seed: 'custom-seed',
      });
    
    return avatar;
}