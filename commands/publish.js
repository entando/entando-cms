const program = require('commander');
const Log = require('@entando/log');
const { execSync } = require('child_process');
const Pkg = require('update-pkg-extended');

const pkg = new Pkg();


program.version('1.0.0')
  .name('npm run jenkins')
  .action(() => {
    Log.section('publishing new version of cms');
    Log.info('updating versiong file');
    Log.info(`current version is ${pkg.version.get()}`);
    pkg.version.patch();
    pkg.saveSync();
    Log.check(`new version is ${pkg.version.get()}`);

    Log.empty().info('pushing changes on github');
    execSync('git add .', { stdio: [0, 1, 2] });
    execSync(`git commit --no-verify -m 'version ${pkg.version.get()}'`, { stdio: [0, null, 2] });
    Log.empty(1).success('installation complete');
  });

program.parse(process.argv);
