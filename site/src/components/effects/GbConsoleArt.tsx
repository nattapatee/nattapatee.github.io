/* Pixel-art Game Boy Color console, drawn on a 40x64 grid. */
export function GbConsoleArt({ ledOn }: { ledOn: boolean }) {
  return (
    <svg className="gb-px-svg" viewBox="0 0 40 64" shapeRendering="crispEdges" aria-hidden="true">
      {/* body outline */}
      <rect x="2" y="0" width="36" height="1" fill="#111" />
      <rect x="1" y="1" width="1" height="59" fill="#111" />
      <rect x="38" y="1" width="1" height="55" fill="#111" />
      <rect x="2" y="62" width="30" height="1" fill="#111" />
      {/* bottom-right rounded corner steps */}
      <rect x="32" y="61" width="3" height="1" fill="#111" />
      <rect x="35" y="59" width="2" height="1" fill="#111" />
      <rect x="37" y="56" width="1" height="3" fill="#111" />
      {/* body fill */}
      <rect x="2" y="1" width="36" height="55" fill="#ffde59" />
      <rect x="2" y="56" width="35" height="3" fill="#ffde59" />
      <rect x="2" y="59" width="33" height="2" fill="#ffde59" />
      <rect x="2" y="61" width="30" height="1" fill="#ffde59" />
      {/* light: top + left */}
      <rect x="2" y="1" width="36" height="1" fill="#fff3a6" />
      <rect x="2" y="2" width="1" height="58" fill="#fff3a6" />
      {/* shade: right + bottom */}
      <rect x="37" y="2" width="1" height="54" fill="#d9b83e" />
      <rect x="3" y="61" width="29" height="1" fill="#d9b83e" />
      <rect x="32" y="60" width="3" height="1" fill="#d9b83e" />
      <rect x="35" y="58" width="2" height="1" fill="#d9b83e" />
      {/* cartridge slot groove */}
      <rect x="6" y="2" width="28" height="1" fill="#111" />
      <rect x="6" y="3" width="28" height="1" fill="#a8862a" />
      <rect x="6" y="4" width="28" height="1" fill="#d9b83e" />
      {/* screen bezel */}
      <rect x="5" y="7" width="30" height="24" fill="#111" />
      <rect x="6" y="8" width="28" height="22" fill="#3a3547" />
      <rect x="6" y="8" width="28" height="1" fill="#4c4660" />
      <rect x="6" y="29" width="28" height="1" fill="#292434" />
      {/* power led */}
      <rect x="7" y="10" width="2" height="2" fill={ledOn ? '#44e04f' : '#5c2e35'} />
      {ledOn && <rect x="7" y="9" width="2" height="1" fill="#a6f0ab" opacity="0.6" />}
      {/* screen */}
      <rect x="10" y="9" width="22" height="19" fill="#111" />
      <rect x="11" y="10" width="20" height="17" fill="#9db34c" />
      <rect x="11" y="10" width="20" height="1" fill="#b8cc68" />
      <rect x="11" y="26" width="20" height="1" fill="#7e9138" />
      {/* d-pad with shading */}
      <rect x="8" y="38" width="3" height="9" fill="#111" />
      <rect x="5" y="41" width="9" height="3" fill="#111" />
      <rect x="8" y="38" width="1" height="9" fill="#333" />
      <rect x="5" y="41" width="9" height="1" fill="#333" />
      {/* A/B buttons (pixel circles) */}
      <rect x="28" y="36" width="4" height="4" fill="#c14a68" />
      <rect x="29" y="35" width="2" height="1" fill="#111" />
      <rect x="29" y="40" width="2" height="1" fill="#111" />
      <rect x="27" y="37" width="1" height="2" fill="#111" />
      <rect x="32" y="37" width="1" height="2" fill="#111" />
      <rect x="28" y="36" width="2" height="1" fill="#e2708c" />
      <rect x="23" y="40" width="4" height="4" fill="#c14a68" />
      <rect x="24" y="39" width="2" height="1" fill="#111" />
      <rect x="24" y="44" width="2" height="1" fill="#111" />
      <rect x="22" y="41" width="1" height="2" fill="#111" />
      <rect x="27" y="41" width="1" height="2" fill="#111" />
      <rect x="23" y="40" width="2" height="1" fill="#e2708c" />
      {/* start / select */}
      <rect x="13" y="50" width="5" height="2" fill="#111" />
      <rect x="13" y="50" width="5" height="1" fill="#3a3547" />
      <rect x="20" y="50" width="5" height="2" fill="#111" />
      <rect x="20" y="50" width="5" height="1" fill="#3a3547" />
      {/* speaker grille */}
      <rect x="27" y="52" width="1" height="6" fill="#111" />
      <rect x="29" y="52" width="1" height="7" fill="#111" />
      <rect x="31" y="52" width="1" height="7" fill="#111" />
      <rect x="33" y="52" width="1" height="6" fill="#111" />
      <rect x="28" y="52" width="1" height="6" fill="#d9b83e" />
      <rect x="30" y="52" width="1" height="7" fill="#d9b83e" />
      <rect x="32" y="52" width="1" height="7" fill="#d9b83e" />
    </svg>
  )
}
