module.exports = {
  packagerConfig: {
    asar: true,
    darwinDarkModeSupport: 'true',
    // icon: 'resources/icon',
    name: 'Bootcamp Helper',
    packageManager: 'yarn',
    ignore: [
      '/.gitignore',
      '/config.forge.js',
      '/yarn.lock',
      '\\.map$'
    ],
    osxSign: {
      entitlements: 'src/entitlements.plist',
      'entitlements-inherit': 'src/entitlements.plist',
      'gatekeeper-assess': false,
      hardenedRuntime: true,
      identity:
        'Developer ID Application: Ship Shape Consulting LLC (779MXKT6B5)'
    },
    osxNotarize: {
      appleId: process.env['APPLE_ID'],
      appleIdPassword: process.env['APPLE_ID_PASSWORD']
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {
        name: 'Bootcamp Helper',
        // background: 'electron-app/resources/installBackground.png',
        // icon: 'electron-app/resources/dmg.icns',
      },
    },
  ],
};
