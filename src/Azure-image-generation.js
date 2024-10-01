import axios from "axios";

async function generateImage(prompt) {
    const apiBase = AZURE_OPENAI_API_ENDPOINT_G;
    const apiKey = AZURE_OPENAI_API_KEY_G;
    const apiVersion = "2024-05-01-preview";
    const url = `${apiBase}openai/images/generations:submit?api-version=${apiVersion}`;
    const headers = {
        "api-key": apiKey,
        "Content-Type": "application/json"
    };

    const body = {
        prompt: prompt,
        n: 1
    };

    try {
        const submission = await axios.post(url, body, { headers });

        // Check for a successful submission
        if (submission.status !== 202) {
            throw new Error("Failed to submit image generation request.");
        }

        // Retrieve the operation location from the response headers
        const operationLocation = submission.headers["operation-location"];

        let status = "";
        let response;

        // Poll the operation status until the generation is complete
        while (status !== "succeeded") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            response = await axios.get(operationLocation, { headers });

            // Check for a successful response
            if (response.status !== 200) {
                throw new Error("Failed to get operation status.");
            }
            
            status = response.data.status;
        }

        // Extract the image URL from the response
        const imageUrl = response.data.result.data[0].url;
        return imageUrl;

    } catch (error) {
        // Enhanced error handling
        console.error("Error generating image:", error.response ? error.response.data : error.message);
        alert("Failed to generate image. Check the console for details.");
        throw error; // Ensure the error is thrown for further handling
    }
}

export default generateImage;
