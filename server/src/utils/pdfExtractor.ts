import PDFParser from "pdf2json";

export const extractPdfText = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err: any) => {
      if (err instanceof Error) {
        reject(err);
      } else {
        reject(err.parserError);
      }
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      const pages: string[] = [];

      for (const page of pdfData.Pages) {
        const lines = new Map<number, string[]>();

        for (const text of page.Texts) {
          const y = Math.round(text.y * 10);

          const decoded = text.R.map((r: any) => {
            try {
              return decodeURIComponent(r.T);
            } catch {
              // Fall back to the raw text if decoding fails
              return r.T ?? "";
            }
          }).join("");

          if (!lines.has(y)) {
            lines.set(y, []);
          }

          lines.get(y)!.push(decoded);
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
