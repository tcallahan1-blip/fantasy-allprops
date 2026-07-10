import { vi } from 'vitest'

// next/cache and next/navigation call into request-scoped internals that
// don't exist outside a running Next.js server — stub them for unit tests.
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => {
    throw new Error('NEXT_REDIRECT')
  }),
}))
