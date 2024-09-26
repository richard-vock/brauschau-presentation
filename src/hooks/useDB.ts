import { useState } from 'react';

import { init } from '@instantdb/react';

function initDB() {
  return init({ appId: 'd25c25b4-b02e-4c42-8364-1272953154f0', devtool: false });
}

function useDB() {
  const [db] = useState(initDB());

  return db;
}

export default useDB;
