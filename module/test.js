const pickDirty = require('./pickDirty');

(async () => {
    const resp = await pickDirty();
    console.log(resp);
})()