/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}