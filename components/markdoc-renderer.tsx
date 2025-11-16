import Markdoc from '@markdoc/markdoc'
import { RenderableTreeNode } from '@markdoc/markdoc/dist/src/types'
import React from 'react'

type Props = {
  renderableContent: RenderableTreeNode
}
export const MarkdocRenderer = ({ renderableContent }: Props) => {
  return (
    <div className="prose-invert prose prose-img:rounded-lg">
      {Markdoc.renderers.react(renderableContent, React)}
    </div>
  )
}
