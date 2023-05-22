const core = require('@actions/core');
const fs = require('fs');
const { Deployer } = require('./lib/deployer');
const { Summary } = require('./lib/summary');

const config = {
  host: core.getInput('host'), // Required.
  port: core.getInput('port'), // Optional, Default to 22.
  username: core.getInput('username'), // Required.
  password: core.getInput('password'), // Optional.
  privateKey: core.getInput('privateKey'), // Optional.
  passphrase: core.getInput('passphrase'), // Optional.
  algorithms: core.getInput('compress') ? {compress: 'zlib@openssh.com'} : {}, // Optional. Default to false.
  agent: core.getInput('agent'),   // Optional, path to the ssh-agent socket.
  localDir: core.getInput('localDir'), // Required, Absolute or relative to cwd.
  remoteDir: core.getInput('remoteDir') // Required, Absolute path only.
};

const options = {
  dryRun: JSON.parse(core.getInput('dryRun')), // Enable dry-run mode. Default to false.
  exclude: core.getInput('exclude').split(','), // exclude patterns (glob) like .gitignore.
  forceUpload: JSON.parse(core.getInput('forceUpload')), // Force uploading all files, Default to false(upload only newer files).
  removeExtraFilesOnServer: JSON.parse(core.getInput('removeExtraFilesOnServer')) // Remove extra files on server, default to false.
};

if (config.privateKey && !/^[-]+[A-Z ]+[-]+\n/.test(config.privateKey)) {
  try {
    config.privateKey = fs.readFileSync(config.privateKey);;
  } catch (err) {
    console.error(err);
    throw new Error(`Private key file not found ${config.privateKey}`);
  }
}

function printSummary(summary)
{
  console.log('Upload Summary:');
  console.log(`Files Created   : ${summary.filesCreated}`);
  console.log(`Folders Created : ${summary.filesCreated}`);
  console.log(`Files Changed   : ${summary.filesChanged}`);
  console.log(`Files Changed   : ${summary.filesSkipped}`);
  console.log(`Files Changed   : ${summary.filesIgnored}`);
}

new Deployer(config, options)
  .sync()
  .then((summary) => {
    console.log('sftp upload success!');
    printSummary(summary);
  })
  .error(() => {
    console.log('error occurred during sftp upload');
  });

