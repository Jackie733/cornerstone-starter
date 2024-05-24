import React, { useState } from 'react';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';
import { readImageFile } from 'itk-wasm';

const UploadCTData: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const { image } = await readImageFile(null, file);
      const imageData = vtkImageData.newInstance();
      const dimensions = image.size;
      imageData.setDimensions(...dimensions);
      imageData.getPointData().setScalars(
        vtkDataArray.newInstance({
          numberOfComponents: 1,
          values: new Float32Array(image.data),
        })
      );

      const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
      const renderer = fullScreenRenderer.getRenderer();
      const renderWindow = fullScreenRenderer.getRenderWindow();

      const volumeMapper = vtkVolumeMapper.newInstance();
      volumeMapper.setInputData(imageData);

      const volume = vtkVolume.newInstance();
      volume.setMapper(volumeMapper);

      const ctfun = vtkColorTransferFunction.newInstance();
      ctfun.addRGBPoint(0, 0.0, 0.0, 0.0);
      ctfun.addRGBPoint(500, 1.0, 0.5, 0.3);
      ctfun.addRGBPoint(1000, 1.0, 0.5, 0.3);
      ctfun.addRGBPoint(1150, 1.0, 1.0, 0.9);

      const ofun = vtkPiecewiseFunction.newInstance();
      ofun.addPoint(0.0, 0.0);
      ofun.addPoint(500.0, 0.5);
      ofun.addPoint(1000.0, 0.8);
      ofun.addPoint(1150.0, 0.9);

      volume.getProperty().setRGBTransferFunction(0, ctfun);
      volume.getProperty().setScalarOpacity(0, ofun);
      volume.getProperty().setScalarOpacityUnitDistance(0, 3.0);

      renderer.addVolume(volume);
      renderer.resetCamera();
      renderWindow.render();
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload and Display CT Data
      </button>
      <div id="vtk-container"></div>
    </div>
  );
};

export default UploadCTData;
