enum StorageType {
    local = 'local',
    session = 'session'
}

/// 返回数据类型
interface StorageData {
    // 数据状态
    code: number | bigint
    // 数据
    data?: any | object
}

/// 约束

interface RestraintStorageType {
    set(name: string, value: any): void

    get(name: string): StorageData

    rem(name: string): void

    keys(): any
}

export type {
    StorageData,
    StorageType,
    RestraintStorageType
}
