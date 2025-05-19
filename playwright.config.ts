import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 40 * 1000,
    testDir: './tests',
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] }
        }
    ],
    use: {
        headless: false,
        baseURL: "https://the-internet.herokuapp.com",
        actionTimeout: 5 * 1000,
    }
})