'use client'

export const IMEIGenerator = () => {
  const result = false

  const handleGenerateClick = () => {
    // TODO: Do we want to account for the flooring?
    // const randomBase = Math.floor(Math.random() * 100000000000000)
    const randomBase = 38598603328960

    // Generat Luhn Check number
    const numArray = Array.from(String(randomBase), Number)
    const reversedArray = numArray.reverse()
    // console.log(reversedArray)
    let sum = 0
    for (let i = 0; i < reversedArray.length; i++) {
      console.log('running')
      console.log('running sum: ', sum)
      const num = reversedArray[i]
      if (i % 2 !== 0) {
        sum += num
        continue
      }

      const double = num * 2

      if (double < 10) {
        sum += double
        continue
      }

      const doubleArr = Array.from(String(double), Number)
      sum += doubleArr[0] + doubleArr[1]
    }

    console.log(sum)

    const luhnDigit = (10 - (sum % 10)) % 10
    console.log(luhnDigit)
  }
  return (
    <>
      <div>
        <button onClick={handleGenerateClick}>Generate</button>
      </div>
      {result && <div>{result}</div>}
    </>
  )
}
