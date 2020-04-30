console.log('started it');
const program = require('commander');

console.log('commander done');
const Log = require('@entando/log');

console.log('entando log done');
const { execSync } = require('child_process');

console.log('child_process done');
const Pkg = require('update-pkg-extended');

console.log('update-pkg done');

const pkg = new Pkg();

console.log('pkg done');

program.version('1.0.0')
  .name('npm run jenkins')
  .action(() => {
    console.log('starting it');
    Log.section('publishing new version of cms');
    console.log('line 24 it');
    Log.info('updating versiong file');
    Log.info(`current version is ${pkg.version.get()}`);
    console.log('line 27');
    pkg.version.patch();
    console.log('line 28');
    pkg.saveSync();
    console.log('line 29');
    Log.check(`new version is ${pkg.version.get()}`);

    Log.empty().info('pushing changes on github');
    console.log('line 35');
    execSync('git add .', { stdio: [0, 1, 2] });
    console.log('line 37');
    execSync(`git commit --no-verify -m 'version ${pkg.version.get()}'`, { stdio: [0, 'ignore', 2] });
    console.log('line 39');
    Log.check('made new commit');
    execSync('git push --force', { stdio: [0, 'ignore', 2] });
    console.log('line 42');
    Log.check('pushed commit');

    Log.empty().info('publishing on npm');
    console.log('line 46');
    execSync('npm publish', { stdio: [0, 1, 2] });
    console.log('line 48');
    Log.check('published on npm');
    Log.empty(1).success('deployment complete');
  });

program.parse(process.argv);
