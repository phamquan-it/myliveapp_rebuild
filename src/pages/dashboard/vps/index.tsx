import { Table } from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

const Page = ()=>{
    const t = useTranslations('MyLanguage')
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
          },
        {
          title: t('name'),
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: t('name')+" CPU",
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      const d = useTranslations("DashboardMenu")
  return(
    <>
    <Title level={2} className="text-center">{d('cloudserver')}</Title>
    <div className="border rounded">
    <Table dataSource={dataSource} columns={columns} />
    </div>
    </>
);
} 
 export default Page

 export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../../../../messages/${locale}.json`)).default,
      },
    };
  }
  