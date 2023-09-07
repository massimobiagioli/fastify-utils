import {Static, Type} from "@sinclair/typebox";

export const DeviceRequestDto = Type.Object({
    userId: Type.String(),
    limit: Type.Number({minimum: 1, default: 10}),
    startKey: Type.Optional(Type.String()),
})

export type DeviceRequestDtoType = Static<typeof DeviceRequestDto>

export const DeviceDto = Type.Object({
    userId: Type.String(),
    deviceId: Type.String(),
    address: Type.String({ format: 'ipv4' }),
})

export type DeviceDtoType = Static<typeof DeviceDto>

export const DeviceDtoCollection = Type.Array(DeviceDto)

export type DeviceDtoCollectionType = Static<typeof DeviceDtoCollection>