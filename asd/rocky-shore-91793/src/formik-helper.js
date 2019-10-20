import React from 'react';

export const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

export const MoreResources = props =>
  <div>
    <hr style={{ margin: '3rem 0' }} />
    <h3>More Projects from Me</h3>
    <ul>
      <li>
        <a
          href="https://slorge.ml"
          target="_blank"
          rel="noopener"
        >
          CMS solution
        </a>
      </li>
      <li>
        <a
          href="https://greenplanet.vilabs.tech"
          target="_blank"
          rel="noopener"
        >
        E-commerce solution
        </a>
      </li>

    <h3 style={{ marginTop: '1rem' }}>
      Contact
    </h3>
    <ul>
      <li>
        <a
          href="https://aman-jain.me"
          target="_blank"
          rel="noopener"
        >
          Portfolio
        </a>
      </li>


    </ul>
  </ul>
  </div>;
