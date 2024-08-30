const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

dotenv.config();

const token = process.env.BOT_TOKEN;

const botName = 'My Account Info Bot';

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([{ command: 'start', description: 'Посмотреть информацию' }]);

bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const user = msg.from;

    const firstName = user.first_name;
    const lastName = user.last_name || 'Не указана';
    const userId = user.id;
    const username = user.username ? user.username : 'Не указано';
    const languageCode = user.language_code || 'Не указан';
    const isBot = user.is_bot ? 'Да' : 'Нет';

    const accountInfo = `
Привет! Я ${botName} 🤖

👤 Имя: ${firstName}
📝 Фамилия: ${lastName}
🆔 ID: \`${userId}\`
👨‍💻 Имя пользователя: \`@${username}\`
🌐 Языковой код: ${languageCode}
🤖 Бот: ${isBot}
💬 Чат ID: \`${chatId}\`
      `;

    await bot.sendMessage(chatId, accountInfo, { parse_mode: 'Markdown' });
  } catch (error) {
    logger.error('Error handling /start command:', error);
  }
});

bot.on('polling_error', (error) => {
  logger.error('Polling error:', error);
});

logger.info('Bot started successfully!');
