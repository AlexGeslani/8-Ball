export const ANSWERS = [
  { kind: 'yes', text: 'YES.' },
  { kind: 'yes', text: 'DEFINITELY.' },
  { kind: 'yes', text: 'VERY LIKELY.' },
  { kind: 'yes', text: 'ODDS FAVOR IT.' },
  { kind: 'yes', text: 'THE PATH LOOKS OPEN.' },
  { kind: 'yes', text: 'OUTLOOK: POSITIVE.' },
  { kind: 'yes', text: 'A CLEAR YES.' },
  { kind: 'yes', text: 'GOOD SIGNS AHEAD.' },
  { kind: 'yes', text: 'IT SEEMS FAVORABLE.' },
  { kind: 'yes', text: 'CHANCES ARE GOOD.' },
  { kind: 'uncertain', text: 'UNCLEAR FOR NOW.' },
  { kind: 'uncertain', text: 'ASK AGAIN SOON.' },
  { kind: 'uncertain', text: 'WAIT AND SEE.' },
  { kind: 'uncertain', text: 'THE SIGNAL IS MIXED.' },
  { kind: 'uncertain', text: 'FOCUS, THEN RETRY.' },
  { kind: 'no', text: 'NO.' },
  { kind: 'no', text: 'UNLIKELY.' },
  { kind: 'no', text: 'NOT THIS TIME.' },
  { kind: 'no', text: 'THE PATH LOOKS CLOSED.' },
  { kind: 'no', text: 'CHANCES ARE LOW.' },
]

export function createOracle(random = Math.random) {
  let lastIndex = -1
  return {
    ask() {
      let index = Math.floor(random() * ANSWERS.length)
      if (index === lastIndex) {
        const replacement = Math.floor(random() * (ANSWERS.length - 1))
        index = replacement < lastIndex ? replacement : replacement + 1
      }
      lastIndex = index
      return ANSWERS[index]
    },
  }
}
