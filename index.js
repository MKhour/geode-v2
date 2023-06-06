const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const cohere = require("cohere-ai");
const { type } = require('os');
const apiKey = process.env.API_KEY;
cohere.init(apiKey);

const app = express();

const examples = [
  ({text: "If I don't get an internship, I'll never get a job", label: "Catastrophizing"}),
  ({text: "I'll never be able to find love", label: "Catastrophizing"}),
  ({text: "What if I fail my class?", label: "Anxiety"}),
  ({text: "I can't stop thinking that I might have cancer or another serious disease", label: "Anxiety"}),
  ({text: "I'm inherently unlikable", label: "Low self esteem"}),
  ({text: "I'm bad at what I do", label: "Low self esteem"}),
]

async function classifyExamples(input) {

  const response = await cohere.classify({
    inputs: input,
    examples: examples,
  })

  const classifications = response.body.classifications
  const predictions = classifications.map(classification => classification.prediction)
  console.log("reponse from classify examples is: " + predictions)
  console.log("type in cohere api call is: " + typeof(predictions))

  return predictions
}

app.get('/api/classify-text/', async (req, res) => {
  try {
    console.log("the input text is " + req.query.input);
    const responses = await classifyExamples(req.query.input);

    // Return responses as json
    console.log("type of classify examples is: " + typeof(responses));
    console.log("type of array from classify examples is: " + typeof(Array.from(responses)));
    console.log("in the api call, we have:" + Array.from(responses));
    res.json(Array.from(responses));
  }
  catch (error) {
    console.log("there is an error. error message is: " + error);
  }
});

// The "catchall" handler: for any request that doesn't match one of the patterns above
app.get('*', (req, res) => {
  console.log("the request format doesn't match what we want");
});

const port = process.env.PORT || 5000;
app.listen(port);