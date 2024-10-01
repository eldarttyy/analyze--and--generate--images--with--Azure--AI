import React, { useState } from 'react';
import analyzeImage from './Azure-image-analysis';
import generateImage from './Azure-image-generation';

function App() {
  const [imageUrl, setImageUrl] = useState(''); // Fix: Changed to camelCase
  const [result, setResult] = useState(null);
  const [friendlyMessage, setFriendlyMessage] = useState(''); // Store the user-friendly message

  const handleImageAnalysis = async () => {
    try {
      const result = await analyzeImage(imageUrl); // Fix: Using camelCase for imageUrl
      setResult(result);
      setFriendlyMessage(getFriendlyResponse(result)); // Generate user-friendly message
    } catch (error) {
      console.error("Error analyzing image: ", error);
    }
  };

  const getFriendlyResponse = (result) => {
    if (!result || !result.categories || result.categories.length === 0) {
      return "Sorry, no relevant information was found in the image.";
    }

    const category = result.categories[0].name.replace('_', ' '); // 'animal_dog' -> 'animal dog'
    const confidenceScore = (result.categories[0].score * 100).toFixed(2); // Score as percentage
    const { height, width, format } = result.metadata;

    return `This image most likely contains a ${category} with a confidence of ${confidenceScore}%. 
    The image is in ${format} format and has dimensions of ${width}x${height} pixels.`;
  };


  const handleImageGeneration = async () =>{
    let prompt = imageUrl;
    try{
      const generationResult = await generateImage(prompt);
      setResult(generationResult[0]);
    }catch (error){
      console.error("Error generation image:", error)
    }
  }

  const displayResults = () => {
    if (!result) return null;
    return (
      <div>
        <h2>Image Results</h2>
        <img width="500" src={imageUrl} alt="uploaded" />
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Analyze and Generate Images</h1>
      <input
        type='text'
        placeholder="Enter URL or textual prompt"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
      <button onClick={handleImageAnalysis}>Analyze Image</button>
      <button onClick={handleImageGeneration}>Generate Image</button>
      
      {/* Display user-friendly message */}
      {friendlyMessage && <p>{friendlyMessage}</p>} 

      {/* Display raw result */}
      {displayResults()}
    </div>
  );
}

export default App;
