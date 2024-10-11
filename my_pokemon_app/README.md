# Welcome to My Pokemon App
***

## Task
To develop a Pokémon explorer application that includes the following:
 1. Pokémon List Display: Displays Pokémon cards (showing their names and avatars) in sets of 40 per batch, with pagination to navigate between batches.
 2. Pokémon Details: Users can click on any Pokémon card to view additional information about that specific Pokémon, including stats, types, and abilities.
 3. Search Functionality: A search bar allows users to filter the displayed Pokémon by name.
 4. Error Handling: The app must handle API errors and network failures gracefully by displaying error messages to the user.

 - Features it contains:
 i. Lazy Loading: Pokémon data is loaded in batches to optimize performance.
 ii. Search: Users can search for Pokémon by name, and the search results will automatically update as they type.
 iii. Detailed Pokémon View: Clicking on a Pokémon card takes the user to a detail page that provides more information, such as stats, abilities, and types. Users can also navigate between Pokémon on the detail page.
 iv. Error Handling: Displays appropriate messages for failed API requests or network problems.
 v. Responsive Design: The layout adjusts for different screen sizes, ensuring a smooth experience across devices.

## Description
The Pokémon application is built entirely with ReactJS, using React Router to handle navigation between pages and Axios to manage API requests. The app fetches Pokémon data from the PokéAPI and displays it on a homepage in batches of 40 Pokémon per page. Each Pokémon is shown on a card with its avatar and name.

When a user clicks on a Pokémon card, they are taken to a details page where more comprehensive information about the Pokémon is displayed, such as its abilities, types, and base stats. The detail page includes navigation buttons to move between Pokémon without returning to the main list.

A search bar is also implemented, allowing users to filter Pokémon by name. As users type in the search bar, the list of Pokémon automatically updates to display the relevant results.

Key Technologies  been used includes:
ReactJS: For building the user interface and managing  the application state.
Axios: which is been used for making HTTP requests to the PokéAPI.
React Router: For handling the page navigation and routes.
CSS (App.css): For managing the styling of the app, ensuring consistency across all components.

## Installation
To run this project locally, The following process was established for the installation.

Clone the Repository

Navigate into the Project Directory
cd pokemon-app

Installation of Dependencies Run the following command to install the necessary dependencies:
"npm install" or "npx create-react-app ."

To Start the Application Use the following command to start the development server:
"npm start"

If you want to build the project for production, use the following command:
"npm run build"

## Usage
Once the application is running, you can use it in the following ways:

 - Viewing Pokémon:
Navigate to the homepage to see a list of Pokémon displayed.

 - Pokémon Details:
Click on any Pokémon card to view its detailed information of the pokemon.
Use the "Previous" and "Next" buttons at the top of the Pokémon detail page to navigate through the Pokémon details without returning to the list.

 - Search Pokémon
Use the search bar to filter Pokémon by their names as you type.


Folder Structure:
  /src
  /components
    PokemonDetails.js       # Displays details of a selected Pokémon
    PokemonList.js          # Component that fetches and displays Pokémon cards
    pokemon_card.js         # Component to render individual Pokémon card
    SearchBar.js            # Implements search functionality
  Image                     # A folder containing the image file of the pokemon been used.
  App.js                    # Main application file, sets up routes
  App.css                   # Global CSS file for styling the app
  index.js                  # Entry point of the app



### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
