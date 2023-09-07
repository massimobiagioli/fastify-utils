import {test} from "tap"
import createApp from "@src/app";
import {DeviceDtoType} from "@type/devices.type";
import {DynamoDBPaginatedResult} from "@src/utils/pager/pager.type";

test('get all devices for userId u01', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/devices?userId=u01',
  })

  t.equal(response.statusCode, 200)

  const result = response.json<DynamoDBPaginatedResult<DeviceDtoType>>()
  const deviceCollection = result.items

  t.ok(result.lastKey)
  t.equal(deviceCollection.length, 10)

  t.equal(deviceCollection[0].userId, 'u01')
  t.equal(deviceCollection[0].deviceId, 'd0101')
  t.equal(deviceCollection[0].address, '10.0.1.1')
})

test('get all devices for userId u01 with limit and startKey', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/devices?userId=u01&limit=5&startKey=eyJ1c2VySWQiOnsiUyI6InUwMSJ9LCJkZXZpY2VJZCI6eyJTIjoiZDAxMDUifX0=',
  })

  t.equal(response.statusCode, 200)

  const result = response.json<DynamoDBPaginatedResult<DeviceDtoType>>()
  const deviceCollection = result.items

  t.ok(result.lastKey)
  t.equal(deviceCollection.length, 5)

  t.equal(deviceCollection[0].userId, 'u01')
  t.equal(deviceCollection[0].deviceId, 'd0106')
  t.equal(deviceCollection[0].address, '10.0.1.6')
})

test('get all devices for userId u01 with no more results', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/devices?userId=u01&limit=5&startKey=eyJ1c2VySWQiOnsiUyI6InUwMSJ9LCJkZXZpY2VJZCI6eyJTIjoiZDAxMTAifX0=',
  })

  t.equal(response.statusCode, 200)

  const result = response.json<DynamoDBPaginatedResult<DeviceDtoType>>()
  const deviceCollection = result.items

  t.equal(result.lastKey, undefined)
  t.equal(deviceCollection.length, 4)

  t.equal(deviceCollection[0].userId, 'u01')
  t.equal(deviceCollection[0].deviceId, 'd0111')
  t.equal(deviceCollection[0].address, '10.0.1.11')
})