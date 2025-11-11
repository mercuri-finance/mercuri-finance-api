import React from 'react';

interface Props {
  children: string;
}

export function GreenDotsText({ children }: Props) {
  return (
    <>
      {children.split('').map((char, index) =>
        char === '.' ? (
          <span key={index} style={{ color: '#18b275' }}>
            {char}
          </span>
        ) : (
          <React.Fragment key={index}>{char}</React.Fragment>
        )
      )}
    </>
  );
}
