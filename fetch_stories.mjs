import fs from 'fs';
import https from 'https';
const url = "https://docs.google.com/document/d/1DXwbdcvEhh5Vqj6L55T0eaGcxTFuDrZj_YaMiEv4W2I/export?format=html";
https.get(url, (res) => {
  let rawHtml = '';
  res.on('data', (c) => rawHtml += c);
  res.on('end', () => {
    fs.writeFileSync('doc.html', rawHtml);
    console.log("Saved to doc.html");
  })
});
