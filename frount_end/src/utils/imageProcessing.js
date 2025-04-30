// utils/imageProcessing.js

/**
 * Detects edges in an image using a Sobel filter
 * @param {ImageData} imageData - The image data
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Uint8ClampedArray} Edge data
 */
export const detectEdges = (imageData, width, height) => {
    const data = imageData.data;
    const edgeData = new Uint8ClampedArray(data.length);
    
    // Sobel kernels
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sumX = 0;
        let sumY = 0;
        
        // Apply kernel
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            
            sumX += data[idx] * sobelX[kernelIdx];
            sumY += data[idx] * sobelY[kernelIdx];
          }
        }
        
        // Calculate gradient magnitude
        const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
        
        // Set edge value
        const idx = (y * width + x) * 4;
        edgeData[idx] = edgeData[idx + 1] = edgeData[idx + 2] = magnitude;
        edgeData[idx + 3] = 255;
      }
    }
    
    return edgeData;
  };
  
  /**
   * Applies a contrast adjustment to image data
   * @param {Uint8ClampedArray} data - The image data array
   * @param {number} factor - Contrast factor (1.0 = no change)
   */
  export const applyContrast = (data, factor) => {
    const factor128 = 128 * (1 - factor);
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * data[i] + factor128;
      data[i + 1] = factor * data[i + 1] + factor128;
      data[i + 2] = factor * data[i + 2] + factor128;
    }
  };
  
  /**
   * Applies a pencil sketch effect to an image
   * @param {HTMLImageElement} img - The source image
   * @param {HTMLCanvasElement} canvas - The canvas to draw on
   * @param {CanvasRenderingContext2D} ctx - The canvas context
   * @param {number} intensity - Effect intensity (0-100)
   */
  export const applyPencilSketchEffect = (img, canvas, ctx, intensity) => {
    // Draw the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = gray;
    }
    
    // Apply edge detection (basic Sobel filter)
    const edgeData = detectEdges(imageData, canvas.width, canvas.height);
    
    // Blend original grayscale with edges based on intensity
    const blendFactor = intensity / 100;
    
    for (let i = 0; i < data.length; i += 4) {
      // Invert edge data for sketch-like appearance
      const edgeValue = 255 - edgeData[i];
      
      // Blend grayscale with edge data
      data[i] = data[i + 1] = data[i + 2] = Math.min(255, Math.max(0, 
        data[i] * (1 - blendFactor) + edgeValue * blendFactor
      ));
    }
    
    // Apply slight contrast adjustment
    applyContrast(data, 1.2);
    
    // Put modified data back to canvas
    ctx.putImageData(imageData, 0, 0);
  };
  
  /**
   * Unit conversion utilities for resizing
   */
  export const unitConversions = {
    /**
     * Converts a value from a specific unit to pixels
     * @param {number} value - The value to convert
     * @param {string} unit - The unit (px, cm, mm, inch)
     * @returns {number} Value in pixels
     */
    convertToPixels: (value, unit) => {
      // Standard DPI values for conversion
      const DPI = 96; // Standard screen DPI
      
      switch (unit) {
        case 'cm':
          return Math.round(value * DPI / 2.54); // 1 inch = 2.54 cm
        case 'mm':
          return Math.round(value * DPI / 25.4); // 1 inch = 25.4 mm
        case 'inch':
          return Math.round(value * DPI);
        case 'px':
        default:
          return Math.round(value);
      }
    },
    
    /**
     * Converts a value from pixels to a specific unit
     * @param {number} pixels - The value in pixels
     * @param {string} unit - The target unit (px, cm, mm, inch)
     * @returns {number} Converted value
     */
    convertFromPixels: (pixels, unit) => {
      const DPI = 96;
      
      switch (unit) {
        case 'cm':
          return Number((pixels * 2.54 / DPI).toFixed(2));
        case 'mm':
          return Number((pixels * 25.4 / DPI).toFixed(1));
        case 'inch':
          return Number((pixels / DPI).toFixed(2));
        case 'px':
        default:
          return pixels;
      }
    }
  };