import { describe, expect, it } from 'vitest'
import { calcPoints } from './database'

describe('calcPoints', () => {
  it('scores base points for each pick type at 1x confidence, no bonus', () => {
    expect(calcPoints('P', false)).toBe(15)
    expect(calcPoints('M', false)).toBe(10)
    expect(calcPoints('X', false)).toBe(5)
  })

  it('defaults confidence to 1x when omitted', () => {
    expect(calcPoints('M', false)).toBe(calcPoints('M', false, 1))
  })

  it('multiplies by confidence (2x, 3x)', () => {
    expect(calcPoints('M', false, 2)).toBe(20)
    expect(calcPoints('M', false, 3)).toBe(30)
  })

  it('applies the 1.5x bonus window multiplier', () => {
    expect(calcPoints('P', true)).toBe(22.5)
    expect(calcPoints('M', true)).toBe(15)
    expect(calcPoints('X', true)).toBe(7.5)
  })

  it('stacks confidence and bonus multipliers', () => {
    expect(calcPoints('X', true, 3)).toBe(5 * 3 * 1.5)
  })
})
