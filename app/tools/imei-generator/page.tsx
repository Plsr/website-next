import { IMEIGenerator } from 'components/tools/imei-generator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IMEI Number Generator',
  description:
    'This generates a random, valid IMEI number for testing and development purposes',
}

const IMEIGeneratorPage = () => {
  return (
    <div>
      <h1>Here be generator</h1>

      <IMEIGenerator />
    </div>
  )
}

export default IMEIGeneratorPage
