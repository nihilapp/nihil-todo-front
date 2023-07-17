import tw from 'twin.macro';

export const textStyle = {
  size: tw` text-mb-normal mb-sm:text-mb-sm mb-md:text-mb-md `,
  hidden: tw` overflow-hidden absolute [clip: rect(0, 0, 0, 0)] [clip-path: polygon(0 0, 0 0, 0 0)] w-[1px] h-[1px] m-[-1px] `,
};
