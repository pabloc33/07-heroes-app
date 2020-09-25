import React from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";
const { mount } = require("enzyme");
const { LoginScreen } = require("../../../components/login/LoginScreen");

describe("Pruebas en <LoginScreen/>", () => {
  const history = {
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );

  test("debe de mostrarse correctamente ", () => {
    //snapshot
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de realizar el dispatch y la navegación ", () => {
    const handleClick = wrapper.find("button").prop("onClick");

    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Pablo",
      },
    });

    expect(history.replace).toHaveBeenCalledWith("/");

    localStorage.setItem("lastPath", "/dc");
    handleClick();
    expect(history.replace).toHaveBeenCalledWith("/");
  });
});
