const path = require('path');

module.exports = {
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.angular/**',
      '**/System Volume Information/**',
      '**/Windows/**',
      '**/Program Files/**',
      '**/Program Files (x86)/**',
      '**/Users/Public/**',
      '**/AppData/**',
      '**/Local Settings/**',
      '**/$RECYCLE.BIN/**',
      '**/Thumbs.db',
      '**/Desktop.ini'
    ],
    aggregateTimeout: 300,
    poll: false
  },
  resolve: {
    fallback: {
      "fs": false,
      "path": false
    }
  }
};
