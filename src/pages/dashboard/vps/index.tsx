
import TableAction from "@/components/admin/TableAction";
import { debounce } from "lodash";
import { EyeFilled, MessageFilled, PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import _ from "lodash";
import {
  Button,
  Input,
  Modal,
  Table,
  TablePaginationConfig,
} from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import axios from "axios";
import VpsForm from "@/components/admin/vps/VpsForm";
import VpsButtonState from "@/components/admin/vps/VpsButtonState";
import XtermUI, { SSHInfo } from "@/components/app/Xterm.component";
import VpsDetail from "@/components/admin/vps/VpsDetail";
import VpsHideOption from "@/components/admin/vps/VpsHideOption";

const Page = () => {
  const [openState,setOpenState] = useState(false)
  const t = useTranslations("MyLanguage");
  const p = useTranslations("Placeholder");
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );

  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword || ""
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sync,setSync] = useState(false)
  const { data, isFetching, isError } = useQuery({ queryKey: ['queryKey', isModalOpen], queryFn: ()=>axios.get("https://api.webdock.io/v1/servers", webdockConfig) });


  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => {
    setShowModal(false);
  };


  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };
  const handleKeyword = debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const d = useTranslations("DashboardMenu");
  useEffect(() => {
    if (
      keyword == "" &&
      pageSize == 10 &&
      pageIndex == 1 &&
      router.asPath == "/dashboard/vps"
    )
      return;
    router.push(router, {
      query: {
        keyword: keyword,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, pageIndex, pageSize]);
 
  const [sshInfo, setSSHInfo] = useState(
    {
      ipv4OrHost: "",
      sshUser: ""
    }
  )
  const setSlugData = (slug: string)=>{ 
    setSlug(slug)
   }
  const columns = [
    {
      title: t('entryno'),
      dataIndex: "key"
    },
   
    {
      title: t('name'),
      dataIndex:"name",
    },
    {
      title: "Slug",
      dataIndex:"slug",
    },
    {
      title: t('location'),
      dataIndex:"location",
    },
    {
      title: t('ipv4'),
      dataIndex:"ipv4",
    },
    {
      title: "ipv6",
      dataIndex:"ipv6",
    },
    
    {
      title: t('status'),
      width: 190,
      dataIndex: ('slug'),
      render:(text: any, record: any)=>(<div className="grid grid-cols-4">
        
      <Button type="default" icon={<EyeFilled/>} onClick={()=>{
        console.log(record);
        
        setSlugData(record)
        
      }}></Button>
      <Button type="default" disabled={record.status != "running"} icon={<>&gt;_</>} onClick={()=>{
        setSSHInfo({
          ipv4OrHost: record.ipv4,
          sshUser: 'root'
        })
      }}></Button>
     
      
      {/* <VpsButtonState record={record}/> */}
      <VpsHideOption vps={record}/>
      </div>)
    }
  ]

  const [connectionState, setConnectionState] = useState(false);
  const [isViewDetailOpen,setIsViewDetailOpen] = useState(false)
  const [slug,setSlug] = useState<any>('')
  const hideModalViewDetail = ()=>{ 
    setSlug('')
    setIsViewDetailOpen(false)
  }
  const openModalViewDetail = ()=>{ 
    setIsViewDetailOpen(true)
  }

  

  const openModal = () => {
    setIsModalOpen(true);
    setConnectionState(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConnectionState(false);
  };
  useEffect(()=>{
    //open modal when sshInfo change
    if(sshInfo.sshUser != "" && sshInfo.sshUser !== "")
    openModal()
  }, [sshInfo])

  useEffect(()=>{
    //open modal view detail
    if(slug != '')
    openModalViewDetail()
  }, [slug])


  return (
    <>
      <Title className="text-center" level={2}>
        Vps
      </Title>

      <Modal title="View detail" open={isViewDetailOpen} width={1000} onCancel={hideModalViewDetail} footer={[]} destroyOnClose={true}>
          <VpsDetail slug={slug} closeModal={hideModalViewDetail}/>
      </Modal>
      <Modal
        title={`Terminal ${sshInfo.sshUser}@${sshInfo.ipv4OrHost}`}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        width={850}
        destroyOnClose={true} footer={null}
      >
        <XtermUI SSHInfo={sshInfo} />
      </Modal>
      
      <Modal width={1000}
        title={t("create")}
        open={showModal}
        onCancel={hideModal}
        footer={null}
      >
        <VpsForm closeModal={hideModal}  setSlug={setSlugData}/>
      </Modal>
      <div className="flex justify-between items-center my-3">
        <div id="filter">
          <Input
            defaultValue={keyword}
            placeholder={p("search")}
            style={{ width: 200 }}
            onChange={handleKeyword}
          />
        </div>

        <Button
          type="primary"
          id="create"
          icon={<PlusCircleFilled />}
          iconPosition="end"
          onClick={()=>{
            setShowModal(true)
          }}
        >
          {t("create")}
        </Button>
      </div>
      
      <Table
        className="border rounded-md shadow-md"
        dataSource={data?.data.map((item: any, index: number) => ({
          ...item,
          key: pageIndex * pageSize + (index + 1) - pageSize,
        }))}
        columns={columns}
        loading={isFetching}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        pagination={{
          total: data?.data.total,
          pageSize: pageSize,
          current: pageIndex,
          showSizeChanger: true,
        }}
      />
      
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}