// JINWOO-MD URL Shortener Command - POWERED BY MALVIN KING

import axios from "axios";

import config from "../config.cjs";

const shortenUrl = async (m, sock) => {

  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  const validCommands = ["shortenurl", "urlshortener", "shorten"];

  if (validCommands.includes(cmd)) {

    const url = m.body.split(" ")[1];

    if (!url) {

      return await sock.sendMessage(

        m.from,

        { text: "❌ Please provide a URL to shorten. Example: *.shortenurl https://github.com/kingmalvn/Jinwoo-v3*" },

        { quoted: m }

      );

    }

    const apiUrl = `https://bk9.fun/tools/shorten?url=${encodeURIComponent(url)}`;

    try {

      await m.React("⏳"); // React with a loading icon

      const response = await axios.get(apiUrl);

      const data = response.data;

      if (data.status === true && data.BK9) {

        const originalUrl = data.BK9.origin;

        const shortenedUrl = data.BK9.url;

        const responseText = `🔗 *URL SHORTENER*\n\n🌐 Oʀɪɢɪɴᴀʟ Uʀʟ: *${originalUrl}*\n➡️ Sʜᴏʀᴛᴇɴᴇᴅ Uʀʟ: *${shortenedUrl}*\n\n💡 _Tap and hold on the shortened URL to copy it._\n\n> 🌀 ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴀᴜʀᴀ ᴋɪɴɢ🌀`;

        await sock.sendMessage(

          m.from,

          {

            text: responseText,

            contextInfo: {

              isForwarded: false,

              forwardedNewsletterMessageInfo: {

                newsletterJid: "@newsletter",

                newsletterName: "ᴊɪɴᴡᴏᴏ ᴠ³",

                serverMessageId: -1,

              },

              forwardingScore: 999, // Score to indicate it has been forwarded

              externalAdReply: {

                title: "✨ ᴊɪɴᴡᴏᴏ ᴠ3 ✨",

                body: "URL Shortener Service",

                thumbnailUrl: "", // Add thumbnail URL if required

                sourceUrl: "https://github.com/kingmalvn/Jinwoo-v3", // Source URL

                mediaType: 1,

                renderLargerThumbnail: false,

              },

            },

          },

          { quoted: m }

        );

      } else {

        throw new Error("Invalid response from the API");

      }

    } catch (error) {

      console.error("Error:", error); // Log the full error for debugging

      await sock.sendMessage(

        m.from,

        {

          text: `❌ Error shortening URL: ${error.message}`,

          contextInfo: {

            externalAdReply: {

              title: "✨ Aura King ✨",

              body: "URL Shortener Service",

              sourceUrl: "https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3Z",

              mediaType: 1,

            },

          },

        },

        { quoted: m }

      );

    }

  }

};

export default shortenUrl;

// POWERED BY AURA KING