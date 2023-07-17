import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

interface ColorValues {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
  'base'?: string;
}

interface Color {
  'inherit': ColorValues;
  'current': ColorValues;
  'transparent': ColorValues;
  'black': ColorValues;
  'white': ColorValues;
  'slate': ColorValues;
  'gray': ColorValues;
  'zinc': ColorValues;
  'neutral': ColorValues;
  'stone': ColorValues;
  'red': ColorValues;
  'orange': ColorValues;
  'amber': ColorValues;
  'yellow': ColorValues;
  'lime': ColorValues;
  'green': ColorValues;
  'emerald': ColorValues;
  'teal': ColorValues;
  'cyan': ColorValues;
  'sky': ColorValues;
  'blue': ColorValues;
  'indigo': ColorValues;
  'violet': ColorValues;
  'purple': ColorValues;
  'fuchsia': ColorValues;
  'pink': ColorValues;
  'rose': ColorValues;
  'pale-sky': ColorValues;
  'royal-blue': ColorValues;
  'hot-pink': ColorValues;
}

export function getColor(): Color {
  const colors = { ...resolveConfig(tailwindConfig).theme.colors, } as unknown as Color;

  return colors;
}
