import axios from "axios";
import config from '../config.cjs';

const repo = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (["repo", "sc", "script", "info"].includes(cmd)) {
    const githubRepoURL = "https://github.com/kingmalvn/Jinwoo-v3";

    try {
      // Extract username and repo name from the URL
      const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

      // Fetch repository details using GitHub API
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

      if (!response.data) {
        throw new Error("GitHub API request failed.");
      }

      const repoData = response.data;

      // Format the repository information
      const formattedInfo = `╭───────────────━⊷
┊ 🤖 ᴊɪɴᴡᴏᴏ ʙᴏᴛ ᴠ3 ʀᴇᴘᴏ ɪɴғᴏ 🤖
╰───────────────━⊷
╭───────────────━⊷
║💡 *ɴᴀᴍᴇ:*${repoData.name}
║👤 *ᴏᴡɴᴇʀ:* ᴍᴀʟᴠɪɴ ᴋɪɴɢ
║⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* ${repoData.stargazers_count}
║🍴 *ᴅᴀɪʟʏ ᴜsᴇʀs:* ${repoData.forks_count}
║🔗 *ɢɪᴛʜᴜʙ ʟɪɴᴋ:*  ${repoData.html_url}
║❗ *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:*  ${repoData.description || "No description"}
╰───────────────━⊷

 ᴅᴏɴᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ & ғᴏʀᴋ ᴛʜᴇ ʀᴇᴘᴏ🌟
 
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴋɪɴɢ`;

      // Send an image with the formatted info as a caption
      await gss.sendMessage(
        m.from,
        {
          image: { url: "https://files.catbox.moe/aneq3s.jpg" },
          caption: formattedInfo,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363306168354073@newsletter",
              newsletterName: "👾 ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ 👾",
              serverMessageId: 143,
            },
          },
        },
        { quoted: m }
      );

      // Send the audio file with context info
      await gss.sendMessage(
        m.from,
        {
          audio: { url: "https://github.com/kingmalvn/KING-DATA/raw/refs/heads/main/autovoice/repo.m4a" },
          mimetype: "audio/mp4",
          ptt: true,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363306168354073@newsletter",
              newsletterName: "👾 ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ 👾",
              serverMessageId: 143,
            },
          },
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in repo command:", error);
      m.reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
  }
};

export default repo;
