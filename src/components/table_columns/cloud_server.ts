const cloudServerColumns = (t:any)=>{
    return <any>[
        {
          title: t('entryno'),
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: t('ipv4'),
          dataIndex: 'ipv4',
          key: 'ipv4',
        },
        {
          title: t('name'),
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: t('date'),
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: t('location'),
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'SnapshotRunTime',
          dataIndex: 'snapshotRunTime',
          key: 'snapshotRunTime',
          align: "center"
        }
    ];
}
export default cloudServerColumns;