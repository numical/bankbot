const addEnv = (command, log) => log
  ? `DEBUG=bankbot:* NODE_PATH=. ${command}`
  : `NODE_PATH=. ${command}`;

module.exports = {
  scripts: {
    default: {
      description: 'run heroku runtime',
      script: addEnv('node ./index.js')
    },

    test: {
      default: {
        description: 'run local tests',
        script: addEnv('mocha --recursive ./spec')
      },

      log: {
        description: 'run local tests with debug-level logging',
        script: addEnv('mocha --recursive ./spec', true)
      },

      debug: {
        default: {
          description: 'run local tests through node-debug',
          script: addEnv('node-debug ./node_modules/.bin/_mocha --timeout=600000 --recursive ./spec', true)
        }
      }
    },

    console: {
      default: {
        description: 'run console application',
        script: addEnv('node ./lib/runtimes/console.js')
      },

      debug: {
        description: 'run console application through node-debug',
        script: addEnv('node-debug ./lib/runtimes/console.js', true)
      }
    },

    score: {
      description: 'run score utiltiy to rate string matches',
      script: addEnv('node ./lib/tools/score/score.js')
    }
  }
};
