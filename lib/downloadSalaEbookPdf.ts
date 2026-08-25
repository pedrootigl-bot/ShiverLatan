"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function fileNameFromTitle(title: string): string {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `shiver-${slug || "ebook"}.pdf`;
}

async function waitForImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
}

function addCanvasPages(pdf: jsPDF, canvas: HTMLCanvasElement): void {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const image = canvas.toDataURL("image/jpeg", 0.92);

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(image, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(image, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
}

export async function downloadSalaEbookPdf(source: HTMLElement, title: string): Promise<void> {
  const host = source.closest(".sala") ?? document.body;
  const clone = source.cloneNode(true) as HTMLElement;
  clone.setAttribute("aria-hidden", "true");
  clone.style.width = `${Math.max(source.clientWidth, 640)}px`;
  clone.style.maxHeight = "none";
  clone.style.height = "auto";
  clone.style.overflow = "visible";
  clone.style.position = "static";

  const stage = document.createElement("div");
  stage.style.cssText =
    "position:fixed;left:-12000px;top:0;z-index:-1;pointer-events:none;background:#0b0f16;";
  stage.append(clone);
  host.append(stage);

  try {
    await waitForImages(clone);
    const canvas = await html2canvas(clone, {
      backgroundColor: "#0b0f16",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    });

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    addCanvasPages(pdf, canvas);
    pdf.save(fileNameFromTitle(title));
  } finally {
    stage.remove();
  }
}
