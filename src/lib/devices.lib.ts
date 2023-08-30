import {DeviceDtoCollectionType} from "@type/devices.type";

export async function listDevices(): Promise<DeviceDtoCollectionType> {
    return [
        {
            id: '123',
            name: 'Device 123',
            address: '10.10.10.1',
            isActive: false,
        },
        {
            id: '456',
            name: 'Device 456',
            address: '10.10.10.2',
            isActive: false,
        },
        {
            id: '789',
            name: 'Device 789',
            address: '10.10.10.3',
            isActive: true,
        }
    ]
}