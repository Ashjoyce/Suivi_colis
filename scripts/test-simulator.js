(async () => {
  try {
    const BASE = 'http://localhost:5000/api'

    function out(tag, obj) {
      console.log(`#${tag}`)
      try { console.log(JSON.stringify(obj, null, 2)) } catch(e) { console.log(obj) }
    }

    // 1) Login
    const loginRes = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    })
    const loginJson = await loginRes.json()
    out('LOGIN', loginJson)

    if (!loginJson.token) {
      console.error('No token received. Aborting test.')
      process.exit(1)
    }

    const token = loginJson.token

    // 2) Start simulator
    const startRes = await fetch(`${BASE}/simulator/start`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + token },
      body: JSON.stringify({ intervalMs: 2000 }),
    })
    const startJson = await startRes.json()
    out('SIM_START', startJson)

    // 3) Status
    const statusRes = await fetch(`${BASE}/simulator/status`, { headers: { 'authorization': 'Bearer ' + token } })
    const statusJson = await statusRes.json()
    out('SIM_STATUS', statusJson)

    // 4) Get reservations
    const resRes = await fetch(`${BASE}/reservations`, { headers: { 'authorization': 'Bearer ' + token } })
    const resJson = await resRes.json()
    out('RESERVATIONS', resJson)

    if (resJson.reservations && resJson.reservations.length) {
      const tn = resJson.reservations[0].trackingNumber
      out('FIRST_TRACKING_NUMBER', tn)

      // wait to let simulator advance a step
      console.log('Waiting 5s to allow simulator to update...')
      await new Promise(r => setTimeout(r, 5000))

      const trackRes = await fetch(`${BASE}/tracking/search/${tn}`)
      const trackJson = await trackRes.json()
      out('TRACK_AFTER_5S', trackJson)
    } else {
      console.log('No reservations found for this user; no tracking to display.')
    }

    // Done
    console.log('TEST_COMPLETE')
    process.exit(0)
  } catch (err) {
    console.error('TEST_ERROR', err)
    process.exit(2)
  }
})()
