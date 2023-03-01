<p align="center">
  <img width="200" height="200" src="https://i.ibb.co/6gSsmnz/20210830-111316.jpg">
</p>

## Installation

```bash
$ npm install knights-canvas

const knights = require("knights-canvas");
```


<p align="center">
    <a href="https://github.com/squad-404">
        <img
            src="https://readme-typing-svg.herokuapp.com?size=15&width=280&lines=thank+you+for+using+this+module"
            alt="404"
        />
    </a>
</p>

[![NPM](https://img.shields.io/badge/npm-362a63?style=for-the-badge&logo=npm&logoColor=cyan)](npmjs.com)


## how to use

<!-- Welcome -->
<details><summary><b>Welcome</b></summary><br>

```js
const knights = require("knights-canvas");
const fs = require('fs');

const image = await new knights.Welcome()
    .setUsername("UNDEFINED")
    .setGuildName("WIBU NOLEP")
    .setGuildIcon("https://i.ibb.co/G5mJZxs/rin.jpg")
    .setMemberCount("120")
    .setAvatar("https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg")
    .setBackground("https://i.ibb.co/4YBNyvP/images-76.jpg")
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/swelkom.png', data)
 
```
#### result
<img src="https://i.ibb.co/rw00Lwp/welcome.png" height="130"></img>
</details>

<!-- Welcome -->
<details><summary><b>Welcome2</b></summary><br>

```js
const knights = require("knights-canvas");
const fs = require('fs');

var image = await new knights.Welcome2()
    .setAvatar("you url pic")
    .setUsername("your name") 
    .setBg("background") 
    .setGroupname("guild name/groupname") 
    .setMember("member count") 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/sewelkom2.png', data)
  
```

<img src="https://i.ibb.co/2cyp24K/IMG-20210829-215318-150.jpg" height="130"></img>
</details>
<!-- Welcome -->
<details><summary><b>Rank</b></summary><br>

```js
const knights = require("knights-canvas");
const fs = require('fs');

const image = await new knights.Rank()
    .setAvatar("https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg") 
    .setUsername("Lingz") 
    .setBg("https://i.ibb.co/4YBNyvP/images-76.jpg")
    .setNeedxp("1000") 
    .setCurrxp("100") 
    .setLevel("6") 
    .setRank("https://i.ibb.co/Wn9cvnv/FABLED.png") 
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/srank.png', data)
 
```
#### result
<img src="https://i.ibb.co/wWBzCNs/MYTHIC.png" height="130"></img>
</details>

<!-- Welcome -->
<details><summary><b>Level Up</b></summary><br>

```js
const knights = require("knights-canvas");
const fs = require('fs');

const image = await new knights.Up()
    .setAvatar("https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg") 
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/slevelup.png', data)
 
```
#### result
<img src="https://i.ibb.co/g91Hz7W/levelup.png" height="100"></img>
</details>

#### update

<!-- Maker -->
<details><summary><b>Maker</b></summary><br>

#### Horny

```js
const knights = require("knights-canvas");
const fs = require('fs');
const image = await new knights.Horny()
    .setAvatar("https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg")
    .toBuild();
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/horny', data)
```
#### result
<img src="https://i.ibb.co/dQChtfB/Horny.png" height="240"></img>

#### Jojo

```js
const knights = require("knights-canvas");
const fs = require('fs');
const image = await new knights.Jo()
    .setImage("https://i.ibb.co/xG8L4mz/images.jpg")
    .toBuild();
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/jojo.png', data)
```
#### result
<img src="https://raw.githubusercontent.com/Lingz-ui/data-myBot/main/1635996035651.png" height="170"></img>

#### Patrick

```js
const knights = require("knights-canvas");
const fs = require('fs');
const image = await new knights.Patrick()
    .setAvatar("https://i.ibb.co/xG8L4mz/images.jpg")
    .toAttachment();
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/pat.png', data)
```
#### result
<img src="https://i.ibb.co/TkPQK3N/b5d0a14eb7195ec6f43d0.png" height="200"></img>

#### Bonk

```js
const knights = require("knights-canvas");
const fs = require('fs');
const image = await new knights.Bonk()
    .setAvatar1("https://i.ibb.co/G5mJZxs/rin.jpg")
    .setAvatar2("https://i.ibb.co/BZgRzh0/IMG-20210621-WA0000.jpg")
    .toBuild();
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/bonk.png', data)
```
#### result
<img src="https://raw.githubusercontent.com/Lingz-ui/data-myBot/main/1635996061640.png" height="170"></img>

#### Spongebob Burn

```js
const knights = require("knights-canvas");
const fs = require('fs');
const image = await new knights.Burn()
    .setAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwXmOgfrrGKdaGbnisffjJaUM2eU2izUBf3w&usqp=CAU")
    .toAttachment();
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/burn.png', data)
```
#### result
<img src="https://i.ibb.co/1RmRL9d/IMG-20211104-105209-488.jpg" height="170"></img>




</details>


#### ✉ req ? chat me on 

[![Telegram](https://img.shields.io/badge/Telegram-362a63?style=for-the-badge&logo=telegram&logoColor=black)](https://t.me/dr_lingz)

## Credits
##### thanks my team for the help
* [`Ling`](https://github.com/squad-404)
* [`Len`](https://github.com/len-cmd)
* [`Arya`](https://github.com/Arya-202265)
* [`Felix`](https://github.com/Felix-502)
##### knights-canvas 
##  （＾ω＾）