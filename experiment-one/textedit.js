// Initialize the Quill editor
const editor = new Quill("#editor", {
  theme: "snow",
});

function sendMessage() {
  const userInput = document.getElementById("userInput").value;

  fetch("path_to_your_server_endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.response) {
        // Update chatbox with response
        document.getElementById(
          "chatbox"
        ).innerHTML += `<p>ChatGPT: ${data.response}</p>`;

        // Update the editor content (if required)
        // Note: This example just inserts the response at the end.
        editor.insertText(editor.getLength(), data.response, "bold", true);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function saveContent() {
  const content = editor.getContents();
  // Now you can save `content` to a database or file.
}
