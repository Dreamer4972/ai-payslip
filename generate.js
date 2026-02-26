exports.handler = async (event) => {
  const { company, ctc, country } = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate salary breakdown JSON for ${ctc} monthly salary in ${country}. 
Return only JSON like:
{
 "basic": "",
 "hra": "",
 "special": "",
 "tax": "",
 "net": ""
}`
        }
      ]
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  return {
    statusCode: 200,
    body: text
  };
};