<script>
  let userInput = '';
  let isSending = false;
  let response = '';

  // Function to handle the form submission
  async function handleSubmit(event) {
    event.preventDefault();
    if (!userInput.trim()) return;

    isSending = true;
    response = ''; // Clear previous response

    // Simulate sending the input to an AI and receiving a response
    try {
      // Replace this with your actual API call
      response = await simulateChatResponse(userInput);
    } catch (error) {
      response = 'Error fetching response.';
    } finally {
      isSending = false;
    }
  }

  // Example simulated chat response
  async function simulateChatResponse(input) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Response to: "${input}"`);
      }, 1000); // Simulates delay
    });
  }
</script>

<style>
  .chat-container {
    width: 600px;
    max-width: 90%;
    margin: 50px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .input-area {
    position: relative;
    display: flex;
    flex-direction: row;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 15px 50px 15px 15px;
    font-size: 1.1rem;
    resize: none;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  textarea:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px 12px;
    font-size: 1rem;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    color: #5f5f5f;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
  }

  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
    opacity: 0;
  }

  button:hover:not(:disabled) {
    background-color: #d1d1d1;
  }

  button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .response {
    padding: 10px;
    background: #f7f9fc;
    border: 1px solid #ddd;
    border-radius: 8px;
    white-space: pre-wrap;
    font-size: 1rem;
    color: #333;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
</style>

<div class="chat-container">
  <form on:submit={handleSubmit} class="input-area">
    <textarea
      bind:value={userInput}
      placeholder="Type your message here..."
      disabled={isSending}
    ></textarea>
    <button type="submit" disabled={isSending || !userInput.trim()}>
      <i class="fas fa-paper-plane"></i>
    </button>
  </form>

  {#if response}
    <div class="response">{response}</div>
  {/if}
</div>