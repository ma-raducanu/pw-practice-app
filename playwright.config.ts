import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env') });

export default defineConfig({
  // timeout: 30000,
  // globalTimeout: 60000,
  // expect: {
  //   timeout: 5000,
  // },
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['html', {open: 'never'}]],
  use: {
    // actionTimeout: 5000,
    baseURL: process.env.URL,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'page-object-tests',
      testMatch: '*page-objects.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
