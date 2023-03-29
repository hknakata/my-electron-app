const { app, BrowserWindow } = require('electron');
const path = require('path');

// Import the Express framework
const express = require('express');

// Create a new Express app instance
const api = express();

// Define the port number to use
const PORT = 3000;

// Define a route for the root endpoint
api.get('/', (req, res) => {
    // Return a "This is my first API" message
    res.send('This is my first API.');
});

api.get('/api/users/:id', (req, res) => {
  // Create a new user
  const user = { "id": req.params.id, "name": "hello world"};
  
  // Return a user json
  res.json(user);
});

// Start the app by listening on the specified port
api.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// Embed the Express app into your main app file
const expressApp = express();
expressApp.use(api); // Use the app as middleware


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
