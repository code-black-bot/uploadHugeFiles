const router = require('koa-router')();

router.prefix('/list')

router.get('/',async (ctx,next)=>{
    console.log(ctx.query)
    ctx.body = "欢迎"+ctx.query;
})

module.exports = router;