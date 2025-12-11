
import React from 'react';

// Friendly Moose Illustration
export const Moose = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Friendly Finnish Moose"
  >
    {/* Body */}
    <path d="M100 120C100 120 120 180 140 190" stroke="#8B5E3C" strokeWidth="12" strokeLinecap="round"/>
    <path d="M100 120C100 120 80 180 60 190" stroke="#8B5E3C" strokeWidth="12" strokeLinecap="round"/>
    <ellipse cx="100" cy="110" rx="35" ry="45" fill="#A06B46" />
    
    {/* Head */}
    <ellipse cx="100" cy="60" rx="40" ry="35" fill="#A06B46" />
    <path d="M90 70 Q100 80 110 70" stroke="#3E2723" strokeWidth="3" fill="none"/>
    <circle cx="85" cy="55" r="4" fill="#3E2723"/>
    <circle cx="115" cy="55" r="4" fill="#3E2723"/>
    
    {/* Antlers */}
    <path d="M65 40 C 40 10, 20 40, 30 60" stroke="#E6C8A0" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M135 40 C 160 10, 180 40, 170 60" stroke="#E6C8A0" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M50 30 L 55 20" stroke="#E6C8A0" strokeWidth="6" strokeLinecap="round"/>
    <path d="M150 30 L 145 20" stroke="#E6C8A0" strokeWidth="6" strokeLinecap="round"/>

    {/* Speech Bubble */}
    <g transform="translate(130, 20)">
        <path d="M0 0 H50 A10 10 0 0 1 60 10 V30 A10 10 0 0 1 50 40 H10 L0 50 V10 A10 10 0 0 1 0 0 Z" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
        <text x="30" y="25" fontSize="14" fontWeight="bold" fill="#374151" textAnchor="middle">Moi!</text>
    </g>
  </svg>
);

// Helpful Rabbit Illustration
export const Rabbit = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Reading Rabbit"
  >
    {/* Ears */}
    <ellipse cx="80" cy="50" rx="10" ry="30" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
    <ellipse cx="120" cy="50" rx="10" ry="30" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
    
    {/* Head */}
    <circle cx="100" cy="90" r="35" fill="white" stroke="#D1D5DB" strokeWidth="2" />
    <circle cx="90" cy="85" r="3" fill="#374151"/>
    <circle cx="110" cy="85" r="3" fill="#374151"/>
    <path d="M95 95 Q100 100 105 95" stroke="#374151" strokeWidth="2" fill="none"/>
    
    {/* Body */}
    <path d="M75 120 Q60 150 70 180 H130 Q140 150 125 120" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
    
    {/* Book */}
    <rect x="80" y="140" width="40" height="30" fill="#F59E0B" rx="2" />
    <path d="M100 140 V170" stroke="#B45309" strokeWidth="1"/>
    
    {/* Arms holding book */}
    <ellipse cx="75" cy="150" rx="8" ry="15" fill="white" stroke="#D1D5DB" strokeWidth="2" transform="rotate(20 75 150)"/>
    <ellipse cx="125" cy="150" rx="8" ry="15" fill="white" stroke="#D1D5DB" strokeWidth="2" transform="rotate(-20 125 150)"/>
  </svg>
);
