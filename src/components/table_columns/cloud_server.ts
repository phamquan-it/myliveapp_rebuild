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
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
        },
        {
          title: 'SSHPasswordAuthEnabled',
          dataIndex: 'SSHPasswordAuthEnabled',
          key: 'SSHPasswordAuthEnabled',
          render:(value:boolean)=>((value)?"true":"false"),
          align:'center',
        },
        {
          title: 'Virtualization',
          dataIndex: 'virtualization',
          align:'center',
          key: 'virtualization',
          render: (virtualization:any) => virtualization ? 'Yes' : 'No',
        },
        {
          title: 'SnapshotRunTime',
          dataIndex: 'snapshotRunTime',
          key: 'snapshotRunTime',
          align: "center"
        },
        {
          title: 'Profile',
          dataIndex: 'profile',
          key: 'profile',
        },
    ];
}
export default cloudServerColumns;