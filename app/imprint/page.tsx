import { Headline } from '../../components/headline'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'

const ImprintPage = () => {
  return (
    <div>
      <PageTitleWithSubline
        title="Imprint"
        subline={
          <PageTitleWithSubline.Subline>
            This is information the German law requires me to provide. In case
            you want to sue me: please don&apos;t.
          </PageTitleWithSubline.Subline>
        }
      />

      <Headline level={2}>Angaben gem&auml;&szlig; &sect; 5 TMG</Headline>
      <Paragraph>
        Christian Jarling
        <br />
        Fellm&uuml;hlenweg 1A
        <br />
        51069 K&ouml;ln
      </Paragraph>

      <Headline level={2}>Kontakt</Headline>
      <Paragraph>E-Mail: hi@chrisjarling.com</Paragraph>

      <Paragraph>
        Quelle:{' '}
        <Paragraph.Link href="https://www.e-recht24.de">
          https://www.e-recht24.de
        </Paragraph.Link>
      </Paragraph>
    </div>
  )
}

export default ImprintPage
