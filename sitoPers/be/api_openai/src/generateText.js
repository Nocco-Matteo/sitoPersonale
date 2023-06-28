const openai = require('openai');



const newPrompt = (prompt) =>{
  openai.apiKey = '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';
  
  openai.Completion.create({
    engine: "text-davinci-002",
    prompt: prompt,
    max_tokens: 100
  }).then(response => {
    console.log(response.choices[0].text.trim());
  }).catch(error => {
    console.error(error);
  });
}

newPrompt("Ciao, come va?")