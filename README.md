<h1>Mini Steam profile React component</h2>
<h3>Preview</h3><br>
<p align="center">
<img src="https://media.discordapp.net/attachments/1035917451533221953/1035954953698676756/Profile.png" width="500">
<br>
</p>
Showing hours played for recently played games<br><br>
<p align="center">
<img src="https://media.discordapp.net/attachments/1035917451533221953/1035958962438283355/Back.png" width="500">
</p>
<br>
This React component renders a Steam profile by the SteamID and APIkey given through a .env file, making API calls through Node.js server.<br>
The API calls are made calling Steams'API and web scraping the background from the given Steam Profile using cheerio library.
<h3>What does it show</h3>
<li>Profile picture</li>
<li>Profile background</li>
<li>Username (with Steam Profile link)</li>
<li>Level</li>
<li>Games Owned (including free-to-plays)</li>
<li>Recently played games and hours played</li>
<h3>Usage</h3>
<li>Use &ltSteamProfile/&gt for rendering the component in your page (use it in a div with width).</li>
<li>Create .env file in server.js and add:</li>
&nbsp;&nbsp;&nbsp;&nbsp; - API_KEY = "Your steam api key"<br>
&nbsp;&nbsp;&nbsp;&nbsp; - STEAM_ID = "Your steam id"
<h3>Installation</h3>
*Work in Progress* <br>npm installation command <b> not available</b><br><br>
Other way
<li>Copy the steamProfile.tsx file in your components folder</li>
<li>Create or modify your server.js</li>
<li>Change/add "proxy" in package.json (Front-end side) to the port 5000, example "proxy": "http://localhost:5000"</li>
<li>Create an .env file with you Steam api key and Steam ID </li>
<br>
<em>This component is not affiliated with Valve</em>

