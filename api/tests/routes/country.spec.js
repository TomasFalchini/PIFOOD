/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanesa a la napolitana",
  resume: "Rica comida gourmet argentina",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", function () {
    this.timeout(10000);
    it("should get 200", () => agent.get("/recipes").expect(200));
  });
  describe("GET /diets", function () {
    this.timeout(10000);
    it("should get 200", () => agent.get("/diets").expect(200));
  });
  describe("GET /recipes?name=Milanesa", function () {
    this.timeout(10000);
    it("should get 200", () => agent.get("/recipes?name=Milanesa").expect(200));
  });
  describe("GET /recipes?name=undefined", function () {
    this.timeout(10000);
    it("should get 404 if the recipe name does not match", () =>
      agent.get("/recipes?name=undefined").expect(404));
  });
  describe("GET /recipes/:idRecipe", function () {
    this.timeout(10000);
    it("should get 404 if the ID does not match with a recipe", () =>
      agent.get("/recipes/23298329048hfskdjfsdjf").expect(404));
  });
  describe("GET /recipes/:idRecipe", function () {
    this.timeout(10000);
    it("should get 200 if the ID  match with a recipe", async () => {
      const recipe = await Recipe.findAll({
        where: {
          name: "Milanesa a la napolitana",
        },
      });
      const id = recipe.ID;
      agent.get(`/recipes/${id}`).expect(200);
    });
  });
  describe("POST /recipes/create", function () {
    this.timeout(10000);
    it("should get 404 if resume is missing in the post BODY", () =>
      agent
        .post("/recipes/create")
        .send({ name: "Milanesas con pure" })
        .expect(404));
  });
  describe("POST /recipes/create", function () {
    this.timeout(10000);
    it("should get 404 if name is missing in the post BODY", () =>
      agent.post("/recipes/create").send({ resume: "Muy ricas" }).expect(404));
  });
  describe("POST /recipes/create", function () {
    this.timeout(10000);
    it("should get 200 if name and resume are in the post BODY", () =>
      agent
        .post("/recipes/create")
        .send({ name: "Milanesas con pure", resume: "Muy ricas" })
        .expect(200));
  });
});
