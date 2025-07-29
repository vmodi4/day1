import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from "next";

// Initialize the GoogleGenAI client using the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, start_datetime, end_datetime, subtitle, description } = req.body;

    // Validate the request body
    if (!name || !start_datetime || !end_datetime || !location || !description) {
      return res.status(400).json({
        message: "Missing required fields: name, date, time, location, or description.",
      });
    }

    // Construct the prompt dynamically based on the event details
    const prompt = `
        ### Event Insight: ${name}

        **Event Details:**
        - **Name:** ${name}
        - **Start_datetime:** ${start_datetime}
        - **End_datetime:** ${end_datetime}
        -** event
        - **Description:** ${description}

        Provide a detailed and engaging insight for the above event, keeping the response to a maximum of two paragraphs.
        The tone should be exciting and informative for someone considering attending.
        Expand on the provided description, inventing plausible details like special guests, specific activities, or unique features to make it sound more appealing.
        Format the output as clean markdown. Use headings (e.g., ###), bold text, and bullet points where appropriate.

        Generate the insight now.
    `;

    try {
      // Call the Google Generative AI model to generate content
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // Specify the model to use
        contents: prompt, // Pass the constructed prompt
      });

      // Return the generated insight as the API response
      return res.status(200).json({ insight: response.text });
    } catch (error) {
      console.error("Error generating event insight:", error);

      // Return a user-friendly error message
      return res.status(500).json({
        message: "Sorry, we encountered an issue while generating the AI insight. Please try again later.",
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}