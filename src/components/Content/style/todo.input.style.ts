import tw, { css } from 'twin.macro';
import { textStyle } from '@/styles/text.style';

export const todoInputStyle = css([
  tw` flex flex-row flex-wrap gap-1 mb-5 `,
  tw` [input]:( flex-1 shrink-0 p-2 placeholder:text-black-base/50 border border-black-base/20 rounded-1 outline-none transition-[border-color] duration-[.3s] ) `,
  tw` [input:focus]:( border-blue-400 ) `,
  tw` [button]:( p-2 px-3 bg-blue-400 text-white outline-none font-700 rounded-1 transition-[background-color] duration-[.3s] flex flex-row gap-1 items-center ) `,
  tw` [button:hover]:( bg-blue-500 ) `,
  textStyle.size,
]);
