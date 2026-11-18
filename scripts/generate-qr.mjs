/**
 * Renders the WhatsApp QR from the confirmed studio number in the brochure.
 * The brochure shipped with a "QR PENDIENTE" placeholder; this encodes the
 * real wa.me link so nothing on the page is a mock.
 *
 * Run with: node scripts/generate-qr.mjs
 */
import fs from "node:fs";
import QRCode from "qrcode";

const WHATSAPP_URL = "https://wa.me/573005932450";

const svg = await QRCode.toString(WHATSAPP_URL, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 0,
  color: { dark: "#151515", light: "#00000000" },
});

fs.mkdirSync("public/brand", { recursive: true });
fs.writeFileSync("public/brand/whatsapp-qr.svg", svg);
console.log("wrote public/brand/whatsapp-qr.svg for", WHATSAPP_URL);
