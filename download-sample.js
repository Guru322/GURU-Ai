import fs from 'fs';
import axios from 'axios';

const url = 'https://rr3---sn-4g5lzned.googlevideo.com/videoplayback?expire=1744989994&ei=yhoCaLOhG8LImLAPlv_H6Qw&ip=104.28.192.61&id=o-AGfxrRWOqeDLp7Zg7QZMQK4R50hXhO8zhfblwFXEMsdd&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1744968394%2C&mh=MT&mm=31%2C26&mn=sn-4g5lzned%2Csn-aigl6ner&ms=au%2Conr&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=6572500&bui=AccgBcNQbp2bMMYe5iMVlJ_wTkgCizP6QFDceXMKQXw6VRx5TyuVUVvbPQDWWmbKrLhzvUTq41Mwa8-A&vprv=1&svpuc=1&mime=video%2Fmp4&ns=xEJOFPwKVgXy-BWvHTxKTg0Q&rqh=1&gir=yes&clen=45196738&ratebypass=yes&dur=1282.995&lmt=1744782441709507&mt=1744968057&fvip=3&lmw=1&c=TVHTML5&sefc=1&txp=6309224&n=67QrzDlqCizqDQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgA0Cy-gC06BZgBBZgTHqHyDJdpP9Ep6cvo8cnXshumLsCIQD0Jep07W6a1ZsI91y-s060l8V1sJihLoADx57O8GipiA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACuhMU0wRgIhANZfqzDvRkS1FNO4H5U20JnzaHnqGcL-Q-iWGxNrV1SJAiEAjN3iJJMY55R9eFiN-wKA3AhcAm5WrZRaiVtJU7Je1Og%3D&title=ODISHA%2C+BIHAR+%26+JOHNNY+SINS+%7C+Stand+Up+Comedy+by+Abinash+Mohapatra';
const output = 'sample-video.mp4';

(async () => {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(output);
    response.data.pipe(writer);
    writer.on('finish', () => {
      console.log('Download completed:', output);
    });
    writer.on('error', (err) => {
      console.error('Error writing file:', err.message);
    });
  } catch (err) {
    console.error('Error downloading video:', err.message);
  }
})();
