import React, { useState, useEffect } from 'react';
import { listRestaurants } from "./graphql/queries";
import { createRestaurant, deleteRestaurant } from "./graphql/mutations";
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import { generateClient } from 'aws-amplify/api';
import { withAuthenticator, View, Heading, Button } from '@aws-amplify/ui-react';
import { FaSignOutAlt } from 'react-icons/fa';

Amplify.configure(awsmobile);
const client = generateClient();

function App({ signOut }) {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({ name: "", description: "", city: "" });

  const fetchRestaurants = async () => {
    try {
      const result = await client.graphql({ query: listRestaurants });
      setRestaurants(result.data.listRestaurants.items);
    } catch (error) {
      console.error("Error fetching restaurants: ", error);
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    try {
      await client.graphql({
        query: createRestaurant,
        variables: { input: newRestaurant },
      });
      fetchRestaurants();
      setNewRestaurant({ name: "", description: "", city: "" });
    } catch (error) {
      console.error("Error creating restaurant: ", error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await client.graphql({
        query: deleteRestaurant,
        variables: { input: { id } },
      });
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.error("Error deleting restaurant: ", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>

<header className="app-header">
  <Button
    onClick={() => {
      if (window.confirm('Are you sure you want to sign out?')) {
        signOut();
      }
    }}
    className="p-2 text-white d-flex align-items-center signout-button"
    aria-label="Sign out of your account"
  >
    <FaSignOutAlt className="me-2" />
    &nbsp; Logout
  </Button>
</header>

      <main className="app-content">
        <section className="add-restaurant-section">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
          <Heading level={4} className="section-heading">
            Add a Restaurant
          </Heading>
        </div>
          <View as="form" className="restaurant-form" onSubmit={handleCreateRestaurant}>
            <input
              placeholder="Restaurant Name"
              value={newRestaurant.name}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
              className="input-field"
              required
            />
            <input
              placeholder="Description"
              value={newRestaurant.description}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, description: e.target.value })
              }
              className="input-field"
              required
            />
            <input
              placeholder="Restaurant City"
              value={newRestaurant.city}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, city: e.target.value })}
              className="input-field"
              required
            />
            <Button type="submit" className="create-button">
              Create Restaurant
            </Button>
          </View>
        </section>

        <section className="restaurant-list-section">
          <Heading level={4} className="section-heading">
            List of Restaurants ({restaurants.length})
          </Heading>
          {restaurants.length > 0 ? (
            <table className="restaurant-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.description}</td>
                    <td>{restaurant.city}</td>
                    <td>
                      <Button
                        className="delete-button"
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              <strong>
                <em>No restaurants available. Please Kindly Add a Restaurant!</em>
              </strong>
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default withAuthenticator(App);
