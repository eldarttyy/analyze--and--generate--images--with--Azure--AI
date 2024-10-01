import axios from "axios";

async function analyzeImage(imageUrl) {
    const endpoint = "https://elearn.cognitiveservices.azure.com/";
    const apiKey = "a6a981c72a9544448ec8e445bc42633e"; // Insert your Azure API key here
    const url = `${endpoint}vision/v3.2/analyze`; // Assuming you're using Azure Computer Vision API


    try {
        const response = await axios.post(
            url,
            { url: imageUrl },
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": apiKey,
                    "Content-Type": "application/json",
                },
                params: {
                    features: "caption,read",
                    "model-version": "latest",
                    language: "en",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error analyzing image: ", error);
        throw error;
    }
}

export default analyzeImage;
