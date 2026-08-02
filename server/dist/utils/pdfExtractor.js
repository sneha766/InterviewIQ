"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPdfText = void 0;
const pdf2json_1 = __importDefault(require("pdf2json"));
const extractPdfText = async (filePath) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new pdf2json_1.default();
        pdfParser.on("pdfParser_dataError", (err) => {
            if (err instanceof Error) {
                reject(err);
            }
            else {
                reject(err.parserError);
            }
        });
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            const pages = [];
            for (const page of pdfData.Pages) {
                const lines = new Map();
                for (const text of page.Texts) {
                    const y = Math.round(text.y * 10);
                    const decoded = text.R.map((r) => {
                        try {
                            return decodeURIComponent(r.T);
                        }
                        catch {
                            // Fall back to the raw text if decoding fails
                            return r.T ?? "";
                        }
                    }).join("");
                    if (!lines.has(y)) {
                        lines.set(y, []);
                    }
                    lines.get(y).push(decoded);
                }
                const pageText = [...lines.entries()]
                    .sort((a, b) => a[0] - b[0])
                    .map(([, words]) => words.join(" "))
                    .join("\n");
                pages.push(pageText);
            }
            resolve(pages.join("\n\n"));
        });
        pdfParser.loadPDF(filePath);
    });
};
exports.extractPdfText = extractPdfText;
