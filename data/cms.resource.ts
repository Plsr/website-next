import { createReader } from '@keystatic/core/reader'
import keystaticConfig from 'keystatic.config'
import { Vla } from 'vla'

export class CMS extends Vla.Resource {
  static readonly unwrap = 'cms'

  cms = this.devStable('cms', () =>
    createReader(process.cwd(), keystaticConfig),
  )
}
