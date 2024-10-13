/* convert a number to a float with the option to specify the number of decimal places, default is 2 */
export default function convertToFloat(valueToConvert: number, decimal = 2): number {
    return parseFloat(valueToConvert.toFixed(decimal))
}
