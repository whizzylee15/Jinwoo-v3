

import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios';

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = [ 'sc', 'repo2'];

  if (validCommands.includes(cmd)) {
    const repoUrl = `https://api.github.com/repos/kingmalvin/Jinwoo-v3`;
    
    await handleRepoCommand(m, Matrix, repoUrl);
  }
};

const handleRepoCommand = async (m, Matrix, repoUrl) => {
  try {
    const response = await axios.get(repoUrl);
    const repoData = response.data;

    const {
      full_name,
      name,
      forks_count,
      stargazers_count,
      created_at,
      updated_at,
      owner,
    } = repoData;

    const messageText = `
╭┈┉⚡ᴊɪɴᴡᴏᴏ ᴠ3 ʀᴇᴘᴏ ɪɴғᴏ⚡┉╾
┊*ɴᴀᴍᴇ:* ${name}
┊*sᴛᴀʀs:* ${stargazers_count}
┊*ᴅᴀɪʟʏ ᴜsᴇʀs:* ${forks_count}
┊*ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:* ${new Date(created_at).toLocaleDateString()}
┊*ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ ᴏɴ:* ${new Date(updated_at).toLocaleDateString()}
┊*ᴏᴡɴᴇʀ:* ᴍᴀʟᴠɪɴ ᴋɪɴɢ
╰ ┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╾  
`;

    const repoMessage = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: messageText,
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '© 𝖩𝗂𝗇𝗐𝗈𝗈',
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              ...(await prepareWAMessageMedia({
                image: {
                  url: 'https://files.catbox.moe/aneq3s.jpg',
                },
              }, { upload: Matrix.waUploadToServer })),
              title: '',
              gifPlayback: true,
              subtitle: '',
              hasMediaAttachment: false,
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'Chat 𝖩𝗂𝗇',
                    url: 'https://wa.me/+263714757857?text=Hi 𝖩𝗂𝗇 i Need Help',
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'Click Here To Fork',
                    url: 'https://github.com/kingmalvn/Jinwoo-v3/fork',
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'Join Our Community',
                    url: 'https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3Z',
                  }),
                },
              ],
            }),
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 9999,
              isForwarded: true,
            },
          }),
        },
      },
    }, {});

    await Matrix.relayMessage(repoMessage.key.remoteJid, repoMessage.message, {
      messageId: repoMessage.key.id,
    });
    await m.React('✅');
  } catch (error) {
    console.error('Error processing your request:', error);
    m.reply('Error processing your request.');
    await m.React('❌');
  }
};

export default searchRepo;
