import { Worker } from 'near-workspaces';
import test from 'ava';

test.beforeEach(async t => {
    // Init the worker and start a Sandbox server
    const worker = await Worker.init({network: 'testnet', rootAccountId: 'counter'});

    // Prepare sandbox for tests, create accounts, deploy contracts, etc.
    const root = worker.rootAccount;
    // Deploy the clean-state contract.
    const counter = await root.devDeploy('./build/contract.wasm');

    // Test users
    const ali = await root.createSubAccount('ali', {initialBalance : "1000000000000000000000000"});
    const bob = await root.createSubAccount('bob', {initialBalance : "1000000000000000000000000"});

    // Save state for test runs
    t.context.worker = worker;
    t.context.accounts = { root, counter, ali, bob };
});

// If the environment is reused, use test.after to replace test.afterEach
test.afterEach(async t => {
    await t.context.worker.tearDown().catch(error => {
        console.log('Failed to tear down the worker:', error);
    });
});

test('Initial count is 0, Increase works, Decrease works', async t => {
    const { counter, ali, bob } = t.context.accounts;
    let result = await counter.view('getCount', {});
    t.is(result, 0);

    await ali.call(counter, 'increase', {});

    result = await counter.view('getCount', {});
    t.is(result, 1);

    await bob.call(counter, 'increase', { n: 4 });
    result = await counter.view('getCount', {});
    t.is(result, 5);

    await ali.call(counter, 'decrease', {});

    result = await counter.view('getCount', {});
    t.is(result, 4);

    await bob.call(counter, 'decrease', { n: 5 });
    result = await counter.view('getCount', {});
    t.is(result, -1);
});
