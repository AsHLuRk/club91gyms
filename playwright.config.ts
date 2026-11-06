import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:30000,fullyParallel:false,use:{baseURL:'http://127.0.0.1:3000',headless:true,viewport:{width:1440,height:1000},reducedMotion:'reduce'},webServer:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:3000',reuseExistingServer:true},reporter:'list'});
