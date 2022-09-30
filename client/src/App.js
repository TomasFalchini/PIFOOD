import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import NavBar from "./components/Nav Bar/NavBar.jsx";
import RecipesCards from "./components/Recipes Cards/RecipeCards.jsx";
import RecipeDetails from "./components/Recipe Details/RecipeDetails.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CreateRecipe from "./components/Create Recipe/CreateRecipe.jsx";
import Filters from "./components/Filters/Filters.jsx";

//importar todos los componentes para armar las rutas de renderizado.

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<NavBar />}>
          <Route path="/">
            <Filters />
            <RecipesCards />
            <Footer />
          </Route>
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/:id" element={<RecipeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
