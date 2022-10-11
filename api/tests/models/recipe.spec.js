const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe Model", () => {
  before(async () => {
    await conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await Recipe.sync({ force: true });
  });

  it("should not create the Recipe if name is not send", async () => {
    try {
      await Recipe.create({});
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });

  it("should not create the Recipe if resume is not send", async () => {
    try {
      await Recipe.create({ name: "Milanesa a la napolitana" });
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });

  it("should not create the Recipe if health score is not a integer", async () => {
    try {
      await Recipe.create({
        name: "Milanesa a la napolitana",
        resume: "Rico alimento tradicional de la República Argentina",
        health_score: "Esto no va",
      });
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });

  it("should not create the Recipe if name is not valid", async () => {
    try {
      await Recipe.create({
        name: "Milanesas a la napolitana ==!%#***",
        resume: "Rico alimento tradicional de la República Argentina",
      });
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });

  it("should not create the Recipe if steps is not string", async () => {
    try {
      await Recipe.create({
        name: "Milanesa a la napolitana",
        resume: "Rico alimento tradicional de la República Argentina",
        health_score: 77,
        steps: 15,
      });
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });

  it("should not create the Recipe if health score is not between 0 and 100", async () => {
    try {
      await Recipe.create({
        name: "Milanesa a la napolitana",
        resume: "Rico alimento tradicional de la República Argentina",
        health_score: 110,
      });
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });

  it("should create the Recipe if all required properties are ok", async () => {
    const recipe = await Recipe.create({
      name: "Milanesa a la napolitana",
      resume: "Rico alimento tradicional de la República Argentina",
      health_score: 99,
      steps: "Step Number 1: .....",
      image: "image URL ...",
      created: true,
    });
    expect(recipe.toJSON()).to.be.a("object");
    expect(recipe.toJSON()).to.have.property("name");
    expect(recipe.toJSON()).to.have.property("ID");
    expect(recipe.toJSON()).to.have.property("resume");
    expect(recipe.toJSON()).to.have.property("image");
  });
});
