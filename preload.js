const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("DESKTOP_ENV", true);