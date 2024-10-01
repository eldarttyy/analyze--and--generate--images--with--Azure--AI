import axios from "axios";

async function analyzeImage(imageUrl) {
    const endpoint = AZURE_OPENAI_ENDPOINT_A;
    const apiKey = AZURE_OPENAI_API_KEY_A; // Insert your Azure API key here
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
