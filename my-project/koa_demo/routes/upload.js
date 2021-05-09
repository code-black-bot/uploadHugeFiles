const router = require('koa-router')();
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");
const UPLOAD_DIR = path.resolve(__dirname, "..", "target");

router.get('/upload',async (ctx)=>{
    let req = ctx.request;
    let res = ctx.response;
    const multipart = new multiparty.Form();
    multipart.parse(req,async(err,fields,files)=>{
        if(err) return;
        const [chunk]=files.chunk;
        const [hash] = fields.hash;
        const [filename] = fields.filename;
        const chunkDir = `${UPLOAD_DIR}/${filename}`
    
        // 切片目录不存在则新建
        if(!fse.existsSync(chunkDir)){
            await fse.mkdirs(chunkDir)
        }
        await fse.move(chunk.path,`${chunkDir}/${hash}`);
        res.end('received file chunk')
    })
})

module.exports = router;