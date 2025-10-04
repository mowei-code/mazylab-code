import { GoogleGenAI, Type } from "@google/genai";

export const generateWebsiteCode = async (prompt: string, platform: string): Promise<string> => {
    try {
        const userApiKey = localStorage.getItem('userApiKey');
        const apiKey = userApiKey || process.env.API_KEY;

        if (!apiKey) {
            throw new Error("API key is not configured. Please add your personal key in settings or contact support.");
        }
        
        const ai = new GoogleGenAI({ apiKey });

        let systemInstruction = '';
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                code: {
                    type: Type.STRING,
                    description: "A single string containing the full source code for the requested component or screen."
                }
            },
            required: ["code"]
        };

        switch (platform) {
            case 'iOS':
                systemInstruction = `
                    You are an expert iOS developer specializing in SwiftUI.
                    Generate code for the iOS platform using SwiftUI.
                    The code must be a single, self-contained SwiftUI View.
                    Do not include project files or boilerplate like \`@main\`. Just provide the View code.
                    Ensure the UI is modern, clean, and follows Apple's Human Interface Guidelines.
                    Use SF Symbols for icons where appropriate.
                    Do not use placeholder images; find suitable creative commons images and embed them using URLs from a service like unsplash.com.
                    The user will provide a prompt describing the UI they want. You must return only the code in the specified JSON format.
                `;
                responseSchema.properties.code.description = "A single string containing a complete SwiftUI View.";
                break;
            case 'Android':
                systemInstruction = `
                    You are an expert Android developer specializing in Jetpack Compose.
                    Generate code for the Android platform using Jetpack Compose with Kotlin.
                    The code must be a single, self-contained Composable function.
                    Do not include project files, gradle files, or Activity/Fragment boilerplate. Just provide the \`@Composable\` function and its previews.
                    Ensure the UI is modern, clean, and follows Google's Material Design 3 guidelines.
                    Use Material 3 components and icons where appropriate.
                    Do not use placeholder images; find suitable creative commons images and embed them using URLs from a service like unsplash.com, for use with an image loading library like Coil.
                    The user will provide a prompt describing the UI they want. You must return only the code in the specified JSON format.
                `;
                responseSchema.properties.code.description = "A single string containing a complete Jetpack Compose Composable function.";
                break;
            case 'Web':
            default:
                systemInstruction = `
                    You are an expert web developer.
                    Generate a single, self-contained HTML file based on the user's prompt.
                    The HTML file must include:
                    1. A complete HTML structure (<!DOCTYPE html>, <html>, <head>, <body>).
                    2. All necessary CSS within a <style> tag in the <head>. Use modern design principles, ensure it's responsive, and looks good on both mobile and desktop.
                    3. All necessary JavaScript within a <script> tag at the end of the <body>.
                    4. The design should be visually appealing. Do not use placeholders like '[Image]' - find suitable creative commons images and embed them using a service like unsplash.
                    5. Do not use any external CSS or JS frameworks (like React, Vue, Tailwind, Bootstrap, etc.) unless explicitly asked.
                    The user will provide a prompt describing the UI they want. You must return only the code in the specified JSON format.
                `;
                responseSchema.properties.code.description = "A single string containing the full HTML document with embedded CSS and JavaScript.";
                break;
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const text = response.text;
        
        if (!text) {
            throw new Error("API response was empty. The model may be under maintenance. Please try again later.");
        }
        
        const parsedJson = JSON.parse(text);

        if (!parsedJson.code) {
            throw new Error("The model returned an invalid response format. Please try rephrasing your prompt.");
        }

        return parsedJson.code;

    } catch (error: any) {
        console.error("Error generating website code:", error);
        if (error.message.includes('API key not valid')) {
            if (localStorage.getItem('userApiKey')) {
                throw new Error("Your personal API key is invalid. Please check it in Settings.");
            }
            throw new Error("The server's API key is invalid or has expired. Please contact support.");
        }
        throw new Error("Failed to generate code. Please check your connection and try again.");
    }
};