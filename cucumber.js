module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'features/step-definitions/**/*.ts',
      'support/**/*.ts'
    ],
    paths: [
      'features/**/*.feature'
    ],
    format: [
      'progress',
      'html:cucumber-report.html'
    ],
    publishQuiet: true
  }
};