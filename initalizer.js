import { password } from "bun";
import chalk from "chalk";

const { exec } = require("child_process");
const fs = require("fs");


( async ()  => {
const userSchema = require("./mongoose/schema/user");

console.log(chalk.blue("[Server]") + chalk.green(" Starting UP! "));
console.log(
  chalk.yellow("[UserAccessManager]") +
    chalk.blue(" Searching for inital Admin Account")
);
const user = userSchema.findOne({ name: "admin" }).exec()
if (!await user) {
  console.log(
    chalk.yellow("[UserAccessManager]") + chalk.green(" did not find Admin account")
  );

  const password = require('./utilities/ranString')(15)
  fs.writeFile("./initialAdminPassword.txt", password, (err) => {
    if (err) {
      chalk.yellow("[FileSystem]") + chalk.red(" FAILED TO CREATE FILE ", err)
      chalk.yellow("[UserAccessManager]") + chalk.red(" FAILED TO CREATE PASSWORD FILE")
    } else {
      chalk.yellow("[FileSystem]") + chalk.red(" CREATED FILE, initialAdminPassword.txt")
      chalk.yellow("[UserAccessManager]") + chalk.green(" Created password file")
    }
  });
  chalk.yellow("[FileSystem]") + chalk.red(" CREATED FILE, initialAdminPassword.txt")
  chalk.yellow("[UserAccessManager]") + chalk.green(" Created password file")
  const newUser = new userSchema({ name: "admin", role: "admin", password: password, modify: false })
newUser.save()
chalk.yellow("[DATABASE]") + chalk.red(" Created admin accont")


}
})()

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

if (fileExists("./.env.template")) {
  console.log(
    chalk.gray("[.ENV]") +
      chalk.red(" Change to .env! Its currently .env.template ")
  );
} else {
  console.log(
    chalk.gray("[.ENV]") +
      chalk.yellow(
        " .ENV.TEMPLATE file doesnt not exist! Checking if .env exists"
      )
  );
  if (fileExists("./.env")) {
    console.log(chalk.gray("[.ENV]") + chalk.green(" .ENV Exists!"));
  } else {
    console.log(
      chalk.gray("[.ENV]") +
        chalk.red(
          " .ENV.TEMPLATE nor .ENV exists. please fetch or clone the repo again"
        )
    );
  }
}

if (process.env.updates == true) {
  function getCurrentCommitHash(callback) {
    exec("git rev-parse HEAD", (err, stdout, stderr) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (stderr) {
        callback(new Error(stderr), null);
        return;
      }
      const commitHash = stdout.trim();
      callback(null, commitHash);
    });
  }

  function checkForUpdates() {
    getCurrentCommitHash((err, currentCommitHash) => {
      if (err) {
        console.log(
          chalk.red("[GIT]") +
            chalk.red(" Error getting git commit hash! ", err)
        );
        return;
      }

      exec(
        "git fetch && git rev-parse FETCH_HEAD",
        (fetchErr, fetchStdout, fetchStderr) => {
          if (fetchErr) {
            console.log(
              chalk.red("[GIT]") +
                chalk.red(" Error fetching latest git commit hash! ", fetchErr)
            );
            return;
          }
          if (fetchStderr) {
            console.log(chalk.red("[GIT]") + chalk.red(" Error ", fetchStderr));
            return;
          }

          const latestCommitHash = fetchStdout.trim();

          if (currentCommitHash !== latestCommitHash) {
            console.log(
              chalk.red("[GIT]") +
                chalk.green(" New version avaliable! Updating...")
            );
          } else {
            console.log(chalk.red("[GIT]") + chalk.green(" CDN Upto Date"));
          }
        }
      );
    });
  }

  // Check for updates on application start
  checkForUpdates();
} else {
  console.log(chalk.red("[GIT]") + chalk.yellow(" Updates a disabled."));
}

if (!process.env.port) {
  console.log(chalk.yellow("[INIT]") + chalk.red(" No port variable found."));
  console.log(chalk.yellow("[INIT]") + chalk.red(" Are you using bun?"));
}

if (!process.env.session) {
  console.log(chalk.yellow("[INIT]") + chalk.red(" No session secret found."));
  console.log(chalk.yellow("[INIT]") + chalk.red(" Are you using bun?"));
}

if (!process.env.atlas) {
  console.log(
    chalk.yellow("[INIT]") + chalk.red(" No mongodb connect url found.")
  );
  console.log(chalk.yellow("[INIT]") + chalk.red(" Are you using bun?"));
}
