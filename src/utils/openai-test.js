// require("dotenv").config();
// import "dotenv/config";
import OpenAI from "openai";


const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function fetchChartData(article) {
  let prompt = `state in step by step list the shifts on the supply and demand of goods and services of a news article with this title: ${
    article.title ?? "News"
  }. Return answer in json with keys ''result", "demand", "supply". Let demand and supply be arrays of random numbers that can be used to draw an area chart. The arrays should be of the length 10. Make sure there are numbers in it. Result should be text. Just return json. Do not explain. Do not make the json a variable`;
  let prompt2 = `Analyze the frquency of a news article titled "${
    article.title ?? "News"
  }" across different newspaper platforms. Return answer in json with keys ''result", "newspaper", "percentage", "tags", 'analysis'. Let "newspaper" and "percentage" be arrays of numbers, each with a length of 10, representing meaningful data reflecting changes in newspaper platforms and the percentage of article appearances. Let the tags be an array with a length of 10 of mono syllabic economic terminologies without numerics with close relationship with "${
    article.title ?? "News"
  }". let "analysis" be a one paragraph text of provide short paragraph insight about economy areas such as environmental economics, supply and demand, health economics, labor economics, macroeconomics, international economics and other economics areas of this article - "${
    article.content
  }". Result should be text. Just return json. Do not explain. Do not make the json a variable`;

  let prompt3 = `create 3 different types graphs and provide short paragraph insight about economy areas such as environmental economics, supply and demand, health economics, labor economics, macroeconomics, international economics and other economics areas of this news article - "${article.content}". Return answer in json with keys "graph" and "analysis". "analysis" contains the short paragraph generated. "graph" is an array of objects in which each object has a title, data : an array of numbers and tags : array of single word tags we're plotting the data against which contains corresponsing data for the types of graphs suggested. the data array and the tags array must always be of the same length and the length must not be less than 3`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt3 }],
    model: "gpt-3.5-turbo",
  });

  const aiResponse = completion.choices[0].message.content;
  return {
    aiResponse,
  };
}

// main();
// ${article.title}
