<p align="center">  
  <a href="https://youtu.be/WcA7GZuaN0A">
    <img alt="Guru" height="300" src="https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg">
    <h1 align="center">GURU Ai</h1>
  </a>
</p>

<p align="center">
  <a href="https://github.com/Guru322">
    <img title="Author" src="https://img.shields.io/badge/GURU-BOT-black?style=for-the-badge&logo=telegram">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Guru322?tab=followers">
    <img title="Followers" src="https://img.shields.io/github/followers/Guru322?label=Followers&style=social">
  </a>
  <a href="https://github.com/Guru322/GURU-BOT/stargazers/">
    <img title="Stars" src="https://img.shields.io/github/stars/Guru322/GURU-BOT?&style=social">
  </a>
  <a href="https://github.com/Guru322/GURU-BOT/network/members">
    <img title="Fork" src="https://img.shields.io/github/forks/Guru322/GURU-BOT?style=social">
  </a>
  <a href="https://github.com/Guru322/GURU-BOT/watchers">
    <img title="Watching" src="https://img.shields.io/github/watchers/Guru322/GURU-BOT?label=Watching&style=social">
  </a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FGuru322%2FGURU-BOT?ref=badge_shield" alt="FOSSA Status">
    <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FGuru322%2FGURU-BOT.svg?type=shield">
  </a>
</p>

<hr>

<h2>Installation</h2>

<pre><code>git clone https://github.com/Guru322/GURU-Ai.git
cd GURU-Ai
npm install
</code></pre>

<h2>Configuration</h2>

<p>Create a <code>.env</code> file in project root or set the following environment variables:</p>

<pre><code>
MONGODB_URI=&lt;Your MongoDB connection URI&gt;
PHONE_NUMBER=&lt;Your WhatsApp phone number with country code&gt;
BOTNAME=&lt;Bot display name (optional)&gt;
OWNERS="&lt;owner1;john;owner2;doe&gt;"
</code></pre>

<p>You can also edit <code>config.js</code> for additional settings like bot name, pack name, author, owners list, and sticker watermark.</p>

<h2>Running the Bot</h2>

<pre><code>npm start
# or
node index.js
</code></pre>

<p>By default, the server listens on port 5000 (or the port defined in the <code>PORT</code> environment variable).  
Open your browser at <a href="http://localhost:5000">http://localhost:5000</a> to access the pairing interface where the pairing code and connection status are displayed.</p>

<h2>Usage</h2>

<p>After starting, the bot will print a pairing code.  
Open WhatsApp > Linked Devices > Link a Device > Link with phone number and enter the pairing code to connect.</p>

<p>Commands are invoked with a prefix (default is <code>.</code>). For example:</p>

<pre><code>
.ping      # Check bot response time
.menu      # Display command menu and help
.list      # List all available commands
.alive     # Show bot status
</code></pre>

<p>Type <code>.help</code> or <code>.list</code> in chat to view all commands and descriptions.</p>

<hr>

<h2>Star History</h2>

<a href="https://www.star-history.com/#Guru322/GURU-Ai&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Guru322/GURU-Ai&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Guru322/GURU-Ai&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Guru322/GURU-Ai&type=Date" />
  </picture>
</a>
