import type { FileItem } from "@webiny/admin-ui";

export const getFileItem = (value?: string): FileItem | null => {
    if (!value) {
        return null;
    }

    const url = new URL(value);
    const pathname = url.pathname;
    const name = pathname.substring(pathname.lastIndexOf("/") + 1);
    const extension = name.split(".").pop()?.toLowerCase() || "";

    // Map extensions to mimetypes
    const mimeTypes: Record<string, string> = {
        // Images
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        bmp: "image/bmp",
        webp: "image/webp",
        svg: "image/svg+xml",
        ico: "image/x-icon",
        tif: "image/tiff",
        tiff: "image/tiff",

        // Documents
        pdf: "application/pdf",
        txt: "text/plain",
        csv: "text/csv",
        json: "application/json",
        xml: "application/xml",
        html: "text/html",
        xhtml: "application/xhtml+xml",
        md: "text/markdown",

        // Microsoft Office
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

        // Open Document Format
        odt: "application/vnd.oasis.opendocument.text",
        ods: "application/vnd.oasis.opendocument.spreadsheet",
        odp: "application/vnd.oasis.opendocument.presentation",

        // Audio
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg",
        flac: "audio/flac",
        aac: "audio/aac",
        m4a: "audio/mp4",

        // Video
        mp4: "video/mp4",
        avi: "video/x-msvideo",
        mov: "video/quicktime",
        mkv: "video/x-matroska",
        webm: "video/webm",
        flv: "video/x-flv",
        wmv: "video/x-ms-wmv",

        // Archives & Compressed
        zip: "application/zip",
        rar: "application/vnd.rar",
        tar: "application/x-tar",
        gz: "application/gzip",
        bz2: "application/x-bzip2",
        "7z": "application/x-7z-compressed",

        // Code & Scripts
        js: "application/javascript",
        ts: "application/typescript",
        css: "text/css",
        py: "text/x-python",
        java: "text/x-java-source",
        c: "text/x-c",
        cpp: "text/x-c++",
        sh: "application/x-sh",
        php: "application/x-httpd-php",
        rb: "application/x-ruby",
        go: "text/x-go",
        swift: "text/x-swift"
    };

    return {
        src: value,
        name,
        mimeType: mimeTypes[extension] || "application/octet-stream" // Default if unknown
    };
};
