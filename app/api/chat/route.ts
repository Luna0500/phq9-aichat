import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse, LangChainStream, Message } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAI } from "langchain/llms/openai";

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

import { PromptTemplate } from "langchain/prompts";

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

    const llm = new OpenAI({
      temperature: 0.2,
    });
    const prompt1 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt2 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt3 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt4 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt5 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt6 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by feeling bad about yourself--or that you are a failure or have let yourself or your family down?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt7 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by having trouble concentrating on things, such as reading the newspaper or watching television?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt8 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by yourself moving or speaking so slowly that other peopl could have noticed--or the opposite--being so fidgety or restless that you have been moving around a lot more that usual?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    const prompt9 = PromptTemplate.fromTemplate("Respond with only the number representing the choice, do not include the text of the choice. Someone was asked the question (Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead, or of hurting yourself?) and they responded ({answer}), which choice best fits this response? 0. Not at all, 1. Several days, 2. More than half the days, or 3. Nearly every day?");
    
    const lastItem = messages[messages.length - 1].content
    var lastItemPrev = "None"
    var lastItemID = "0"
    if (messages.length > 1) {
      lastItemPrev = messages[messages.length - 2].content
      lastItemID = messages[messages.length - 2].content.charAt(9)
    }

    var result = ""
    var formattedPrompt = ""
    const id = json.id ?? nanoid()
    switch (lastItemID) {
      case "1":
        formattedPrompt = await prompt1.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        break;
      case "2":
        formattedPrompt = await prompt2.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "3":
        formattedPrompt = await prompt3.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "4":
        formattedPrompt = await prompt4.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "5":
        formattedPrompt = await prompt5.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "6":
        formattedPrompt = await prompt6.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "7":
        formattedPrompt = await prompt7.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "8":
        formattedPrompt = await prompt8.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      case "9":
        formattedPrompt = await prompt9.format({answer: lastItem})
        result = await llm.predict(formattedPrompt);
        console.log(result);
        await kv.hmset(`chat:${id}:Question${lastItemID}`, {result})
        break;
      default:
        break;
    }

    if (messages.length > 1) {
      messages[messages.length - 1].content = "The Result number for this question is " + result + " and you must Provide it in your response to this. Do not apologize." + messages[messages.length - 1].content
    }

    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      stream: true
    })
  

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
