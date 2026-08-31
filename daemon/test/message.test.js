import assert from 'node:assert/strict'
import test from 'node:test'

import { extractMedia } from '../lib/message.js'

test('retains the encrypted payload required to download a voice note', () => {
  const media = extractMedia({
    audioMessage: {
      mimetype: 'audio/ogg; codecs=opus',
      mediaKey: Buffer.from('voice-key'),
      directPath: '/v/t62.7118-24/example',
      fileLength: 42,
      seconds: 3,
      ptt: true
    }
  })

  assert.deepEqual(media, {
    kind: 'audio',
    mimetype: 'audio/ogg; codecs=opus',
    mediaKey: Buffer.from('voice-key').toString('base64'),
    directPath: '/v/t62.7118-24/example',
    url: '',
    fileEncSha256: '',
    fileSha256: '',
    fileLength: 42,
    seconds: 3,
    caption: ''
  })
})
