#!/usr/bin/env node

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { spawn } = require('node:child_process');

const cmd = process.argv.slice(2).join(' ');
const child = spawn(cmd, { shell: true, stdio: 'inherit', env: process.env });

child.on('exit', (code) => {
  process.exit(code);
});
