const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({apiKey: "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"});
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    return res.data.choices[0].text;
}