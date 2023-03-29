import React from 'react';

export default function OpenMenu() {
    const menuBar = document.getElementById('menuBar');
    const menuBarContent = document.getElementById('menuBarContent');
    menuBar.style.opacity = '1';
    menuBar.style.visibility = 'visible';
    menuBarContent.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
}