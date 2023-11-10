# ChatGPT Assistant

A simple assistant powered by ChatGPT for answering questions and providing information.

## Introduction

ChatGPT Assistant is a project that utilizes the OpenAI GPT-3.5 Turbo model to create a conversational assistant. It can understand and respond to user queries, making it a useful tool for various applications.

## Features

- Natural Language Understanding
- Dynamic Conversation Handling
- Quick and Informative Responses

## Getting Started

### Prerequisites

To run the ChatGPT Assistant, you need to have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Harshmendhe349/project-chatgpt-assistant.git

2. Navigate to the project directory:

    cd chatgpt-assistant

3. Install dependencies:

    npm install

4. Create a .env file in the server and add following fields:

    ATLAS_URI=your-api-key-here
    JWT_SECRET_KEY = your-secret-key-here
    EMAIL_PASS= your-email-password-here
    CLIENT_URL="http://localhost:5173/"
    OPENAI_API_KEY=your-api-key-here

5. Start the application:

    npm start

#### Usage

Once the application is running,
    
- Register the user. Once the user is succesfully registered and verified login as user.
- Once the user is successfully logged in you can interact with the ChatGPT Assistant by sending messages. For example:

    User: "What is the capital of France?"
    Assistant: "The capital of France is Paris."

Feel free to ask questions or engage in a conversation with the assistant.

##### Acknowledgments
OpenAI for providing the GPT-3.5 Turbo model
