const express = require("express");

const app = express();

app.get("/proxy-image", async (req, res) => {
  try {
    const url = req.query.url;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://item.taobao.com/"
      }
    });

    const buffer = await response.arrayBuffer();

    res.set("Content-Type", response.headers.get("content-type"));
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.log(err);
    res.status(500).send("Image proxy failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running"));
