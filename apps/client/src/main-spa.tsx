'use client';

import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';

const MainSPA = () => {
  return <RouterProvider router={router} />;
};

export default MainSPA;
