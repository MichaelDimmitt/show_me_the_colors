import 'react';
import './App.css'
import { listOfColors } from './colorsFromHex';

function invertColor(hex: string, bw: boolean) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  const r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  const red = (255 - r).toString(16);
  const green = (255 - g).toString(16);
  const blue = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(red) + padZero(green) + padZero(blue);
}
function padZero(str: string, len?: number) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export const DisplaySvgs = () => {
  return (<>
      <div style={{  backgroundColor: 'gray', padding: '4rem' }}>
          <div className='border border-3 rounded' style={{ backgroundColor: 'whitesmoke', padding: "2rem" }} >
              <h1>Color Section</h1>
              <section>
                  <div className='d-flex gap-3 p-2 flex-wrap' style={{justifyContent: 'center'}}>
                      {listOfColors.map(([colorName, hexColor]) => {
                          return <div className='d-flex flex-column border rounded p-2' style={{ width: '160px' }}>
                              <div>{colorName}</div>
                              <div>{hexColor}</div>
                              <div className="rounded px-2 border rounded" style={{ backgroundColor: hexColor, color: invertColor(hexColor, true) }}>color</div>
                          </div>
                      })}
                  </div>
                  <br />
                  
              </section>
          </div>
      </div>

  </>)
}

export default DisplaySvgs
