import { Headline } from '../../components/headline'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'

const PrivacyPage = () => {
  return (
    <div>
      <PageTitleWithSubline
        title="Privacy Policy"
        subline={
          <PageTitleWithSubline.Subline>
            EU regulations go brrrr 🇪🇺
          </PageTitleWithSubline.Subline>
        }
      />
      <Headline level={2}>1. Datenschutz auf einen Blick</Headline>
      <Headline level={3}>Allgemeine Hinweise</Headline>
      <Paragraph>
        Die folgenden Hinweise geben einen einfachen &Uuml;berblick
        dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie
        diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
        denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
        Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie
        unserer unter diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.
      </Paragraph>
      <Headline level={3}>Datenerfassung auf dieser Website</Headline>
      <Headline level={4}>
        Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?
      </Headline>
      <Paragraph>
        Die Datenverarbeitung auf dieser Website erfolgt durch den
        Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt
        &bdquo;Hinweis zur Verantwortlichen Stelle&ldquo; in dieser
        Datenschutzerkl&auml;rung entnehmen.
      </Paragraph>
      <Headline level={4}>Wie erfassen wir Ihre Daten?</Headline>
      <Paragraph>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
        mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie in
        ein Kontaktformular eingeben.
      </Paragraph>
      <Paragraph>
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch
        der Website durch unsere IT-Systeme erfasst. Das sind vor allem
        technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder
        Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
        automatisch, sobald Sie diese Website betreten.
      </Paragraph>
      <Headline level={4}>Wof&uuml;r nutzen wir Ihre Daten?</Headline>
      <Paragraph>
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
        Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur Analyse
        Ihres Nutzerverhaltens verwendet werden.
      </Paragraph>{' '}
      <Headline level={4}>
        Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?
      </Headline>{' '}
      <Paragraph>
        Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
        Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen
        Daten zu erhalten. Sie haben au&szlig;erdem ein Recht, die Berichtigung
        oder L&ouml;schung dieser Daten zu verlangen. Wenn Sie eine Einwilligung
        zur Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung
        jederzeit f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das
        Recht, unter bestimmten Umst&auml;nden die Einschr&auml;nkung der
        Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren
        steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen
        Aufsichtsbeh&ouml;rde zu.
      </Paragraph>{' '}
      <Paragraph>
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie
        sich jederzeit an uns wenden.
      </Paragraph>
      <Headline level={3}>
        Analyse-Tools und Tools von Dritt&shy;anbietern
      </Headline>{' '}
      <Paragraph>
        Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch
        ausgewertet werden. Das geschieht vor allem mit sogenannten
        Analyseprogrammen.
      </Paragraph>{' '}
      <Paragraph>
        Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der
        folgenden Datenschutzerkl&auml;rung.
      </Paragraph>
      <Headline level={2}>2. Hosting</Headline>
      <Paragraph>
        Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
      </Paragraph>
      <Headline level={3}>Externes Hosting</Headline>{' '}
      <Paragraph>
        Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf
        dieser Website erfasst werden, werden auf den Servern des Hosters / der
        Hoster gespeichert. Hierbei kann es sich v.&nbsp;a. um IP-Adressen,
        Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
        Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die &uuml;ber
        eine Website generiert werden, handeln.
      </Paragraph>{' '}
      <Paragraph>
        Das externe Hosting erfolgt zum Zwecke der Vertragserf&uuml;llung
        gegen&uuml;ber unseren potenziellen und bestehenden Kunden (Art. 6 Abs.
        1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
        effizienten Bereitstellung unseres Online-Angebots durch einen
        professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
        ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
        &sect; 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von
        Cookies oder den Zugriff auf Informationen im Endger&auml;t des Nutzers
        (z.&nbsp;B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die
        Einwilligung ist jederzeit widerrufbar.
      </Paragraph>{' '}
      <Paragraph>
        Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten,
        wie dies zur Erf&uuml;llung seiner Leistungspflichten erforderlich ist
        und unsere Weisungen in Bezug auf diese Daten befolgen.
      </Paragraph>{' '}
      <Paragraph>Wir setzen folgende(n) Hoster ein:</Paragraph>
      <Paragraph>
        Vercel Inc.
        <br />
        340 S Lemon Ave #4133
        <br />
        Walnut, CA 91789
        <br />
        privacy@vercel.com
      </Paragraph>
      <Headline level={2}>
        3. Allgemeine Hinweise und Pflicht&shy;informationen
      </Headline>
      <Headline level={3}>Datenschutz</Headline>{' '}
      <Paragraph>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen
        Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich
        und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerkl&auml;rung.
      </Paragraph>{' '}
      <Paragraph>
        Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
        Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
        pers&ouml;nlich identifiziert werden k&ouml;nnen. Die vorliegende
        Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und
        wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu welchem
        Zweck das geschieht.
      </Paragraph>{' '}
      <Paragraph>
        Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet
        (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken
        aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff
        durch Dritte ist nicht m&ouml;glich.
      </Paragraph>
      <Headline level={3}>Hinweis zur verantwortlichen Stelle</Headline>{' '}
      <Paragraph>
        Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
        Website ist:
      </Paragraph>{' '}
      <Paragraph>
        Christian Jarling
        <br />
        Fellm&uuml;hlenweg 1A
        <br />
        50169 K&ouml;ln
      </Paragraph>
      <Paragraph>E-Mail: pleasedontsueme@chrisjarling.com</Paragraph>
      <Paragraph>
        Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person,
        die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel
        der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen,
        E-Mail-Adressen o. &Auml;.) entscheidet.
      </Paragraph>
      <Headline level={3}>Speicherdauer</Headline>{' '}
      <Paragraph>
        Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
        Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
        uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt. Wenn
        Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine
        Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
        gel&ouml;scht, sofern wir keine anderen rechtlich zul&auml;ssigen
        Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten haben
        (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
        letztgenannten Fall erfolgt die L&ouml;schung nach Fortfall dieser
        Gr&uuml;nde.
      </Paragraph>
      <Headline level={3}>
        Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf
        dieser Website
      </Headline>{' '}
      <Paragraph>
        Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir
        Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a
        DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien
        nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer
        ausdr&uuml;cklichen Einwilligung in die &Uuml;bertragung
        personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung
        au&szlig;erdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie
        in die Speicherung von Cookies oder in den Zugriff auf Informationen in
        Ihr Endger&auml;t (z.&nbsp;B. via Device-Fingerprinting) eingewilligt
        haben, erfolgt die Datenverarbeitung zus&auml;tzlich auf Grundlage von
        &sect; 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind
        Ihre Daten zur Vertragserf&uuml;llung oder zur Durchf&uuml;hrung
        vorvertraglicher Ma&szlig;nahmen erforderlich, verarbeiten wir Ihre
        Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren
        verarbeiten wir Ihre Daten, sofern diese zur Erf&uuml;llung einer
        rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6
        Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage
        unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO
        erfolgen. &Uuml;ber die jeweils im Einzelfall einschl&auml;gigen
        Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser
        Datenschutzerkl&auml;rung informiert.
      </Paragraph>
      <Headline level={3}>
        Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten
      </Headline>{' '}
      <Paragraph>
        Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA
        oder sonstigen datenschutzrechtlich nicht sicheren Drittstaaten. Wenn
        diese Tools aktiv sind, k&ouml;nnen Ihre personenbezogene Daten in diese
        Drittstaaten &uuml;bertragen und dort verarbeitet werden. Wir weisen
        darauf hin, dass in diesen L&auml;ndern kein mit der EU vergleichbares
        Datenschutzniveau garantiert werden kann. Beispielsweise sind
        US-Unternehmen dazu verpflichtet, personenbezogene Daten an
        Sicherheitsbeh&ouml;rden herauszugeben, ohne dass Sie als Betroffener
        hiergegen gerichtlich vorgehen k&ouml;nnten. Es kann daher nicht
        ausgeschlossen werden, dass US-Beh&ouml;rden (z.&nbsp;B. Geheimdienste)
        Ihre auf US-Servern befindlichen Daten zu &Uuml;berwachungszwecken
        verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese
        Verarbeitungst&auml;tigkeiten keinen Einfluss.
      </Paragraph>
      <Headline level={3}>
        Widerruf Ihrer Einwilligung zur Datenverarbeitung
      </Headline>{' '}
      <Paragraph>
        Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer
        ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine
        bereits erteilte Einwilligung jederzeit widerrufen. Die
        Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
        Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
      </Paragraph>
      <Headline level={3}>
        Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen
        sowie gegen Direktwerbung (Art. 21 DSGVO)
      </Headline>{' '}
      <Paragraph>
        WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F
        DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH
        AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER
        PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH F&Uuml;R
        EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE
        RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE
        DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN
        WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES
        SEI DENN, WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE
        F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
        FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER
        GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON
        RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
      </Paragraph>{' '}
      <Paragraph>
        WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
        BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
        VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
        DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING,
        SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
        WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT
        MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21
        ABS. 2 DSGVO).
      </Paragraph>
      <Headline level={3}>
        Beschwerde&shy;recht bei der zust&auml;ndigen Aufsichts&shy;beh&ouml;rde
      </Headline>{' '}
      <Paragraph>
        Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen
        ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem
        Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres Arbeitsplatzes
        oder des Orts des mutma&szlig;lichen Versto&szlig;es zu. Das
        Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher
        oder gerichtlicher Rechtsbehelfe.
      </Paragraph>
      <Headline level={3}>
        Recht auf Daten&shy;&uuml;bertrag&shy;barkeit
      </Headline>{' '}
      <Paragraph>
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
        oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an sich
        oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format
        aush&auml;ndigen zu lassen. Sofern Sie die direkte &Uuml;bertragung der
        Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur,
        soweit es technisch machbar ist.
      </Paragraph>
      <Headline level={3}>Auskunft, L&ouml;schung und Berichtigung</Headline>{' '}
      <Paragraph>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
        das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten
        personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck
        der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
        L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
        personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.
      </Paragraph>
      <Headline level={3}>
        Recht auf Einschr&auml;nkung der Verarbeitung
      </Headline>{' '}
      <Paragraph>
        Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
        personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich
        jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der
        Verarbeitung besteht in folgenden F&auml;llen:
      </Paragraph>{' '}
      <ul>
        {' '}
        <li>
          Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen
          Daten bestreiten, ben&ouml;tigen wir in der Regel Zeit, um dies zu
          &uuml;berpr&uuml;fen. F&uuml;r die Dauer der Pr&uuml;fung haben Sie
          das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>{' '}
        <li>
          Wenn die Verarbeitung Ihrer personenbezogenen Daten
          unrechtm&auml;&szlig;ig geschah/geschieht, k&ouml;nnen Sie statt der
          L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.
        </li>{' '}
        <li>
          Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie
          sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung von
          Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht, statt der
          L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>{' '}
        <li>
          Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben,
          muss eine Abw&auml;gung zwischen Ihren und unseren Interessen
          vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
          &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der
          Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
        </li>{' '}
      </ul>{' '}
      <Paragraph>
        Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
        eingeschr&auml;nkt haben, d&uuml;rfen diese Daten &ndash; von ihrer
        Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur
        Geltendmachung, Aus&uuml;bung oder Verteidigung von
        Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen
        nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines
        wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union oder
        eines Mitgliedstaats verarbeitet werden.
      </Paragraph>
      <Headline level={3}>SSL- bzw. TLS-Verschl&uuml;sselung</Headline>{' '}
      <Paragraph>
        Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
        &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen
        oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
        TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen
        Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo;
        auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer
        Browserzeile.
      </Paragraph>{' '}
      <Paragraph>
        Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen
        die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen
        werden.
      </Paragraph>
      <Headline level={2}>4. Datenerfassung auf dieser Website</Headline>
      <Headline level={3}>Server-Log-Dateien</Headline>{' '}
      <Paragraph>
        Der Provider der Seiten erhebt und speichert automatisch Informationen
        in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
        &uuml;bermittelt. Dies sind:
      </Paragraph>{' '}
      <ul>
        {' '}
        <li>Browsertyp und Browserversion</li>{' '}
        <li>verwendetes Betriebssystem</li> <li>Referrer URL</li>{' '}
        <li>Hostname des zugreifenden Rechners</li>{' '}
        <li>Uhrzeit der Serveranfrage</li> <li>IP-Adresse</li>{' '}
      </ul>{' '}
      <Paragraph>
        Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird
        nicht vorgenommen.
      </Paragraph>{' '}
      <Paragraph>
        Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
        f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der
        technisch fehlerfreien Darstellung und der Optimierung seiner Website
        &ndash; hierzu m&uuml;ssen die Server-Log-Files erfasst werden.
      </Paragraph>
      <Headline level={2}>5. Soziale Medien</Headline>
      <Headline level={3}>Instagram</Headline>{' '}
      <Paragraph>
        Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden.
        Diese Funktionen werden angeboten durch die Meta Platforms Ireland
        Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
      </Paragraph>{' '}
      <Paragraph>
        Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung
        zwischen Ihrem Endger&auml;t und dem Instagram-Server hergestellt.
        Instagram erh&auml;lt dadurch Informationen &uuml;ber den Besuch dieser
        Website durch Sie.
      </Paragraph>{' '}
      <Paragraph>
        Wenn Sie in Ihrem Instagram-Account eingeloggt sind, k&ouml;nnen Sie
        durch Anklicken des Instagram-Buttons die Inhalte dieser Website mit
        Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch
        dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass
        wir als Anbieter der Seiten keine Kenntnis vom Inhalt der
        &uuml;bermittelten Daten sowie deren Nutzung durch Instagram erhalten.
      </Paragraph>{' '}
      <Paragraph>
        Soweit eine Einwilligung (Consent) eingeholt wurde, erfolgt der Einsatz
        des o.&nbsp;g. Dienstes auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
        &sect; 25 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Soweit
        keine Einwilligung eingeholt wurde, erfolgt die Verwendung des Dienstes
        auf Grundlage unseres berechtigten Interesses an einer m&ouml;glichst
        umfassenden Sichtbarkeit in den Sozialen Medien.
      </Paragraph>{' '}
      <Paragraph>
        Soweit mit Hilfe des hier beschriebenen Tools personenbezogene Daten auf
        unserer Website erfasst und an Facebook bzw. Instagram weitergeleitet
        werden, sind wir und die Meta Platforms Ireland Limited, 4 Grand Canal
        Square, Grand Canal Harbour, Dublin 2, Irland gemeinsam f&uuml;r diese
        Datenverarbeitung verantwortlich (Art. 26 DSGVO). Die gemeinsame
        Verantwortlichkeit beschr&auml;nkt sich dabei ausschlie&szlig;lich auf
        die Erfassung der Daten und deren Weitergabe an Facebook bzw. Instagram.
        Die nach der Weiterleitung erfolgende Verarbeitung durch Facebook bzw.
        Instagram ist nicht Teil der gemeinsamen Verantwortung. Die uns
        gemeinsam obliegenden Verpflichtungen wurden in einer Vereinbarung
        &uuml;ber gemeinsame Verarbeitung festgehalten. Den Wortlaut der
        Vereinbarung finden Sie unter:{' '}
        <a
          href="https://www.facebook.com/legal/controller_addendum"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.facebook.com/legal/controller_addendum
        </a>
        . Laut dieser Vereinbarung sind wir f&uuml;r die Erteilung der
        Datenschutzinformationen beim Einsatz des Facebook- bzw. Instagram-Tools
        und f&uuml;r die datenschutzrechtlich sichere Implementierung des Tools
        auf unserer Website verantwortlich. F&uuml;r die Datensicherheit der
        Facebook bzw. Instagram-Produkte ist Facebook verantwortlich.
        Betroffenenrechte (z.&nbsp;B. Auskunftsersuchen) hinsichtlich der bei
        Facebook bzw. Instagram verarbeiteten Daten k&ouml;nnen Sie direkt bei
        Facebook geltend machen. Wenn Sie die Betroffenenrechte bei uns geltend
        machen, sind wir verpflichtet, diese an Facebook weiterzuleiten.
      </Paragraph>{' '}
      <Paragraph>
        Die Daten&uuml;bertragung in die USA wird auf die
        Standardvertragsklauseln der EU-Kommission gest&uuml;tzt. Details finden
        Sie hier:{' '}
        <a
          href="https://www.facebook.com/legal/EU_data_transfer_addendum"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.facebook.com/legal/EU_data_transfer_addendum
        </a>
        ,{' '}
        <a
          href="https://help.instagram.com/519522125107875"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://help.instagram.com/519522125107875
        </a>{' '}
        und{' '}
        <a
          href="https://de-de.facebook.com/help/566994660333381"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://de-de.facebook.com/help/566994660333381
        </a>
        .
      </Paragraph>{' '}
      <Paragraph>
        Weitere Informationen hierzu finden Sie in der Datenschutzerkl&auml;rung
        von Instagram:{' '}
        <a
          href="https://instagram.com/about/legal/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://instagram.com/about/legal/privacy/
        </a>
        .
      </Paragraph>
      <Headline level={2}>6. Newsletter</Headline>
      <Headline level={3}>Newsletter&shy;daten</Headline>{' '}
      <Paragraph>
        Wenn Sie den auf der Website angebotenen Newsletter beziehen
        m&ouml;chten, ben&ouml;tigen wir von Ihnen eine E-Mail-Adresse sowie
        Informationen, welche uns die &Uuml;berpr&uuml;fung gestatten, dass Sie
        der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des
        Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf
        freiwilliger Basis erhoben. Diese Daten verwenden wir
        ausschlie&szlig;lich f&uuml;r den Versand der angeforderten
        Informationen und geben diese nicht an Dritte weiter.
      </Paragraph>{' '}
      <Paragraph>
        Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten
        erfolgt ausschlie&szlig;lich auf Grundlage Ihrer Einwilligung (Art. 6
        Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der
        Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des
        Newsletters k&ouml;nnen Sie jederzeit widerrufen, etwa &uuml;ber den
        &bdquo;Austragen&ldquo;-Link im Newsletter. Die
        Rechtm&auml;&szlig;igkeit der bereits erfolgten
        Datenverarbeitungsvorg&auml;nge bleibt vom Widerruf unber&uuml;hrt.
      </Paragraph>{' '}
      <Paragraph>
        Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten
        Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter bei uns
        bzw. dem Newsletterdiensteanbieter gespeichert und nach der Abbestellung
        des Newsletters oder nach Zweckfortfall aus der Newsletterverteilerliste
        gel&ouml;scht. Wir behalten uns vor, E-Mail-Adressen aus unserem
        Newsletterverteiler nach eigenem Ermessen im Rahmen unseres berechtigten
        Interesses nach Art. 6 Abs. 1 lit. f DSGVO zu l&ouml;schen oder zu
        sperren.
      </Paragraph>{' '}
      <Paragraph>
        Daten, die zu anderen Zwecken bei uns gespeichert wurden, bleiben
        hiervon unber&uuml;hrt.
      </Paragraph>{' '}
      <Paragraph>
        Nach Ihrer Austragung aus der Newsletterverteilerliste wird Ihre
        E-Mail-Adresse bei uns bzw. dem Newsletterdiensteanbieter ggf. in einer
        Blacklist gespeichert, sofern dies zur Verhinderung k&uuml;nftiger
        Mailings erforderlich ist. Die Daten aus der Blacklist werden nur
        f&uuml;r diesen Zweck verwendet und nicht mit anderen Daten
        zusammengef&uuml;hrt. Dies dient sowohl Ihrem Interesse als auch unserem
        Interesse an der Einhaltung der gesetzlichen Vorgaben beim Versand von
        Newslettern (berechtigtes Interesse im Sinne des Art. 6 Abs. 1 lit. f
        DSGVO). Die Speicherung in der Blacklist ist zeitlich nicht befristet.{' '}
        <strong>
          Sie k&ouml;nnen der Speicherung widersprechen, sofern Ihre Interessen
          unser berechtigtes Interesse &uuml;berwiegen.
        </strong>
      </Paragraph>
      <Headline level={2}>7. Plugins und Tools</Headline>
      <Headline level={3}>YouTube mit erweitertem Datenschutz</Headline>{' '}
      <Paragraph>
        Diese Website bindet Videos der Website YouTube ein. Betreiber der
        Seiten ist die Google Ireland Limited (&bdquo;Google&ldquo;), Gordon
        House, Barrow Street, Dublin 4, Irland.
      </Paragraph>{' '}
      <Paragraph>
        Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt
        laut YouTube, dass YouTube keine Informationen &uuml;ber die Besucher
        auf dieser Website speichert, bevor diese sich das Video ansehen. Die
        Weitergabe von Daten an YouTube-Partner wird durch den erweiterten
        Datenschutzmodus hingegen nicht zwingend ausgeschlossen. So stellt
        YouTube &ndash; unabh&auml;ngig davon, ob Sie sich ein Video ansehen
        &ndash; eine Verbindung zum Google DoubleClick-Netzwerk her.
      </Paragraph>{' '}
      <Paragraph>
        Sobald Sie ein YouTube-Video auf dieser Website starten, wird eine
        Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem
        YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Wenn
        Sie in Ihrem YouTube-Account eingeloggt sind, erm&ouml;glichen Sie
        YouTube, Ihr Surfverhalten direkt Ihrem pers&ouml;nlichen Profil
        zuzuordnen. Dies k&ouml;nnen Sie verhindern, indem Sie sich aus Ihrem
        YouTube-Account ausloggen.
      </Paragraph>{' '}
      <Paragraph>
        Des Weiteren kann YouTube nach Starten eines Videos verschiedene Cookies
        auf Ihrem Endger&auml;t speichern oder vergleichbare
        Wiedererkennungstechnologien (z.&nbsp;B. Device-Fingerprinting)
        einsetzen. Auf diese Weise kann YouTube Informationen &uuml;ber Besucher
        dieser Website erhalten. Diese Informationen werden u.&nbsp;a.
        verwendet, um Videostatistiken zu erfassen, die Anwenderfreundlichkeit
        zu verbessern und Betrugsversuchen vorzubeugen.
      </Paragraph>{' '}
      <Paragraph>
        Gegebenenfalls k&ouml;nnen nach dem Start eines YouTube-Videos weitere
        Datenverarbeitungsvorg&auml;nge ausgel&ouml;st werden, auf die wir
        keinen Einfluss haben.
      </Paragraph>{' '}
      <Paragraph>
        Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden
        Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes
        Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
        ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
        &sect; 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von
        Cookies oder den Zugriff auf Informationen im Endger&auml;t des Nutzers
        (z.&nbsp;B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die
        Einwilligung ist jederzeit widerrufbar.
      </Paragraph>{' '}
      <Paragraph>
        Weitere Informationen &uuml;ber Datenschutz bei YouTube finden Sie in
        deren Datenschutzerkl&auml;rung unter:{' '}
        <a
          href="https://policies.google.com/privacy?hl=de"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy?hl=de
        </a>
        .
      </Paragraph>
      <Headline level={3}>Google Fonts</Headline>{' '}
      <Paragraph>
        Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
        genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf
        einer Seite l&auml;dt Ihr Browser die ben&ouml;tigten Fonts in ihren
        Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
      </Paragraph>{' '}
      <Paragraph>
        Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den
        Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis
        dar&uuml;ber, dass &uuml;ber Ihre IP-Adresse diese Website aufgerufen
        wurde. Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6
        Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
        an der einheitlichen Darstellung des Schriftbildes auf seiner Website.
        Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
        Verarbeitung ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a
        DSGVO und &sect; 25 Abs. 1 TTDSG, soweit die Einwilligung die
        Speicherung von Cookies oder den Zugriff auf Informationen im
        Endger&auml;t des Nutzers (z.&nbsp;B. Device-Fingerprinting) im Sinne
        des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
      </Paragraph>{' '}
      <Paragraph>
        Wenn Ihr Browser Google Fonts nicht unterst&uuml;tzt, wird eine
        Standardschrift von Ihrem Computer genutzt.
      </Paragraph>{' '}
      <Paragraph>
        Weitere Informationen zu Google Fonts finden Sie unter{' '}
        <a
          href="https://developers.google.com/fonts/faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://developers.google.com/fonts/faq
        </a>{' '}
        und in der Datenschutzerkl&auml;rung von Google:{' '}
        <a
          href="https://policies.google.com/privacy?hl=de"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy?hl=de
        </a>
        .
      </Paragraph>
      <Headline level={3}>Spotify</Headline>{' '}
      <Paragraph>
        Auf dieser Website sind Funktionen des Musik-Dienstes Spotify
        eingebunden. Anbieter ist die Spotify AB, Birger Jarlsgatan 61, 113 56
        Stockholm in Schweden. Die Spotify Plugins erkennen Sie an dem
        gr&uuml;nen Logo auf dieser Website. Eine &Uuml;bersicht &uuml;ber die
        Spotify-Plugins finden Sie unter:{' '}
        <a
          href="https://developer.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://developer.spotify.com
        </a>
        .
      </Paragraph>{' '}
      <Paragraph>
        Dadurch kann beim Besuch dieser Website &uuml;ber das Plugin eine
        direkte Verbindung zwischen Ihrem Browser und dem Spotify-Server
        hergestellt werden. Spotify erh&auml;lt dadurch die Information, dass
        Sie mit Ihrer IP-Adresse diese Website besucht haben. Wenn Sie den
        Spotify Button anklicken, w&auml;hrend Sie in Ihrem Spotify-Account
        eingeloggt sind, k&ouml;nnen Sie die Inhalte dieser Website auf Ihrem
        Spotify Profil verlinken. Dadurch kann Spotify den Besuch dieser Website
        Ihrem Benutzerkonto zuordnen.
      </Paragraph>{' '}
      <Paragraph>
        Wir weisen darauf hin, dass bei der Nutzung von Spotify Cookies von
        Google Analytics eingesetzt werden, sodass Ihre Nutzungsdaten bei der
        Nutzung von Spotify auch an Google weitergegeben werden k&ouml;nnen.
        Google Analytics ist ein Tool des Google-Konzerns zur Analyse des
        Nutzerverhaltens mit Sitz in den USA. F&uuml;r diese Einbindung ist
        allein Spotify verantwortlich. Wir als Websitebetreiber haben auf diese
        Verarbeitung keinen Einfluss.
      </Paragraph>{' '}
      <Paragraph>
        Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6
        Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
        an der ansprechenden akustischen Ausgestaltung seiner Website. Sofern
        eine entsprechende Einwilligung abgefragt wurde, erfolgt die
        Verarbeitung ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a
        DSGVO und &sect; 25 Abs. 1 TTDSG, soweit die Einwilligung die
        Speicherung von Cookies oder den Zugriff auf Informationen im
        Endger&auml;t des Nutzers (z.&nbsp;B. Device-Fingerprinting) im Sinne
        des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
      </Paragraph>{' '}
      <Paragraph>
        Weitere Informationen hierzu finden Sie in der Datenschutzerkl&auml;rung
        von Spotify:{' '}
        <a
          href="https://www.spotify.com/de/legal/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.spotify.com/de/legal/privacy-policy/
        </a>
        .
      </Paragraph>{' '}
      <Paragraph>
        Wenn Sie nicht w&uuml;nschen, dass Spotify den Besuch dieser Website
        Ihrem Spotify-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem
        Spotify-Benutzerkonto aus.
      </Paragraph>
      <Paragraph>
        Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a>
      </Paragraph>
    </div>
  )
}

export default PrivacyPage
