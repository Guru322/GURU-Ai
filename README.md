<p align="center">  
  <a href="https://youtu.be/WcA7GZuaN0A">
    <img alt="Guru" height="300" src="https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg">
    <h1 align="center">GURU Ai</h1>
  </a>
</p>
<p align="center">
<a href="https://github.com/Guru322"><img title="Author" src="https://img.shields.io/badge/GURU-BOT-black?style=for-the-badge&logo=telegram"></a>
<p/>
<p align="center">
<a href="https://github.com/Guru322?tab=followers"><img title="Followers" src="https://img.shields.io/github/followers/Guru322?label=Followers&style=social"></a>
<a href="https://github.com/Guru322/GURU-BOT/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/Guru322/GURU-BOT?&style=social"></a>
<a href="https://github.com/Guru322/GURU-BOT/network/members"><img title="Fork" src="https://img.shields.io/github/forks/Guru322/GURU-BOT?style=social"></a>
<a href="https://github.com/Guru322/GURU-BOT/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/Guru322/GURU-BOT?label=Watching&style=social"></a>
<a href="https://app.fossa.com/projects/git%2Bgithub.com%2FGuru322%2FGURU-BOT?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FGuru322%2FGURU-BOT.svg?type=shield"/></a>
</p>

## Installation
```bash
git clone https://github.com/Guru322/GURU-Ai.git
cd GURU-Ai
npm install
```

## Configuration
Create a `.env` file in project root or set the following environment variables:
```
MONGODB_URI=<Your MongoDB connection URI>
PHONE_NUMBER=<Your WhatsApp phone number with country code>
BOTNAME=<Bot display name (optional)>
OWNERS="<owner1;john;owner2;doe>"
```
You can also edit `config.js` for additional settings like botname, packname, author, owners list, and sticker watermark.

## Running the Bot
```bash
npm start
# or
node index.js
```
By default the server listens on port 5000 (or the port defined in the `PORT` environment variable). Open your browser at `http://localhost:5000` to access the pairing interface where the pairing code and connection status are displayed.

## Usage
After starting, the bot will print a pairing code. Open WhatsApp > Linked Devices > Link a Device > Link with phone number and enter the pairing code to connect.

Commands are invoked with a prefix (default is `.`). For example:
```
.ping      # Check bot response time
.menu      # Display command menu and help
.list      # List all available commands
.alive     # Show bot status
```
Type `.help` or `.list` in chat to view all commands and descriptions.



<!-- GitAds-Verify: 1CKAFUVJQRST1DIRYIXBV7F1ELZKHCJ1 -->


----

## Star History

<a href="https://www.star-history.com/#Guru322/GURU-Ai&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Guru322/GURU-Ai&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Guru322/GURU-Ai&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Guru322/GURU-Ai&type=Date" />
 </picture>
</a>

