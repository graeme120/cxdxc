document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("sendButton");
  const userInput = document.getElementById("userInput");
  const responseContainer = document.getElementById("gptResponse");

  sendButton.addEventListener("click", async function () {
    const message = userInput.value;
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    try {
      const response = await fetch("/get-gpt-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData && responseData.response) {
        responseContainer.innerText = responseData.response;
      } else {
        responseContainer.innerText = "No response from server.";
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      responseContainer.innerText = "Error occurred while getting a response.";
    }

    userInput.value = ""; // Clear the input field
  });
});
