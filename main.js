const { app, BrowserWindow, nativeImage, Tray, Menu, session } = require('electron')
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

let tray
/**
 * @type {BrowserWindow}
 */
let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        //frame: false,
        icon: nativeImage.createFromPath(__dirname + '/ts4m.png'),
        webPreferences: {
            preload: __dirname + "/preload.js",
        },
        titleBarStyle: 'default',
        titleBarOverlay: {
            color: "#4F545C",
            symbolColor: 'white',
            height: 20
        },
        autoHideMenuBar: true,
    })

    //win.loadURL(`https://ts4preview.vercel.app/`)
    win.loadURL(`https://turtlepaw-sims-4-mods-x5976qjg93pp5w-3000.githubpreview.dev/`, {
        userAgent: 'Electron',
    })
    //win.loadFile('index.html')
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null)
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    const icon = nativeImage.createFromPath(__dirname + '/ts4m.png')
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open App', click: () => win.show() },
        { label: 'Quit', type: 'normal', click: () => { app.quit() } }
    ])

    tray.setToolTip('TS4M Companion')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => {
        win.show()
    });

    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}).catch(e => console.log(e));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})