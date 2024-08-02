const cloudServerColumns = (t: any) => {
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
      title: t('port'),
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: t('manufacturer'),
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: t('vendor'),
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: ('Core'),
      dataIndex: 'cores',
      key: 'cores',
    },
    {
      title: t('processor'),
      dataIndex: 'processors',
      key: 'processors',
    },
    {
      title: ('Virtualization'),
      dataIndex: 'virtualization',
      key: 'virtualization',
      render: (virtualization: any) => virtualization ? 'Yes' : 'No',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: t('distro'),
      dataIndex: 'distro',
      key: 'distro',
    },
    {
      title: t('release'),
      dataIndex: 'release',
      key: 'release',
    },
    {
      title: ('Kernel'),
      dataIndex: 'kernel',
      key: 'kernel',
    },
    {
      title: t('arch'),
      dataIndex: 'arch',
      key: 'arch',
    }
  ];
}
export default cloudServerColumns;