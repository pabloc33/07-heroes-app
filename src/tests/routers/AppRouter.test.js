import React from "react";
import { AuthContext } from "../../auth/AuthContext";
const { mount } = require("enzyme");
const { AppRouter } = require("../../routers/AppRouter");

describe("Pruebas en <AppRouter/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test("debe de mostrar el login si no está autenticado ", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar el componente marvel si está autenticado ", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: "Elta",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
