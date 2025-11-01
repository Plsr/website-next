import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../button'

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(<Button>Test Button</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-4', 'py-3', 'border', 'rounded-xs')
  })
})
