import { NextPage } from 'next'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'

export const ImprintPage: NextPage = () => {
  return (
    <div>
      <PageTitleWithSubline
        title="Imprint"
        subline={
          <PageTitleWithSubline.Subline>
            This is information the German law requires me to provide. If you
            want to sue me: please don&apos;t.
          </PageTitleWithSubline.Subline>
        }
      />

      <h2 className="font-headline text-xl">
        Angaben gem&auml;&szlig; &sect; 5 TMG
      </h2>
      <p className="text-slate-700 mb-4">
        Christian Jarling
        <br />
        Fellm&uuml;hlenweg 1A
        <br />
        51069 K&ouml;ln
      </p>

      <h2 className="font-headline text-xl">Kontakt</h2>
      <p className="mb-8">E-Mail: pleasdontsueme@chrisjarling.com</p>

      <p>
        Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a>
      </p>
    </div>
  )
}

export default ImprintPage
