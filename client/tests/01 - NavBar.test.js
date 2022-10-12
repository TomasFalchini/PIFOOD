import { configure, shallow } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { NavLink } from "react-router-dom";
import NavBar from "../src/components/Nav Bar/NavBar.jsx";
import React from "react";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<NavBar />);
  });

  it('Debería renderizar dos <NavLink to="" />. El primero que vaya a "/home/recipes" y el segundo a "/home/create"', () => {
    expect(nav.find(NavLink).length).toBeGreaterThanOrEqual(2);
    expect(nav.find(NavLink).find({ to: "/home/recipes" }).length).toBe(1);
    expect(nav.find(NavLink).find({ to: "/home/create" }).length).toBe(1);
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home/recipes"', () => {
    expect(nav.find(NavLink).find({ to: "/home/recipes" }).text()).toBe("HOME");
  });

  it('Debería tener un segundo Link, con texto "CREATE" y que cambie la ruta hacia "/home/create"', () => {
    expect(nav.find(NavLink).find({ to: "/home/create" }).text()).toBe(
      "CREATE"
    );
  });
});
