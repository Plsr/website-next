import { JSONFormatter } from 'components/tools/json-formatter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online JSON Formatter',
  description:
    'An online JSON editor to validate and format your JSON data. Completely free and easy to use.',
}

const ObjectJSONConverterPage = () => {
  return (
    <div className="mb-8 text-base-300">
      <h1 className="text-2xl font-bold">JSON Formatter</h1>
      <div className="prose flex flex-col mb-8 gap-4">
        <p>
          Paste your JSON string in the box and click &quot;Format&quot; below
          in order to format your JSON online. You can change the formatting
          options anytime.
        </p>
        <p>
          <a href="#about" className="text-base-50">
            Click here
          </a>{' '}
          to read more about this tool and JSON in general
        </p>
      </div>
      <JSONFormatter />
      <h2 id="about" className="text-xl font-bold mt-12 mb-4">
        About this JSON formatter
      </h2>
      <div className="prose gap-4 flex flex-col">
        <p>
          This JSON formatter was written for developers (but really, everyone
          who usese JSON) as a tool for debugging and getting the format of JSON
          data right.
        </p>
        <p>
          The tool allows you to validate your JSON data and set the indention
          level as well as the type (either tabs or spaces). Just paste your
          JSON string in the input above and use the controls to format the JSON
          data to your needs.
        </p>
        <p>Here&apos;s a detialed list of the features:</p>
        <h3 className="text-lg font-bold mt-6 mb-2">Online JSON validator</h3>
        <p>
          If you pass invalid JSON to this tool, a error message will appear
          above to leat you know what went wrong with parsing your JSON data.
        </p>

        <h3 className="text-lg font-bold mt-6 mb-2">Set indentation depth</h3>
        <p>
          Use the slider to set the indentation depth of your JSON data. This
          defaults to 2 but can be set to whatever value you whish.
        </p>

        <h3 className="text-lg font-bold mt-6 mb-2">Set indentation style</h3>
        <p>
          You can choose wether you want your JSON to be indented with spaces or
          tabs with the buttons in the control area. This defaults to spaces.
        </p>

        <p>
          Once you are happy with the formatted JSON, just copy it from the
          results area.
        </p>
      </div>
      <h2 className="text-xl font-bold mt-12 mb-4">Why this was built</h2>
      <p>
        I built this tool mainly to learn about JSON processing and formatting.
        I learn better by doing instead of reading, so I decided to write this
        small tool as an exercise. It was quite fun!
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Feature roadmap</h3>
      <p>There are some more features I would like to add to this tool:</p>
      <ul className="pl-8 list-disc mt-4">
        <li>Copy-Button to copy formatted JSON</li>
        <li>Select which parts of the JSON you want keep in the result</li>
        <li>Display invisible characters (tabs and spaces)</li>
        <li>Proper Editor for source data</li>
      </ul>
    </div>
  )
}

export default ObjectJSONConverterPage
