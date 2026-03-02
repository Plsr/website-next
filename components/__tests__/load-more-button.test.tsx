import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadMoreButton } from '../load-more-button'

describe('LoadMoreButton', () => {
  it('renders a link with the correct href', () => {
    render(<LoadMoreButton nextPage={2} basePath="/scratchpad" />)

    const link = screen.getByRole('link', { name: /load more/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/scratchpad?page=2')
  })

  it('displays "Load more" text', () => {
    render(<LoadMoreButton nextPage={3} basePath="/posts" />)

    expect(screen.getByText('Load more')).toBeInTheDocument()
  })

  it('renders with the correct next page number', () => {
    render(<LoadMoreButton nextPage={5} basePath="/articles" />)

    const link = screen.getByRole('link', { name: /load more/i })
    expect(link).toHaveAttribute('href', '/articles?page=5')
  })

  it('includes an arrow down icon', () => {
    const { container } = render(
      <LoadMoreButton nextPage={2} basePath="/scratchpad" />,
    )

    // ArrowDownIcon should be rendered
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
