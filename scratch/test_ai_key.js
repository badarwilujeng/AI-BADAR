const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI("AIzaSyAwScE-glXjxwHpPudnmvb3ucUaldPBZAE");
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hai");
    console.log(result.response.text());
  } catch(e) {
    console.error("ERROR 2.0:", e.status, e.message);
    try {
      const model15 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result15 = await model15.generateContent("Hai");
      console.log("1.5 SUCCESS:", result15.response.text());
    } catch(err2) {
      console.error("ERROR 1.5:", err2.status, err2.message);
    }
  }
}
run();
