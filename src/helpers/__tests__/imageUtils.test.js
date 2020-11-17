import 'jest-canvas-mock';

import { svgToBlob } from 'helpers/imageUtils';

describe('helpers/imageUtils', () => {
  describe('svgToBlob', () => {
    const svgType = 'image/svg+xml';

    it('should convert svg to image blob', (done) => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <circle cx="25" cy="25" r="20"/>
        </svg>
      `;
      svgToBlob(new Blob([svg], { type: svgType })).then((imgBlob) => {
        expect(imgBlob).toBeInstanceOf(Blob);
        expect(imgBlob.type).not.toBe(svgType);
        expect(imgBlob.size).toBeGreaterThan(0);
        done();
      }).catch(done.fail);
    });

    it('should convert svg with embedded image to image blob', (done) => {
      const svgEmbImg = `
        <svg id="example1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image x="0" y="0" width="5" height="5" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="/>
        </svg>
      `;
      svgToBlob(new Blob([svgEmbImg], { type: svgType })).then((imgBlob) => {
        expect(imgBlob instanceof Blob).toBe(true);
        expect(imgBlob.type).not.toBe(svgType);
        expect(imgBlob.size).toBeGreaterThan(0);
        done();
      }).catch(done.fail);
    });
  });
});
