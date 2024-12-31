#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

function installDependencies() {
  console.log("Installing dependencies...");
  execSync("npm install vue axios", { stdio: "inherit" });
}

function configureProject() {
  console.log("Creating configuration file...");

  const configPath = "./src/config.js";
  const configContent = `
export const API_BASE_URL = "https://api.example.com";
export const APP_NAME = "My Vue App";
  `;

  if (!fs.existsSync("./src")) {
    fs.mkdirSync("./src");
  }

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, configContent);
    console.log(`Configuration file created at ${configPath}`);
  } else {
    console.log("Configuration file already exists. Skipping...");
  }
}

function main() {
  console.log("Starting project setup...");
  installDependencies();
  configureProject();
  console.log("Setup complete! Enjoy coding.");
}

main();
