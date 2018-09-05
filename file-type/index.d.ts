/// <reference types="node" />

export = FileType;

declare function FileType(buf: Exclude<any, Buffer | Uint8Array>): null | FileType.FileTypeResult;

declare namespace FileType {
    interface FileTypeResult {
        ext: string;
        mime: string;
    }
}