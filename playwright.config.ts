import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // }
    ],
    use: {
        headless: false,
        baseURL: "http://playwright.dev"
    }
})