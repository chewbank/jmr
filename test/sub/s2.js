const test = require('jmr');

test.before('s2.before', async t => {

   t.ok(true);

})


test('s2.hello', t => {

   t.ok(!false, '值必须为true');

})