import OpenAI from "openai";

//defaults to os.environ.get("OPENAI_API_KEY")
const openai = new OpenAI();

//This is a simple sample function for chat gpt api. Use as reference or as it. 
export const chatGPT = async () => {

    const systemPrompt = "You are a personal trainer"
    const userPrompt = "Create a workout plan with no weights I can do at home."

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        model: "gpt-3.5-turbo",
    });

    const data = completion.choices[0].message.content;

    return data
}
