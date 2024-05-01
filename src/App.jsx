import { useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "../component/Navbar";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generateAnswer = async () => {
    setAnswer("Loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBJP3AVL623Aa5j7ptLODS6blbjbX3DKQw",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });
    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  };

  return (
    <>
      <Navbar />
      <div className="h-full w-full p-10 flex flex-col items-center justify-center">
        <form className="w-full mx-auto p-4">
          <label
            htmlFor="message"
            className="block font-extrabold text-lg mb-2 font-medium text-gray-900 dark:text-white"
          >
            Hello, how can I help you ?
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            as="textarea"
            id="message"
            rows="4"
            className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ask anything..."
          ></textarea>
        </form>

        <button
          onClick={generateAnswer}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Generate Answers
          </span>
        </button>
        <div className="p-8 mt-8 block w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
          <h4 className="text-white text-2xl font-bold">Answers</h4>
          <br />
          <pre className="text-white text-center" style={{ whiteSpace: "pre-wrap" }}>
            {answer}
          </pre>
        </div>
      </div>
    </>
  );
}

export default App;
