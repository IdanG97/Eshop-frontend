import React from 'react';

function Loader({ text = "טוען..." }) {
  return (
    <div style={{
      minHeight: 320, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        width: 86, height: 86, marginBottom: 26, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <img
          src="/images/logo.png"
          alt="logo"
          style={{
            width: 86, height: 86,
            animation: "spin 1.3s linear infinite",
            filter: "drop-shadow(0 0 20px #72ffcd90)"
          }}
        />
        <span style={{
          position: "absolute", width: 86, height: 86, top: 0, left: 0, borderRadius: "50%",
          border: "3px dashed #5fffa2", borderTop: "3px solid #13b267", borderBottom: "none",
          animation: "spinrev 2s linear infinite"
        }}></span>
      </div>
      <div style={{
        fontSize: 22, color: "#13b267", fontWeight: 600, letterSpacing: 1
      }}>
        {text}
      </div>
      <style>
        {`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes spinrev { 100% { transform: rotate(-360deg); } }
        `}
      </style>
    </div>
  );
}
export default Loader;
