    import {
    app,
    BrowserWindow,
    ipcMain,
    dialog
    } from "electron";

    function createWindow() {

    const win = new BrowserWindow({
        width: 1200,
        height: 800,

        webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
        }
    });

    win.loadURL(
        "http://localhost:5173"
    );

    }

    app.whenReady().then(() => {

    createWindow();

    ipcMain.handle(
        "select-folder",
        async () => {

        const result =
            await dialog.showOpenDialog({

            properties: [
                "openDirectory"
            ]

            });

        if (
            result.canceled
        ) {

            return null;

        }

        return result.filePaths[0];

        }
    );

    });