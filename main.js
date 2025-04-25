// app, which controls your application's event lifecycle.
// BrowserWindow, which creates and manages app windows.

const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        frame: false
    })

    win.loadFile('index.html');
}

//troca de thema no app
ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})

//Quando o app é iniciado
app.whenReady().then(() => {
    createWindow()

    // Caso n tiver nenhuma aberta ele vai abrir uma 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//Quando todas a janelas estiverem fechadas o app fecha
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
