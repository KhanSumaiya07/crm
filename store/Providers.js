//store/Providers.js

"use client";

import { Provider } from "react-redux";
import { store } from "./index";

export const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
