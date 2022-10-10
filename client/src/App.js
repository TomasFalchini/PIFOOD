import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import NavBar from "./components/Nav Bar/NavBar.jsx";
import RecipesCards from "./components/Recipes Cards/RecipeCards.jsx";
import RecipeDetails from "./components/Recipe Details/RecipeDetails.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CreateRecipe from "./components/Create Recipe/CreateRecipe.jsx";
import SearchBar from "./components/Search Bar/SearchBar";
import NotFound from "./components/Route Not Found 404/RouteNotFind";
import RecipeUpdate from "./components/RecipeUpdate/RecipeUpdate.jsx";

//importar todos los componentes para armar las rutas de renderizado.

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="home" element={<NavBar />}>
        <Route
          path="recipes"
          element={
            <>
              <SearchBar />
              <RecipesCards />
              <Footer />
            </>
          }
        />
        <Route path=":id/edit" element={<RecipeUpdate />} />
        <Route path="create" element={<CreateRecipe />} />
        <Route path=":id" element={<RecipeDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
