import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register global GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Ensure JSON.stringify never throws on circular references in any iframe environment
const rawStringify = JSON.stringify;
if (typeof rawStringify === 'function') {
  JSON.stringify = function (value: any, replacer?: any, space?: any) {
    const seen = new WeakSet();
    return rawStringify(
      value,
      function (this: any, key: string, val: any) {
        if (val !== null && typeof val === 'object') {
          if (typeof Node !== 'undefined' && val instanceof Node) {
            return `[${val.nodeName || 'DOMNode'}]`;
          }
          if (val.nodeType || val === window) {
            return `[${val.tagName || 'Element'}]`;
          }
          if (seen.has(val)) {
            return '[Circular]';
          }
          seen.add(val);
        }
        return typeof replacer === 'function' ? replacer.call(this, key, val) : val;
      },
      space
    );
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
