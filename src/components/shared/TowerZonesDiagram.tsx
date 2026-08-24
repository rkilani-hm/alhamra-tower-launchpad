/* TowerZonesDiagram — an image-free, SVG schematic of the tower's vertical
   structure (three rise zones · two sky lobbies · crown + lounge). Replaces
   photo-heavy "zones" sections. Pure vector: tiny, crisp at any size, on-brand
   with the pearl/stone/dark palette. Text is plain <text> so it stays legible
   and could later be wired to the CMS the same way as the rest of the site. */

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const PEARL = "#B9B9B7";
const PEARL_TEXT = "#CD1719";
const DARK = "#1D1D1B";
const MUTE = "#6B6B6B";

export function TowerZonesDiagram() {
  return (
    <svg viewBox="0 0 780 560" width="100%" style={{ maxWidth: 820, display: "block" }}
      fontFamily={FONT} role="img"
      aria-label="Al Hamra Tower vertical structure: three rise zones on dedicated elevator banks, two sky-lobby transfer floors at levels 30 and 55, executive crown and sky lounge above, and a 24-metre column-free grand lobby.">
      <defs>
        <linearGradient id="ah-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1D1D1B" /><stop offset="1" stopColor="#26251f" />
        </linearGradient>
      </defs>

      {/* segments (top -> bottom) */}
      <rect x="300" y="80"  width="130" height="34" fill={DARK} />
      <text x="365" y="101" fill={PEARL} fontSize="10.5" letterSpacing="2" textAnchor="middle">SKY LOUNGE</text>
      <rect x="300" y="115" width="130" height="29" fill="url(#ah-crown)" />
      <text x="365" y="134" fill="#fff" fontSize="9.5" letterSpacing="1.5" textAnchor="middle" opacity="0.82">EXECUTIVE CROWN</text>
      <rect x="300" y="145" width="130" height="90" fill="#E8E0D4" />
      <rect x="300" y="236" width="130" height="20" fill={PEARL} />
      <rect x="300" y="257" width="130" height="90" fill="#EFEAE2" />
      <rect x="300" y="348" width="130" height="20" fill={PEARL} />
      <rect x="300" y="369" width="130" height="90" fill="#E8E0D4" />
      <rect x="300" y="460" width="130" height="50" fill={DARK} />
      <text x="365" y="490" fill={PEARL} fontSize="10.5" letterSpacing="2" textAnchor="middle">GRAND LOBBY</text>

      {/* express elevator core */}
      <line x1="365" y1="114" x2="365" y2="460" stroke={PEARL_TEXT} strokeWidth="1" opacity="0.28" strokeDasharray="2 4" />

      {/* dividers + outline */}
      <g stroke="#fff" strokeWidth="1.5">
        <line x1="300" y1="235" x2="430" y2="235" /><line x1="300" y1="256" x2="430" y2="256" />
        <line x1="300" y1="347" x2="430" y2="347" /><line x1="300" y1="368" x2="430" y2="368" />
        <line x1="300" y1="459" x2="430" y2="459" />
      </g>
      <rect x="300" y="80" width="130" height="430" fill="none" stroke="rgba(29,29,27,0.14)" />

      {/* right labels */}
      <g>
        <line x1="430" y1="190" x2="470" y2="190" stroke="rgba(29,29,27,0.2)" />
        <text x="478" y="186" fill={DARK} fontSize="11" letterSpacing="1.5">HIGH RISE</text>
        <text x="478" y="202" fill={MUTE} fontSize="11">Floors 56–73 · dedicated bank</text>
        <line x1="430" y1="246" x2="470" y2="246" stroke={PEARL} strokeWidth="1.5" />
        <text x="478" y="243" fill={PEARL_TEXT} fontSize="10.5" letterSpacing="1.5">SKY LOBBY 2</text>
        <text x="478" y="258" fill={MUTE} fontSize="11">Floor 55 · transfer · 7 m ceilings</text>
        <line x1="430" y1="302" x2="470" y2="302" stroke="rgba(29,29,27,0.2)" />
        <text x="478" y="298" fill={DARK} fontSize="11" letterSpacing="1.5">MID RISE</text>
        <text x="478" y="314" fill={MUTE} fontSize="11">Floors 31–51 · dedicated bank</text>
        <line x1="430" y1="358" x2="470" y2="358" stroke={PEARL} strokeWidth="1.5" />
        <text x="478" y="355" fill={PEARL_TEXT} fontSize="10.5" letterSpacing="1.5">SKY LOBBY 1</text>
        <text x="478" y="370" fill={MUTE} fontSize="11">Floor 30 · transfer · business centre</text>
        <line x1="430" y1="414" x2="470" y2="414" stroke="rgba(29,29,27,0.2)" />
        <text x="478" y="410" fill={DARK} fontSize="11" letterSpacing="1.5">LOW RISE</text>
        <text x="478" y="426" fill={MUTE} fontSize="11">Floors 6–26 · dedicated bank</text>
      </g>

      {/* left elevation annotations */}
      <g textAnchor="end">
        <line x1="255" y1="97" x2="300" y2="97" stroke="rgba(29,29,27,0.18)" />
        <text x="248" y="94" fill={DARK} fontSize="13" fontWeight="500">351 m</text>
        <text x="248" y="109" fill={MUTE} fontSize="11">Sky Lounge</text>
        <line x1="255" y1="485" x2="300" y2="485" stroke="rgba(29,29,27,0.18)" />
        <text x="248" y="482" fill={DARK} fontSize="13" fontWeight="500">24 m</text>
        <text x="248" y="497" fill={MUTE} fontSize="11">column-free lobby</text>
        <text x="248" y="66" fontSize="10" letterSpacing="1.5" fill={PEARL_TEXT}>412 M TO TIP</text>
      </g>
    </svg>
  );
}
