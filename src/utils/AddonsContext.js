import { createContext } from 'react';

const AddonsContext = createContext({
  addonsSelected: [],
  setAddonsSelected: () => {},
  addonarray: []
});

export default AddonsContext;