export const firstKeysLayout: string[] = [
  'a',
  'z',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'q',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'w',
  'x',
  'c',
  'v',
  'b',
  'n',
  "'",
  '.',
  ',',
];

export const secondKeysLayout: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '@',
  '#',
  '€',
  '&',
  '_',
  '-',
  '(',
  ')',
  '=',
  '%',
  '"',
  '*',
  "'",
  ':',
  '/',
  '!',
  '?',
  '+',
];

export function getShuffledLayout(layout: string[]): string[] {
  const alteredLayout: string[] = layout;
  const returnLayout: string[] = [];
  console.log('alteredLayout Length = ' + alteredLayout.length);
  for (let i = alteredLayout.length; i > 0; i--) {
    const index = Math.floor(Math.random() * i);
    returnLayout.push(
      alteredLayout.at(index) ?? 'No more elements, for loop badly shaped'
    );
    alteredLayout.splice(index, 1);
  }
  console.log('returnLayout : ' + returnLayout);
  console.log('returnLayout.length : ' + returnLayout.length);
  return returnLayout;
}

export const firstRandomLayout = getShuffledLayout(firstKeysLayout);
export const secondRandomLayout = getShuffledLayout(secondKeysLayout);

export function getKeysFromLayout(nb: number, startIndex: number): string[] {
  const response: string[] = [];
  for (let i = startIndex; i < startIndex + nb; i++) {
    response.push(
      `${firstRandomLayout.at(i)} ${secondRandomLayout.at(i) ?? ''}`
    );
  }
  return response;
}

export function getThirdRowLayout() {
  const response: string[] = getKeysFromLayout(7, 20);
  response.unshift('⇧');
  response.push('←');
  return response;
}

export function getFourthRowLayout() {
  const response: string[] = getKeysFromLayout(2, 27);
  response.splice(1, 0, '␣');
  response.unshift('123');
  response.push('⏎');
  return response;
}
