import {Static, Type} from "@sinclair/typebox";

export const DeviceRequestDto = Type.Object({
    limit: Type.Optional(Type.Number({minimum: 1, default: 10})),
    offset: Type.Optional(Type.Number({minimum: 0, default: 0})),
})

export type DeviceRequestDtoType = Static<typeof DeviceRequestDto>

export const DeviceDto = Type.Object({
    id: Type.String(),
    name: Type.String(),
    address: Type.String({ format: 'ipv4' }),
    isActive: Type.Boolean(),
})

export type DeviceDtoType = Static<typeof DeviceDto>

export const DeviceDtoCollection = Type.Array(DeviceDto)

export type DeviceDtoCollectionType = Static<typeof DeviceDtoCollection>