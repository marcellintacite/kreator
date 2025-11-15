// import {
//   GoogleGenerativeAI,
//   HarmBlockThreshold,
//   HarmCategory
// } from '../node_modules/@google/generative-ai/dist/index.mjs';

import { model } from "./firebase.js";
import { marked } from "marked";

// // Important! Do not expose your API in your extension code. You have to
// // options:
// //
// // 1. Let users provide their own API key.
// // 2. Manage API keys in your own server and proxy all calls to the Gemini
// // API through your own server, where you can implement additional security
// // measures such as authentification.
// //
// // It is only OK to put your API key into this file if you're the only
// // user of your extension or for testing.
// const apiKey = 'AIzaSyCJfmwwgaf3_xyvs9IqfhsJV9oWRyLc1-0';

let previousAction = null;

const inputPrompt = document.body.querySelector("#input-prompt");
const buttonPrompt = document.body.querySelector("#button-prompt");
const elementResponse = document.body.querySelector("#response");
const elementLoading = document.body.querySelector("#loading");
const elementError = document.body.querySelector("#error");

function showLoading() {
  hide(elementResponse);
  hide(elementError);
  show(elementLoading);
}

function show(element) {
  element.removeAttribute("hidden");
}

function hide(element) {
  element.setAttribute("hidden", "");
}

// Run custom prompt
async function run() {
  const prompt = inputPrompt.value.trim();
  if (!prompt) return;

  const result = await model.generateContentStream(prompt);
  elementResponse.textContent = "";
  show(elementResponse);
  hide(elementLoading);

  let fullText = "";
  for await (const chunk of result.stream) {
    fullText += chunk.text();
    elementResponse.textContent = fullText;
    elementResponse.scrollTop = elementResponse.scrollHeight;
  }

  // Parse markdown after streaming is complete
  const html = marked.parse(fullText);
  elementResponse.innerHTML = html;
  buttonPrompt.removeAttribute("disabled");
}

buttonPrompt.addEventListener("click", async () => {
  showLoading();
  run();
});

chrome.storage.local.get(["selectedText", "action"], (result) => {
  if (result.selectedText) {
    inputPrompt.value = result.selectedText;
    buttonPrompt.removeAttribute("disabled");
    showLoading();

    switch (result.action) {
      case "summarize":
        previousAction = "summarize";
        return summarizeSelectedText(result.selectedText);
      case "comment":
        previousAction = "comment";
        return suggestCommentsForSelectedText(result.selectedText);
      case "explain":
        previousAction = "explain";
        return explainSelectedText(result.selectedText);
      default:
        return;
    }
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.selectedText) {
    inputPrompt.value = changes.selectedText.newValue;
    showLoading();
    console.log("Previous action:", previousAction);
    switch (changes.action?.newValue ?? previousAction) {
      case "summarize":
        return summarizeSelectedText(changes.selectedText.newValue);
      case "comment":
        return suggestCommentsForSelectedText(changes.selectedText.newValue);
      case "explain":
        return explainSelectedText(changes.selectedText.newValue);
      default:
        return;
    }
  }
});

const summarizeSelectedText = async (selectedText) => {
  const prompt = `
  You are a helpful assistant specializing in concise and informative summaries. Your task is to summarize the provided text, focusing on the main points and key information.  The summary should be 250 words or less, suitable for quickly understanding the core message.
  Text: ${selectedText}
  Summary:
  `;
  const result = await model.generateContentStream(prompt);
  // show the response as it streams in
  elementResponse.textContent = "";
  show(elementResponse);
  hide(elementLoading);

  let fullText = "";
  for await (const chunk of result.stream) {
    fullText += chunk.text();
    elementResponse.textContent = fullText;
    elementResponse.scrollTop = elementResponse.scrollHeight;
  }

  // Parse markdown after streaming is complete
  const html = marked.parse(fullText);
  elementResponse.innerHTML = html;
  buttonPrompt.removeAttribute("disabled");
};
const suggestCommentsForSelectedText = async (selectedText) => {
  const prompt = `
  You are a helpful assistant designed to suggest relevant and engaging post comments. Given the following text, generate a short comment that would be appropriate for sharing on social media or in an online forum. The comment should encourage discussion, express agreement/disagreement (if applicable), or add value to the conversation.  Keep the comment concise and avoid sounding robotic.

  Text: ${selectedText}

  Suggested Comment:

  "${selectedText}"
  `;
  console.log("Suggesting comments for selected text:", selectedText);
  const result = await model.generateContentStream(prompt);
  // show the response as it streams in
  elementResponse.textContent = "";
  show(elementResponse);
  hide(elementLoading);

  let fullText = "";
  for await (const chunk of result.stream) {
    fullText += chunk.text();
    elementResponse.textContent = fullText;
    elementResponse.scrollTop = elementResponse.scrollHeight;
  }

  // Parse markdown after streaming is complete
  const html = marked.parse(fullText);
  elementResponse.innerHTML = html;
  buttonPrompt.removeAttribute("disabled");
};
const explainSelectedText = async (selectedText) => {
  const prompt = `
  You are a knowledgeable and patient tutor. Your task is to explain the following text in clear, simple terms that someone unfamiliar with the topic can understand.  Break down complex concepts into smaller parts and provide examples where appropriate. Assume the reader has a basic level of understanding but may not be familiar with technical jargon.
  Text: ${selectedText}
  Explanation:
  `;
  console.log("Explaining selected text:", selectedText);
  const result = await model.generateContentStream(prompt);
  // show the response as it streams in
  elementResponse.textContent = "";
  show(elementResponse);
  hide(elementLoading);

  let fullText = "";
  for await (const chunk of result.stream) {
    fullText += chunk.text();
    elementResponse.textContent = fullText;
    elementResponse.scrollTop = elementResponse.scrollHeight;
  }

  // Parse markdown after streaming is complete
  const html = marked.parse(fullText);
  elementResponse.innerHTML = html;
  buttonPrompt.removeAttribute("disabled");
};
