import * as migration_20251201_052617 from './20251201_052617';

export const migrations = [
  {
    up: migration_20251201_052617.up,
    down: migration_20251201_052617.down,
    name: '20251201_052617'
  },
];
