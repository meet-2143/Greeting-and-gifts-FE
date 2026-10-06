import type { ReactNode } from 'react'
import type { Scene, Tone } from '../data'

/**
 * Illustrated product "photography" placeholders. Each scene is a hand-built SVG
 * composition in the brand palette so the site looks finished before real
 * photos arrive. Swap for <img src={product.image}> once Shopify images exist.
 */
const palettes: Record<Tone, { bg1: string; bg2: string; main: string; dark: string; light: string }> = {
  blush: { bg1: '#F8E3E0', bg2: '#F1CFCB', main: '#E8B4B0', dark: '#C77F7A', light: '#FBEFEC' },
  peach: { bg1: '#FBE5D3', bg2: '#F6CFB0', main: '#EDB088', dark: '#C98456', light: '#FDF1E6' },
  sage: { bg1: '#E3EAD9', bg2: '#C9D6B9', main: '#A3B88C', dark: '#5E7650', light: '#F0F4EA' },
  cream: { bg1: '#FBF6EE', bg2: '#EADCC6', main: '#D9C3A0', dark: '#9A7B63', light: '#FFFDF9' },
  cocoa: { bg1: '#E6D5C6', bg2: '#C9AE96', main: '#7A5C47', dark: '#46301F', light: '#F4EBDD' },
}
const GOLD = '#D4A95A'

type P = (typeof palettes)[Tone]

const Bow = ({ x, y, s = 1, c = GOLD }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 C-30 -34 -52 -10 -34 6 C-22 14 -6 6 0 0Z" fill={c} />
    <path d="M0 0 C30 -34 52 -10 34 6 C22 14 6 6 0 0Z" fill={c} />
    <path d="M0 0 C-14 14 -24 30 -30 40 L-16 38Z" fill={c} opacity=".85" />
    <path d="M0 0 C14 14 24 30 30 40 L16 38Z" fill={c} opacity=".85" />
    <circle r="7" fill={c} stroke="#00000015" />
  </g>
)

const GiftBox = ({ x, y, w, h, color, lid, ribbon = GOLD, bow = true }: { x: number; y: number; w: number; h: number; color: string; lid: string; ribbon?: string; bow?: boolean }) => (
  <g>
    <rect x={x} y={y + h * 0.22} width={w} height={h * 0.78} rx="6" fill={color} />
    <rect x={x - 6} y={y} width={w + 12} height={h * 0.26} rx="6" fill={lid} />
    <rect x={x + w / 2 - 7} y={y} width="14" height={h} fill={ribbon} />
    <rect x={x - 6} y={y + h * 0.1} width={w + 12} height="0" fill={ribbon} />
    <rect x={x + w - 6} y={y + 4} width="6" height={h - 4} fill="#00000010" />
    {bow && <Bow x={x + w / 2} y={y - 2} s={w / 120} c={ribbon} />}
  </g>
)

const Flower = ({ x, y, r, c, center = GOLD }: { x: number; y: number; r: number; c: string; center?: string }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="0" cy={-r * 0.62} rx={r * 0.46} ry={r * 0.62} fill={c} transform={`rotate(${a})`} />
    ))}
    <circle r={r * 0.28} fill={center} />
  </g>
)

const Leaf = ({ x, y, rot, c, s = 1 }: { x: number; y: number; rot: number; c: string; s?: number }) => (
  <path d="M0 0 C14 -20 14 -52 0 -76 C-14 -52 -14 -20 0 0Z" fill={c} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} />
)

const Candle = ({ x, y, w = 70, h = 70, c, lid = GOLD }: { x: number; y: number; w?: number; h?: number; c: string; lid?: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="10" fill={c} />
    <rect x={x} y={y} width={w} height="12" rx="6" fill={lid} />
    <rect x={x + w * 0.18} y={y + h * 0.4} width={w * 0.64} height={h * 0.3} rx="4" fill="#FFFDF9" opacity=".85" />
    <rect x={x + w * 0.28} y={y + h * 0.5} width={w * 0.44} height="3" fill={c} opacity=".5" />
  </g>
)

const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5Z" fill={GOLD} transform={`translate(${x} ${y}) scale(${s})`} opacity=".85" />
)

function sceneContent(scene: Scene, p: P): ReactNode {
  switch (scene) {
    case 'hamper':
      return (
        <>
          <Leaf x={150} y={230} rot={-35} c={p.dark} s={0.9} />
          <Leaf x={250} y={230} rot={35} c={p.dark} s={0.9} />
          <rect x={230} y={120} width="22" height="110" rx="9" fill="#B9D0BE" />
          <rect x={232} y={108} width="18" height="14" rx="3" fill={GOLD} />
          <GiftBox x={130} y={170} w={64} h={70} color={p.main} lid={p.dark} ribbon="#FFFDF9" bow={false} />
          <path d="M96 238 Q200 150 304 238" fill="none" stroke="#8B6B4E" strokeWidth="9" strokeLinecap="round" />
          <path d="M96 238 H304 L288 330 Q200 346 112 330Z" fill="#C9A47A" />
          {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${112 + i * 31} 242 L${108 + i * 30} 332`} stroke="#A98558" strokeWidth="3" opacity=".6" />)}
          {[0, 1, 2].map((i) => <path key={i} d={`M98 ${262 + i * 22} H302`} stroke="#A98558" strokeWidth="3" opacity=".5" />)}
          <rect x="96" y="232" width="208" height="16" rx="8" fill="#B38F63" />
          <circle cx="265" cy="262" r="20" fill={p.light} /><circle cx="265" cy="262" r="12" fill={p.main} />
          <Bow x={200} y={252} s={0.9} c="#C77F7A" />
        </>
      )
    case 'box':
      return (
        <>
          <ellipse cx="116" cy="130" rx="26" ry="32" fill="#F6CFB0" /><path d="M116 162 Q108 200 130 240" stroke="#9A7B63" fill="none" strokeWidth="2" />
          <ellipse cx="290" cy="116" rx="28" ry="34" fill={GOLD} /><path d="M290 150 Q300 200 262 240" stroke="#9A7B63" fill="none" strokeWidth="2" />
          <ellipse cx="206" cy="86" rx="24" ry="30" fill="#E8B4B0" /><path d="M206 116 Q196 170 200 214" stroke="#9A7B63" fill="none" strokeWidth="2" />
          <GiftBox x={110} y={200} w={180} h={130} color={p.main} lid={p.dark} ribbon="#FFFDF9" />
          <circle cx="94" cy="320" r="10" fill={GOLD} /><circle cx="318" cy="326" r="8" fill="#F1CFCB" />
          <Sparkle x={70} y={80} /><Sparkle x={330} y={190} s={0.8} /><Sparkle x={160} y={150} s={0.6} />
        </>
      )
    case 'flowers':
      return (
        <>
          {[[150, 150], [200, 120], [250, 150], [175, 190], [225, 190]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} Q${x + (i % 2 ? 10 : -10)} 250 200 310`} stroke="#6F8760" strokeWidth="5" fill="none" />
          ))}
          <Leaf x={170} y={260} rot={-40} c="#8FA67B" /><Leaf x={232} y={262} rot={40} c="#8FA67B" />
          <Flower x={150} y={150} r={42} c="#E8B4B0" /><Flower x={250} y={150} r={42} c="#F6CFB0" />
          <Flower x={200} y={118} r={46} c="#FBF6EE" center="#EDB088" /><Flower x={175} y={192} r={36} c="#D98F8B" /><Flower x={226} y={192} r={36} c="#FBE5D3" />
          <path d="M140 300 L260 300 L240 350 L160 350Z" fill="#FBF6EE" /><path d="M140 300 L260 300 L252 316 L148 316Z" fill="#EADCC6" />
          <Bow x={200} y={312} s={0.55} c="#C77F7A" />
          <Candle x={282} y={290} w={56} h={56} c={p.dark} />
          <rect x="68" y="304" width="50" height="40" rx="6" fill="#FFFDF9" /><circle cx="93" cy="324" r="9" fill="#D98F8B" opacity=".6" />
        </>
      )
    case 'personal':
      return (
        <>
          <GiftBox x={100} y={150} w={200} h={170} color={p.dark} lid={p.main} ribbon={GOLD} />
          <rect x="140" y="226" width="120" height="58" rx="6" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 3" />
          <text x="200" y="262" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="26" fill={GOLD}>Emma & Tom</text>
          <Sparkle x={86} y={110} /><Sparkle x={324} y={130} s={1.2} /><Sparkle x={310} y={300} s={0.7} />
          <g transform="translate(60 276) rotate(-14)"><rect width="46" height="60" rx="4" fill="#FFFDF9" /><rect x="8" y="10" width="30" height="3" fill={p.main} /><rect x="8" y="20" width="22" height="3" fill={p.main} /></g>
        </>
      )
    case 'choc':
      return (
        <>
          <rect x="70" y="170" width="260" height="150" rx="14" fill="#2B2623" />
          <rect x="82" y="182" width="236" height="126" rx="8" fill="#46301F" />
          {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => (
            <g key={`${r}${c}`}>
              <circle cx={118 + r * 56} cy={212 + c * 38} r="19" fill={['#5F4434', '#7A5C47', '#3A2618'][(r + c) % 3]} />
              <circle cx={112 + r * 56} cy={205 + c * 38} r="5" fill="#fff" opacity=".18" />
              {(r + c) % 2 === 0 && <path d={`M${106 + r * 56} ${214 + c * 38} q12 -10 24 0`} stroke={GOLD} strokeWidth="2" fill="none" />}
            </g>
          )))}
          <rect x="190" y="160" width="20" height="170" fill={GOLD} opacity=".9" /><Bow x={200} y={160} s={0.85} c={GOLD} />
          <circle cx="86" cy="342" r="14" fill="#7A5C47" /><circle cx="318" cy="346" r="14" fill="#5F4434" />
          <Sparkle x={84} y={130} /><Sparkle x={316} y={120} s={0.8} />
        </>
      )
    case 'selfcare':
      return (
        <>
          <ellipse cx="200" cy="334" rx="130" ry="14" fill="#00000012" />
          <rect x="140" y="130" width="48" height="140" rx="12" fill="#FFFDF9" /><rect x="148" y="112" width="32" height="24" rx="5" fill={p.dark} /><rect x="148" y="170" width="32" height="46" rx="4" fill={p.main} />
          <rect x="204" y="190" width="70" height="80" rx="14" fill={p.main} /><rect x="208" y="176" width="62" height="20" rx="6" fill={GOLD} />
          <rect x="92" y="244" width="130" height="86" rx="14" fill="#FFFDF9" /><circle cx="157" cy="287" r="30" fill={p.light} /><circle cx="157" cy="287" r="18" fill={p.bg2} />
          <Candle x={238} y={266} w={70} h={64} c={p.dark} />
          <Leaf x={310} y={300} rot={30} c="#8FA67B" s={0.8} /><Leaf x={96} y={240} rot={-30} c="#8FA67B" s={0.7} />
          <Sparkle x={300} y={130} /><Sparkle x={104} y={150} s={0.7} />
        </>
      )
    case 'baby':
      return (
        <>
          <rect x="108" y="212" width="184" height="118" rx="16" fill="#FFFDF9" />
          <path d="M108 250 H292" stroke={p.main} strokeWidth="14" /><Bow x={200} y={250} s={0.8} c="#D98F8B" />
          <g transform="translate(200 160)">
            <ellipse cx="-30" cy="-44" rx="16" ry="38" fill="#FBF6EE" transform="rotate(-12)" /><ellipse cx="30" cy="-44" rx="16" ry="38" fill="#FBF6EE" transform="rotate(12)" />
            <ellipse cx="-30" cy="-44" rx="8" ry="26" fill={p.bg2} transform="rotate(-12)" /><ellipse cx="30" cy="-44" rx="8" ry="26" fill={p.bg2} transform="rotate(12)" />
            <circle r="46" fill="#FBF6EE" /><circle cx="-16" cy="-4" r="4" fill="#46301F" /><circle cx="16" cy="-4" r="4" fill="#46301F" /><ellipse cx="0" cy="8" rx="6" ry="4" fill="#D98F8B" />
            <path d="M-10 18 q10 8 20 0" stroke="#46301F" fill="none" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="-30" cy="10" r="7" fill="#F1CFCB" opacity=".7" /><circle cx="30" cy="10" r="7" fill="#F1CFCB" opacity=".7" />
          </g>
          <g transform="translate(70 300)"><path d="M0 0 q0 -22 22 -22 q22 0 22 22z" fill="#FFFDF9" stroke={p.dark} strokeWidth="2" /></g>
          <Sparkle x={320} y={120} /><Sparkle x={80} y={110} s={0.7} />
        </>
      )
    case 'bundle':
      return (
        <>
          <rect x="170" y="78" width="46" height="150" rx="14" fill="#3E5A3A" /><rect x="184" y="52" width="18" height="34" rx="4" fill="#3E5A3A" /><rect x="180" y="52" width="26" height="12" rx="3" fill={GOLD} />
          <rect x="170" y="140" width="46" height="60" fill="#FFFDF9" /><circle cx="193" cy="170" r="10" fill={GOLD} opacity=".7" />
          {[[260, 150], [300, 180], [320, 140]].map(([x, y], i) => <Flower key={i} x={x} y={y} r={32} c={['#E8B4B0', '#F6CFB0', '#FBF6EE'][i]} />)}
          <Leaf x={288} y={236} rot={0} c="#8FA67B" s={0.8} />
          <Candle x={84} y={186} w={74} h={70} c={p.dark} />
          <GiftBox x={110} y={250} w={190} h={84} color={p.main} lid={p.dark} ribbon="#FFFDF9" />
          <Sparkle x={130} y={90} /><Sparkle x={350} y={90} s={0.8} /><Sparkle x={90} y={160} s={0.6} />
        </>
      )
    case 'card':
      return (
        <>
          <g transform="translate(96 108) rotate(-8)"><rect width="150" height="200" rx="8" fill="#FFFDF9" /><rect x="14" y="14" width="122" height="172" rx="4" fill="none" stroke={GOLD} strokeWidth="1.5" /><text x="75" y="96" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="26" fill={p.dark}>Thank</text><text x="75" y="126" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="26" fill={p.dark}>you</text><circle cx="75" cy="156" r="9" fill={GOLD} /></g>
          <g transform="translate(182 130) rotate(7)"><rect width="150" height="200" rx="8" fill={p.light} /><Flower x={75} y={90} r={36} c={p.main} /><Leaf x={75} y={140} rot={-30} c="#8FA67B" s={0.6} /><Leaf x={75} y={140} rot={30} c="#8FA67B" s={0.6} /></g>
          <Sparkle x={90} y={90} /><Sparkle x={320} y={110} s={0.8} />
        </>
      )
    case 'candle':
      return (
        <>
          <g transform="translate(80 120) rotate(-6)"><rect width="130" height="180" rx="8" fill="#FFFDF9" /><rect x="12" y="12" width="106" height="156" rx="4" fill={p.bg1} /><Flower x={65} y={80} r={30} c="#E8B4B0" /><Leaf x={65} y={118} rot={-25} c="#8FA67B" s={0.55} /><Leaf x={65} y={118} rot={25} c="#8FA67B" s={0.55} /></g>
          <Candle x={200} y={210} w={110} h={110} c={p.dark} />
          <path d="M255 200 q-10 -22 0 -38 q10 16 0 38z" fill="#F7C873" /><rect x="253" y="198" width="4" height="12" fill="#46301F" />
          <Leaf x={316} y={330} rot={40} c="#8FA67B" s={0.7} /><Sparkle x={330} y={170} /><Sparkle x={90} y={90} s={0.8} />
        </>
      )
    case 'wedding':
      return (
        <>
          <g transform="translate(138 100) rotate(-8)"><path d="M0 0 H40 L34 70 Q20 90 6 70Z" fill="#FFFDF9" opacity=".95" stroke={p.dark} strokeWidth="2" /><path d="M5 20 H35" stroke={GOLD} strokeWidth="3" /><rect x="18" y="84" width="4" height="60" fill={p.dark} /><ellipse cx="20" cy="148" rx="20" ry="5" fill={p.dark} /></g>
          <g transform="translate(222 100) rotate(8)"><path d="M0 0 H40 L34 70 Q20 90 6 70Z" fill="#FFFDF9" opacity=".95" stroke={p.dark} strokeWidth="2" /><path d="M5 20 H35" stroke={GOLD} strokeWidth="3" /><rect x="18" y="84" width="4" height="60" fill={p.dark} /><ellipse cx="20" cy="148" rx="20" ry="5" fill={p.dark} /></g>
          <rect x="84" y="250" width="150" height="86" rx="6" fill={p.dark} /><rect x="84" y="250" width="14" height="86" fill="#00000020" /><text x="160" y="300" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="22" fill={GOLD}>Our Day</text>
          {[[290, 270], [320, 300], [276, 308]].map(([x, y], i) => <Flower key={i} x={x} y={y} r={26} c={['#FBE5D3', '#E8B4B0', '#FFFDF9'][i]} />)}
          <Leaf x={306} y={338} rot={40} c="#8FA67B" s={0.6} />
          <Sparkle x={190} y={80} s={1.2} /><Sparkle x={86} y={170} /><Sparkle x={330} y={160} s={0.8} />
        </>
      )
    case 'xmas':
      return (
        <>
          <path d="M200 70 L250 150 H228 L276 226 H124 L172 150 H150Z" fill="#4A5E41" /><path d="M200 70 L250 150 H228 L276 226 H124 L172 150 H150Z" fill="#6F8760" opacity=".4" transform="translate(-4 0)" />
          <rect x="188" y="226" width="24" height="24" fill="#7A5C47" />
          <path d="M200 52 l6 12 13 2 -10 9 3 13 -12 -6 -12 6 3 -13 -10 -9 13 -2z" fill={GOLD} />
          {[[170, 160], [230, 190], [190, 210], [214, 130]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill={['#C77F7A', GOLD, '#FBF6EE', '#E8B4B0'][i]} />)}
          <GiftBox x={92} y={258} w={80} h={72} color="#C77F7A" lid="#A85F5B" ribbon="#FBF6EE" />
          <GiftBox x={228} y={268} w={74} h={62} color="#FBF6EE" lid="#E8DCC6" ribbon="#4A5E41" />
          <Sparkle x={90} y={110} /><Sparkle x={320} y={120} s={1.1} /><Sparkle x={304} y={210} s={0.6} />
        </>
      )
    case 'store':
      return (
        <>
          <rect x="60" y="150" width="280" height="190" fill="#FFFDF9" /><rect x="60" y="120" width="280" height="44" fill={p.dark} />
          {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${60 + i * 40} 164 q20 24 40 0z`} fill={i % 2 ? '#FFFDF9' : p.main} />)}
          <text x="200" y="150" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="20" fill="#FFFDF9">Greetings and Gift</text>
          <rect x="82" y="210" width="96" height="84" rx="6" fill={p.bg1} stroke={p.dark} strokeWidth="3" /><rect x="222" y="210" width="96" height="130" rx="6" fill={p.main} /><circle cx="302" cy="278" r="4" fill={GOLD} />
          <GiftBox x={96} y={246} w={38} h={40} color="#E8B4B0" lid="#C77F7A" ribbon="#FFFDF9" bow={false} /><Flower x={156} y={268} r={16} c="#F6CFB0" />
          <rect x="60" y="338" width="280" height="6" fill="#00000018" />
          <rect x="84" y="318" width="40" height="22" rx="4" fill="#8FA67B" /><Flower x={96} y={310} r={12} c="#E8B4B0" /><Flower x={114} y={308} r={12} c="#FBE5D3" />
        </>
      )
    case 'hero':
    default:
      return (
        <>
          <ellipse cx="200" cy="350" rx="170" ry="16" fill="#00000012" />
          <GiftBox x={50} y={240} w={110} h={104} color={p.main} lid={p.dark} ribbon="#FFFDF9" />
          <GiftBox x={236} y={262} w={104} h={82} color="#FBF6EE" lid="#E8DCC6" ribbon="#C77F7A" />
          <GiftBox x={150} y={206} w={110} h={138} color="#A3B88C" lid="#6F8760" ribbon={GOLD} />
          {[[88, 196], [64, 214]].map(([x, y], i) => <Flower key={i} x={x} y={y} r={22} c={['#E8B4B0', '#F6CFB0'][i]} />)}
          <rect x="296" y="172" width="22" height="92" rx="9" fill="#B9D0BE" />
          <Candle x={300} y={290} w={56} h={54} c="#D98F8B" />
          <path d="M170 120 q20 -50 40 -4 q20 -50 40 4" stroke="none" fill="none" />
          <ellipse cx="206" cy="108" rx="26" ry="32" fill={GOLD} /><path d="M206 140 Q196 172 200 200" stroke="#9A7B63" fill="none" strokeWidth="2" />
          <ellipse cx="256" cy="140" rx="22" ry="28" fill="#E8B4B0" /><path d="M256 168 Q250 200 236 226" stroke="#9A7B63" fill="none" strokeWidth="2" />
          <Sparkle x={90} y={110} /><Sparkle x={330} y={110} s={1.1} /><Sparkle x={130} y={170} s={0.6} />
        </>
      )
  }
}

export function GiftArt({ scene, tone, className = '', title }: { scene: Scene; tone: Tone; className?: string; title?: string }) {
  const p = palettes[tone]
  const id = `bg-${scene}-${tone}`
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} role="img" aria-label={title ?? `${scene} gift illustration`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg1} /><stop offset="1" stopColor={p.bg2} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id})`} />
      <circle cx="330" cy="70" r="120" fill={p.light} opacity=".45" />
      <circle cx="40" cy="360" r="110" fill={p.main} opacity=".22" />
      <rect y="336" width="400" height="64" fill={p.main} opacity=".18" />
      <ellipse cx="200" cy="338" rx="140" ry="12" fill="#00000014" />
      {sceneContent(scene, p)}
    </svg>
  )
}
