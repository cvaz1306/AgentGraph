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
      width: 800px;
      margin: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      font-family: system-ui, sans-serif;
    }
  
    .input-area {
      position: relative;
      display: flex;
      flex-direction: column;
    }
  
    textarea {
      width: 100%;
      height: 200px;
      padding: 15px 50px 15px 15px;
      font-size: 1.1rem;
      resize: none;
      border: 2px solid #ccc;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
    }
  
    textarea:focus {
      border-color: #4a90e2;
    }
  
    button {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 15px;
      font-size: 0.9rem;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    button:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  
    .response {
      padding: 10px;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 8px;
      white-space: pre-wrap;
      font-size: 1rem;
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
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  
    {#if response}
      <div class="response">{response}</div>
    {/if}
  </div>