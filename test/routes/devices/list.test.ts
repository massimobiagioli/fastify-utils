import {afterEach, test} from "tap"
import createApp from "@src/app";
import {ImportMock} from "ts-mock-imports";
import * as DeviceLib from '@lib/devices.lib'
import * as Fixtures from '@test/fixtures'
import {DeviceDtoType} from "@type/devices.type";
import {PaginatedResult} from "@src/utils/pager/pager.type";

afterEach(() => {
  ImportMock.restore();
})

test('get all devices with default limit and offset', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const listDevicesMock = ImportMock.mockFunction(
      DeviceLib,
      'listDevices',
      Fixtures.devices
  )

  const response = await app.inject({
    method: 'GET',
    url: '/api/devices',
  })

  t.equal(response.statusCode, 200)

  const result = response.json<PaginatedResult<DeviceDtoType>>()
  const deviceCollection = result.items

  t.equal(result.total, 2)
  t.equal(deviceCollection.length, 2)

  t.ok(deviceCollection[0].id)
  t.equal(deviceCollection[0].name, 'Device 1')
  t.equal(deviceCollection[0].address, '10.0.0.1')
  t.equal(deviceCollection[0].isActive, true)

  t.ok(deviceCollection[1].id)
  t.equal(deviceCollection[1].name, 'Device 2')
  t.equal(deviceCollection[1].address, '10.0.0.2')
  t.equal(deviceCollection[1].isActive, false)

  t.ok(listDevicesMock.calledOnce)
})

test('get all devices with limit and offset', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const listDevicesMock = ImportMock.mockFunction(
      DeviceLib,
      'listDevices',
      Fixtures.devices
  )

  const response = await app.inject({
    method: 'GET',
    url: '/api/devices?limit=1&offset=1'
  })

  t.equal(response.statusCode, 200)

  const result = response.json<PaginatedResult<DeviceDtoType>>()
  const deviceCollection = result.items

  t.equal(result.total, 2)
  t.equal(deviceCollection.length, 1)

  t.ok(deviceCollection[0].id)
  t.equal(deviceCollection[0].name, 'Device 2')
  t.equal(deviceCollection[0].address, '10.0.0.2')
  t.equal(deviceCollection[0].isActive, false)

  t.ok(listDevicesMock.calledOnce)
})
