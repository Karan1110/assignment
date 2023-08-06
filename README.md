# PDF Form Filler Project

## Frontend

- The frontend is a React application built with JavaScript and React libraries.
- It allows users to load a PDF form by clicking the "Load PDF" button.
- The PDF is fetched from the backend server using the `fetch` API.
- Once the PDF is loaded, it is displayed on the page using the `<object>` tag as an iframe.
- Users can interact with the PDF form by entering text in the input field provided.
- The user input is captured using the `useState` hook and stored in the `inputValue` state.
- The "Save PDF" button allows users to save the updated PDF with their input.
- When the "Save PDF" button is clicked, the user input is sent to the backend server using a POST request.
- After successful saving on the server, the PDF is reloaded to update the displayed content.

## Backend

- The backend is built with Node.js and Express.js to handle the server-side logic.
- It provides two endpoints: `/load-pdf` and `/save-pdf`.
- The `/load-pdf` endpoint is responsible for serving the PDF file to the frontend.
- If the PDF file does not exist, the backend generates a new PDF form with an input field using the `pdf-lib` library.
- The PDF is then saved in the server's file system for future use.
- The `/save-pdf` endpoint is responsible for receiving the user's input from the frontend.
- When the user clicks the "Save PDF" button, the frontend sends the input value as JSON in the request body.
- The backend receives the input and uses the `pdf-lib` library to update the PDF form with the user's input.
- The updated PDF is then saved back to the file system on the server.

## Overall Project

- The PDF Form Filler project allows users to view, interact with, and save input on a PDF form from a web application.
- It leverages the React frontend to load and display the PDF form with an input field.
- The backend handles PDF generation, serving, and saving user input to the PDF file.
- The project demonstrates the use of libraries like `pdf-lib` for PDF manipulation.
- Users can seamlessly update the PDF with their input, as the frontend fetches the latest PDF after saving.

**Note:** In a production environment, proper security measures, such as authentication and input validation, would be essential to ensure the project's security and stability. Additionally, the frontend and backend would be hosted on different servers or cloud platforms for real-world deployment.
