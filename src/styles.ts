import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: #fff;
    background: #0a0e12;
    line-height: 1.6;
    letter-spacing: 0.05em;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 1rem;
    line-height: 1.2;
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  h5 {
    color: #e3ffc1;
  }

  p {
    margin: 0 0 1.25rem;
    line-height: 1.6;
    letter-spacing: 0.05em;
    color: #a5afc0;
    font-weight: 300;
  }

  a {
    color: #e3ffc1;
    text-decoration: none;
    font-weight: 300;
    transition: color 0.2s ease;

    &:hover {
      color: #ffffff;
    }
  }

  code {
    background: #1a1f26;
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    font-size: 0.95em;
    font-family: 'JetBrains Mono', monospace;
  }

  pre {
    background: #0e1217;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;

    code {
      display: block;
      background: none; /* prevents double background */
      color: #e3ffc1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      white-space: pre;
      padding: 0; /* remove inline padding */
    }
  }

  ul, ol {
    margin: 1rem 0 1.25rem 1.5rem;
    padding: 0;
  }

  li {
    color: #a5afc0;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  small {
    font-size: 0.875rem;
    line-height: 1.4;
  }

   /* Global scrollbar style */
  * {
    scrollbar-width: thin;
    scrollbar-color: #2b3645 #0a0e12; /* thumb color | track color */
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #0a0e12;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #2b3645;
    border-radius: 8px;
    border: 2px solid #0a0e12; /* creates a gap look */
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #3e4c60;
  }

  /* Prevent scrollbar flicker on focus */
  html {
    overflow-y: overlay;
  }

  /* Optional: hide scrollbar buttons on macOS */
  *::-webkit-scrollbar-button {
    display: none;
  }
`;

export default GlobalStyles;
