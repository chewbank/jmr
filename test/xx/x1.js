const test = require('jmr');

test.before('x1.before', async t => {

   t.ok(true);

})


test('hello', t => {

   // t.ok(!false, '值必须为true');

})

test.skip('x1', t => {

   t.ok(true);

});
