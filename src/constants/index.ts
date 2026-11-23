export const ENCOUNTER_COLORS = Object.freeze({
  primary: "#234048",
  secondary: "#2E848A",
  background: "#f4f2f0",
  text: "#FFFBF4",
  contrast: "#f3b740",
});

export const CONTAINER_CLASSES = 'relative mx-auto w-[calc(100%-3rem)] max-w-265 max-[820px]:w-[calc(100%-2rem)]';

const EMPHASIZED_BUTTON_CLASSES = 'inline-flex min-h-[46px] items-center justify-center rounded-full border-2 border-highlight bg-highlight px-5 py-[0.65rem] font-semibold text-brand no-underline transition-[filter] hover:brightness-110';
const SOLID_BUTTON_CLASSES = 'inline-flex min-h-[46px] items-center justify-center rounded-full border-2 border-brand bg-brand px-5 py-[0.65rem] font-semibold text-paper no-underline transition-[filter] hover:brightness-110';
const OUTLINE_BUTTON_CLASSES = 'inline-flex min-h-[46px] items-center justify-center rounded-full border-2 border-current bg-transparent px-5 py-[0.65rem] font-semibold text-inherit no-underline transition-[filter] hover:brightness-110';

export const BUTTON_CLASSES = Object.freeze({
  connect: EMPHASIZED_BUTTON_CLASSES,
  give: EMPHASIZED_BUTTON_CLASSES,
  directions: EMPHASIZED_BUTTON_CLASSES,
  watch: SOLID_BUTTON_CLASSES,
  leadership: SOLID_BUTTON_CLASSES,
  form: SOLID_BUTTON_CLASSES,
  submit: 'inline-flex min-h-[46px] items-center justify-center justify-self-start rounded-full border-2 border-brand bg-brand px-5 py-[0.65rem] font-semibold text-paper no-underline transition-[filter] hover:brightness-110',
  ways: OUTLINE_BUTTON_CLASSES,
  call: OUTLINE_BUTTON_CLASSES,
});