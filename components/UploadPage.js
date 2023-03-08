import { useState, useEffect } from 'react';
import Image from "next/image";

import ResultItem from './ResultItem';

function ImageUploadForm() {
  const [image, setImage] = useState(null);
  const [modelOutputs, setModelOutputs] = useState(null);
  const [resultsReady, setResultsReady] = useState(false);
  const [generationInProgress, setGenerationInProgress] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (modelOutputs) {
      setResultsReady(true);
    }
  }, [modelOutputs])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGenerationInProgress(true);

    // Encode the selected image in base64 format
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1];
      getSimilarItems(base64Image).then((result) => {
        setModelOutputs(result);
        setGenerationInProgress(false);
      }
      );
    };
  };

  const getSimilarItems = async (base64Image) => {
    const response = await fetch('https://degirmenci--rehber-fastapi-app.modal.run/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
      }),
    })

    const data = await response.json();
    return data.results
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Upload a photo of an item you took at Philly Art Museum and see more information.</h1>
      </div>

      <form className="my-4 items-center justify-center" onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button
          className="bg-gray-300 hover:bg-gray-400 text-blue-600 font-bold py-2 px-8 mx-6 h-10 w-50"
          type="submit">
        {generationInProgress && (
                        <div className="spinner"/>
                    )}
        {!generationInProgress && 'find'}
        </button>
      </form>

      {resultsReady && (
        <div >
          <h1 className="text-xl font-bold">Similar items:</h1>
          <div className="max-w-4xl mx-auto border-1">
            {modelOutputs.map((item) => (
              <ResultItem key={item.catalog_id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploadForm;

